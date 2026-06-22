# Contributing Guide

Thanks for your interest in **Universal AI Skills Toolkit**!
This document defines how we author skills and how changes flow into `main`.
(한국어 보조 설명을 각 섹션에 함께 둡니다.)

---

## 1. Branch naming

Use a typed prefix + short kebab-case description:

```
feat/pr-commit-maker
fix/lint-variable-regex
docs/readme-badges
chore/governance
```

Allowed prefixes: `feat` `fix` `docs` `chore` `ci` `refactor` `test`.
> 한국어: 브랜치는 `타입/짧은-설명` 형식. 위 7개 타입만 허용합니다. CI가 자동 검사합니다.

## 2. Commits & PR titles — Conventional Commits (English)

Commit messages and **PR titles** follow [Conventional Commits](https://www.conventionalcommits.org/) in **English**, so the project stays readable for international contributors:

```
feat: add PR & commit message maker skill
fix: handle optional variables in lint
docs: add contributing guide
```

Types: `feat` `fix` `docs` `chore` `ci` `refactor` `test` `style`.

> 한국어: **커밋/PR 제목은 영문 Conventional Commits**로 통일합니다(국제 표준 → star·fork·외부 기여에 유리).
> 단, **PR 본문·이슈·코드 주석·내부 문서(PROGRESS 등)는 한국어**로 작성해도 됩니다.

The PR title is validated by CI ([`pr-conventions.yml`](.github/workflows/pr-conventions.yml)).

## 3. Pull Request flow

1. Branch off `main`.
2. Run `npm run lint:skills` locally — it must pass.
3. Open a PR (the template is auto-filled). PR body in Korean is fine.
4. CI runs `lint` (skill structure) + `pr-conventions` (branch/title). Both must pass.
5. `main` is protected and squash auto-merges once required checks are green.

> 한국어: `main` 직접 push는 막혀 있습니다. 모든 변경은 브랜치 → PR → CI 통과 → squash auto-merge.

## 4. Adding a new skill — depth checklist ✅

A skill is **not** "a single prompt in a file". To avoid shallow skills, every new skill under `skills/<slug>/` must satisfy:

- [ ] `metadata.json` valid against [`schema/skill-metadata.schema.json`](schema/skill-metadata.schema.json)
- [ ] `SKILL.md` includes: **언제 쓰나 / 동작 방식 / 입력 변수 / 출력 형식 / 안티패턴(하지 말 것) / 엣지 케이스 / 검증 포인트**
- [ ] `prompt.en.md` **and** `prompt.ko.md`, with output rules + forbidden actions + a fallback when input is missing
- [ ] `examples/` with **at least 2 scenarios** (e.g. `basic.*` and `edge.*`) as input/output pairs
- [ ] (recommended) `reference/` for detailed knowledge kept out of `SKILL.md` (Progressive Disclosure)
- [ ] Every `{{VARIABLE}}` used in prompts is declared in `metadata.variables`, and vice versa
- [ ] `risk` label set honestly (`read-only` / `code-generation` / `file-write` / `network` / `credential-sensitive`)

> 한국어: 위 체크리스트를 통과하지 못하면 "얇은 스킬"로 간주합니다. lint가 구조 일부를 자동 검사하고, 나머지는 PR 리뷰에서 확인합니다.

## 5. Local commands

```bash
npm ci              # install
npm run lint:skills # validate all skills
```

## 6. Security

Skills are natural language but change agent behavior. Do not author prompts that request secrets (API keys, tokens, personal data) or silently trigger destructive actions. Set the `risk` field truthfully; high-risk skills require maintainer review before merge.
