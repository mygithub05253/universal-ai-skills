#!/usr/bin/env node
// 스킬 패키지 표준 검증 스크립트
// - metadata.json 을 JSON Schema 로 검증
// - 폴더명/slug 일치, i18n 프롬프트 파일 존재, SKILL.md 존재 확인
// - 프롬프트 본문의 {{VARIABLE}} 와 metadata.variables 정합성 검사
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

function err(slug, msg) {
  errors.push(`  ✗ [${slug}] ${msg}`);
}
function warn(slug, msg) {
  warnings.push(`  ⚠ [${slug}] ${msg}`);
}

// 프롬프트 파일에서 사용된 변수 집합 추출
function extractVars(text) {
  const set = new Set();
  let m;
  while ((m = VARIABLE_REGEX.exec(text)) !== null) set.add(m[1]);
  return set;
}

// AJV 준비
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

  // 4) SKILL.md 존재
  if (!existsSync(join(dir, "SKILL.md"))) {
    err(slug, "SKILL.md 가 없습니다.");
  }

  // 5) i18n 프롬프트 파일 존재 + 변수 정합성
  const declaredVars = new Set((meta.variables || []).map((v) => v.name));
  for (const lang of meta.i18n || []) {
    const promptPath = join(dir, `prompt.${lang}.md`);
    if (!existsSync(promptPath)) {
      err(slug, `i18n=${lang} 인데 prompt.${lang}.md 가 없습니다.`);
      continue;
    }
    const usedVars = extractVars(readFileSync(promptPath, "utf8"));
    // 프롬프트에서 쓰였지만 metadata 에 선언 안 된 변수 → 오류
    for (const v of usedVars) {
      if (!declaredVars.has(v)) {
        err(slug, `prompt.${lang}.md 의 {{${v}}} 가 metadata.variables 에 없습니다.`);
      }
    }
    // metadata 에 선언했지만 어느 프롬프트에서도 안 쓰인 변수 → 경고
    for (const v of declaredVars) {
      if (!usedVars.has(v)) {
        warn(slug, `변수 {{${v}}} 가 prompt.${lang}.md 에서 사용되지 않습니다.`);
      }
    }
  }

  // 6) examples 디렉터리 권장
  if (!existsSync(join(dir, "examples"))) {
    warn(slug, "examples/ 디렉터리가 없습니다 (권장).");
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
