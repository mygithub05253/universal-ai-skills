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
- main 브랜치 보호: `lint` 체크 required + strict(최신화 필수) ✅
- auto-merge(squash) 활성화 ✅ → PR이 CI 통과 시 자동 머지됨
- main 직접 push 차단됨 → 모든 변경은 feat/chore 브랜치 → PR → auto-merge
- CI: `.github/workflows/skill-lint.yml` (PR/푸시 시 `npm run lint:skills`)

---

## 🔜 다음 액션 (이어서 할 일)
1. Requirements & Spec Writer 스킬을 feat 브랜치 → PR → auto-merge 로 추가.
2. Final Artifact Builder 스킬 추가 → MVP 필수 4종 완성.
3. (Phase 2) 나머지 스킬 + 카탈로그용 통합 인덱스(JSON) 생성 스크립트.

## 🐞 이슈 / 개선 로그 (체감 테스트 중 발견)
- (아직 없음 — 실제 모델로 프롬프트 돌려보며 누적 예정)
