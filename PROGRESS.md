# 📊 진행 대시보드 (PROGRESS)

> 이 파일은 **세션이 바뀌어도 맥락을 잃지 않기 위한 단일 진실 공급원**입니다.
> 새 세션을 시작하면 AI는 이 파일을 먼저 읽고 이어서 작업합니다.
> 작업이 한 덩어리 끝날 때마다 이 파일을 갱신하고 커밋합니다.

- **프로젝트**: Universal AI Skills Toolkit (PromptOps blueprint)
- **저장소**: https://github.com/mygithub05253/universal-ai-skills
- **최종 업데이트**: 2026-06-22 (KST)

---

## 🎯 확정된 의사결정
- **CI/머지**: 브랜치 보호 + `lint` 체크 통과 시 auto-merge. 단, 최초 골격은 부트스트랩으로 main에 직접 push.
- **테스트**: API 키 없음 → 구조 lint 자동화 + Claude로 직접 돌려보는 체감 테스트. 발견된 이슈는 아래 "이슈/개선 로그"에 누적.
- **우선 스킬**: MVP 필수 4종 — AI Handoff → README Architect → Requirements & Spec Writer → Final Artifact Builder.
- **언어 정책**: 커밋/PR 제목 = 영문 Conventional Commits(국제 표준). PR 본문·이슈·코드 주석·PROGRESS = 한국어. README/CONTRIBUTING = 영문 우선 + 한국어 보조.
- **작업 방식**: 한 번에 하나씩, 만들 때마다 사용자에게 보여주고 피드백. 스킬은 CONTRIBUTING의 "깊이 체크리스트"를 반드시 충족(얇은 스킬 금지).
- **진행 순서 보정**: MVP 스킬 양산 전에 Git/GitHub 거버넌스(A) → PR·커밋 스킬(B) 를 먼저 처리하기로 함.

## 🧱 표준 (확정)
- 스킬 패키지 = `SKILL.md` + `prompt.en.md` + `prompt.ko.md` + `metadata.json` + `examples/`
- `metadata.json` 은 `schema/skill-metadata.schema.json` 으로 검증
- 변수 규칙: 대문자 스네이크 케이스 `{{LIKE_THIS}}`, metadata.variables 에 선언된 변수만 프롬프트에서 사용 가능

---

## ✅ 단계별 진행 현황

| Phase | 내용 | 상태 |
|-------|------|------|
| 0 | 표준/스키마/lint/CI 세로 슬라이스 | 🟢 완료 |
| 1 | MVP 필수 4종 스킬 완성 | 🟡 진행 중 (2/4) |
| 2 | 나머지 스킬 + 카탈로그 데이터화 | ⬜ 대기 |
| 3 | Next.js 카탈로그 배포 | ⬜ 대기 |

## 📦 스킬 제작 현황
| 스킬 | slug | 상태 | 비고 |
|------|------|------|------|
| AI Handoff Dashboard | ai-handoff | 🟢 완료 | 세로 슬라이스 1호 (부트스트랩) |
| README Architect | readme-architect | 🟢 완료 | PR #1, 보호 플로우 검증 완료 |
| Requirements & Spec Writer | requirements-spec | ⬜ | MVP 필수, 다음 차례 |
| Final Artifact Builder | final-artifact | ⬜ | MVP 필수 |

## 🔧 인프라 상태 (확정)
- main 브랜치 보호: required 체크 **3종** `lint` · `pr-title` · `branch-name` + strict(최신화 필수) ✅
- auto-merge(squash) 활성화 ✅ → PR이 CI 통과 시 자동 머지됨
- main 직접 push 차단됨 → 모든 변경은 브랜치 → PR → auto-merge
- CI: `skill-lint.yml`(구조 검증) + `pr-conventions.yml`(PR 제목 영문 Conventional Commits + 브랜치명)
- 거버넌스 문서: `CONTRIBUTING.md`(브랜치/커밋/PR 규칙 + 스킬 깊이 체크리스트), PR/Issue 템플릿, CODEOWNERS
- 브랜치 타입: feat fix docs chore ci refactor test style perf build revert (+ 브랜치전용 hotfix release experiment)

---

## 🧬 스킬 포맷 표준 (피벗 확정)
- **SKILL.md = 네이티브 실행 정본**(영문): frontmatter(name/description/argument-hint) + 지시문. agentskills.io 표준 → Claude Code 설치 시 `/명령어`.
- **prompt.ko.md** = 한국어 복붙 변형. **prompt.en.md 폐지**(SKILL.md가 겸함).
- 모든 지시문은 `{{VARIABLE}}` 기반 → 모든 생성형 AI 복붙 호환. Claude 전용 기능은 `⚡ Claude Code only` 블록에 분리.
- 폴더별 `README.md` 필수(사람용). 설치 CLI: `node bin/uas.mjs add <slug> [--global|--project|--codex|--dir]`.

## 🔜 다음 액션 (이어서 할 일)
1. ✅ (A) 거버넌스 — 완료 (PR #3)
2. ✅ (B) pr-commit-maker 스킬 — 완료 (PR #4)
3. ✅ 네이티브 스킬 포맷 피벗 + 설치 CLI — 완료 (PR #5)
4. **▶ 다음 세션 시작점: Requirements & Spec Writer 스킬 (MVP 3호)** — **새 네이티브 포맷**으로, **설계 대화부터** 시작.
   - 성격: Living Docs(요구사항/유저스토리/기능명세/비기능/API 초안을 PR 단위로 계속 갱신)
   - 논의할 점: 변수 구조(STAKEHOLDERS/USER_STORIES/FEATURE_LIST/CONSTRAINTS 등), 출력 분할(여러 문서?), 갱신 모드, examples 2종(신규/변경)
   - 작업 방식: 하나씩, 설계 대화 → 빌드 → PR → 보여주고 피드백
5. Final Artifact Builder 스킬 (MVP 4호) → MVP 필수 4종 완성.
6. (Phase 2) 카탈로그용 통합 인덱스(JSON) 생성 스크립트.

## 🧭 새 세션 빠른 복구 가이드
1. 이 PROGRESS.md 를 먼저 읽는다.
2. `git log --oneline -8` 로 머지 상태 확인 (현재 PR #1~#5 머지됨, MVP 2.5/4 + pr-commit-maker).
3. 스킬 추가는 CONTRIBUTING "깊이 체크리스트" 충족 → 브랜치 → PR → auto-merge.
4. 모든 변경은 PR 플로우(main 직접 push 차단). 커밋/PR 제목은 영문 Conventional Commits.

## 🗂️ 스킬 백로그 (아이디어)
- `folder-docs` — 각 스킬/폴더의 README.md 자동 생성
- `readme-illustrator` — 각 생성형 AI의 이미지 생성(GPT Image, Claude 등)으로 README 썸네일/배너 추가
- HTML 청사진의 나머지 스킬들 (AGENTS.md Generator, Dacon Pipeline, ERD Generator, Skill Chain Orchestrator 등)

## 🐞 이슈 / 개선 로그 (체감 테스트 중 발견)
- lint 파서가 CRLF 줄바꿈에서 frontmatter name/description 을 못 읽던 버그 → CRLF 정규화 + `.gitattributes`(LF 강제)로 해결.
- 슬래시 명령은 **폴더 slug** = `/ai-handoff` (표시명 `AI Handoff Dashboard` 아님). 새 스킬은 설치 후 **Claude Code 재시작** 시 팔레트에 등록됨. README에 명시.
- **(추가 발견) `SKILL.md` frontmatter `name` 도 폴더 slug 케밥케이스여야 함.** 표시명(`AI Handoff Dashboard`)을 넣었더니 Claude Code 가 이름을 제대로 등록/표시하지 못함 → `name: ai-handoff` 처럼 교정. 사람용 제목은 `metadata.json` name 에만 유지. lint 에 `name===slug` 규칙 추가로 회귀 차단. (재발 시 설치 후 재시작 + 재설치 필요)
- pr-commit-maker·readme-architect 가 `~/.claude/skills/` 에 **설치 안 돼 있었음** (ai-handoff 만 설치됨) → 셋 다 재설치 + 재시작 필요.
- SKILL.md frontmatter 는 표준 필드만(name/description/argument-hint). version/risk 는 metadata.json 으로 이동(엄격 파서 호환).
- `.claude/`, `.serena/` 등 에이전트 로컬 설정이 git add -A 에 딸려오므로 .gitignore 에 등록함. 새 도구 쓰면 점검.
