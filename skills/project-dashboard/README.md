# 📊 Project Dashboard

> 명세 기반 **가중치 진척률**과 **팀원별 진척**을 단일 자체완결 **HTML 대시보드**로 생성하는 스킬. 회의·스프린트 리뷰·시각적 핸드오프용.

| | |
|---|---|
| **slug** | `project-dashboard` |
| **카테고리** | artifact |
| **유형** | 절차형(HTML 산출물 생성) |
| **위험도** | file-write (`project-dashboard.html` 생성) |
| **호출** | `/project-dashboard` (Claude Code) 또는 프롬프트 복붙 |

## ai-handoff 와의 관계
- [`ai-handoff`](../ai-handoff/) = **md, "어떻게 이어갈지"** (다음 세션/AI가 즉시 작업 재개).
- `project-dashboard` = **HTML, "지금 어디까지 왔는지"** (회의·보고용 시각화).
- 둘을 같이 쓰면: 핸드오프 문서 + 진척 대시보드 한 쌍.

## 핵심: 진척률은 명세 기반 (가짜 100% 방지)
단순 "할 일 목록" 기준이 아니라 **명세 기능 + 가중치**로 계산합니다. 그래서 핸드오프 시점에 현재 대화의 todo가 비었다고 100%로 뜨지 않습니다.
- 전체 = `Σ(weight×completion) / Σ(weight)`
- 팀원별 = 같은 공식을 담당 기능에만 적용

## 입력 변수
| 변수 | 필수 | 설명 |
|------|------|------|
| `{{PROJECT_NAME}}` | ✅ | 프로젝트 이름 |
| `{{FEATURES}}` | ✅ | `이름 \| weight \| completion(0-100 또는 done/wip/todo)` |
| `{{TEAM_MEMBERS}}` | ⬜ | `이름 \| 역할 \| 담당 기능`. 비면 개인 모드(팀 섹션 생략) |
| `{{PROGRESS_SOURCE}}` | ⬜ | `manual`(기본) 또는 `github-prs`(PR 읽어 추정, Claude 전용) |
| `{{MILESTONE}}` | ⬜ | 마일스톤/목표 일정 |
| `{{STATUS_NOTES}}` | ⬜ | 리스크 & 다음 초점 |

## 산출물
- **단일 `.html` 파일**: CSS 인라인, 진행 막대/숫자는 오프라인에서도 표시. 도넛 차트는 Chart.js(CDN) — 없어도 데이터는 다 보임.
- 섹션: 헤더(전체 % 도넛) → 기능별 진척 → 팀원별 진척(팀일 때) → 리스크 & 다음 초점.

## 사용법
- **Claude Code**: `/project-dashboard 회의실 예약 웹앱` — `github-prs` 모드면 `` !`gh pr list --state all --limit 50` `` 로 PR에서 진척 추정.
- **그 외 생성형 AI**: [`prompt.ko.md`](prompt.ko.md) 또는 [`SKILL.md`](SKILL.md) 복사 후 변수 채우기. HTML이 코드블록으로 출력됨 → `.html`로 저장.

## 안티패턴 / 검증 포인트
- ❌ 공식과 무관한 퍼센트 표기 → 항상 `{{FEATURES}}`에서 도출
- ❌ 핵심 숫자가 인터넷 의존 → CSS 막대 폴백 필수
- ❌ 입력에 없는 기능·멤버 지어내기 → "(추정)" 태그만 허용
- ✅ 개인 프로젝트면 팀 섹션이 빠졌는가 / KST 생성일시인가

## 예시 · 참고
- [`examples/basic.*`](examples/) (개인·수동·가중치, 전체 60% 계산)
- [`examples/edge.*`](examples/) (팀·github-prs, PR→기능 매핑 + 팀원 카드)
- [`reference/dashboard-template.html`](reference/dashboard-template.html) HTML 스켈레톤
