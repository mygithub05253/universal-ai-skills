#!/usr/bin/env node
// 스킬 패키지 표준 검증 스크립트 (네이티브 스킬 포맷)
// - metadata.json 을 JSON Schema 로 검증
// - SKILL.md 존재 + frontmatter(name, description) 검증  ← 네이티브 실행 정본
// - i18n 매핑: en → SKILL.md(영문 정본), ko → prompt.ko.md, 기타 → prompt.<lang>.md
// - 지시문의 {{VARIABLE}} 와 metadata.variables 정합성 검사
// 하나라도 오류가 있으면 비정상 종료(exit 1) → CI 게이트 역할

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SKILLS_DIR = join(ROOT, "skills");
const SCHEMA_PATH = join(ROOT, "schema", "skill-metadata.schema.json");

const VARIABLE_REGEX = /{{\s*([A-Z0-9_]+)\s*}}/g;

const errors = [];
const warnings = [];
const err = (slug, msg) => errors.push(`  ✗ [${slug}] ${msg}`);
const warn = (slug, msg) => warnings.push(`  ⚠ [${slug}] ${msg}`);

// 프롬프트/지시문에서 사용된 변수 집합 추출
function extractVars(text) {
  const set = new Set();
  let m;
  while ((m = VARIABLE_REGEX.exec(text)) !== null) set.add(m[1]);
  return set;
}

// SKILL.md frontmatter(맨 앞 --- 블록)에서 키 존재 여부를 가볍게 확인
function parseFrontmatter(rawText) {
  const text = rawText.replace(/\r\n/g, "\n"); // CRLF 정규화
  const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return fm;
}

// i18n 언어 코드 → 지시문 파일 경로 매핑
function promptFileFor(lang) {
  if (lang === "en") return "SKILL.md"; // 영문 정본은 SKILL.md 자체
  return `prompt.${lang}.md`;
}

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const schema = JSON.parse(readFileSync(SCHEMA_PATH, "utf8"));
const validate = ajv.compile(schema);

if (!existsSync(SKILLS_DIR)) {
  console.error("skills/ 디렉터리가 없습니다.");
  process.exit(1);
}

const skillDirs = readdirSync(SKILLS_DIR).filter((name) =>
  statSync(join(SKILLS_DIR, name)).isDirectory()
);
if (skillDirs.length === 0) {
  console.error("검증할 스킬이 없습니다.");
  process.exit(1);
}

console.log(`\n🔍 ${skillDirs.length}개 스킬 검증 시작\n`);

for (const slug of skillDirs) {
  const dir = join(SKILLS_DIR, slug);

  // 1) metadata.json 존재 및 파싱
  const metaPath = join(dir, "metadata.json");
  if (!existsSync(metaPath)) {
    err(slug, "metadata.json 이 없습니다.");
    continue;
  }
  let meta;
  try {
    meta = JSON.parse(readFileSync(metaPath, "utf8"));
  } catch (e) {
    err(slug, `metadata.json 파싱 실패: ${e.message}`);
    continue;
  }

  // 2) 스키마 검증
  if (!validate(meta)) {
    for (const e of validate.errors) {
      err(slug, `metadata 스키마 위반: ${e.instancePath || "(root)"} ${e.message}`);
    }
  }

  // 3) slug 와 폴더명 일치
  if (meta.slug && meta.slug !== slug) {
    err(slug, `slug(${meta.slug}) 가 폴더명(${slug})과 다릅니다.`);
  }

  // 4) SKILL.md 존재 + frontmatter(name, description) 검증
  const skillPath = join(dir, "SKILL.md");
  if (!existsSync(skillPath)) {
    err(slug, "SKILL.md 가 없습니다.");
  } else {
    const fm = parseFrontmatter(readFileSync(skillPath, "utf8"));
    if (!fm) {
      err(slug, "SKILL.md 에 YAML frontmatter(--- 블록)가 없습니다.");
    } else {
      if (!fm.name) {
        err(slug, "SKILL.md frontmatter 에 name 이 없습니다.");
      } else if (fm.name !== slug) {
        // 네이티브 스킬 표준: frontmatter name 은 폴더 slug(케밥케이스)와 동일해야 한다.
        // 공백/대문자 제목을 넣으면 Claude Code 가 /명령어 이름을 제대로 등록하지 못한다.
        // 사람용 제목은 metadata.json 의 name 에만 둔다.
        err(slug, `SKILL.md frontmatter name(${fm.name}) 이 폴더 slug(${slug})와 같아야 합니다. name 은 케밥케이스 slug 여야 합니다 (사람용 제목은 metadata.json name).`);
      }
      if (!fm.description) err(slug, "SKILL.md frontmatter 에 description 이 없습니다.");
    }
  }

  // 5) i18n 지시문 파일 존재 + 변수 정합성
  const declaredVars = new Set((meta.variables || []).map((v) => v.name));
  for (const lang of meta.i18n || []) {
    const rel = promptFileFor(lang);
    const promptPath = join(dir, rel);
    if (!existsSync(promptPath)) {
      err(slug, `i18n=${lang} 인데 ${rel} 가 없습니다.`);
      continue;
    }
    const usedVars = extractVars(readFileSync(promptPath, "utf8"));
    for (const v of usedVars) {
      if (!declaredVars.has(v)) {
        err(slug, `${rel} 의 {{${v}}} 가 metadata.variables 에 없습니다.`);
      }
    }
    for (const v of declaredVars) {
      if (!usedVars.has(v)) {
        warn(slug, `변수 {{${v}}} 가 ${rel} 에서 사용되지 않습니다.`);
      }
    }
  }

  // 6) 권장 파일
  if (!existsSync(join(dir, "examples"))) {
    warn(slug, "examples/ 디렉터리가 없습니다 (권장).");
  }
  if (!existsSync(join(dir, "README.md"))) {
    warn(slug, "폴더 README.md 가 없습니다 (권장).");
  }

  if (!errors.some((line) => line.includes(`[${slug}]`))) {
    console.log(`  ✓ ${slug}`);
  }
}

console.log("");
if (warnings.length) {
  console.log("경고:");
  console.log(warnings.join("\n"));
  console.log("");
}
if (errors.length) {
  console.log("오류:");
  console.log(errors.join("\n"));
  console.log(`\n❌ 검증 실패: 오류 ${errors.length}건\n`);
  process.exit(1);
}
console.log(`✅ 모든 스킬 검증 통과 (경고 ${warnings.length}건)\n`);
