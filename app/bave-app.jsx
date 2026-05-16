// bave-app.jsx — Bave app shell: routing, tab bar, tweaks
const { useState: useStateA, useEffect: useEffectA, useMemo: useMemoA } = React;

// Sample data — recent diary entries (figma-style with tag pills)
const SAMPLE_ENTRIES = [
  { id: 1, emo: 'tired', title: '오늘 또 소리를 질렀다', preview: '오늘 또 소리를 질렀다. 너무 미안해…', when: '22:00', dateLabel: '어제', relDate: '어제',
    tags: [{ kind: 'gray', label: '지침' }, { kind: 'red', label: '죄책감' }], hasPhoto: false },
  { id: 2, emo: 'joy', title: '마트에서 떼쓰던 모습', preview: '마트에서 떼쓰던 모습이 너무 귀여웠다.', when: '09:30', dateLabel: '그저께', relDate: '그저께',
    tags: [{ kind: 'green', label: '기쁨' }], hasPhoto: true },
  { id: 3, emo: 'calm', title: '잘 자는 모습', preview: '잘 자는 모습 보니 마음이 놓인다.', when: '21:15', dateLabel: '3일 전', relDate: '3일 전',
    tags: [{ kind: 'sky', label: '평온' }], hasPhoto: true },
  { id: 4, emo: 'anxious', title: '어린이집 적응', preview: '아침에 인사하고 돌아서는데 그 표정이 자꾸 떠오른다.', when: '20:12', dateLabel: '4일 전', relDate: '4일 전',
    tags: [{ kind: 'yellow', label: '불안' }], hasPhoto: false },
  { id: 5, emo: 'grateful', title: '낮잠 후 까르르', preview: '눈 뜨자마자 깔깔 웃었다. 그 웃음 하나에 하루가 회복됐다.', when: '15:30', dateLabel: '5일 전', relDate: '5일 전',
    tags: [{ kind: 'pink', label: '감사' }, { kind: 'green', label: '기쁨' }], hasPhoto: true },
  { id: 6, emo: 'anger', title: '나도 모르게 큰소리', preview: '내가 왜 이렇게 화가 났을까. 아이가 잘못한 게 아닌데.', when: '11:02', dateLabel: '6일 전', relDate: '6일 전',
    tags: [{ kind: 'red', label: '짜증' }], hasPhoto: false },
  { id: 7, emo: 'proud', title: '혼자 양말을 신었다', preview: '오랫동안 같이 해왔는데 오늘은 끝까지 혼자 해냈다.', when: '09:14', dateLabel: '7일 전', relDate: '7일 전',
    tags: [{ kind: 'purple', label: '보람' }], hasPhoto: true },
];

function BaveApp() {
  const [t, setTweak] = useTweaks(window.__BAVE_DEFAULTS);
  const [screen, setScreen] = useStateA(t.showOnboarding ? 'onboarding' : 'home');
  const [tab, setTab] = useStateA('home');           // home | archive | insight | my
  const [overlay, setOverlay] = useStateA(null);
  const [entries, setEntries] = useStateA(SAMPLE_ENTRIES);
  const [toast, setToast] = useStateA(null);
  const [burnout, setBurnout] = useStateA(62);
  const [showSplash, setShowSplash] = useStateA(true);
  const [authed, setAuthed] = useStateA(false);

  // Apply primary color
  useEffectA(() => {
    document.documentElement.style.setProperty('--bave-500', t.primary);
    // derive shades
    const shades = adjustShades(t.primary);
    Object.entries(shades).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    });
  }, [t.primary]);

  const go = (s) => {
    // Navigating away should dismiss any open overlay (quick capture, diary, etc.)
    setOverlay(null);
    if (['home','archive','insight','my'].includes(s)) {
      setTab(s);
      setScreen(s);
    } else {
      setScreen(s);
    }
  };

  const pushToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const saveQuick = (rec) => {
    const ne = {
      id: Date.now(), emo: rec.emo,
      title: `#${rec.category} 한 장`, preview: rec.text || '한 장에 담아본 순간이에요.',
      when: '방금', dateLabel: '오늘 · 5월 16일', hasPhoto: true,
    };
    setEntries([ne, ...entries]);
    setOverlay(null);
    pushToast('홈에 기록을 반영했어요');
  };

  const saveDiary = (rec) => {
    const titles = {
      tired:'오늘은 많이 지친 하루였어요', anxious:'마음이 술렁이는 하루', sad:'왠지 모르게 눈물이 나서',
      anger:'나도 모르게 큰소리를…', joy:'기쁜 순간', calm:'고요한 순간',
      grateful:'고마운 마음', proud:'뿌듯한 한 걸음',
    };
    const ne = {
      id: Date.now(), emo: rec.emo,
      title: titles[rec.emo] || '오늘의 마음 기록',
      preview: rec.text || '편안하게 마음을 적어두었어요.',
      when: '방금', dateLabel: '오늘 · 5월 16일', hasPhoto: true,
    };
    setEntries([ne, ...entries]);
    setOverlay(null);
    setTab('archive'); setScreen('archive');
    pushToast('Archive에 일기를 저장했어요');
  };

  return (
    <>
      <div className="stage">
        <IOSDevice width={393} height={852} dark={showSplash}>
          <div style={{
            position: 'relative', height: '100%',
            background: 'var(--bave-soft)',
            overflow: 'hidden',
          }}>
            {/* Screen */}
            {!authed ? (
              <LoginScreen onLogin={() => setAuthed(true)}/>
            ) : screen === 'onboarding' ? (
              <OnboardingScreen onDone={() => { setScreen('home'); setTab('home'); }}/>
            ) : (
              <>
                {screen === 'home' && (
                  <HomeScreen
                    go={go}
                    recentEntries={entries}
                    burnout={burnout}
                    openBurnoutModal={() => setOverlay('burnout')}
                    onQuickRecord={() => setOverlay('quick')}
                    onDiary={() => setOverlay('diary')}
                  />
                )}
                {screen === 'archive' && <EmotionDiaryScreen onClose={() => go('home')} onSave={saveDiary}/>}
                {screen === 'insight' && <InsightScreen go={go}/>}
                {screen === 'my' && <MyScreen onLogout={() => { setAuthed(false); setScreen('home'); setTab('home'); }}/>}
                {screen === 'trend' && <EmotionTrendScreen onBack={() => go('insight')}/>}
                {screen === 'growth' && <GrowthScreen onBack={() => go('insight')}/>}
                {screen === 'report' && <ReportScreen onBack={() => go('insight')}/>}

                {/* Bottom tab — Quick capture sheet visually belongs to 기록 tab */}
                <BottomTab tab={overlay === 'quick' ? 'archive' : tab} go={go}/>
              </>
            )}

            {/* Overlays */}
            {overlay === 'quick' && (
              <QuickCaptureSheet onClose={() => setOverlay(null)} onSave={saveQuick}/>
            )}
            {overlay === 'diary' && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 30, background: 'var(--bave-soft)' }} className="slide-up">
                <EmotionDiaryScreen onClose={() => setOverlay(null)} onSave={saveDiary}/>
              </div>
            )}
            {overlay === 'burnout' && (
              <BurnoutModal onClose={() => setOverlay(null)} onStartCare={() => setOverlay('care')}/>
            )}
            {overlay === 'care' && (
              <CareSheet onClose={() => { setOverlay(null); setBurnout(Math.max(20, burnout - 28)); pushToast('번아웃 지수가 회복됐어요'); }}/>
            )}
            {overlay === 'quickActions' && (
              <QuickActionsSheet
                onClose={() => setOverlay(null)}
                onQuick={() => setOverlay('quick')}
                onDiary={() => setOverlay('diary')}
              />
            )}

            {/* Toast */}
            {toast && (
              <div className="pop" style={{
                position: 'absolute', left: 20, right: 20, bottom: 104, zIndex: 50,
                padding: '14px 18px', borderRadius: 16,
                background: 'rgba(15,30,55,0.92)', color: '#fff',
                fontSize: 14, fontWeight: 600, textAlign: 'center',
                boxShadow: '0 10px 30px rgba(15,30,55,0.4)',
              }}>{toast}</div>
            )}

            {/* Splash — rendered inside the iPhone frame */}
            {showSplash && (
              <SplashScreen onDone={() => setShowSplash(false)}/>
            )}
          </div>
        </IOSDevice>
      </div>

      <TweaksPanel>
        <TweakSection label="브랜드 컬러">
          <TweakColor label="Primary" value={t.primary}
            options={['#4A98EA', '#5DD0F2', '#5EAAD8', '#7BA8DD', '#8A92E0']}
            onChange={v => setTweak('primary', v)}/>
        </TweakSection>
        <TweakSection label="시연용">
          <TweakButton label="스플래시부터 보기" onClick={() => setShowSplash(true)}/>
          <TweakButton label="로그인 화면" onClick={() => setAuthed(false)}/>
          <TweakButton label="온보딩부터 보기" onClick={() => { setAuthed(true); setShowSplash(false); setScreen('onboarding'); setTab('home'); }}/>
          <TweakSlider label="번아웃 지수" min={10} max={95} step={1} value={burnout}
            onChange={v => setBurnout(v)}/>
          <TweakButton label="번아웃 팝업 띄우기" onClick={() => { setAuthed(true); setOverlay('burnout'); }}/>
          <TweakButton label="감정 일기 열기" onClick={() => { setAuthed(true); setOverlay('diary'); }}/>
          <TweakButton label="AI 코칭 리포트" onClick={() => { setAuthed(true); go('report'); }}/>
        </TweakSection>
        <TweakSection label="탭 바로가기">
          <TweakButton label="홈" onClick={() => { setAuthed(true); go('home'); }}/>
          <TweakButton label="기록" onClick={() => { setAuthed(true); go('archive'); }}/>
          <TweakButton label="인사이트" onClick={() => { setAuthed(true); go('insight'); }}/>
          <TweakButton label="마이" onClick={() => { setAuthed(true); go('my'); }}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// ───── bottom tab + center FAB ─────

function BottomTab({ tab, go, onPlus }) {
  const items = [
    { k: 'home',    label: '홈',     Icon: IconHome },
    { k: 'archive', label: '기록',   Icon: IconArchive },
    { k: 'insight', label: '인사이트', Icon: IconInsight },
    { k: 'my',      label: '마이',   Icon: IconUser },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 50,
      paddingBottom: 34, paddingTop: 1,
      background: '#fff',
      borderTop: '1px solid var(--ink-100)',
      height: 90,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: 49 }}>
        {items.map((it, i) => (
          <button key={i} onClick={() => it.k && go(it.k)} style={{
            flex: 1, background: 'transparent', border: 0, padding: '8px 0 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
            color: tab === it.k ? 'var(--bave-500)' : 'var(--ink-400)',
            height: '100%', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <it.Icon size={22}/>
            <span style={{
              fontSize: 11, fontWeight: 500,
              letterSpacing: '-0.16px', lineHeight: '15.4px',
            }}>{it.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function QuickActionsSheet({ onClose, onQuick, onDiary }) {
  return (
    <Sheet onClose={onClose}>
      <div style={{ padding: '4px 20px 8px' }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>오늘의 마음을 기록해요</h3>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--ink-500)' }}>어떻게 남겨볼까요?</p>
      </div>
      <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <ActionRow
          onClick={() => { onClose(); onQuick(); }}
          tint="linear-gradient(135deg, var(--bave-400), var(--bave-600))"
          color="#fff"
          icon={<IconCamera size={24}/>}
          title="빠른 순간 기록"
          desc="사진 한 장으로 시작 · AI 자동 분류"
        />
        <ActionRow
          onClick={() => { onClose(); onDiary(); }}
          tint="linear-gradient(135deg, #F8A8C0, #E07C9C)"
          color="#fff"
          icon={<IconBookHeart size={24}/>}
          title="감정 일기 쓰기"
          desc="마음을 깊이 들여다보고 싶을 때"
        />
        <ActionRow
          onClick={onClose}
          tint="var(--bave-100)"
          color="var(--bave-700)"
          icon={<IconMic size={24}/>}
          title="음성으로 남기기"
          desc="말로 빠르게 · AI가 텍스트로 정리"
        />
      </div>
    </Sheet>
  );
}

function ActionRow({ onClick, tint, color, icon, title, desc }) {
  return (
    <button onClick={onClick} style={{
      border: 0, padding: 16, borderRadius: 20,
      background: '#fff', boxShadow: 'var(--shadow-soft)',
      display: 'flex', alignItems: 'center', gap: 14,
      textAlign: 'left', cursor: 'pointer',
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 16, background: tint, color: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink-900)' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 3 }}>{desc}</div>
      </div>
      <IconChevronRight size={18} style={{ color: 'var(--ink-400)' }}/>
    </button>
  );
}

// ───── color shade helpers ─────

function adjustShades(primary) {
  // primary is hex. produce -50,-100,-200,-300,-400,-600,-700,-800
  const hsl = hexToHsl(primary);
  const at = (l, s = hsl.s) => hslToHex({ h: hsl.h, s, l });
  return {
    '--bave-50':  at(0.97, 0.85),
    '--bave-100': at(0.93, 0.92),
    '--bave-200': at(0.86, 0.85),
    '--bave-300': at(0.80, 0.95),
    '--bave-400': at(0.68, hsl.s),
    '--bave-600': at(Math.max(0.36, hsl.l - 0.10)),
    '--bave-700': at(Math.max(0.30, hsl.l - 0.20)),
    '--bave-800': at(Math.max(0.22, hsl.l - 0.30)),
    '--bave-soft': '#F8F9FB',
  };
}

function hexToHsl(hex) {
  const m = hex.replace('#','');
  const r = parseInt(m.slice(0,2),16)/255, g = parseInt(m.slice(2,4),16)/255, b = parseInt(m.slice(4,6),16)/255;
  const mx = Math.max(r,g,b), mn = Math.min(r,g,b);
  let h, s, l = (mx+mn)/2;
  if (mx === mn) { h = s = 0; }
  else {
    const d = mx - mn;
    s = l > 0.5 ? d/(2-mx-mn) : d/(mx+mn);
    switch (mx) {
      case r: h = (g-b)/d + (g<b ? 6 : 0); break;
      case g: h = (b-r)/d + 2; break;
      default: h = (r-g)/d + 4;
    }
    h /= 6;
  }
  return { h, s, l };
}

function hslToHex({ h, s, l }) {
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q-p)*6*t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q-p)*(2/3 - t)*6;
    return p;
  };
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const q = l < 0.5 ? l*(1+s) : l + s - l*s;
    const p = 2*l - q;
    r = hue2rgb(p,q,h + 1/3);
    g = hue2rgb(p,q,h);
    b = hue2rgb(p,q,h - 1/3);
  }
  const to = v => Math.round(v*255).toString(16).padStart(2,'0');
  return '#' + to(r) + to(g) + to(b);
}

// ───── mount ─────

ReactDOM.createRoot(document.getElementById('root')).render(<BaveApp/>);
