# 예시 출력 — 기본 (새 기능, 전체 흐름)

> 모드: **Claude Code (실행 모드)** — 각 명령을 실제로 실행하고 출력을 확인하며 진행합니다.

## Phase 0 — 사전점검 & 동기화
```bash
$ git status --short
（출력 없음 → 워킹 트리 깨끗）
$ git checkout main && git pull --ff-only
Already up to date.
```
✅ main 최신화 완료.

## Phase 1 — 브랜치
타입 `feat` + 작업 요약으로 브랜치명 생성:
```bash
$ git checkout -b feat/reservation-create-api
Switched to a new branch 'feat/reservation-create-api'
```

## Phase 2 — 커밋
작업 완료 후 변경을 확인하고 스테이징:
```bash
$ git status --short
A  src/routes/reservations.ts
M  src/routes/index.ts
$ git diff --staged   # 변경 검토 (예약 생성 핸들러 + 라우터 등록)
```
Conventional Commit 메시지로 커밋:
```bash
$ git commit -m "feat(api): add reservation create endpoint"
[feat/reservation-create-api 9a1c2b3] feat(api): add reservation create endpoint
```

## Phase 3 — 푸시
```bash
$ git push -u origin feat/reservation-create-api
branch 'feat/reservation-create-api' set up to track 'origin/feat/reservation-create-api'.
```

## Phase 4 — PR 생성
- 제목: `feat(api): add reservation create endpoint`
- 본문(한국어 4단), 이슈 #12 연결:
```bash
$ gh pr create --base main \
  --title "feat(api): add reservation create endpoint" \
  --body "## 개요
회의실 예약 생성 API(POST /reservations)를 추가합니다. Closes #12

## 변경 사항
- POST /reservations 핸들러 추가
- 라우터에 예약 엔드포인트 등록

## 검증
- 로컬 수동 테스트로 201 응답 확인
- <!-- TODO: 통합 테스트 추가 -->

## 비고
- 중복 예약 검증은 후속 PR에서 처리"
https://github.com/you/meeting-app/pull/34
```

## Phase 5 — 머지 게이트 🚦
먼저 상태 확인:
```bash
$ gh pr checks 34
ci    pass    18s
```
`{{TEAM_RULES}}`가 비어 있으므로 **사용자에게 질문합니다**:

> 머지 게이트 — 확인해 주세요:
> 1. CI ✅ 통과했습니다.
> 2. 리뷰 승인이 필요한가요? (개인 프로젝트면 생략)
> 3. 머지 방식: squash(기본) / merge / rebase?
> 4. 지금 즉시 머지할까요, 아니면 auto-merge로 걸어둘까요?
> 5. 머지 후 브랜치 삭제하고 main으로 복귀할까요?

— 사용자: "개인 프로젝트, squash, 즉시 머지, 브랜치 삭제."

```bash
$ gh pr merge 34 --squash --delete-branch
✓ Merged pull request #34
$ git checkout main && git pull --ff-only
Updating to squashed commit...
```
✅ 완료 — 기능이 main에 머지됐고 브랜치를 정리했습니다.
