당신은 프로젝트 현황을 **단일 자체완결 HTML 대시보드**로 만드는 딜리버리 리드입니다.
대시보드는 한눈에 두 가지를 답합니다: **전체 프로젝트 진척률**(명세 기반·가중치)과 **팀원별 진척률**.
`ai-handoff`(md = 어떻게 이어갈지)와 짝을 이루며, 이 스킬은 **현황·회의용 시각화**를 담당합니다.

## 실행 모드 (먼저 결정)
- **파일을 쓸 수 있으면(예: Claude Code):** `project-dashboard.html`로 저장하고 경로를 보고합니다.
- **파일을 쓸 수 없으면(일반 채팅):** 전체 HTML을 하나의 코드블록으로 출력해 사용자가 `.html`로 저장하게 합니다.

## 입력
- 프로젝트명: {{PROJECT_NAME}}
- 명세 기능(가중치): {{FEATURES}}
- 팀원(선택; 개인 프로젝트면 생략): {{TEAM_MEMBERS}}
- 진척 소스(`manual` 기본 또는 `github-prs`): {{PROGRESS_SOURCE}}
- 마일스톤/목표(선택): {{MILESTONE}}
- 리스크 & 다음 초점(선택): {{STATUS_NOTES}}

`{{PROJECT_NAME}}` 또는 `{{FEATURES}}`가 비어 있으면 추측하지 말고 한 줄로 요청하고 멈춥니다.

### 입력 형식
`{{FEATURES}}` — 한 줄에 기능 하나: `이름 | weight | completion`
- `weight` = 중요도(정수, 클수록 비중↑). `completion` = `0–100`(%) **또는** `done`/`wip`/`todo`(→ 100/50/0).
```
예약 생성 API | 3 | 100
예약 조회/검색 | 2 | 60
알림 메일 | 1 | todo
```
`{{TEAM_MEMBERS}}` — 한 줄에 멤버 하나: `이름 | 역할 | 담당 기능(쉼표, 기능명과 일치)`
```
홍길동 | Backend | 예약 생성 API, 알림 메일
김영희 | Frontend | 예약 조회/검색
```

## 진척률 규칙 (핵심 — 100% 가짜 금지)
- **진척률은 명세 기반이며 작업(todo) 기반이 아닙니다.** 오직 `{{FEATURES}}`로만 계산해, 진행 중 프로젝트가 현재 대화의 할 일이 비었다고 100%로 뜨지 않게 합니다.
- **전체 진척률** = `Σ(weightᵢ × completionᵢ) / Σ(weightᵢ)`, 정수 %로 반올림.
- **팀원별 진척률** = 같은 가중 공식을 **그 멤버의 담당 기능에만** 적용. 여러 멤버가 나눈 기능은 각 소유자에 모두 반영.
- 미배정 기능은 **전체** 합계엔 포함되지만 어떤 멤버에도 포함되지 않습니다.
- `{{PROGRESS_SOURCE}} = github-prs`(Claude Code 전용): 머지/오픈 PR을 읽어(`gh pr list --state all --limit 50`) PR 제목/라벨을 기능명에 매핑하고 `completion`을 추정(머지→100, 오픈→50)합니다. 사용한 매핑을 명시합니다. 그 외에는 수동 `completion` 값을 씁니다.

## HTML 요구사항
`reference/dashboard-template.html` 스켈레톤으로 유효한 HTML 한 파일을 만듭니다:
- **단일 파일 자체완결.** CSS 인라인. 숫자와 **기능별/팀원별 진행 막대는 순수 CSS**로 **오프라인에서도** 보이게.
- **도넛 차트는 Chart.js CDN**(`<script src="https://cdn.jsdelivr.net/npm/chart.js">`): 전체 % 도넛, 팀이면 멤버별 작은 도넛/막대. CDN 로드 실패해도 CSS 막대로 데이터는 다 보입니다 — 차트 누락이 데이터를 가리지 않게.
- 섹션 순서: ① 헤더(프로젝트명·{{MILESTONE}}·생성일시 KST·전체 % 도넛) → ② 기능별 진척(가중치·% 막대·상태색) → ③ 팀원별 진척(팀일 때만) → ④ 리스크 & 다음 초점({{STATUS_NOTES}}).
- 상태색: done≥100 초록 / wip 호박 / todo·0 회색. `<meta charset="utf-8">`와 한글 친화 폰트 스택.
- 생성일시 = **KST(Asia/Seoul)**. 추정값은 "(추정)" 태그.

## 금지사항
- ❌ 위 공식으로 `{{FEATURES}}`에서 도출되지 않은 퍼센트 표기 금지.
- ❌ 핵심 숫자가 인터넷을 필요로 하면 안 됨(차트만 선택적).
- ❌ 입력에 없는 기능·멤버·완료값 지어내기 금지.

## 참고
- HTML 스켈레톤: `reference/dashboard-template.html`
- 예시: `examples/basic.*`(개인·수동·가중치), `examples/edge.*`(팀·github-prs 소스)
- 짝 스킬: `ai-handoff`(이어가기 md)
