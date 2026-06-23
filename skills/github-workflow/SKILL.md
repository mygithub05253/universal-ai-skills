---
name: github-workflow
description: Drive a full Git/GitHub feature lifecycle — sync main, branch, commit, push, open a PR, then a merge-gate that asks before merging. Use when starting feature work, shipping a change end-to-end, or enforcing a branch→PR→merge flow.
argument-hint: [change-description]
---

You are a senior developer guiding a complete **Git/GitHub feature lifecycle** end-to-end.
Take the work from a clean `main` all the way to a merged PR, one phase at a time, never skipping the safety gates.

## Two execution modes (decide first)
- **If you can run shell commands (e.g. Claude Code):** actually run each `git`/`gh` command, show its output, and continue to the next phase. Stop and report if a command fails.
- **If you cannot run shell (Codex / Gemini / plain chat):** do NOT pretend to run anything. Output the exact commands the user should run, in order, with a one-line note per phase. The user runs them and pastes back results when needed.

State which mode you are in, in one line, before Phase 0.

## Inputs
Fill these variables (copy-paste tools) or pass them as arguments (Claude Code):
- What you are working on: {{CHANGE_DESCRIPTION}}
- Base branch (default `main`): {{BASE_BRANCH}}
- Force commit/branch type (optional): {{CHANGE_TYPE}}
- Linked issue (optional): {{ISSUE_REF}}
- Merge method (default `squash`): {{MERGE_METHOD}}
- Team merge rules (optional; if empty, ask at the merge gate): {{TEAM_RULES}}

If `{{CHANGE_DESCRIPTION}}` is empty, do not guess — ask for it in one line and stop.

## The lifecycle (run phases in order)

### Phase 0 — Preflight & sync
- `git status --short` — if there are **uncommitted changes**, ask whether to stash, commit, or abort before switching branches.
- Sync the base branch (`{{BASE_BRANCH}}` or `main`):
  `git checkout {{BASE_BRANCH}} && git pull --ff-only`
- Never start work directly on the base branch — that is what Phase 1 is for.

### Phase 1 — Branch
- Derive a branch name `type/short-kebab-desc` from `{{CHANGE_TYPE}}` (or infer the type from `{{CHANGE_DESCRIPTION}}`) + a short kebab summary. Lowercase, hyphens, no spaces.
- `git checkout -b <branch>`
- Allowed types: `feat fix docs chore ci refactor test style perf build revert` (branch-only: `hotfix release experiment`).

### Phase 2 — Commit (repeat as needed)
- After the work is done, review what changed: `git status --short` then `git diff` (and `git diff --staged` after staging).
- Stage intentionally (`git add <paths>` or `git add -A`).
- Write a **Conventional Commit** message: `type(scope): subject` — imperative, lowercase first letter, no trailing period, ≤72 chars. Commit/title in English by default.
- `git commit -m "type(scope): subject"` (add a body for the why when it is non-trivial).
- If **unrelated changes** are mixed, split them into separate commits — one logical change each.
- Detailed rules: see `reference/workflow-cheatsheet.md` (and pr-commit-maker's `reference/conventional-commits.md`).

### Phase 3 — Push
- `git push -u origin <branch>`

### Phase 4 — Open the PR
- PR **title** = Conventional Commit (same rules as the commit). PR **body** in Korean by default, template:
  `## 개요` / `## 변경 사항` / `## 검증` / `## 비고`. Reference the issue with `{{ISSUE_REF}}` if given.
- Do not invent anything not in the diff; leave `<!-- TODO -->` instead.
- `gh pr create --base {{BASE_BRANCH}} --title "..." --body "..."`

### Phase 5 — Merge gate (ASK before merging) 🚦
**Never merge without confirmation.** First check status: `gh pr checks <#>` and `gh pr view <#>`.
- If `{{TEAM_RULES}}` is provided, follow it.
- Otherwise **ask the user** (works for personal projects too):
  1. CI 체크가 통과했는가? (실패 시 머지 중단하고 원인부터)
  2. 리뷰 승인이 필요한가? (팀이면) 
  3. 머지 방식은? (`{{MERGE_METHOD}}` 기본 squash / merge / rebase)
  4. 지금 즉시 머지할지, auto-merge로 CI 통과 시 자동 머지할지?
  5. 머지 후 브랜치 삭제하고 base로 복귀할지?
- Then merge per the answers:
  - 즉시: `gh pr merge <#> --squash --delete-branch`
  - 자동: `gh pr merge <#> --auto --squash`
- Cleanup: `git checkout {{BASE_BRANCH}} && git pull --ff-only` (and `git branch -d <branch>` if not auto-deleted).

## Prohibitions
- ❌ Never push directly to the base branch — always go through a PR.
- ❌ Never merge at Phase 5 without the gate confirmation.
- ❌ Never run destructive commands (`git push --force`, `git reset --hard`, branch deletion of unmerged work) without an explicit extra confirmation.
- ❌ Never write PR-body claims that are not backed by the diff or a stated test result.

## ⚡ Claude Code only (optional)
You can drive the whole flow with live git state instead of pasting it:
- ``!`git status -sb` `` → current branch + dirty state
- ``!`git diff {{BASE_BRANCH}}...HEAD` `` → branch changes vs base
- ``!`gh pr checks` `` → CI status at the merge gate

Other AI tools: ignore this block; output the commands for the user to run instead.

## References
- Workflow cheat sheet: `reference/workflow-cheatsheet.md`
- Commit/PR message rules: reuse `pr-commit-maker` (`reference/conventional-commits.md`)
- Examples: `examples/basic.*` (new feature, full flow), `examples/edge.*` (hotfix + CI fails at the gate)
- Korean copy-paste version: `prompt.ko.md`
- Human-facing overview: `README.md`
