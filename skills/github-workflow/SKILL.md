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
- **Detect worktree first:** `git rev-parse --is-inside-work-tree` and check `git worktree list`. If the base branch is checked out in **another** worktree, `git checkout {{BASE_BRANCH}}` fails with `fatal: '{{BASE_BRANCH}}' is already used by worktree …`.
  - **Worktree case:** do NOT switch the current worktree to base, and do NOT `git fetch origin {{BASE_BRANCH}}:{{BASE_BRANCH}}` — fetching into a local branch ref that is checked out elsewhere is refused (`refusing to fetch into branch … checked out at …`). Instead update only the remote-tracking ref: `git fetch origin {{BASE_BRANCH}}`, then branch from `origin/{{BASE_BRANCH}}` in Phase 1.
  - **Normal case:** `git checkout {{BASE_BRANCH}} && git pull --ff-only`
- Never start work directly on the base branch — that is what Phase 1 is for.

### Phase 1 — Branch
- Derive a branch name `type/short-kebab-desc` from `{{CHANGE_TYPE}}` (or infer the type from `{{CHANGE_DESCRIPTION}}`) + a short kebab summary. Lowercase, hyphens, no spaces.
- **Normal case:** `git checkout -b <branch>` (off the freshly-pulled base).
- **Worktree case:** branch directly off the updated remote-tracking ref so you never need base checked out locally: `git checkout -b <branch> origin/{{BASE_BRANCH}}`. (Standalone new worktree: `git worktree add <path> -b <branch> origin/{{BASE_BRANCH}}`.)
- Allowed types: `feat fix docs chore ci refactor test style perf build revert` (branch-only: `hotfix release experiment`).

### Phase 2 — Commit (repeat as needed)
- After the work is done, review what changed: `git status --short` then `git diff` (and `git diff --staged` after staging).
- Stage intentionally (`git add <paths>` or `git add -A`).
- **`.gitignore` guard:** before committing, confirm no intended file is being silently ignored. Run `git check-ignore -v <path>` on the files you expect to commit (or `git status --ignored --short` to see what is excluded). If a file you meant to include is ignored, fix `.gitignore` or `git add -f` deliberately — never let a silently-ignored path turn into an empty/partial commit.
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
- **CI check count matters for `--auto`:** if `gh pr checks <#>` reports **0 checks** (no CI configured), `--auto` has nothing to wait on and resolves to an **immediate merge** the moment auto-merge is enabled. So with 0 checks, `--auto` ≈ immediate — say so explicitly and let the user pick immediate vs auto knowingly. `--auto` only meaningfully "waits" when ≥1 check exists.
- Then merge per the answers:
  - 즉시: `gh pr merge <#> --squash --delete-branch`
  - 자동: `gh pr merge <#> --auto --squash`
- Cleanup:
  - **Normal case:** `git checkout {{BASE_BRANCH}} && git pull --ff-only` (and `git branch -d <branch>` if not auto-deleted).
  - **Worktree case:** if base is checked out in another worktree, do NOT `git checkout {{BASE_BRANCH}}` here — it errors with `already used by worktree`. Instead refresh the remote-tracking ref only (`git fetch origin {{BASE_BRANCH}}`) and stay on the current HEAD; let the other worktree own base. (When you next start work, branch from `origin/{{BASE_BRANCH}}` per Phase 1.)

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
