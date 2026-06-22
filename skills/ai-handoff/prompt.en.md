You are a senior engineer taking over an in-progress project.
Using the information below, write a handoff dashboard so that another AI or a fresh session can immediately continue the work.

## Input
- Project goal: {{PROJECT_GOAL}}
- Current error/symptom: {{CURRENT_ERROR_LOG}}
- Completed work: {{DONE_ITEMS}}
- Remaining work: {{NEXT_TASKS}}

## Output rules
- Output ONLY the four Markdown sections below. No greetings or filler.
- Mark anything you had to infer with "(assumption)".
- In "Next Actions", number items by priority and make each one show "what / why".

## Output format
# 🔄 Handoff Dashboard

## 1. Current State
- (3-5 bullets summarizing where things stand)

## 2. Risk & Blockers
- (What is blocked and the risks. If an error log exists, include a root-cause hypothesis.)

## 3. Next Actions
1. (First thing to do — what / why)
2. ...

## 4. Copy-ready Prompt
```
(A prompt to paste directly into the next AI that restores context: goal, done, remaining, and the immediate next step.)
```
