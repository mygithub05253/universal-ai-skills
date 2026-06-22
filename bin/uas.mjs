#!/usr/bin/env node
// uas — Universal AI Skills 설치 CLI
// 스킬을 Claude Code 등 에이전트의 skills 디렉터리로 복사해 /명령어로 쓰게 한다.
//
// 사용법:
//   uas list                         스킬 목록
//   uas add <slug> [target]          스킬 설치 (기본: --global)
//
// target 프리셋:
//   --global    ~/.claude/skills/<slug>     (모든 프로젝트, 기본값)
//   --project   ./.claude/skills/<slug>     (현재 프로젝트)
//   --codex     ~/.codex/skills/<slug>      (Codex)
//   --dir PATH  PATH/<slug>                 (임의 경로)

import { readFileSync, readdirSync, existsSync, statSync, cpSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = join(__dirname, "..");
const SKILLS_DIR = join(PKG_ROOT, "skills");

function listSkills() {
  return readdirSync(SKILLS_DIR).filter((n) =>
    statSync(join(SKILLS_DIR, n)).isDirectory()
  );
}

function readMeta(slug) {
  const p = join(SKILLS_DIR, slug, "metadata.json");
  return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : null;
}

function resolveTarget(slug, args) {
  if (args.includes("--project")) return join(process.cwd(), ".claude", "skills", slug);
  if (args.includes("--codex")) return join(homedir(), ".codex", "skills", slug);
  const dirIdx = args.indexOf("--dir");
  if (dirIdx !== -1 && args[dirIdx + 1]) return join(args[dirIdx + 1], slug);
  return join(homedir(), ".claude", "skills", slug); // --global 기본
}

function cmdList() {
  const skills = listSkills();
  console.log(`\n📚 사용 가능한 스킬 ${skills.length}개\n`);
  for (const slug of skills) {
    const m = readMeta(slug);
    const name = m?.name || slug;
    const summary = m?.summary || "";
    console.log(`  • ${slug.padEnd(20)} ${name}`);
    if (summary) console.log(`    ${summary}`);
  }
  console.log(`\n설치: uas add <slug> [--global|--project|--codex|--dir PATH]\n`);
}

function cmdAdd(slug, args) {
  if (!slug) {
    console.error("설치할 스킬 slug 를 지정하세요. 예: uas add ai-handoff");
    process.exit(1);
  }
  const src = join(SKILLS_DIR, slug);
  if (!existsSync(src)) {
    console.error(`❌ '${slug}' 스킬을 찾을 수 없습니다. 'uas list' 로 확인하세요.`);
    process.exit(1);
  }
  const dest = resolveTarget(slug, args);
  cpSync(src, dest, { recursive: true });
  console.log(`✅ '${slug}' 설치 완료 → ${dest}`);
  console.log(`   Claude Code 에서 /${slug} 로 호출하세요.`);
}

const [cmd, arg, ...rest] = process.argv.slice(2);
switch (cmd) {
  case "list":
    cmdList();
    break;
  case "add":
    cmdAdd(arg, rest);
    break;
  default:
    console.log(`uas — Universal AI Skills 설치 CLI

사용법:
  uas list                  스킬 목록
  uas add <slug>            스킬 설치 (~/.claude/skills, 기본)
  uas add <slug> --project  현재 프로젝트(.claude/skills)에 설치
  uas add <slug> --codex    ~/.codex/skills 에 설치
  uas add <slug> --dir PATH 임의 경로에 설치`);
}
