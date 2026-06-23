# 예시 입력 — 기본 (개인 프로젝트, 수동 입력, 가중치)

혼자 만드는 회의실 예약 웹앱. ai-handoff 직전에 현황 대시보드를 뽑는다.

- `{{PROJECT_NAME}}`: 회의실 예약 웹앱
- `{{FEATURES}}`:
  ```
  예약 생성 API | 3 | 100
  예약 조회/검색 | 2 | 60
  캘린더 연동 | 2 | 30
  알림 메일 | 1 | todo
  ```
- `{{TEAM_MEMBERS}}`: (비움 → 개인 프로젝트, 팀 섹션 생략)
- `{{PROGRESS_SOURCE}}`: (비움 → manual)
- `{{MILESTONE}}`: MVP 2주 내 배포 (~07/07)
- `{{STATUS_NOTES}}`: 알림 메일 SMTP 설정 미해결. 다음: 캘린더 연동 마무리 → 알림.

계산: Σweight = 8, Σ(weight×completion) = 3·100 + 2·60 + 2·30 + 1·0 = 480 → **전체 60%**.
