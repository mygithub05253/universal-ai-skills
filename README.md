# 🚀 Universal AI Skills Toolkit

> **PromptOps for everyone** — manage reusable AI prompts like code: author, test, and ship them.
> 프롬프트 모음집을 넘어 **작성 · 테스트 · 배포**까지 관리하는 AI Skill 생태계.
> Claude · ChatGPT · Gemini · Cursor 등에서 반복적으로 쓰는 개발 프롬프트를 **폴더형 Skill 패키지**로 표준화합니다.

<p>
  <img alt="status" src="https://img.shields.io/badge/status-Phase%200-0f766e">
  <img alt="skills" src="https://img.shields.io/badge/skills-3-14b8a6">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-blue">
</p>

---

## 📑 목차
1. [왜 만드나 (Why)](#-왜-만드나)
2. [스킬이란? — 해부도 (Anatomy)](#-스킬이란--해부도)
3. [두 가지 스킬 유형: md-only vs 코드 번들](#-두-가지-스킬-유형)
4. [사용 가이드 (How to use)](#-사용-가이드)
5. [스킬 추가하기 (How to author)](#-스킬-추가하기)
6. [검증 (Validation)](#-검증)
7. [스킬 카탈로그](#-스킬-카탈로그)
8. [로드맵](#%EF%B8%8F-로드맵)
9. [기여하기](#-기여하기)

---

## 💡 왜 만드나
AI 도구를 오가며 **같은 프롬프트를 반복**하고, 모델마다 **출력 품질이 들쭉날쭉**하며, 세션이 바뀌면 **문맥이 끊깁니다.**
이 프로젝트는 "잘 만든 프롬프트를 저장한다"가 아니라 **프롬프트를 코드처럼 관리**합니다 — 버전 · 입력 변수 · 예시 · 테스트 · PR 자동 검증을 갖춘 패키지로.

| 단계 | 내용 |
|------|------|
| ✍️ Authoring | `SKILL.md` · `prompt.en.md` · `prompt.ko.md` · `metadata.json` 을 한 패키지로 작성 |
| 🧪 Testing | 구조 lint 자동 검증 + 모델 호환성 등급 표기 |
| 🚢 Delivery | 웹 카탈로그 · CLI · GitHub Actions 로 실제 사용 가능한 형태 배포 |

---

## 🧬 스킬이란? — 해부도
하나의 스킬은 **단일 .md 파일이 아니라 폴더 패키지**입니다.

```
skills/<slug>/
├─ SKILL.md          # ★ 네이티브 실행 정본: frontmatter + 지시문 (영문). /명령어로 설치·호출
├─ prompt.ko.md      # 한국어 복붙 변형 (한국어 사용자·비-Claude 도구)
├─ metadata.json     # 검색·호환성·검증 메타데이터 (JSON Schema 검증 대상)
├─ README.md         # 사람용 설명 (GitHub에서 폴더 열었을 때 보임)
├─ examples/         # 입력→출력 예시 (basic, edge ...)
├─ reference/        # (선택) 상세 지식 — SKILL.md 밖으로 분리
└─ scripts/          # (선택) 결정적 작업용 실행 코드 (변환·검증 등)
```

**핵심 원리 — Progressive Disclosure(점진적 공개):** `SKILL.md`는 얇게 두고, 상세 지식은 `reference/`, 무거운 작업은 `scripts/`로 분리합니다.

**범용 + 네이티브 양립:** 모든 지시문은 `{{VARIABLE}}` 플레이스홀더 기반이라 **어떤 생성형 AI에도 복붙**으로 동작합니다. 동시에 `SKILL.md`는 [agentskills.io](https://code.claude.com/docs/en/skills) 표준을 따라 **Claude Code에 설치하면 `/명령어`로 호출**됩니다. Claude 전용 편의 기능(동적 컨텍스트 주입 등)은 SKILL.md 안 `⚡ Claude Code only` 블록에 분리해 둡니다.

```markdown
---
name: AI Handoff Dashboard
description: Compress project state into a handoff dashboard. Use when switching AI models or starting a fresh session.
argument-hint: [project-goal]
---
(여기부터 Claude가 실제로 따르는 지시문)
```

---

## 🔀 두 가지 스킬 유형
실무에서 전문가들은 스킬을 무조건 md로만 만들지 않습니다. **일의 성격에 따라 코드를 번들**합니다.

| 유형 | 본체 | 언제 | 예시 |
|------|------|------|------|
| **① md-only (프롬프트형)** | `prompt.{en,ko}.md` | 결과물이 **텍스트 생성**일 때 (LLM이 잘함) | ai-handoff, readme-architect, requirements |
| **② 코드 번들 (결정적형)** | md + `scripts/` 실행코드 | **변환·검증·파싱**처럼 정확성이 중요할 때 (코드가 잘함) | md→docx/pptx 변환기, ERD 문법 검증, JSON 계약 테스트 |

> 왜 코드를 섞나요? 예컨대 "Markdown을 PPTX로 변환"을 LLM에게 글로 시키면 불안정하지만, `pptxgenjs` 스크립트로 하면 **항상 정확**합니다. Anthropic 공식 `pdf`·`docx`·`pptx` 스킬도 모두 파이썬 스크립트를 번들하는 이유입니다.

---

## 🎯 사용 가이드
스킬을 쓰는 방법은 세 가지입니다.

**1) 복붙 (모든 생성형 AI)** — 스킬 폴더에서 `prompt.ko.md`(한국어) 또는 `SKILL.md`(영문) 지시문을 열고, `{{변수}}`를 채운 뒤 Claude/ChatGPT/Gemini 등에 붙여넣습니다.

**2) Claude Code에 설치 → `/명령어` (설치형 스킬)** — 아래 [설치](#-설치설치형-스킬) 참고.

### 📥 설치(설치형 스킬)
스킬을 `~/.claude/skills/`(또는 프로젝트 `.claude/skills/`)로 복사하면 Claude Code가 자동 인식해 `/스킬명`으로 호출됩니다.

**방법 A — 설치 CLI (권장)**
```bash
node bin/uas.mjs list                 # 스킬 목록
node bin/uas.mjs add ai-handoff       # ~/.claude/skills 에 설치 → /ai-handoff
node bin/uas.mjs add ai-handoff --project   # 현재 프로젝트(.claude/skills)에 설치
node bin/uas.mjs add ai-handoff --codex     # ~/.codex/skills 에 설치
# npm link 후에는 `uas add ...` 로 사용 가능
```

**방법 B — 수동 복사/심링크**
```bash
# 복사
cp -r skills/ai-handoff ~/.claude/skills/ai-handoff
# 또는 심링크(원본 갱신 자동 반영)
ln -s "$(pwd)/skills/ai-handoff" ~/.claude/skills/ai-handoff
```
설치 후 Claude Code에서 `/ai-handoff` 입력 → 자동 실행됩니다.

---

## 🛠 스킬 추가하기
1. `skills/<slug>/` 폴더 생성 (slug = 소문자 케밥, 폴더명과 `metadata.json`의 `slug` 일치)
2. `SKILL.md`, `prompt.en.md`, `prompt.ko.md`, `metadata.json`, `examples/` 작성
3. [CONTRIBUTING.md](CONTRIBUTING.md)의 **스킬 깊이 체크리스트** 충족 (안티패턴·엣지케이스·예시 2개 이상 등)
4. `npm run lint:skills`로 로컬 검증 → 브랜치 → PR → CI 통과 → auto-merge

---

## 🔍 검증
```bash
npm ci
npm run lint:skills
```
폴더 구조, `metadata.json` 스키마, i18n 프롬프트 존재, **변수 정합성**(프롬프트 ↔ metadata)을 검사합니다.
PR에서는 GitHub Actions가 `lint` + `pr-conventions`(제목·브랜치명)를 자동 실행하며, 통과해야 머지됩니다.

---

## 📚 스킬 카탈로그
| 스킬 | 카테고리 | 유형 | 설명 |
|------|----------|------|------|
| [AI Handoff Dashboard](skills/ai-handoff/) | core | md-only | 모델/세션 전환 시 프로젝트 상태를 표준 대시보드로 압축 |
| [README Architect](skills/readme-architect/) | docs | md-only | 프로젝트 정보를 포트폴리오 수준 README.md 로 생성 |
| [PR & Commit Message Maker](skills/pr-commit-maker/) | collab | md-only | git diff → Conventional Commit · PR 본문 · 브랜치명 생성 |

---

## 🗺️ 로드맵
- **Phase 0** — 표준 · 스키마 · lint · CI · 거버넌스 🟢
- **Phase 1** — MVP 필수 스킬 4종 (Handoff / README / Requirements / Final Artifact) 🟡
- **Phase 2** — 전체 스킬 + 카탈로그 데이터화 + 변환기 스크립트
- **Phase 3** — npx CLI + Next.js 카탈로그 배포

진행 상황은 [PROGRESS.md](PROGRESS.md) 에서 추적합니다.

---

## 🤝 기여하기
브랜치/커밋/PR 규칙과 **스킬 깊이 체크리스트**는 [CONTRIBUTING.md](CONTRIBUTING.md) 를 참고하세요.
커밋·PR 제목은 **영문 Conventional Commits**, 그 외 PR 본문·주석은 한국어로 작성합니다.

## 📄 License
MIT
