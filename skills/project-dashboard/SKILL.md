---
name: project-dashboard
description: Generate a single self-contained HTML status dashboard with weighted spec-based progress and per-member progress. Use for project status meetings, sprint reviews, or a visual handoff of where things stand.
argument-hint: [project-name]
---

You are a delivery lead producing a **single self-contained HTML dashboard** of where a project stands.
The dashboard answers two questions at a glance: **전체 프로젝트 진척률** (spec-based, weighted) and **팀원별 진척률**.
It complements `ai-handoff` (md = how to continue) — this skill is the **현황·회의용 시각화**.

## Two execution modes (decide first)
- **If you can write files (e.g. Claude Code):** write the dashboard to `project-dashboard.html` and report the path.
- **If you cannot write files (plain chat):** output the full HTML in one code block for the user to save as `.html`.

## Inputs
Fill these variables (copy-paste tools) or pass them as arguments (Claude Code):
- Project name: {{PROJECT_NAME}}
- Spec features (weighted): {{FEATURES}}
- Team members (optional; omit for a personal project): {{TEAM_MEMBERS}}
- Progress source (`manual` default, or `github-prs`): {{PROGRESS_SOURCE}}
- Milestone / target (optional): {{MILESTONE}}
- Risks & next focus (optional): {{STATUS_NOTES}}

If `{{PROJECT_NAME}}` or `{{FEATURES}}` is empty, do not guess — ask for them in one line and stop.

### Input formats
`{{FEATURES}}` — one feature per line: `name | weight | completion`
- `weight` = 중요도(정수, 클수록 비중↑). `completion` = `0–100` (%) **또는** `done`/`wip`/`todo` (→ 100/50/0).
```
예약 생성 API | 3 | 100
예약 조회/검색 | 2 | 60
알림 메일 | 1 | todo
```
`{{TEAM_MEMBERS}}` — one member per line: `name | role | assigned features (comma-sep, must match feature names)`
```
홍길동 | Backend | 예약 생성 API, 알림 메일
김영희 | Frontend | 예약 조회/검색
```

## Progress rules (the core — do not fake 100%)
- **Progress is spec-based, never task-based.** Base it ONLY on `{{FEATURES}}` from the design/spec, so an in-progress project never shows 100% just because the current chat's todo list is empty.
- **전체 진척률** = `Σ(weightᵢ × completionᵢ) / Σ(weightᵢ)`, rounded to an integer %.
- **팀원별 진척률** = same weighted formula over **that member's assigned features only**. A feature split across members counts for each owner.
- Unassigned features still count toward the **project** total but not toward any member.
- `{{PROGRESS_SOURCE}} = github-prs` (Claude Code only): read merged/open PRs (`gh pr list --state all --limit 50`), map PR titles/labels to feature names, and estimate `completion` (merged→100, open→50) instead of manual values. State the mapping you used. Otherwise use the manual `completion` values.

## HTML requirements
Build ONE valid HTML file from the skeleton in `reference/dashboard-template.html`:
- **Self-contained single file.** Inline all CSS. Numbers and **per-feature / per-member progress bars must be pure CSS** so they render **offline**.
- **Charts via Chart.js CDN** (`<script src="https://cdn.jsdelivr.net/npm/chart.js">`): an overall **donut** (전체 %) and, for teams, a small donut or bar per member. If the CDN fails to load, the CSS bars still show everything — never let a missing chart hide the data.
- Sections in order: ① 헤더(프로젝트명·{{MILESTONE}}·생성일시 KST·전체 % 도넛) → ② 기능별 진척(가중치·% 막대·상태색) → ③ 팀원별 진척(팀일 때만, 카드+막대) → ④ 리스크 & 다음 초점({{STATUS_NOTES}}).
- Color states: done ≥100 (green), wip (amber), todo/0 (gray). Use a `<meta charset="utf-8">` and Korean-friendly system font stack.
- Generated date = **KST** (Asia/Seoul). Mark any inferred value with a "(추정)" tag.

## Prohibitions
- ❌ Do not report a percentage not derived from `{{FEATURES}}` by the formula above.
- ❌ Do not require internet for the core numbers — charts may need it, data must not.
- ❌ Do not invent features, members, or completion values not in the inputs.

## ⚡ Claude Code only (optional)
- Pull live signals instead of typing them: ``!`gh pr list --state all --limit 50` `` for `github-prs` mode.
- Write the file directly to `project-dashboard.html` and open it to verify.

Other AI tools: ignore this block; output the HTML in a code block.

## References
- HTML skeleton: `reference/dashboard-template.html`
- Examples: `examples/basic.*` (personal, manual, weighted), `examples/edge.*` (team, github-prs source)
- Korean copy-paste version: `prompt.ko.md`
- Human-facing overview: `README.md`
- Pairs with: `ai-handoff` (continuation md)
