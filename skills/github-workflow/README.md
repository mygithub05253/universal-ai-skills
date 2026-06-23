# 🔀 GitHub Workflow

> `main` 동기화부터 **브랜치 → 작업 → 커밋 → 푸시 → PR → 머지 게이트**까지 Git/GitHub 라이프사이클 전체를 단계별로 진행하는 스킬.

| | |
|---|---|
| **slug** | `github-workflow` |
| **카테고리** | collab |
| **유형** | 절차형(에이전트 워크플로) |
| **위험도** | network (push/PR/merge 수행) |
| **호출** | `/github-workflow` (Claude Code) 또는 프롬프트 복붙 |

## 이중 실행 모드
- **Claude Code**: `git`/`gh` 명령을 **실제로 실행**하며 단계별로 진행.
- **그 외 생성형 AI(Codex·Gemini 등)**: 실행할 **명령어를 출력**해 사용자가 직접 실행. (실행한 척하지 않음)

## 언제 쓰나
- 새 기능 작업을 **올바른 흐름(브랜치→PR→머지)으로 처음부터 끝까지** 진행할 때
- 긴급 hotfix를 안전 게이트를 지키며 빠르게 머지할 때
- 팀/개인 공통으로 일관된 협업 규칙을 적용하고 싶을 때

> 메시지 **작성**만 필요하면 [`pr-commit-maker`](../pr-commit-maker/) 를 쓰세요.
> 이 스킬은 그 위에서 **전체 라이프사이클 + 실행 + 머지 게이트**를 담당합니다.

## 입력 변수
| 변수 | 필수 | 설명 |
|------|------|------|
| `{{CHANGE_DESCRIPTION}}` | ✅ | 작업 내용(브랜치명·커밋 subject 추론) |
| `{{BASE_BRANCH}}` | ⬜ | 기준 브랜치(기본 main) |
| `{{CHANGE_TYPE}}` | ⬜ | 타입 강제(미입력 시 추론) |
| `{{ISSUE_REF}}` | ⬜ | 연결 이슈 번호 |
| `{{MERGE_METHOD}}` | ⬜ | 머지 방식(기본 squash) |
| `{{TEAM_RULES}}` | ⬜ | 팀 머지 규칙. 비면 머지 게이트에서 질문 |

## 머지 게이트 🚦
이 스킬의 핵심 안전장치. **확인 없이 머지하지 않습니다.** `{{TEAM_RULES}}`가 있으면 그 규칙을, 없으면 CI 통과·리뷰·머지 방식·즉시/auto·브랜치 삭제를 **질문**으로 확정합니다. (개인 프로젝트 호환)

## 사용법
- **Claude Code**: `/github-workflow 회의실 예약 생성 API 추가` — `⚡` 블록의 `` !`git status -sb` `` 등으로 라이브 상태 반영.
- **그 외**: [`prompt.ko.md`](prompt.ko.md) 또는 [`SKILL.md`](SKILL.md) 복사 후 변수 채우기.

## 안티패턴 / 검증 포인트
- ❌ 베이스 브랜치 직접 push / 게이트 없이 머지 → 항상 PR + 게이트
- ❌ CI 실패 상태로 머지 → 중단하고 원인부터
- ❌ diff에 없는 내용 PR 본문에 작성 → `<!-- TODO -->`
- ✅ 셸 불가 AI에서 실행한 척하지 않고 명령을 출력하는가

## 예시 · 참고
- [`examples/basic.*`](examples/) (새 기능 전체 흐름, Claude 실행 모드)
- [`examples/edge.*`](examples/) (hotfix + 비-Claude 명령 출력 + 게이트에서 CI 실패 대응)
- [`reference/workflow-cheatsheet.md`](reference/workflow-cheatsheet.md) 단계별 명령 치트시트
