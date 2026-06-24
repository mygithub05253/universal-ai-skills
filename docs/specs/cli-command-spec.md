# CLI Command API Specification

Date: 2026-06-24  
Status: Draft for implementation  
Owner: Universal AI Skills Toolkit

## 1. Overview

The `uas` CLI is a first-class interface. A developer must be able to search the registry, inspect packs, install packs, preview file changes, and run diagnostics without opening the website.

The CLI should feel closer to `npm` or `cargo` than to a one-off copy script.

Package command:

```bash
npx universal-ai-skills <command>
```

Global alias after install:

```bash
uas <command>
```

## 2. Command Summary

| Command | Purpose | MVP |
| --- | --- | --- |
| `uas init` | Create `.uas/config.json` and detect project targets. | Required |
| `uas search <query>` | Search registry by text. | Required |
| `uas list` | List packs by type or target. | Required |
| `uas info <slug>` | Show detailed pack metadata. | Required |
| `uas add <slug...>` | Add skill, policy, or collection packs. | Required |
| `uas doctor` | Validate installed UAS state. | Required |

`apply-policy` is intentionally not a separate MVP command. Policies are installed through `uas add`.

## 3. Global Flags

| Flag | Meaning |
| --- | --- |
| `--registry <url-or-path>` | Use a custom registry artifact. |
| `--target <target>` | Install for `all`, `cursor`, `claude`, `codex`, `gemini`, or `github`. |
| `--lang <lang>` | Use `ko`, `en`, `ja`, or another supported locale. |
| `--dry-run` | Show plan and diff summary without writing files. |
| `--yes` | Skip interactive prompts for CI. |
| `--json` | Print machine-readable output. |
| `--cwd <path>` | Run against a project directory other than current working directory. |

Default target is `all`. Default language is system locale if supported, otherwise the pack `defaultLang`.

## 4. `uas init`

Initializes UAS project state.

```bash
uas init
uas init --target cursor --lang ko
```

Behavior:

- Create `.uas/config.json` if missing.
- Detect existing target files such as `AGENTS.md`, `.cursor/rules`, `.github/workflows`.
- Do not install any pack.
- Print next commands such as `uas search github` and `uas add github-collaboration`.

Generated config:

```json
{
  "schemaVersion": "1.0.0",
  "defaultLang": "ko",
  "defaultTarget": "all",
  "registry": "https://universal-ai-skills.dev/registry/registry.json",
  "installed": {}
}
```

`.uas/config.json` should be committed to git by default.

## 5. `uas search <query>`

Searches registry data.

```bash
uas search tdd
uas search branch --type policy --lang ko --min-trust 70
```

Options:

| Option | Meaning |
| --- | --- |
| `--type <type>` | Filter by `skill`, `policy`, `persona`, `workflow`, or `collection`. |
| `--target <target>` | Filter by target support. |
| `--lang <lang>` | Prefer localized summaries. |
| `--min-trust <score>` | Filter by trust score. |
| `--json` | Emit JSON results. |

Text output should include slug, type, trust score, targets, and summary.

## 6. `uas list`

Lists registry packs without a query.

```bash
uas list
uas list --type skill
uas list --target cursor
```

`list` is for browsing. `search` is for text queries.

## 7. `uas info <slug>`

Shows pack details.

```bash
uas info github-collaboration
uas info policy:github-collaboration --lang ko
```

Output should include:

- Pack reference and version.
- Localized description.
- Trust score and source.
- Dependencies and conflicts.
- Compatibility modes.
- Generated files by target.
- Risk level.
- Installation example.

If slug is ambiguous across types, the CLI must ask for the explicit reference or fail in non-interactive mode.

## 8. `uas add <slug...>`

Installs skills, policies, and collections.

```bash
uas add github-collaboration
uas add github-workflow pr-commit-maker --target cursor --lang ko
uas add --stack "https://universal-ai-skills.dev/stack?s=github-workflow,github-collaboration"
uas add --stack "https://hub.uas.com/stack?s=base64..."
```

Behavior:

1. Resolve packs from slugs or stack URL.
2. Expand collections into included packs.
3. Resolve dependencies.
4. Detect conflicts.
5. Build file generation plan.
6. Show the plan.
7. Prompt before writing unless `--yes` is supplied.
8. Write files through adapters.
9. Update `.uas/config.json`.

### Stack URL

MVP stack URLs should contain slugs only:

```txt
https://universal-ai-skills.dev/stack?s=github-workflow,github-collaboration
```

Version pins are stored in `.uas/config.json`, not in the URL.

If a base64 stack payload is supported, the decoded payload must still normalize to a list of pack references and optional display preferences.

## 9. Safety Defaults

Interactive runs:

- Always show a plan before writing.
- If an existing file conflicts, prompt for resolution.
- Default conflict choice should be marker append when safe.

Non-interactive runs with `--yes`:

- Apply safe marker replacements.
- Create missing files.
- Skip unmarked existing-file conflicts with a warning.
- Never overwrite entire files unless `--force` is added in a future release.

`--force` is not part of the MVP command surface.

## 10. Interactive Merge Flow

Example:

```txt
Conflict detected in .cursor/rules/tdd.mdc:
? How would you like to resolve this?
> Append using UAS Marker (Recommended)
  Overwrite entirely
  Skip
  Show Diff
```

Choices:

| Choice | Behavior |
| --- | --- |
| Append using UAS Marker | Append a managed marker block or replace the matching block. |
| Overwrite entirely | Replace the file after explicit confirmation. |
| Skip | Leave the file unchanged and record a warning. |
| Show Diff | Show planned changes and return to the choice list. |

## 11. Plan Output

Before writing, `uas add` should show:

```txt
Plan for 2 packs:
  install policy:github-collaboration@1.0.0
  install skill:pr-commit-maker@1.0.0

Files:
  create .cursor/rules/github-collaboration.mdc
  merge  AGENTS.md
  merge  CLAUDE.md
  create .github/workflows/pr-conventions.yml
  update .uas/config.json

Apply changes? [Y/n]
```

`--dry-run` exits after printing the plan.

## 12. `.uas/config.json`

The config is the install lock and ownership record.

```json
{
  "schemaVersion": "1.0.0",
  "defaultLang": "ko",
  "defaultTarget": "all",
  "registry": "https://universal-ai-skills.dev/registry/registry.json",
  "installed": {
    "policy:github-collaboration": {
      "version": "1.0.0",
      "lang": "ko",
      "target": "all",
      "files": [
        "AGENTS.md",
        "CLAUDE.md",
        "GEMINI.md",
        ".github/workflows/pr-conventions.yml"
      ]
    }
  }
}
```

This file should be committed so teams share installed pack state.

## 13. `uas doctor`

Validates the current project against `.uas/config.json`.

```bash
uas doctor
uas doctor --json
```

MVP checks:

- `.uas/config.json` exists and is valid JSON.
- Installed packs exist in registry.
- Generated files listed in config exist.
- UAS marker blocks exist and are well formed.
- Marker versions match installed versions.
- Required policy files for `error` severity policies are present.

Doctor result levels:

| Level | Meaning | Exit code |
| --- | --- | --- |
| `pass` | No blocking issue. | `0` |
| `warn` | Project works but has drift or updates available. | `0` |
| `fail` | Required files are missing or marker integrity is broken. | `1` |

`doctor --fix` is out of scope for MVP.

## 14. Exit Codes

| Code | Meaning |
| --- | --- |
| `0` | Success or warning-only doctor result. |
| `1` | Validation failure, doctor failure, or user-declined required action. |
| `2` | Invalid CLI usage. |
| `3` | Registry fetch or parse failure. |
| `4` | Conflict cannot be resolved in non-interactive mode. |

## 15. Target Matrix

| Target | Generated outputs |
| --- | --- |
| `all` | All supported outputs for selected packs. |
| `cursor` | `.cursor/rules/*.mdc` and shared instruction files when declared. |
| `claude` | `CLAUDE.md`, `.claude/skills/<slug>/`, shared instruction files. |
| `codex` | `AGENTS.md`, `.codex/skills/<slug>/`, shared instruction files. |
| `gemini` | `GEMINI.md`, shared instruction files. |
| `github` | `.github/workflows/*.yml`, templates, manual setup docs. |

## 16. Command Examples

```bash
uas init --lang ko
uas search github --type policy --min-trust 80
uas info github-collaboration
uas add github-collaboration pr-commit-maker --target all
uas add agile-devops-stack --target cursor --dry-run
uas doctor
```
