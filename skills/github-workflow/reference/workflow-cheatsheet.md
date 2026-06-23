# Git/GitHub 워크플로 — 참고 치트시트

> SKILL.md 를 얇게 유지하기 위해 단계별 명령·판단 기준을 여기로 분리합니다 (Progressive Disclosure).
> 커밋 메시지 형식 자체는 `pr-commit-maker/reference/conventional-commits.md` 를 그대로 따릅니다.

## 한눈에 보는 흐름
```
main 최신화 → 브랜치 생성 → 작업 → 커밋(반복) → 푸시 → PR → 🚦머지 게이트 → 머지 → 정리
   P0           P1         P2      P2        P3     P4      P5          P5      P5
```

## 단계별 명령

### P0 · 사전점검 & 동기화
```bash
git status --short            # 더티 상태 확인 (있으면 stash/commit 먼저)
git worktree list            # main 이 다른 워크트리에 점유됐는지 확인
# 일반 케이스:
git checkout main
git pull --ff-only            # fast-forward 만 허용 (히스토리 꼬임 방지)
# 워크트리 케이스 (main 이 다른 워크트리에 있음):
git fetch origin main        # 원격추적 ref(origin/main)만 갱신 → P1 에서 origin/main 분기
```
> ⚠️ 워크트리 환경에서 `git checkout main` 은 `fatal: 'main' is already used by worktree …` 로 실패한다.
> 또한 `git fetch origin main:main` 도 main 이 다른 워크트리에 체크아웃돼 있으면
> `refusing to fetch into branch … checked out at …` 로 거부된다.
> → 콜론 없는 `git fetch origin main` 으로 `origin/main` 만 갱신하고, P1 에서 `origin/main` 에서 분기한다.

### P1 · 브랜치
```bash
# 일반 케이스:
git checkout -b feat/reservation-create-api
# 워크트리 케이스 (최신 origin/main 에서 직접 분기):
git checkout -b feat/reservation-create-api origin/main
# 새 워크트리를 통째로 만들 때:
git worktree add ../wt-feat -b feat/reservation-create-api origin/main
```
- 형식: `type/short-kebab-desc` (소문자, 하이픈).
- 타입: `feat fix docs chore ci refactor test style perf build revert` + 브랜치 전용 `hotfix release experiment`.
- 긴급 수정은 `hotfix/...`, 단 커밋/PR 타입은 보통 `fix`.

### P2 · 커밋
```bash
git status --short
git diff                      # 무엇이 바뀌었나
git add -A                    # 또는 git add <경로> 로 의도적으로
git check-ignore -v <path>    # .gitignore 가드: 의도한 파일이 무시되는지 확인
git status --ignored --short  # (또는) 무시되는 파일 전체 목록
git diff --staged             # 스테이징된 것 재확인
git commit -m "feat(api): add reservation create endpoint"
```
- 무관한 변경이 섞이면 **커밋 분리** (`git add -p` 로 부분 스테이징).
- 메시지 규칙: imperative, 소문자 시작, 마침표 없음, 72자 이내.
- **`.gitignore` 가드**: 커밋 직전 `git check-ignore` 로 의도한 파일이 조용히 무시되는지 확인.
  무시되고 있으면 `.gitignore` 수정 또는 `git add -f` 로 명시적 포함 (빈/부분 커밋 방지).

### P3 · 푸시
```bash
git push -u origin feat/reservation-create-api
```

### P4 · PR
```bash
gh pr create --base main \
  --title "feat(api): add reservation create endpoint" \
  --body "## 개요 ...## 변경 사항 ...## 검증 ...## 비고 ..."
```
- 제목 = Conventional Commit. 본문 = 한국어 4단 템플릿.

### P5 · 머지 게이트 🚦
```bash
gh pr checks <#>              # CI 통과 확인 (먼저!)
gh pr view <#>               # 리뷰/충돌 상태
# 확인 후:
gh pr merge <#> --squash --delete-branch   # 즉시 머지
gh pr merge <#> --auto --squash            # CI 통과 시 자동 머지
# 정리 (일반 케이스):
git checkout main && git pull --ff-only
# 정리 (워크트리 케이스): checkout 금지, 원격추적 ref 만 최신화
git fetch origin main        # 콜론 없는 형태 (origin/main 만 갱신)
```
> ⚠️ **CI 체크 0개일 때 `--auto`**: 기다릴 체크가 없으므로 auto-merge 활성화 즉시 머지된다 (`--auto` ≈ 즉시).
> 체크가 1개 이상일 때만 `--auto` 가 실제로 "대기" 한다. 0개면 사용자에게 즉시/auto 를 명시적으로 안내.

## 머지 게이트 판단 기준
| 상황 | 행동 |
|------|------|
| CI 실패 | **머지 중단.** 원인 조사 후 수정 커밋 → 푸시 → 재확인 |
| 충돌(behind base) | `git checkout <branch> && git merge main` (또는 rebase) → 해결 → 푸시 |
| 리뷰 필수(팀) | 승인 전 머지 금지. auto-merge 로 걸어두기 |
| CI 체크 0개 | `--auto` 는 즉시 머지로 귀결 → 즉시/auto 를 명시적으로 선택 |
| 워크트리에서 작업 | `git checkout main` 금지. P1 은 `origin/main` 에서 분기, 정리는 `git fetch origin main`(콜론 없는 형태) |
| 개인 프로젝트 | 게이트 질문에 답하고 즉시/auto 선택 |

## 안전 규칙
- 베이스 브랜치 직접 push 금지 — 항상 PR 경유.
- `git push --force` 는 `--force-with-lease` 로, 그리고 추가 확인 후에만.
- 미머지 브랜치 삭제(`git branch -D`)는 작업 유실 위험 → 확인 후.
