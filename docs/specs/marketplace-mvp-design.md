# Universal AI Skills Toolkit Marketplace MVP Design

Date: 2026-06-24  
Status: Draft for review

## Product Positioning

Universal AI Skills Toolkit is an open-source Skill and Governance Marketplace for developers who use more than one AI coding tool. Users browse reusable skill packs and policy packs on the web, add them to a stack, preview the generated files, and install the result into a project with a single CLI command.

Short positioning:

> One stack of skills and rules. Every AI on the same page.

## Design Principles

1. **Website first, CLI second**  
   Discovery happens on the website. Installation happens through generated CLI commands.

2. **Policy is different from skill**  
   A skill helps an agent do a task. A policy defines rules the agent must not violate.

3. **Single source, many adapters**  
   Canonical registry data generates tool-specific files for Claude, Codex, Gemini, Cursor, and GitHub.

4. **Standalone by default**  
   A user can install one skill without adopting the whole toolkit.

5. **Safe merge, no silent overwrite**  
   Existing project files must be previewed, merged, or skipped intentionally.

## Primary MVP Flow

1. User lands on the marketplace.
2. User filters by tool, category, pack type, and risk.
3. User adds skill packs and policy packs to "My Stack."
4. Stack panel shows compatibility, conflicts, and generated targets.
5. User opens the install drawer.
6. User chooses a target: all tools, Claude, Codex, Gemini, Cursor, or GitHub only.
7. Website generates an `npx universal-ai-skills ...` command.
8. User previews generated files.
9. User runs the command in the project root.
10. CLI writes files and records the install in `.uas/config.json`.
11. User runs `npx universal-ai-skills doctor`.

## MVP Pages

| Route | Purpose |
| --- | --- |
| `/` | Search, browse, and stack builder in one app-like screen |
| `/skills` | Skill pack catalog |
| `/skills/[slug]` | Skill detail, files, examples, compatibility, install command |
| `/policies` | Policy pack catalog |
| `/policies/[slug]` | Policy detail, enforced files, conflicts, generated outputs |
| `/stack` | Shareable stack preview and install command |
| `/docs` | CLI, registry, adapter, and contribution docs |
| `/submit` | Contribution guide, not a live submission system in MVP |

## First Viewport

The first viewport should behave like a usable tool, not a marketing page.

Layout:

- Left/top: concise product identity and search.
- Main: card grid for skills and policies.
- Right: sticky "My Stack" panel.
- Bottom drawer: install command and generated file preview.

Hero-scale copy should be minimal:

> Build your AI agent rulebook in 60 seconds.

Supporting copy:

> Pick skills, add governance policies, and generate the files Claude, Codex, Gemini, Cursor, and GitHub expect.

## Card Model

### Skill Pack Card

| Field | Example |
| --- | --- |
| name | `pr-commit-maker` |
| title | PR & Commit Message Maker |
| summary | Generate Conventional Commit titles, PR body, and branch names from a diff |
| category | GitHub workflow |
| tags | git, pull-request, conventional-commits |
| compatibility | Claude, Codex, Gemini, Cursor |
| risk | read-only, file-write, network |
| standalone | true |
| trust signals | examples, last updated, tests, source |

### Policy Pack Card

| Field | Example |
| --- | --- |
| name | `github-collaboration` |
| title | GitHub Collaboration Policy |
| summary | Keep branch, commit, PR, and review rules consistent across AI tools |
| scope | project |
| severity | must |
| generated files | `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.github/workflows/*` |
| conflicts | other git convention policies |
| standalone | false |

## Stack Builder

The stack builder is a persistent side panel on desktop and a bottom sheet on mobile.

It must show:

- Selected items.
- Combined compatibility by target.
- Generated file count.
- Conflicts.
- Install CTA.
- Shareable stack URL.

Conflict examples:

- Two policies define different branch prefixes.
- One policy requires squash merge while another requires merge commits.
- One skill depends on a missing policy pack.

## CLI Design

Package:

```bash
npx universal-ai-skills <command>
```

Short alias after global install:

```bash
uas <command>
```

Core MVP commands:

```bash
npx universal-ai-skills init
npx universal-ai-skills list --type skill
npx universal-ai-skills list --type policy
npx universal-ai-skills info github-workflow
npx universal-ai-skills add github-workflow pr-commit-maker
npx universal-ai-skills apply-policy github-collaboration
npx universal-ai-skills add --stack "https://universal-ai-skills.dev/stack?s=github-workflow,github-collaboration"
npx universal-ai-skills doctor
```

Shared flags:

```bash
--target all|claude|codex|gemini|cursor|github
--dry-run
--yes
--force
--registry <url>
```

## Repository Direction

Current repository can evolve gradually. A full monorepo is not required immediately, but the target structure should be:

```txt
universal-ai-skills/
├── skills/
├── policies/
├── registry/
│   ├── registry.json
│   ├── skills.json
│   └── policies.json
├── docs/
│   ├── research/
│   ├── specs/
│   └── prototypes/
├── bin/
│   └── uas.mjs
├── scripts/
│   ├── lint-skills.mjs
│   ├── lint-policies.mjs
│   └── build-registry.mjs
└── website/
```

Do not migrate to a multi-package monorepo until the registry and policy pack model is proven.

## Canonical Policy Model

Policy packs should have a single source of truth:

```yaml
name: github-collaboration
version: 0.1.0
summary: Keep AI agents aligned with GitHub collaboration rules.
targets:
  agents_md: true
  claude_md: true
  gemini_md: true
  github_workflows: true
  cursor_rules: false
git:
  protected_branches: [main, dev]
  branch_pattern: "^(feat|fix|docs|chore|ci|refactor|test|style|perf|build|revert|hotfix|release|experiment)/[a-z0-9._-]+$"
  commit_convention: conventional-commits
  pr_title_convention: conventional-commits
  direct_push_forbidden: [main, dev]
  require_pr: true
  merge_policy: human-approved
instructions:
  default_language: ko
  commit_title_language: en
  pr_body_language: ko
```

Generated files:

```txt
AGENTS.md
CLAUDE.md
GEMINI.md
.codex/skills/<skill>/SKILL.md
.claude/skills/<skill>/SKILL.md
.github/PULL_REQUEST_TEMPLATE.md
.github/workflows/pr-conventions.yml
```

## Registry Item Model

```json
{
  "name": "github-workflow",
  "type": "skill",
  "title": "GitHub Workflow",
  "description": "Run a safe branch, commit, push, PR, and merge-gate flow.",
  "version": "1.0.0",
  "category": "collaboration",
  "tags": ["git", "github", "pull-request"],
  "compatibility": {
    "claude": "native",
    "codex": "native",
    "gemini": "copy",
    "cursor": "instructions"
  },
  "risk": "network",
  "standalone": true,
  "files": [
    {
      "source": "skills/github-workflow/SKILL.md",
      "targets": [".claude/skills/github-workflow/SKILL.md", ".codex/skills/github-workflow/SKILL.md"],
      "merge": "overwrite"
    }
  ]
}
```

## MVP Seed Packs

Skills:

- `ai-handoff`
- `readme-architect`
- `pr-commit-maker`
- `github-workflow`
- `project-dashboard`

Policies:

- `github-collaboration`
- `agent-instructions-basic`

Collections:

- Student Hackathon Starter
- Solo Web App Starter
- Open Source Maintainer Starter
- AI Engineering Project Starter

## Non-Goals

- No login or saved user dashboard in MVP.
- No paid marketplace.
- No automated PR merge.
- No third-party MCP hosting.
- No model benchmark or ranking system.
- No live community submission UI before contribution guidelines and validation exist.

## Four-Week Build Plan

| Week | Goal | Output |
| --- | --- | --- |
| 1 | Registry and policy model | Schema, seed registry, `github-collaboration` draft |
| 2 | CLI MVP | `init`, `list`, `add`, `apply-policy`, `doctor --dry-run` |
| 3 | Website MVP | Catalog, filters, stack panel, install drawer, file preview |
| 4 | Launch polish | Docs, examples, seed collections, validation, npm dry-run |

## Open Decisions

1. Should `AGENTS.md` be the canonical generated file, or should it be generated from `policy.yml` only?
2. Should `.uas/config.json` be committed to git by default?
3. Should the website registry read directly from this repo, or from a built JSON artifact?
4. Should first MVP support Cursor `.mdc`, or show it as "planned"?
5. Should policy packs merge into existing files automatically, or require manual preview first?

## Recommended Decision Defaults

- Use `policy.yml` as the canonical source once policy packs exist.
- Commit `.uas/config.json` so teams share installed state.
- Build static registry JSON from the repo for the website.
- Mark Cursor as preview support in v1.
- Require preview or `--yes` before overwriting any existing instruction file.
