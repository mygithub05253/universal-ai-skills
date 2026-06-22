# 📝 README Architect

> 프로젝트 정보를 받아 **그대로 커밋 가능한 포트폴리오 수준 README.md**를 생성하는 스킬.

| | |
|---|---|
| **slug** | `readme-architect` |
| **카테고리** | docs |
| **유형** | md-only (프롬프트형) |
| **위험도** | read-only |
| **호출** | `/readme-architect` (Claude Code) 또는 프롬프트 복붙 |

## 언제 쓰나
- GitHub 프로젝트에 처음 README를 작성할 때
- 포트폴리오/취업용으로 기존 README를 다듬을 때
- 과제·공모전 제출 전 프로젝트 문서를 정리할 때

## 입력 변수
| 변수 | 필수 | 설명 |
|------|------|------|
| `{{PROJECT_NAME}}` | ✅ | 프로젝트 이름 |
| `{{TECH_STACK}}` | ✅ | 기술 스택 |
| `{{FEATURES}}` | ✅ | 핵심 기능 |
| `{{DEPLOY_URL}}` | ⬜ | 배포 URL |

## 출력
제목+소개+데모링크 / 기능 / 기술스택 / 시작하기 / 프로젝트 구조 / 트러블슈팅 구조의 완결형 README.

## 사용법
- **Claude Code**: `/readme-architect` (설치는 [루트 README](../../README.md#-설치설치형-스킬) 참고). `⚡` 블록으로 `package.json`·파일목록을 자동 반영 가능.
- **그 외 생성형 AI**: [`prompt.ko.md`](prompt.ko.md) 또는 [`SKILL.md`](SKILL.md)의 지시문 복사 후 변수 채우기

## 안티패턴 / 검증 포인트
- ❌ 기능 과장/추측 → 입력 사실만, 모르면 `<!-- TODO -->`
- ❌ 스택과 안 맞는 실행 명령 → 스택 기반으로 구체화
- ✅ 그대로 `README.md`로 커밋 가능한 완결성인가

## 예시
[`examples/basic.input.md`](examples/basic.input.md) → [`examples/basic.output.md`](examples/basic.output.md)
