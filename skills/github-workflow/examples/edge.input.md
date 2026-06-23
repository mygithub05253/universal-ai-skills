# 예시 입력 — 엣지 (hotfix + 비-Claude 모드 + 게이트에서 CI 실패)

운영에서 로그인 시 500 에러가 터졌다. **Gemini 채팅**에서 이 스킬을 복붙해 쓴다(셸 실행 불가).

- `{{CHANGE_DESCRIPTION}}`: 로그인 500 에러 긴급 수정 (null 세션 처리)
- `{{BASE_BRANCH}}`: main
- `{{CHANGE_TYPE}}`: fix
- `{{ISSUE_REF}}`: (비움)
- `{{MERGE_METHOD}}`: squash
- `{{TEAM_RULES}}`: 리뷰 1명 승인 필수

상황: 긴급 수정이라 빨리 처리해야 하지만 팀 규칙상 리뷰가 필요하다. 푸시 후 CI가 실패하는 경우의 대응도 보여줄 것.
