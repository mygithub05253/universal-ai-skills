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

Allowed prefixes:

| prefix | 용도 |
|--------|------|
| `feat` | 새 기능/스킬 |
| `fix` | 버그 수정 |
| `docs` | 문서만 변경 |
| `chore` | 잡일(설정, 의존성, 정리) |
| `ci` | CI/워크플로우 변경 |
| `refactor` | 동작 변화 없는 구조 개선 |
| `test` | 테스트 추가/수정 |
| `style` | 포맷·세미콜론 등(로직 변화 없음) |
| `perf` | 성능 개선 |
| `build` | 빌드 시스템·패키징 |
| `revert` | 이전 커밋 되돌리기 |
| `hotfix` | 운영 긴급 수정 (브랜치 전용) |
| `release` | 릴리스 준비 (브랜치 전용) |
| `experiment` | 실험/스파이크 (브랜치 전용) |

> 한국어: 브랜치는 `타입/짧은-설명` 형식. 위 타입만 허용하며 CI가 자동 검사합니다.
> `hotfix`·`release`·`experiment`는 브랜치명 전용이고, 커밋/PR 제목 타입은 그 위의 Conventional Commits 타입을 씁니다.

## 2. Commits & PR titles — Conventional Commits (English)

Commit messages and **PR titles** follow [Conventional Commits](https://www.conventionalcommits.org/) in **English**, so the project stays readable for international contributors:

```
feat: add PR & commit message maker skill
fix: handle optional variables in lint
docs: add contributing guide
```

Commit/PR title types: `feat` `fix` `docs` `chore` `ci` `refactor` `test` `style` `perf` `build` `revert`.

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
- [ ] `SKILL.md` = **네이티브 실행 정본**: frontmatter(`name`, `description`, 선택 `argument-hint`) + 영문 지시문. 지시문에 **출력 규칙 / 금지사항 / 입력 부족 시 fallback** 포함, 필요 시 `⚡ Claude Code only` 블록 분리
- [ ] `prompt.ko.md` (한국어 복붙 변형). 영문 정본은 `SKILL.md` 가 겸함 (별도 `prompt.en.md` 두지 않음)
- [ ] `README.md` (폴더용 사람 설명: 언제 쓰나 / 입력 / 안티패턴 / 검증 포인트 / 사용법)
- [ ] `examples/` with **at least 2 scenarios** (e.g. `basic.*` and `edge.*`) as input/output pairs
- [ ] (recommended) `reference/` for detailed knowledge kept out of `SKILL.md` (Progressive Disclosure)
- [ ] `{{VARIABLE}}` 는 모든 지시문(SKILL.md·prompt.ko.md)과 `metadata.variables` 가 서로 일치
- [ ] `risk` label set honestly (`read-only` / `code-generation` / `file-write` / `network` / `credential-sensitive`)

> 한국어: 모든 지시문은 `{{VARIABLE}}` 플레이스홀더 기반이라 어떤 생성형 AI에도 복붙됩니다. 동시에 `SKILL.md` 는 agentskills.io 표준을 따라 Claude Code 에 설치하면 `/명령어` 로 동작합니다.
> 위 체크리스트를 통과하지 못하면 "얇은 스킬"로 간주합니다. lint 가 구조를 자동 검사하고, 나머지는 PR 리뷰에서 확인합니다.

## 5. Local commands

```bash
npm ci              # install
npm run lint:skills # validate all skills
```

## 6. Security

Skills are natural language but change agent behavior. Do not author prompts that request secrets (API keys, tokens, personal data) or silently trigger destructive actions. Set the `risk` field truthfully; high-risk skills require maintainer review before merge.
