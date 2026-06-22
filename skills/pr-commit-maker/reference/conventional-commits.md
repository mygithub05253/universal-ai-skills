# Conventional Commits — 참고 치트시트

> SKILL.md 를 얇게 유지하기 위해 상세 규칙을 여기로 분리합니다 (Progressive Disclosure).

## 형식
```
<type>(<scope>): <subject>

<body (선택)>

<footer (선택)>
```

## 타입
| type | 의미 |
|------|------|
| feat | 새 기능 |
| fix | 버그 수정 |
| docs | 문서만 |
| chore | 잡일(설정/의존성/정리) |
| ci | CI/워크플로우 |
| refactor | 동작 변화 없는 구조 개선 |
| test | 테스트 |
| style | 포맷(로직 변화 없음) |
| perf | 성능 |
| build | 빌드/패키징 |
| revert | 되돌리기 |

## subject 규칙
- 명령형 현재 시제: "add", "fix" (O) / "added", "fixes" (X)
- 첫 글자 소문자, 끝에 마침표 없음
- 50자 권장, 72자 이내
- 무엇을 했는지 한 줄로

## scope (선택)
- 변경 범위. 예: `feat(lint): ...`, `docs(readme): ...`
- 이 저장소에서는 보통 스킬 slug 나 모듈명을 scope 로 사용

## body / footer (선택)
- body: "무엇을/왜". 어떻게(코드)는 diff 가 보여줌
- footer: `BREAKING CHANGE: ...`, `Closes #12`, `Refs #34`

## Breaking change
```
feat!: drop support for legacy metadata format

BREAKING CHANGE: metadata.json 의 variables 는 이제 객체 배열이어야 합니다.
```

## 좋은 PR 본문(이 저장소 템플릿)
```
## 개요
(무엇을 왜 바꾸는지 한두 문장)

## 변경 사항
- ...

## 검증
- [ ] npm run lint:skills 통과
- ...

## 비고
- (리뷰어가 알아야 할 점)
```

## 커밋 분리 판단
서로 다른 관심사(예: 기능 추가 + 무관한 오타 수정)는 별도 커밋으로 분리한다.
- `feat: ...` (기능)
- `docs: fix typo in ...` (오타)
