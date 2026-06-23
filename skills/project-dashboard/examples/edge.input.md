# 예시 입력 — 엣지 (팀 프로젝트, github-prs 소스)

3인 팀. 진척을 수동 입력 대신 **GitHub PR에서 추정**한다 (Claude Code).

- `{{PROJECT_NAME}}`: 사내 일정 공유 서비스
- `{{FEATURES}}` (가중치만 제공, completion은 PR에서 추정):
  ```
  로그인/인증 | 2 | (PR)
  예약 생성 | 3 | (PR)
  알림 | 1 | (PR)
  ```
- `{{TEAM_MEMBERS}}`:
  ```
  홍길동 | Backend | 예약 생성, 알림
  김영희 | Frontend | 로그인/인증
  ```
- `{{PROGRESS_SOURCE}}`: github-prs
- `{{MILESTONE}}`: 스프린트 3 (~06/30)
- `{{STATUS_NOTES}}`: 알림은 PR 리뷰 중. 머지되면 90%+ 도달.

PR 상태(`gh pr list --state all`): 로그인 #1 merged, 예약 생성 #2 merged, 알림 #5 open.
추정 규칙: merged→100, open→50(추정).
