---
name: readme-architect
description: 프로젝트 정보를 포트폴리오 수준의 구조화된 README.md 로 생성한다
version: 1.0.0
risk: read-only
---

# README Architect

## 언제 쓰나
- GitHub 프로젝트에 처음 README 를 작성할 때
- 포트폴리오/취업용으로 기존 README 를 다듬을 때
- 과제·공모전 제출 전 프로젝트 문서를 정리할 때

## 동작 방식
1. 사용자가 `{{PROJECT_NAME}}`, `{{TECH_STACK}}`, `{{FEATURES}}`, (선택) `{{DEPLOY_URL}}` 을 채운다.
2. 모델은 **고정된 README 섹션 구조**로 출력한다.
3. 배지·목차·실행법·트러블슈팅까지 포함해 "그대로 커밋 가능한" README 를 만든다.

## 입력 변수
| 변수 | 필수 | 설명 |
|------|------|------|
| `{{PROJECT_NAME}}` | ✅ | 프로젝트 이름 |
| `{{TECH_STACK}}` | ✅ | 기술 스택 |
| `{{FEATURES}}` | ✅ | 핵심 기능 |
| `{{DEPLOY_URL}}` | ⬜ | 배포 URL |

## 출력 형식
1. 제목 + 한 줄 소개 + (있으면) 데모 링크
2. 주요 기능 (불릿)
3. 기술 스택 (배지 또는 표)
4. 시작하기 (설치/실행 명령)
5. 프로젝트 구조 (간단한 트리)
6. 트러블슈팅 / 회고 (1~2개)

## 검증 포인트 (체감 테스트 기준)
- 실행 명령이 추측이 아닌 스택에 맞게 구체적인가
- 과장 없이 기능을 사실대로 기술하는가
- 그대로 `README.md` 로 커밋 가능한 완결성인가

## 예시
`examples/basic.input.md` → `examples/basic.output.md` 참고.
