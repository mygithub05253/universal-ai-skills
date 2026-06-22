# 🔄 Handoff Dashboard

## 1. Current State
- Next.js + Prisma + PostgreSQL 기반 회의실 예약 웹앱 MVP, 목표 배포일까지 약 2주.
- 인증(카카오 로그인), 회의실 목록 조회 API, 예약 목록 화면까지 완료.
- 핵심 기능인 "예약 생성"이 막혀 있어 MVP 핵심 플로우가 아직 끊겨 있음.

## 2. Risk & Blockers
- **블로커**: `POST /api/reservations` 500 에러 — `Unique constraint failed on (roomId, startAt)`.
- **원인 가설**: `(roomId, startAt)` 복합 유니크 제약에 동일 시간 예약이 충돌. 동시 예약 또는 중복 클릭으로 같은 키가 들어오는 것으로 추정 (가정).
- **리스크**: 중복 예약 방지 로직이 DB 제약에만 의존 → 사용자에게 친절한 에러 대신 500이 노출됨.

## 3. Next Actions
1. **예약 생성 핸들러에 try/catch 추가 (왜)**: Prisma `P2002`(unique 위반)를 잡아 409 Conflict + "이미 예약된 시간" 메시지로 변환해 500 제거.
2. **사전 충돌 검사 쿼리 추가 (왜)**: insert 전 동일 `(roomId, startAt)` 존재 여부를 확인해 UX단에서 먼저 차단.
3. **프론트 중복 제출 방지 (왜)**: 제출 버튼 disable + 낙관적 잠금으로 더블클릭 예약 방지.
4. **알림 메일 발송 (왜)**: 예약 확정 시 메일 트리거 — 생성 플로우 안정화 후 착수.

## 4. Copy-ready Prompt
```
회의실 예약 웹앱(Next.js+Prisma+PostgreSQL) MVP를 이어서 개발한다.
완료: 카카오 로그인, 회의실 목록 API, 예약 목록 화면.
현재 막힌 것: POST /api/reservations 가 (roomId, startAt) unique 제약 위반(P2002)으로 500 발생.
지금 할 일: (1) Prisma P2002를 409로 변환 (2) insert 전 충돌 검사 (3) 프론트 중복 제출 방지.
이 순서대로 예약 생성 버그부터 고쳐줘. 코드는 기존 패턴을 따르고 한국어 주석을 단다.
```
