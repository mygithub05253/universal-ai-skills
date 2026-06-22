# 🚀 Universal AI Skills Toolkit

> 프롬프트 모음집을 넘어 **작성 · 테스트 · 배포**까지 관리하는 AI Skill 생태계.
> Claude · ChatGPT · Gemini · Cursor 등에서 반복적으로 쓰는 개발 프롬프트를 **폴더형 Skill 패키지**로 표준화합니다.

## 💡 무엇이 다른가
"잘 만든 프롬프트를 저장한다"가 아니라 **프롬프트를 코드처럼 관리**합니다.
모든 스킬은 버전이 있고, 입력 변수가 있고, 예시가 있고, PR 시 자동 검증(lint)을 통과해야 합니다.

| 단계 | 내용 |
|------|------|
| ✍️ Authoring | `SKILL.md` · `prompt.en.md` · `prompt.ko.md` · `metadata.json` 을 한 패키지로 작성 |
| 🧪 Testing | 구조 lint 자동 검증 + 모델 호환성 등급 표기 |
| 🚢 Delivery | 웹 카탈로그 · CLI · GitHub Actions 로 실제 사용 가능한 형태 배포 |

## 📦 스킬 패키지 표준
```
skills/<slug>/
├─ SKILL.md          # 무엇을/언제/어떻게 (얇게)
├─ prompt.en.md      # 영어 프롬프트
├─ prompt.ko.md      # 한국어 프롬프트
├─ metadata.json     # 검색/호환성/검증 메타데이터 (schema 검증 대상)
└─ examples/
   ├─ basic.input.md
   └─ basic.output.md
```
`metadata.json` 표준은 [`schema/skill-metadata.schema.json`](schema/skill-metadata.schema.json) 참고.

## 🔍 로컬 검증
```bash
npm ci
npm run lint:skills
```
스킬 폴더 구조, metadata 스키마, i18n 파일 존재, 변수 정합성을 검사합니다.
PR 에서는 GitHub Actions 가 동일 검사를 자동 실행하며, 통과해야 머지됩니다.

## 🗺️ 로드맵
- **Phase 0** — 표준 · 스키마 · lint · CI ✅ 진행 중
- **Phase 1** — MVP 필수 스킬 4종 (Handoff / README / Requirements / Final Artifact)
- **Phase 2** — 전체 스킬 + 카탈로그 데이터화
- **Phase 3** — Next.js 카탈로그 배포

진행 상황은 [`PROGRESS.md`](PROGRESS.md) 에서 추적합니다.

## 📚 사용 가능한 스킬
| 스킬 | 카테고리 | 설명 |
|------|----------|------|
| [AI Handoff Dashboard](skills/ai-handoff/) | core | 모델/세션 전환 시 프로젝트 상태를 표준 대시보드로 압축 |

## 📄 License
MIT
