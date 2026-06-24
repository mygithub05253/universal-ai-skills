# Universal AI Skills Toolkit Market Research Summary

Date: 2026-06-24  
Source: Perplexity research sessions provided by the project owner

## Executive Summary

Universal AI Skills Toolkit should position itself as an open-source **Skill and Governance Marketplace** for teams and solo builders who use multiple AI development tools. The market already contains useful fragments: AI Templates offers an installable Claude Code catalog, SkillsMP offers large-scale SKILL.md discovery, MCP directories offer tool connectivity, and official Claude/Codex/Gemini ecosystems define their own instruction and skill formats.

The gap is not "another skill list." The strongest opportunity is a tool-neutral layer that lets users browse skill packs and policy packs on the web, assemble a stack, and generate the files each AI tool expects: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.codex/skills`, `.claude/skills`, `.cursor/rules`, and GitHub workflow files.

## Market Pattern

| Segment | What Exists | Strength | Gap |
| --- | --- | --- | --- |
| Claude-focused installers | AI Templates, Claude Code Templates | Strong install UX and bundled components | Claude-centric; weak cross-agent policy story |
| Skill discovery marketplaces | SkillsMP and similar SKILL.md indexes | Broad discovery and category browsing | Quality, compatibility, install, and governance signals are inconsistent |
| MCP directories | MCP server directories and awesome lists | Strong tool connectivity | Permissions, security, client compatibility, and install paths vary widely |
| Official agent ecosystems | Claude Skills, Codex Skills, AGENTS.md, Gemini instructions | Real tool-native formats | Users must learn and maintain each format separately |
| Developer registries | shadcn/ui registry, npm, awesome lists | Proven registry and install patterns | Not designed for AI instruction files, agent policies, or workflow governance |

## Differentiation

Universal AI Skills Toolkit should combine three ideas:

1. **Universal registry**  
   Write a skill or policy once, then install it into multiple AI tool formats.

2. **Curated trust layer**  
   Show compatibility, supported targets, maintenance status, risk level, examples, and install behavior before users copy anything into a project.

3. **Developer workflow marketplace**  
   Package skills, policies, GitHub checks, and project instruction files together so a user can install a whole workflow, not only a prompt.

## Target Users

| User Group | Core Job |
| --- | --- |
| Multi-agent solo developer | Switch between Claude, Codex, Gemini, and Cursor without re-explaining project rules |
| Student or hackathon team | Set up project rules quickly and avoid last-minute integration chaos |
| Web/app project team | Keep branch, commit, PR, README, testing, and AI usage conventions consistent |
| Data or AI engineering team | Reuse repetitive data, evaluation, documentation, and glue-work workflows |
| Open-source maintainer | Reduce low-quality AI-generated PRs by publishing explicit agent rules and checks |

## Pain Points to Solve First

1. Repeating the same project context across tools.
2. Inconsistent branch, commit, PR, and README conventions.
3. Claude follows one rule file while Codex or Gemini follows another.
4. Skills are discoverable but not easy to trust or install.
5. Team members do not share AI usage rules.
6. Existing projects already have files, so generators must preview and merge safely.
7. Hackathon and student projects need fast setup without long documentation reading.

## MVP Scope From Research

The MVP should prioritize:

- Web-first skill and policy browsing.
- Stack builder with shareable state.
- Install command generation.
- File preview for generated `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and GitHub workflows.
- CLI commands for `init`, `add`, `apply-policy`, `doctor`, and `list`.
- One strong seed policy pack: `github-collaboration`.
- Five seed skill packs from the current repository: `ai-handoff`, `readme-architect`, `pr-commit-maker`, `github-workflow`, and `project-dashboard`.

The MVP should defer:

- Accounts, dashboards, paid plans, and saved private stacks.
- Fully automated merges.
- MCP server hosting.
- Third-party model benchmarking.
- Large community submission workflows.

## Research Caveats

The Perplexity outputs include a mix of official documentation, community posts, and secondary summaries. Before implementation decisions become hard requirements, tool-specific paths and precedence rules should be re-checked against official documentation for Claude Code, OpenAI Codex, Gemini CLI, Cursor, and GitHub.

## Source Buckets to Re-Verify

- AGENTS.md specification: https://agents.md
- OpenAI Codex AGENTS.md guide: https://developers.openai.com/codex/guides/agents-md
- OpenAI Codex skills guide: https://developers.openai.com/codex/skills
- Claude Code skills documentation: https://code.claude.com/docs/en/skills
- Gemini CLI memory documentation: https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html
- shadcn/ui registry documentation: https://ui.shadcn.com/docs/registry
- AI Templates: https://www.aitmpl.com
- SkillsMP: https://skillsmp.com
