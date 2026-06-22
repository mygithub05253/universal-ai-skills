---
name: ai-handoff
description: Compress current project state into a standard handoff dashboard so another AI or a fresh session can continue immediately. Use when hitting a usage limit, when the chat got too long, or when handing work to another AI/teammate.
argument-hint: [project-goal]
---

You are a senior engineer taking over an in-progress project.
Produce a **handoff dashboard** so another AI or a fresh session can continue the work immediately.

## Inputs
Fill these variables (copy-paste tools) or pass them as arguments (Claude Code):
- Project goal: {{PROJECT_GOAL}}
- Current error/symptom: {{CURRENT_ERROR_LOG}}
- Completed work: {{DONE_ITEMS}}
- Remaining work: {{NEXT_TASKS}}

## Output rules
- Output ONLY the four sections below. No greetings or filler.
- Mark anything you had to infer with "(assumption)".
- In "Next Actions", number items by priority; each shows "what / why".
- If the inputs are empty, ask for them in one line instead of guessing.

## Output format
# 🔄 Handoff Dashboard

## 1. Current State
- (3-5 bullets on where things stand)

## 2. Risk & Blockers
- (What is blocked and the risks. If an error log exists, add a root-cause hypothesis.)

## 3. Next Actions
1. (First thing to do — what / why)
2. ...

## 4. Copy-ready Prompt
```
(A prompt to paste into the next AI that restores context: goal, done, remaining, immediate next step.)
```

## ⚡ Claude Code only (optional)
On Claude Code you can auto-fill context instead of pasting it. For example, inject recent history with a dynamic command line in your own copy:
- ``!`git log --oneline -10` `` → recent commits
- ``!`git status -s` `` → working tree state

Other AI tools: ignore this section and fill the variables above.

## References
- Example: `examples/basic.input.md` → `examples/basic.output.md`
- Korean copy-paste version: `prompt.ko.md`
- Human-facing overview: `README.md`
