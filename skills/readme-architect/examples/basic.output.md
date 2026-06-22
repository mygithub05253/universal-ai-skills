# Roomly — 사내 회의실 예약 웹앱

> 카카오 로그인 한 번으로 사내 회의실을 검색하고, 중복 없이 예약·취소하는 웹 서비스.

**🔗 Live Demo: https://roomly.vercel.app**

## ✨ 주요 기능
- **카카오 소셜 로그인** — 별도 회원가입 없이 사내 구성원이 바로 사용
- **회의실 목록/상세** — 위치·수용 인원·장비 기준으로 회의실 탐색
- **예약 생성·취소** — 원하는 시간대를 선택해 즉시 예약하고 자유롭게 취소
- **중복 예약 방지** — 같은 회의실의 겹치는 시간대 예약을 서버에서 차단
- **메일 알림** — 예약 확정 시 확인 메일 자동 발송

## 🛠 기술 스택
| 영역 | 기술 |
|------|------|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| Backend | Next.js Route Handlers, Prisma ORM |
| Database | PostgreSQL |
| Auth | NextAuth (Kakao Provider) |

## 🚀 시작하기
```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정 (.env)
#   DATABASE_URL, KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET, NEXTAUTH_SECRET

# 3. DB 마이그레이션
npx prisma migrate dev

# 4. 개발 서버 실행
npm run dev
```

## 📁 프로젝트 구조
```
roomly/
├─ app/            # 라우트 (목록, 예약, 인증)
├─ components/     # 재사용 UI
├─ lib/            # prisma 클라이언트, auth 설정
├─ prisma/         # schema.prisma, migrations
└─ public/
```

## 🧩 트러블슈팅 / 회고
- **중복 예약 동시성**: `(roomId, startAt)` 복합 유니크 제약 + 트랜잭션으로 동시 예약 경합을 해결. Prisma `P2002` 를 409 응답으로 변환해 사용자에게 친절한 메시지를 노출.
- **배운 점**: DB 제약만으로는 UX 가 부족 — 사전 충돌 검사와 프론트 중복 제출 방지를 함께 둬야 안정적이라는 것을 체감.
