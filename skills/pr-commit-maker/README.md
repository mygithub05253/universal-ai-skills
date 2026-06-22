# 🐙 PR & Commit Message Maker

> `git diff`를 받아 **Conventional Commit 메시지 · PR 본문 · 브랜치명**을 규칙에 맞게 생성하는 스킬.

| | |
|---|---|
| **slug** | `pr-commit-maker` |
| **카테고리** | collab |
| **유형** | md-only (프롬프트형) |
| **위험도** | read-only |
| **호출** | `/pr-commit-maker` (Claude Code) 또는 프롬프트 복붙 |

## 언제 쓰나
- 변경을 커밋하기 직전, 형식에 맞는 메시지가 필요할 때
- PR을 올리기 직전, 템플릿에 맞는 본문을 빠르게 채우고 싶을 때
- Conventional Commits를 일관되게 지키고 싶을 때

> 이 스킬은 **이 저장소의 규칙을 그대로 자동 생성**하는 도그푸딩 스킬입니다.
> 기본값은 영문 커밋 + 한국어 PR 본문이며 `{{COMMIT_LANG}}`·`{{PR_BODY_LANG}}`로 바꿀 수 있습니다.

## 입력 변수
| 변수 | 필수 | 설명 |
|------|------|------|
| `{{GIT_DIFF}}` | ✅ | diff 또는 변경 요약 |
| `{{CHANGE_TYPE}}` | ⬜ | 타입 강제(미입력 시 추론) |
| `{{TEST_RESULT}}` | ⬜ | 검증 결과 |
| `{{ISSUE_REF}}` | ⬜ | 연결 이슈 번호 |
| `{{COMMIT_LANG}}` | ⬜ | 커밋/제목 언어(기본 en) |
| `{{PR_BODY_LANG}}` | ⬜ | PR 본문 언어(기본 ko) |

## 출력
커밋 메시지 + PR 본문 + 브랜치명. 무관한 변경이 섞이면 커밋 분리를 제안합니다.

## 사용법
- **Claude Code**: `/pr-commit-maker` — `⚡` 블록의 `` !`git diff HEAD` `` 로 **diff 복붙 없이** 자동 처리.
- **그 외 생성형 AI**: [`prompt.ko.md`](prompt.ko.md) 또는 [`SKILL.md`](SKILL.md) 복사 후 `{{GIT_DIFF}}`에 diff 붙여넣기

## 안티패턴 / 검증 포인트
- ❌ 한 커밋에 무관한 변경 욱여넣기 → 분리 제안
- ❌ subject 마침표/과거형/72자 초과 → 명령형 현재, 마침표 없음
- ✅ 타입이 변경 성격과 맞는가 / PR 본문이 템플릿 구조인가

## 예시 · 참고
- [`examples/basic.*`](examples/) (단일 feat), [`examples/edge.*`](examples/) (커밋 분리 제안)
- [`reference/conventional-commits.md`](reference/conventional-commits.md) 치트시트
