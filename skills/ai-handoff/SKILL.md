---
name: ai-handoff
description: 다른 AI 모델/세션으로 작업을 넘길 때 프로젝트 상태를 표준 대시보드로 압축한다
version: 1.0.0
risk: read-only
---

# AI Handoff Dashboard

## 언제 쓰나
- Claude 사용량 한도에 걸려 ChatGPT/Gemini로 갈아탈 때
- 대화가 너무 길어져 새 세션을 시작할 때
- 동료/다른 에이전트에게 작업을 인계할 때

위 상황에서 가장 즉시 체감되는 "문맥 단절"을 막는 것이 이 스킬의 목적이다.

## 동작 방식 (Progressive Disclosure)
1. 사용자는 `prompt.ko.md` 또는 `prompt.en.md` 의 `{{ }}` 변수를 채운다.
2. 모델은 **고정된 4개 섹션**(현재 상태 / 리스크·블로커 / 다음 액션 / 복붙용 프롬프트)으로만 출력한다.
3. 출력의 마지막 "복붙용 프롬프트"는 다음 AI에게 그대로 붙여넣어 작업을 이어갈 수 있는 형태여야 한다.

## 입력 변수
| 변수 | 필수 | 설명 |
|------|------|------|
| `{{PROJECT_GOAL}}` | ✅ | 프로젝트 목표 |
| `{{CURRENT_ERROR_LOG}}` | ⬜ | 현재 막힌 에러/증상 |
| `{{DONE_ITEMS}}` | ✅ | 완료된 작업 |
| `{{NEXT_TASKS}}` | ✅ | 남은 작업 |

## 출력 형식
항상 아래 4개 섹션의 Markdown 대시보드:
1. **Current State** — 한눈에 보는 현재 상태
2. **Risk & Blockers** — 막힌 지점과 리스크
3. **Next Actions** — 우선순위가 매겨진 다음 행동
4. **Copy-ready Prompt** — 다음 AI에 붙여넣을 프롬프트

## 검증 포인트 (체감 테스트 기준)
- 4개 섹션이 모두 존재하는가
- 다음 액션이 "무엇을/왜" 수준으로 구체적인가
- Copy-ready Prompt 만으로 다음 세션이 맥락을 복원할 수 있는가

## 예시
`examples/basic.input.md` → `examples/basic.output.md` 참고.
