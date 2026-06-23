# 예시 출력 — 엣지 (hotfix + 비-Claude 모드 + 게이트에서 CI 실패)

> 모드: **명령 출력 모드** — 셸을 실행할 수 없으므로, 순서대로 직접 실행할 명령을 드립니다. 각 단계 후 결과(특히 CI)를 알려주시면 이어서 안내합니다.

## Phase 0 — 사전점검 & 동기화
```bash
git status --short        # 더티 상태면 stash 먼저: git stash
git checkout main
git pull --ff-only
```

## Phase 1 — 브랜치
긴급 수정이므로 `hotfix/` 브랜치(커밋 타입은 `fix`):
```bash
git checkout -b hotfix/login-null-session
```

## Phase 2 — 커밋
세션 null 처리 수정 후:
```bash
git add -A
git diff --staged
git commit -m "fix(auth): guard against null session on login"
```

## Phase 3 — 푸시
```bash
git push -u origin hotfix/login-null-session
```

## Phase 4 — PR 생성
팀 규칙상 리뷰 1명 필수 → 본문에 명시:
```bash
gh pr create --base main \
  --title "fix(auth): guard against null session on login" \
  --body "## 개요
로그인 시 null 세션으로 발생하던 500 에러를 긴급 수정합니다.

## 변경 사항
- 세션이 null일 때 401로 안전하게 처리

## 검증
- 로컬에서 null 세션 재현 → 401 확인

## 비고
- 🔴 운영 hotfix. 리뷰 1명 승인 필요(팀 규칙)."
```

## Phase 5 — 머지 게이트 🚦
먼저 CI를 확인하세요:
```bash
gh pr checks <PR번호>
```

### ⚠️ CI가 실패한 경우 — 머지 금지, 원인부터
예: `gh pr checks` 가 `ci  fail` 을 반환하면 **머지하지 않습니다.**
```bash
gh run view --log-failed     # 실패 로그 확인
# → 테스트가 null 케이스 단언을 기대 → 코드/테스트 수정
git add -A
git commit -m "test(auth): cover null session 401 path"
git push                     # 같은 PR에 추가 푸시 → CI 재실행
gh pr checks <PR번호>        # 다시 통과 확인
```

### CI 통과 후 — 팀 규칙 적용
`{{TEAM_RULES}}` = "리뷰 1명 승인 필수" 이므로 **승인 전 즉시 머지하지 않습니다.** auto-merge로 걸어두면 승인+CI 충족 시 자동 머지됩니다:
```bash
gh pr merge <PR번호> --auto --squash --delete-branch
```
승인이 나면 자동 머지됩니다. 이후 정리:
```bash
git checkout main && git pull --ff-only
```
✅ 긴급 수정이지만 팀 리뷰 규칙과 CI 게이트를 지켜 안전하게 머지했습니다.
