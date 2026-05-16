# Bave — 부모의 마음을 돌보는 양육 기록

부모의 양육 데이터를 기록하고 AI 인사이트로 정서적 지지를 제공하는 모바일 앱 프로토타입.

## 기술 스택

- **React 18.3** (UMD, no build)
- **Babel Standalone** — 브라우저에서 JSX 즉시 트랜스파일
- **CSS-in-JS** (inline styles + CSS variables)
- **Pretendard / Inter / Noto Sans KR** — 폰트
- **emoji-datasource-apple** — Apple Color Emoji 렌더링
- **Figma MCP** — 디자인 토큰 / 레이아웃 추출

## 디자인 출처

[Figma 디자인 파일](https://www.figma.com/design/4O4rOXdHipX6VNeofQCT8n)에서 다음 레이어를 정확하게 구현:

- 로그인 / 메인1 / 팝업 / 기록1 / 기록2 / 인사이트1 / 마이

## 구조

```
app/
├── index.html              ← 진입점
├── ios-frame.jsx           ← iPhone 시뮬레이터 프레임
├── tweaks-panel.jsx        ← 시연용 컨트롤 패널
├── bave-icons.jsx          ← SVG 아이콘
├── bave-screens.jsx        ← 메인 + Splash + Quick Capture
├── bave-screens-2.jsx      ← Archive + Trend + Growth + Report + Care
├── bave-screens-3.jsx      ← Login + My + Diary + Insight + Burnout Modal
├── bave-app.jsx            ← 라우팅 / 상태 / Mount
└── assets/                 ← 이미지 자산 (워드마크, 사진, 로고)
```

## 로컬 실행

```bash
cd app
python -m http.server 5173
```

브라우저에서 http://localhost:5173 접속.

빌드 단계 없음. `.jsx` 파일 수정 후 새로고침(F5)으로 반영.

## 배포

Vercel에서 정적 사이트로 배포. `app/` 디렉터리가 루트.
