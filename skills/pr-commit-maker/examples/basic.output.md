# 예시 출력 (basic)

### 1. Commit message
```
feat(lint): validate prompt variables against metadata

프롬프트에서 사용한 {{VARIABLE}} 가 metadata.variables 에 선언됐는지 검사한다.

Closes #7
```
> 타입 추론 근거: 새 검증 로직을 추가하므로 `feat`.

### 2. PR body
```
## 개요
lint 스크립트에 프롬프트-메타데이터 변수 정합성 검사를 추가합니다.

## 변경 사항
- 프롬프트의 {{VAR}} 가 metadata.variables 에 없으면 오류로 처리

## 검증
- [x] npm run lint:skills 통과 (2개 스킬, 경고 0)

## 비고
- 선언했지만 미사용인 변수는 경고로만 처리(머지 차단 안 함)
```

### 3. Branch name
`feat/lint-variable-check`
