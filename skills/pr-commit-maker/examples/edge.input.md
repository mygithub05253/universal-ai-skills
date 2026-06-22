# 예시 입력 (edge — 무관한 변경 혼재)

- **GIT_DIFF**:
```
diff --git a/skills/ai-handoff/prompt.ko.md b/skills/ai-handoff/prompt.ko.md
+ 출력은 항상 4개 섹션을 포함한다. (Copy-ready Prompt 누락 방지)

diff --git a/README.md b/README.md
- 스킬 2개
+ 스킬 3개   # 오타/숫자 갱신, 위 변경과 무관

diff --git a/scripts/lint-skills.mjs b/scripts/lint-skills.mjs
+ // 변수 미사용 시 경고만 (동작 변화 없음, 정리)
```
- **CHANGE_TYPE**: (비움)
- **TEST_RESULT**: (비움)
- **ISSUE_REF**: (비움)
