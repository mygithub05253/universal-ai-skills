# 예시 출력 (edge — 커밋 분리 제안)

⚠️ 서로 무관한 변경 3건이 섞여 있어 **3개 커밋으로 분리**를 제안합니다.

### 1. Commit messages (분리)
```
feat(ai-handoff): enforce all four output sections

Copy-ready Prompt 섹션 누락을 막기 위해 4개 섹션을 항상 포함하도록 명시한다.
```
```
docs(readme): update skill count to 3
```
```
refactor(lint): warn instead of error on unused variables
```
> 분리 근거: (1) 프롬프트 동작 변경=feat, (2) README 숫자 갱신=docs, (3) 동작 변화 없는 정리=refactor. 세 관심사가 독립적이라 리뷰·되돌리기 용이성을 위해 나눕니다.

### 2. PR body (세 변경을 함께 올릴 경우)
```
## 개요
서로 무관한 소규모 변경 3건을 분리 커밋으로 정리합니다.

## 변경 사항
- ai-handoff: 출력 4개 섹션 강제
- README: 스킬 개수 3으로 갱신
- lint: 미사용 변수는 경고로 강등

## 검증
- [ ] 테스트 없음 → 로컬에서 npm run lint:skills 수동 확인 필요

## 비고
- 커밋이 관심사별로 분리되어 있어 개별 revert 가능
```

### 3. Branch name
`chore/misc-cleanups`
