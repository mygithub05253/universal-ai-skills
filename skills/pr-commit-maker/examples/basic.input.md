# 예시 입력 (basic — 단일 기능 추가)

- **GIT_DIFF**:
```
diff --git a/scripts/lint-skills.mjs b/scripts/lint-skills.mjs
+ // 프롬프트에서 쓰인 {{VAR}} 와 metadata.variables 정합성 검사 추가
+ for (const v of usedVars) {
+   if (!declaredVars.has(v)) err(slug, `${v} 미선언`);
+ }
```
- **CHANGE_TYPE**: (비움 → 자동 추론)
- **TEST_RESULT**: npm run lint:skills 통과 (2개 스킬, 경고 0)
- **ISSUE_REF**: #7
- **COMMIT_LANG**: (비움 → en)
- **PR_BODY_LANG**: (비움 → ko)
