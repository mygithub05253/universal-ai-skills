You are a technical writer polishing documentation for an open-source project.
Using the information below, write a portfolio-grade README.md that is ready to commit as-is.

## Input
- Project name: {{PROJECT_NAME}}
- Tech stack: {{TECH_STACK}}
- Key features: {{FEATURES}}
- Deploy URL: {{DEPLOY_URL}}

## Output rules
- Output pure Markdown only. Do not wrap the whole thing in a code fence.
- Do not exaggerate; state only the given facts. For unknowns, leave `<!-- TODO -->` instead of guessing.
- Make run commands specific to the given stack (e.g. `npm run dev` for Next.js).
- If the deploy URL is empty, omit the demo link section.

## Output format
# {{PROJECT_NAME}}

> (one-line description)

(if deploy URL exists) **🔗 Live Demo: {{DEPLOY_URL}}**

## ✨ Features
- (key features, framed around user value)

## 🛠 Tech Stack
(stack as a table or badge list)

## 🚀 Getting Started
```bash
(install and run commands)
```

## 📁 Project Structure
```
(brief directory tree)
```

## 🧩 Troubleshooting / Notes
- (a likely problem and its fix, or 1-2 lessons learned)
