# 🔄 AI Handoff Dashboard

> 다른 AI 모델/세션으로 작업을 넘길 때 프로젝트 상태를 **표준 대시보드**로 압축해 문맥 단절을 막는 스킬.

| | |
|---|---|
| **slug** | `ai-handoff` |
| **카테고리** | core |
| **유형** | md-only (프롬프트형) |
| **위험도** | read-only |
| **호출** | `/ai-handoff` (Claude Code) 또는 프롬프트 복붙 |

## 언제 쓰나
- Claude 사용량 한도에 걸려 ChatGPT/Gemini로 갈아탈 때
- 대화가 너무 길어져 새 세션을 시작할 때
- 동료/다른 에이전트에게 작업을 인계할 때

## 입력 변수
| 변수 | 필수 | 설명 |
|------|------|------|
| `{{PROJECT_GOAL}}` | ✅ | 프로젝트 목표 |
| `{{CURRENT_ERROR_LOG}}` | ⬜ | 현재 막힌 에러/증상 |
| `{{DONE_ITEMS}}` | ✅ | 완료된 작업 |
| `{{NEXT_TASKS}}` | ✅ | 남은 작업 |

## 출력
4개 섹션 고정: **Current State / Risk & Blockers / Next Actions / Copy-ready Prompt**.
마지막 "Copy-ready Prompt"는 다음 AI에 그대로 붙여넣어 맥락을 복원할 수 있는 형태입니다.

## 사용법
- **Claude Code**: 설치 후 `/ai-handoff` (설치는 [루트 README](../../README.md#-설치설치형-스킬) 참고)
- **그 외 생성형 AI**: [`prompt.ko.md`](prompt.ko.md)(한국어) 또는 [`SKILL.md`](SKILL.md)(영문)의 지시문을 복사해 변수 채우기

## 안티패턴 / 검증 포인트
- ❌ 4개 섹션 중 일부 누락 → 항상 4개 모두 포함
- ❌ "다음 액션"이 모호 → "무엇을/왜" 수준으로 구체화
- ✅ Copy-ready Prompt만으로 다음 세션이 맥락을 복원할 수 있는가

## 예시
[`examples/basic.input.md`](examples/basic.input.md) → [`examples/basic.output.md`](examples/basic.output.md)
