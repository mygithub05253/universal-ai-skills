---
name: pr-commit-maker
description: git diff 로부터 Conventional Commit 메시지·PR 본문·브랜치명을 규칙에 맞게 생성한다
version: 1.0.0
risk: read-only
---

# PR & Commit Message Maker

## 언제 쓰나
- 변경을 커밋하기 직전, 형식에 맞는 커밋 메시지가 필요할 때
- PR을 올리기 직전, 템플릿에 맞는 본문을 빠르게 채우고 싶을 때
- 협업 규칙(Conventional Commits)을 일관되게 지키고 싶을 때

> 이 스킬은 **이 저장소의 규칙을 그대로 자동 생성**하는 도그푸딩 스킬입니다.
> 기본값은 "영문 Conventional Commit + 한국어 PR 본문"이며, `{{COMMIT_LANG}}` · `{{PR_BODY_LANG}}` 로 바꿀 수 있습니다.

## 동작 방식
1. `{{GIT_DIFF}}` 를 분석해 변경의 **성격(타입)** 과 **범위** 를 파악한다.
2. `{{CHANGE_TYPE}}` 가 주어지면 그 타입을, 없으면 diff 로 추론한다.
3. 세 가지를 출력한다: **커밋 메시지 → PR 본문 → 브랜치명**.
4. 상세 규칙은 [`reference/conventional-commits.md`](reference/conventional-commits.md) 참고(Progressive Disclosure).

## 입력 변수
| 변수 | 필수 | 설명 |
|------|------|------|
| `{{GIT_DIFF}}` | ✅ | diff 또는 변경 요약 |
| `{{CHANGE_TYPE}}` | ⬜ | 타입 강제(미입력 시 추론) |
| `{{TEST_RESULT}}` | ⬜ | 검증 결과 |
| `{{ISSUE_REF}}` | ⬜ | 연결 이슈 번호 |
| `{{COMMIT_LANG}}` | ⬜ | 커밋/제목 언어(기본 en) |
| `{{PR_BODY_LANG}}` | ⬜ | PR 본문 언어(기본 ko) |

## 출력 형식
1. **Commit message** — `type(scope): subject` + (필요 시) 본문/푸터
2. **PR body** — 개요 / 변경 사항 / 검증 / 비고
3. **Branch name** — `type/short-kebab-desc`

## 안티패턴 (하지 말 것)
- ❌ 한 커밋에 **무관한 변경 여러 개**를 욱여넣기 → 분리 제안할 것
- ❌ subject에 마침표(.) 붙이기, 72자 초과, 과거형("added") 사용 → 명령형 현재("add")
- ❌ diff에 없는 내용을 지어내기 → 모르면 `<!-- TODO -->`
- ❌ 타입 오용(문서 변경에 `feat`) → 실제 변경 성격에 맞출 것

## 엣지 케이스
- **거대한 diff**: 파일별 핵심만 요약, 장황한 나열 금지
- **무관한 변경 혼재**: 커밋을 2개 이상으로 **분리 제안**(각각의 메시지 제시)
- **Breaking change**: `type!: ...` + 본문에 `BREAKING CHANGE:` 푸터
- **테스트 없음**: PR 검증 섹션에 "테스트 없음/수동 확인" 명시
- **타입 모호**: 가장 큰 영향의 변경 기준으로 타입 선택, 근거 1줄

## 검증 포인트 (체감 테스트 기준)
- subject가 명령형·72자 이하·마침표 없음인가
- 타입이 변경 성격과 맞는가
- PR 본문이 우리 템플릿(개요/변경/검증/비고) 구조인가
- 브랜치명이 `type/kebab` 규칙을 지키는가

## 예시
- `examples/basic.*` — 단일 기능 추가
- `examples/edge.*` — 무관한 변경 혼재 → 커밋 분리 제안
