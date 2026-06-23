# 예시 출력 — 엣지 (팀 + github-prs 소스)

> 모드: **Claude Code (파일 쓰기)** — `gh pr list` 로 진척을 추정해 `project-dashboard.html` 저장.

## PR → 기능 매핑 (사용한 추정)
```
$ gh pr list --state all --limit 50
#1  feat: login/auth        MERGED  → 로그인/인증   = 100%
#2  feat: reservation create MERGED → 예약 생성     = 100%
#5  feat: notifications      OPEN   → 알림          = 50% (추정)
```

## 진척률 계산
- 전체: Σw = 2+3+1 = 6, Σ(w×c) = 2·100 + 3·100 + 1·50 = 550 → **92%**
- 홍길동(예약 생성 w3=100, 알림 w1=50): (300+50)/4 = **88%**
- 김영희(로그인/인증 w2=100): **100%**

## 생성된 HTML (핵심 발췌)
> 전체 구조·스타일은 `basic.output.md` / `reference/dashboard-template.html` 와 동일. 팀이므로 **팀원별 진척 섹션을 포함**한다.

```html
  <header>
    <div class="title">
      <h1>사내 일정 공유 서비스</h1>
      <div class="meta">🎯 스프린트 3 (~06/30) · 생성 2026-06-23 10:00 KST · 소스: GitHub PR</div>
    </div>
    <div class="overall">
      <canvas class="donut" data-pct="92"></canvas>
      <div><div class="big">92%</div><div class="meta">전체 진척률</div></div>
    </div>
  </header>

  <h2>기능별 진척 (명세 기반 · 가중치)</h2>
  <div class="card">
    <div class="row s-done"><div class="name">로그인/인증 <small>· PR #1</small></div><div class="w">w2</div><div class="pct">100%</div>
      <div class="bar"><i style="width:100%"></i></div></div>
    <div class="row s-done"><div class="name">예약 생성 <small>· PR #2</small></div><div class="w">w3</div><div class="pct">100%</div>
      <div class="bar"><i style="width:100%"></i></div></div>
    <div class="row s-wip"><div class="name">알림 <small>· PR #5 (추정)</small></div><div class="w">w1</div><div class="pct">50%</div>
      <div class="bar"><i style="width:50%"></i></div></div>
  </div>

  <h2>팀원별 진척</h2>
  <div class="members">
    <div class="card member">
      <h3>홍길동 <span class="pct" style="float:right">88%</span></h3>
      <div class="role">Backend</div>
      <div class="bar s-wip"><i style="width:88%"></i></div>
      <div style="margin-top:10px"><span class="tag">예약 생성</span><span class="tag">알림 (추정)</span></div>
    </div>
    <div class="card member">
      <h3>김영희 <span class="pct" style="float:right">100%</span></h3>
      <div class="role">Frontend</div>
      <div class="bar s-done"><i style="width:100%"></i></div>
      <div style="margin-top:10px"><span class="tag">로그인/인증</span></div>
    </div>
  </div>

  <h2>리스크 & 다음 초점</h2>
  <div class="card notes">알림은 PR 리뷰 중. 머지되면 90%+ 도달. (알림 50%는 PR #5 오픈 기준 추정)</div>
```
