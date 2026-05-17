// bave-screens.jsx — All Bave screens
const { useState, useRef, useEffect, useMemo } = React;

// ───────────────────────── shared ─────────────────────────

const Card = ({ children, style, onClick, as: As = 'div', pad = 20 }) =>
<As
  onClick={onClick}
  style={{
    background: '#fff',
    borderRadius: 24,
    padding: pad,
    boxShadow: 'var(--shadow-card)',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'transform 150ms ease, box-shadow 150ms ease',
    ...style
  }}
  onMouseDown={onClick ? (e) => e.currentTarget.style.transform = 'scale(0.985)' : undefined}
  onMouseUp={onClick ? (e) => e.currentTarget.style.transform = '' : undefined}
  onMouseLeave={onClick ? (e) => e.currentTarget.style.transform = '' : undefined}>
  
    {children}
  </As>;


const SectionLabel = ({ children, action }) =>
<div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 4px', marginBottom: 12 }}>
    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--ink-900)', letterSpacing: '-0.01em' }}>{children}</h3>
    {action &&
  <button onClick={action.onClick} style={{
    background: 'transparent', border: 0, padding: 0,
    color: 'var(--bave-600)', fontSize: 14, fontWeight: 600
  }}>{action.label} ›</button>
  }
  </div>;


const PrimaryButton = ({ children, onClick, full, style, disabled }) =>
<button
  onClick={onClick}
  disabled={disabled}
  style={{
    height: 56, borderRadius: 18, border: 0,
    background: disabled ? 'var(--ink-200)' : 'var(--bave-500)',
    color: '#fff', fontSize: 16, fontWeight: 700,
    width: full ? '100%' : 'auto', padding: '0 24px',
    boxShadow: disabled ? 'none' : '0 6px 16px rgba(74,152,234,0.32)',
    transition: 'transform 120ms ease, background 120ms ease',
    ...style
  }}
  onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'scale(.985)')}
  onMouseUp={(e) => e.currentTarget.style.transform = ''}
  onMouseLeave={(e) => e.currentTarget.style.transform = ''}>
  {children}</button>;


const GhostButton = ({ children, onClick, full, style }) =>
<button onClick={onClick} style={{
  height: 56, borderRadius: 18, border: 0,
  background: 'var(--bave-100)', color: 'var(--bave-700)',
  fontSize: 16, fontWeight: 700,
  width: full ? '100%' : 'auto', padding: '0 24px',
  ...style
}}>{children}</button>;


// — Phone-shaped page (matches iOS frame inner)
function PageHeader({ title, onBack, right }) {
  return (
    <div style={{
      paddingTop: 60, paddingLeft: 20, paddingRight: 20, paddingBottom: 12,
      display: 'flex', alignItems: 'center', gap: 8,
      background: 'transparent'
    }}>
      {onBack &&
      <button onClick={onBack} style={{
        width: 36, height: 36, borderRadius: 12,
        border: 0, background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--ink-700)', boxShadow: 'var(--shadow-soft)'
      }}>
          <IconBack size={20} />
        </button>
      }
      <h1 style={{ margin: 0, flex: 1, fontSize: 17, fontWeight: 700, textAlign: onBack ? 'center' : 'left' }}>{title}</h1>
      {right || onBack && <div style={{ width: 36 }} />}
    </div>);

}

// — Curved gauge for burnout index
function BurnoutGauge({ value = 62, size = 132 }) {
  // value 0–100
  const r = size / 2 - 14;
  const cx = size / 2,cy = size / 2;
  const start = Math.PI * 0.75,end = Math.PI * 2.25;
  const arc = end - start;
  const v = Math.max(0, Math.min(100, value)) / 100;
  const pt = (a) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  const [x1, y1] = pt(start);
  const [x2, y2] = pt(end);
  const [vx, vy] = pt(start + arc * v);
  const large = v > 0.5 ? 1 : 0;

  // gradient: green → yellow → red
  const stops = ['#5EC79E', '#FFC163', '#F08079'];
  const color = value < 40 ? stops[0] : value < 70 ? stops[1] : stops[2];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5EC79E" />
          <stop offset="55%" stopColor="#FFC163" />
          <stop offset="100%" stopColor="#F08079" />
        </linearGradient>
      </defs>
      <path d={`M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`}
      stroke="#EEF2F7" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${vx} ${vy}`}
      stroke="url(#gauge-grad)" strokeWidth="14" fill="none" strokeLinecap="round" />
    </svg>);

}

// ───────────────────────── Onboarding ─────────────────────────

function OnboardingScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const steps = [
  { kind: 'welcome' },
  { kind: 'value' },
  { kind: 'profile' },
  { kind: 'ready' }];

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));

  return (
    <div className="phone-scroll" style={{
      height: '100%', overflow: 'auto',
      background: 'linear-gradient(180deg, #E6F1FD 0%, #F6F8FB 60%, #fff 100%)'
    }}>
      {/* progress dots */}
      <div style={{ paddingTop: 64, display: 'flex', justifyContent: 'center', gap: 6 }}>
        {steps.map((_, i) =>
        <div key={i} style={{
          width: i === step ? 22 : 6, height: 6, borderRadius: 6,
          background: i <= step ? 'var(--bave-500)' : 'var(--ink-200)',
          transition: 'all 220ms ease'
        }} />
        )}
      </div>

      <div className="fade-in" key={step} style={{ padding: '32px 28px 24px' }}>
        {step === 0 &&
        <>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0 28px' }}>
              <BaveLogo size={92} />
            </div>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, textAlign: 'center', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
              아이를 돌보는 당신의<br />마음도 함께 돌볼게요
            </h2>
            <p style={{ marginTop: 14, fontSize: 15, color: 'var(--ink-500)', textAlign: 'center', lineHeight: 1.55 }}>
              매일의 작은 기록이,<br />매일의 큰 확신이 됩니다.
            </p>
          </>
        }
        {step === 1 &&
        <>
            <h2 style={{ margin: '12px 0 24px', fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
              베이브가 함께할게요
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ValueRow icon={<IconShield />} title="AI 안심 보고서" desc="객관적인 데이터로 ‘잘 키우고 있다’는 시각적 확신을 드려요." color="--bave-500" />
              <ValueRow icon={<IconSparkle />} title="초개인화 맞춤 피드백" desc="우리 아이만의 데이터에 기반한 맞춤 안심 가이드를 제안해요." color="#E89A3C" />
              <ValueRow icon={<IconHeart />} title="24/7 AI 정서적 지지" desc="언제든 마음을 털어놓을 수 있는 감정 안전망이에요." color="#C9697F" />
            </div>
          </>
        }
        {step === 2 && <ProfileSetup />}
        {step === 3 &&
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
              <div style={{
              width: 120, height: 120, borderRadius: '50%',
              background: 'var(--bave-100)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--bave-600)', boxShadow: 'inset 0 0 0 8px #fff, 0 0 0 1px var(--bave-200)'
            }}><IconCheck size={56} sw={2.4} /></div>
            </div>
            <h2 style={{ margin: '28px 0 10px', fontSize: 24, fontWeight: 800, textAlign: 'center', letterSpacing: '-0.02em' }}>
              준비가 끝났어요
            </h2>
            <p style={{ margin: 0, fontSize: 15, color: 'var(--ink-500)', textAlign: 'center', lineHeight: 1.55 }}>
              이제 베이브와 함께<br />오늘의 마음을 기록해볼까요?
            </p>
          </>
        }
      </div>

      <div style={{ padding: '8px 24px 40px', marginTop: 'auto' }}>
        {step < steps.length - 1 ?
        <PrimaryButton full onClick={next}>다음</PrimaryButton> :

        <PrimaryButton full onClick={onDone}>베이브 시작하기</PrimaryButton>
        }
        {step === 0 &&
        <p style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: 'var(--ink-400)' }}>
            계속하면 <u>이용약관</u>과 <u>개인정보 처리방침</u>에 동의하게 됩니다
          </p>
        }
      </div>
    </div>);

}

function ValueRow({ icon, title, desc, color }) {
  return (
    <div style={{
      display: 'flex', gap: 14, padding: 16,
      background: '#fff', borderRadius: 20, boxShadow: 'var(--shadow-soft)'
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14, flexShrink: 0,
        background: `color-mix(in oklab, ${color.startsWith('--') ? `var(${color})` : color} 14%, #fff)`,
        color: color.startsWith('--') ? `var(${color})` : color,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-900)' }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 4, lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>);

}

function ProfileSetup() {
  const [name, setName] = useState('지유');
  const [age, setAge] = useState('5세');
  return (
    <>
      <h2 style={{ margin: '12px 0 6px', fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>아이를 소개해주세요</h2>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--ink-500)' }}>맞춤 성장 분석을 위해 사용돼요</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div style={{ position: 'relative' }}>
          <ChildAvatar size={88} hue="rose" />
          <div style={{
            position: 'absolute', right: -2, bottom: -2,
            width: 30, height: 30, borderRadius: 12,
            background: 'var(--bave-500)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '3px solid #F6F8FB'
          }}><IconCamera size={14} sw={2.4} /></div>
        </div>
      </div>
      <Field label="이름">
        <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      </Field>
      <Field label="나이">
        <input value={age} onChange={(e) => setAge(e.target.value)} style={inputStyle} />
      </Field>
      <Field label="성별">
        <div style={{ display: 'flex', gap: 10 }}>
          <SegBtn active>여자아이</SegBtn>
          <SegBtn>남자아이</SegBtn>
        </div>
      </Field>
    </>);

}

const inputStyle = {
  width: '100%', height: 52, borderRadius: 16,
  border: '1px solid var(--ink-200)', padding: '0 16px',
  fontSize: 16, color: 'var(--ink-900)', background: '#fff',
  outline: 'none'
};

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-500)', marginBottom: 8, paddingLeft: 4 }}>{label}</div>
      {children}
    </div>);

}

function SegBtn({ active, children, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, height: 48, borderRadius: 14, border: 0,
      background: active ? 'var(--bave-500)' : '#fff',
      color: active ? '#fff' : 'var(--ink-700)',
      fontSize: 15, fontWeight: 600,
      boxShadow: active ? 'none' : 'inset 0 0 0 1px var(--ink-200)'
    }}>{children}</button>);

}

// — Bave wordmark — two Figma-exported PNGs (cyan + white versions), both
// 168×52 with transparent backgrounds. Switches by `color` prop.
function BaveWordmark({ color = '#fff', height = 60 }) {
  const isWhite = color === '#fff' || color === 'white' || color === '#FFFFFF';
  const src = isWhite ? 'assets/bave-wordmark-white.png' : 'assets/bave-wordmark.png';
  return (
    <img
      src={src}
      alt="Bave"
      draggable={false}
      style={{
        height,
        width: 'auto',
        display: 'inline-block',
        userSelect: 'none',
      }}
    />
  );
}

// — Splash screen — covers entire viewport so it visually matches the
// pre-React HTML splash; the iPhone frame is only revealed after fade-out.
function SplashScreen({ onDone, duration = 1700 }) {
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), duration - 360);
    const t2 = setTimeout(() => onDone && onDone(), duration);
    return () => {clearTimeout(t1);clearTimeout(t2);};
  }, []);
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: '#37CEFF',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 360ms ease',
      opacity: fading ? 0 : 1,
      pointerEvents: fading ? 'none' : 'auto',
    }}>
      {/* Figma 스플래시: solid #37CEFF + centered Bavë wordmark, 52px height (native) */}
      <BaveWordmark color="#fff" height={52} />
    </div>);

}

// — Logo (rounded square mark)
function BaveLogo({ size = 64 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.32,
      background: 'linear-gradient(135deg, #6FB1F1, #4A98EA 60%, #2068B1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 10px 26px rgba(74,152,234,0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
      color: '#fff'
    }}>
      <svg viewBox="0 0 36 36" width={size * 0.6} height={size * 0.6} fill="none">
        <path d="M9 23c0-3 2-5 5-5h2c3 0 5 2 5 5v3H9v-3z" fill="#fff" opacity=".95" />
        <circle cx="14.5" cy="13" r="4.5" fill="#fff" />
        <path d="M22 16c1-1 2.5-1.5 3.5-1.5 1.6 0 2.8 1 2.8 2.5 0 2.2-3.4 4.7-6.3 5.5" fill="#fff" opacity=".85" />
      </svg>
    </div>);

}

// ───────────────────────── Home ─────────────────────────

function HomeScreen({ go, recentEntries, burnout, openBurnoutModal, onQuickRecord, onDiary }) {
  return (
    <div className="phone-scroll" style={{ height: '100%', overflow: 'auto', paddingBottom: 110, background: 'var(--bave-soft)' }}>
      {/* iOS status bar spacer — same white bg as nav bar (Figma's status bar
          area is on white background, not the page's #F8F9FB).
          Wrapper is sticky so the status bar + Bave nav bar stay fixed at
          the top while the body scrolls underneath. z-index 50 keeps it
          above the burnout popup overlay (z=40). */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50, background: '#fff',
      }}>
        <div style={{ height: 47 }}/>
        {/* Header — Bave wordmark + actions, white bar 56h */}
        <div style={{
          height: 56, padding: '0 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <BaveWordmark color="var(--bave-500)" height={24} />
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <IconBell size={22} style={{ color: 'var(--ink-900)' }} />
              <span style={{
                position: 'absolute', top: -2, right: -2,
                width: 8, height: 8, borderRadius: '50%',
                background: '#EF4444', border: '1.5px solid #fff',
              }}/>
            </div>
            <IconSettings size={22} style={{ color: 'var(--ink-900)' }} />
          </div>
        </div>
      </div>

      {/* Greeting — Figma: 24px SemiBold, gap 4, padding 24 top */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{
          fontSize: 24, fontWeight: 600, color: 'var(--ink-900)',
          letterSpacing: '-0.16px', lineHeight: '31.2px',
        }}>안녕하세요, 지영님!</div>
        <div style={{
          fontSize: 14, color: 'var(--ink-400)', fontWeight: 400,
          letterSpacing: '-0.16px', lineHeight: '21px', marginTop: 4,
        }}>오늘도 최선을 다하고 계시네요.</div>
      </div>

      {/* 01 — Today's encouragement card (yellow) */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{
          background: 'var(--warm-bg)',
          borderRadius: 16,
          padding: '20px 20px 16px',
          boxShadow: 'var(--shadow-soft)',
        }}>
          <div style={{
            fontSize: 13, fontWeight: 500, letterSpacing: '-0.16px', lineHeight: '18.2px',
            color: 'var(--warm-fg)',
          }}>
            🤖 <span style={{ color: 'var(--warm-fg2)' }}>오늘의 응원</span>
          </div>
          <div style={{
            marginTop: 10, fontSize: 16, color: 'var(--ink-900)',
            fontWeight: 400, lineHeight: '24px', letterSpacing: '-0.16px',
          }}>
            오늘 채이가 세 번이나 웃었네요. 부모님의 따뜻한 목소리 덕분이에요.
          </div>
        </div>
      </div>

      {/* 01b — Burnout alert (gradient yellow with border) */}
      {burnout >= 55 &&
      <div style={{ padding: '12px 16px 0' }}>
          <div onClick={openBurnoutModal} style={{
            background: 'linear-gradient(168deg, #FFFADF 0%, #FFF7CC 100%)',
            border: '1px solid var(--warm-border)',
            borderRadius: 16, padding: '15px 19px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ fontSize: 28, flexShrink: 0, lineHeight: '42px' }}>🌡</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: 'var(--warm-fg2)',
                letterSpacing: '-0.16px', lineHeight: '18.2px',
              }}>번아웃 지수가 높아졌어요</div>
              <div style={{
                fontSize: 12, fontWeight: 400, color: 'var(--warm-fg2)',
                letterSpacing: '-0.16px', lineHeight: '16.8px', marginTop: 2,
              }}>5분 케어 프로그램을 시작해볼까요?</div>
            </div>
            <div style={{
              fontSize: 13, fontWeight: 600, color: 'var(--warm-fg2)',
              letterSpacing: '-0.16px', flexShrink: 0,
            }}>확인 →</div>
          </div>
        </div>
      }

      {/* 02 — Today's record summary */}
      <div style={{ padding: '20px 0 0' }}>
        <h3 style={{
          margin: 0, padding: '0 20px',
          fontSize: 18, fontWeight: 600, color: 'var(--ink-900)',
          letterSpacing: '-0.16px', lineHeight: '25.2px',
        }}>📊 오늘의 기록</h3>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
          padding: '12px 16px 0',
        }}>
          <TodayStat emoji="🍚" value="3회" label="오늘"/>
          <TodayStat emoji="😴" value="11h" label="어제 밤"/>
          <TodayStat emoji="😊" value="좋음" label="평균"/>
        </div>
      </div>

      {/* 03 — Quick capture CTA (sky→cyan gradient) — Figma: card height 201px */}
      <div style={{ padding: '20px 16px 0' }}>
        <div onClick={onQuickRecord} style={{
          background: 'linear-gradient(150deg, #37CEFF 0%, #9BE8FF 100%)',
          borderRadius: 24, padding: 24,
          height: 201, position: 'relative',
          boxShadow: 'var(--shadow-cta)', cursor: 'pointer',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', left: 24, top: 24,
            width: 56, height: 56, borderRadius: 16,
            background: 'rgba(255,255,255,0.25)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IconCamera size={28} sw={2} /></div>
          <div style={{
            position: 'absolute', left: 24, top: 96, width: 298, height: 28,
            fontSize: 20, fontWeight: 600, color: '#fff',
            letterSpacing: '-0.16px', lineHeight: '28px',
          }}>📸 빠른 순간 기록</div>
          <div style={{
            position: 'absolute', left: 24, top: 132, width: 298, height: 45,
            fontSize: 15, color: 'rgba(255,255,255,0.9)', overflow: 'hidden',
            fontWeight: 400, lineHeight: '22.5px', letterSpacing: '-0.16px',
            wordBreak: 'break-all',  // Figma: break per character so only 요. wraps
          }}>사진 한 장이면 충분해요. AI가 알아서 정리해드릴게요.</div>
        </div>
      </div>

      {/* 04 — Recent diary */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          padding: '0 4px', marginBottom: 12,
        }}>
          <h3 style={{
            margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--ink-900)',
            letterSpacing: '-0.16px', lineHeight: '25.2px',
          }}>📝 최근 일기</h3>
          <button onClick={() => go('archive')} style={{
            background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
            color: 'var(--bave-link)', fontSize: 13, fontWeight: 500,
            letterSpacing: '-0.16px', lineHeight: '18.2px',
          }}>전체보기 ›</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {recentEntries.slice(0, 3).map((e, i) =>
            <DiaryRowSimple key={i} entry={e} onClick={() => go('archive')} />
          )}
        </div>
      </div>
    </div>);

}

function IconBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 38, height: 38, borderRadius: 12, border: 0,
      background: '#fff', color: 'var(--ink-700)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: 'var(--shadow-soft)'
    }}>{children}</button>);

}

function MiniStat({ icon, label, value, sub, tint, fg }) {
  return (
    <Card pad={14} style={{ borderRadius: 20 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10, background: tint, color: fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>{icon}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-500)', marginTop: 10 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink-900)', letterSpacing: '-0.02em', marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--ink-400)', marginTop: 2 }}>{sub}</div>
    </Card>);

}

// figma-style stat: emoji + sky value + small label (Figma 메인1)
function TodayStat({ emoji, value, label }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12, padding: 16,
      boxShadow: 'var(--shadow-soft)',
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
    }}>
      <div style={{ fontSize: 24, lineHeight: '36px' }}>{emoji}</div>
      <div style={{
        fontSize: 20, fontWeight: 600, color: 'var(--bave-500)',
        letterSpacing: '-0.16px', lineHeight: '28px',
      }}>{value}</div>
      <div style={{
        fontSize: 13, color: 'var(--ink-700)', fontWeight: 500,
        letterSpacing: '-0.16px', lineHeight: '18.2px',
      }}>{label}</div>
    </div>
  );
}

// figma-style diary row: date column / tag pills / preview (Figma 메인1)
function DiaryRowSimple({ entry, onClick }) {
  const relDate = entry.relDate || (entry.dateLabel?.split('·')[0]?.trim() || '오늘');
  const tags = entry.tags || [];
  return (
    <button onClick={onClick} style={{
      display: 'flex', gap: 12, alignItems: 'flex-start',
      padding: 17, borderRadius: 12,
      background: '#fff', border: '1px solid var(--ink-100)',
      width: '100%', textAlign: 'left', cursor: 'pointer',
    }}>
      <div style={{ width: 52, flexShrink: 0, paddingTop: 2 }}>
        <div style={{
          fontSize: 13, fontWeight: 500, color: 'var(--ink-700)',
          letterSpacing: '-0.16px', lineHeight: '18.2px',
        }}>{relDate}</div>
        <div style={{
          fontSize: 11, fontWeight: 500, color: 'var(--ink-400)',
          letterSpacing: '-0.16px', lineHeight: '15.4px', marginTop: 2,
        }}>{entry.when}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: 4, marginBottom: 6, flexWrap: 'wrap' }}>
            {tags.map((tag, i) => <TagPill key={i} kind={tag.kind}>{tag.label}</TagPill>)}
          </div>
        )}
        <div style={{
          fontSize: 14, color: 'var(--ink-700)', fontWeight: 400,
          letterSpacing: '-0.16px', lineHeight: '21px',
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
        }}>{entry.preview}</div>
      </div>
    </button>
  );
}

function TagPill({ kind = 'gray', children }) {
  const tones = {
    gray:   { bg: '#F1F3F7', fg: '#4A5163' },
    red:    { bg: '#FEE2E2', fg: '#DC2626' },
    green:  { bg: '#DCFCE7', fg: '#16A34A' },
    sky:    { bg: '#EBF3FD', fg: '#4297ED' },
    yellow: { bg: '#FEF3C7', fg: '#B45309' },
    purple: { bg: '#EAE4F7', fg: '#5E47AD' },
    pink:   { bg: '#FFE2EC', fg: '#B7427A' },
  };
  const t = tones[kind] || tones.gray;
  return (
    <span style={{
      padding: '2px 8px', borderRadius: 999,
      background: t.bg, color: t.fg,
      fontSize: 11, fontWeight: 500, letterSpacing: '-0.16px', lineHeight: '15.4px',
    }}>{children}</span>
  );
}

function DiaryRow({ entry, onClick }) {
  return (
    <Card pad={14} onClick={onClick} style={{ display: 'flex', gap: 14, alignItems: 'center', borderRadius: 20 }}>
      <EmotionFace kind={entry.emo} size={44} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{entry.title}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-400)' }}>{entry.when}</div>
        </div>
        <div style={{
          fontSize: 13, color: 'var(--ink-500)', marginTop: 3, lineHeight: 1.45,
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical'
        }}>{entry.preview}</div>
      </div>
      {entry.hasPhoto &&
      <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--ink-100)', flexShrink: 0, overflow: 'hidden' }}>
          <PhotoPlaceholder />
        </div>
      }
    </Card>);

}

function PhotoPlaceholder({ tint = 'rose' }) {
  const colors = {
    rose: ['#FFE3E8', '#FFC4CF'],
    sky: ['#DCEAFB', '#A8C8F0'],
    mint: ['#DDF1E7', '#A8E0C5'],
    cream: ['#FFF1D6', '#FFD89E'],
    plum: ['#EAE5F7', '#BFB0E3']
  };
  const [c1, c2] = colors[tint] || colors.rose;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(135deg, ${c1}, ${c2})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: 24
    }}>
      <svg viewBox="0 0 24 24" width="50%" height="50%" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="12" cy="10" r="3" />
        <path d="M5 19c1-4 4-6 7-6s6 2 7 6" />
      </svg>
    </div>);

}

// ───────────────────────── Quick capture (sheet) ─────────────────────────

// Figma 기록2 — single-screen quick capture modal with photo, AI categories, comment, time
function QuickCaptureSheet({ onClose, onSave }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('식사');
  const photoTint = 'sky';

  const categories = [
    { key: '식사', label: '🍚 식사' },
    { key: '수면', label: '😴 수면' },
    { key: '놀이', label: '🧸 놀이' },
    { key: '배변', label: '🚽 배변' },
  ];

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 90, zIndex: 100, background: '#fff',
      display: 'flex', flexDirection: 'column',
    }} className="slide-up">
      {/* iOS status bar spacer */}
      <div style={{ height: 47, background: '#fff', flexShrink: 0 }}/>
      {/* Header — Figma: 56h, 닫기 left, "빠른 기록" center, 저장 right */}
      <div style={{
        height: 56, padding: '0 16px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--ink-100)',
      }}>
        <button onClick={onClose} style={{
          height: 36, padding: '0 12px', borderRadius: 12, border: 0,
          background: 'transparent', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'inherit',
        }}>
          <IconClose size={18} style={{ color: 'var(--ink-700)' }}/>
          <span style={{
            fontSize: 15, fontWeight: 500, color: 'var(--ink-700)',
            letterSpacing: '-0.16px',
          }}>닫기</span>
        </button>
        <div style={{
          fontSize: 17, fontWeight: 600, color: 'var(--ink-900)',
          letterSpacing: '-0.16px', lineHeight: '25.5px',
        }}>빠른 기록</div>
        <button onClick={() => onSave({ category, emo: 'joy', text, photoTint })} style={{
          height: 36, padding: '0 14px', borderRadius: 12, border: 0,
          background: 'var(--bave-500)', color: '#fff',
          fontSize: 15, fontWeight: 600, cursor: 'pointer',
          letterSpacing: '-0.16px', fontFamily: 'inherit',
        }}>저장</button>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        {/* Photo preview — Figma: 346×346 square, rounded-16, padding-top 8 */}
        <div style={{ padding: '8px 16px 0' }}>
          <div style={{
            height: 346, borderRadius: 16, overflow: 'hidden',
            background: 'var(--ink-100)', position: 'relative',
          }}>
            <img src="assets/quick-capture-photo.jpg" alt="" draggable={false}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover',
              }}/>
          </div>
        </div>

        {/* Re-take / Gallery row — Figma: LEFT-aligned (no justify-content), gap 12 */}
        <div style={{
          padding: '12px 16px 0', display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <button style={{
            background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 13, fontWeight: 500, color: 'var(--bave-500)',
            letterSpacing: '-0.16px', fontFamily: 'inherit',
          }}>
            <IconCamera size={14}/> 다시 찍기
          </button>
          <span style={{ color: 'var(--ink-200)', fontSize: 13 }}>|</span>
          <button style={{
            background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 13, fontWeight: 500, color: 'var(--bave-500)',
            letterSpacing: '-0.16px', fontFamily: 'inherit',
          }}>
            <IconImage size={14}/> 갤러리에서 선택
          </button>
        </div>

        {/* AI category recommendations */}
        <div style={{ padding: '24px 16px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
          }}>
            <span style={{
              fontSize: 13, fontWeight: 500, color: 'var(--ink-700)',
              letterSpacing: '-0.16px', lineHeight: '18.2px',
            }}>AI가 추천한 카테고리</span>
            <span style={{
              padding: '2px 8px', borderRadius: 999,
              background: '#EBF3FD', color: 'var(--bave-link)',
              fontSize: 11, fontWeight: 500,
              letterSpacing: '-0.16px', lineHeight: '15.4px',
            }}>✨ AI</span>
          </div>
          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            {categories.map((c) => {
              const active = category === c.key;
              return (
                <button key={c.key} onClick={() => setCategory(c.key)} style={{
                  flex: 1, minWidth: 0,
                  height: 36, padding: '0 8px', borderRadius: 999, border: 0,
                  background: active ? 'var(--bave-500)' : 'var(--ink-100)',
                  color: active ? '#fff' : 'var(--ink-700)',
                  fontSize: 14, fontWeight: 500, cursor: 'pointer',
                  letterSpacing: '-0.16px', lineHeight: '21px', fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                }}>{c.label}</button>
              );
            })}
          </div>
        </div>

        {/* Comment textarea */}
        <div style={{ padding: '24px 16px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8,
          }}>
            <span style={{
              fontSize: 13, fontWeight: 500, color: 'var(--ink-700)',
              letterSpacing: '-0.16px', lineHeight: '18.2px',
            }}>코멘트 (선택)</span>
            <span style={{
              fontSize: 13, fontWeight: 500, color: 'var(--ink-400)',
              letterSpacing: '-0.16px', lineHeight: '18.2px',
            }}>{text.length}/30</span>
          </div>
          <div style={{ position: 'relative' }}>
            <textarea
              value={text}
              onChange={e => setText(e.target.value.slice(0, 30))}
              placeholder="예: 편식하지 않고 잘 먹음, 신나게 놀았어요"
              style={{
                width: '100%', minHeight: 85,
                borderRadius: 12, padding: '16px 44px 16px 16px',
                fontSize: 15, lineHeight: '22.5px',
                border: '1px solid var(--ink-200)', background: 'var(--bave-soft)',
                color: 'var(--ink-900)', resize: 'none', outline: 'none',
                letterSpacing: '-0.15px', fontFamily: 'inherit',
              }}
            />
            <button style={{
              position: 'absolute', right: 10, bottom: 10,
              width: 32, height: 32, borderRadius: 8, border: 0,
              background: 'transparent', color: 'var(--ink-500)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><IconMic size={18}/></button>
          </div>
        </div>

        {/* Time row — Figma: top=632.08 within body, h=24 (no pb, pt~16 from comment) */}
        <div style={{
          padding: '16px 16px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontSize: 13, fontWeight: 500, color: 'var(--ink-700)',
            letterSpacing: '-0.16px', lineHeight: '18.2px',
          }}>시간</span>
          <button style={{
            background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
            fontSize: 16, fontWeight: 400, color: 'var(--ink-900)',
            letterSpacing: '-0.16px', lineHeight: '24px', fontFamily: 'inherit',
          }}>오늘 12:30 ▼</button>
        </div>
      </div>
    </div>
  );

}

function SheetTitle({ children }) {
  return <h2 style={{ margin: '8px 0 0', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink-900)', lineHeight: 1.3 }}>{children}</h2>;
}

function StepDots({ count, active }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: count }).map((_, i) =>
      <div key={i} style={{
        flex: 1, height: 4, borderRadius: 4,
        background: i <= active ? 'var(--bave-500)' : 'var(--ink-200)',
        transition: 'all 220ms ease'
      }} />
      )}
    </div>);

}

function EmotionGrid({ value, onChange, compact }) {
  return (
    <div style={{
      marginTop: 16, display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: compact ? 10 : 14
    }}>
      {EMOTIONS.map((em) => {
        const active = value === em.key;
        return (
          <button key={em.key} onClick={() => onChange(em.key)} style={{
            border: 0, background: active ? 'var(--bave-50)' : 'transparent',
            borderRadius: 18, padding: '10px 4px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            boxShadow: active ? 'inset 0 0 0 1.5px var(--bave-400)' : 'none',
            transition: 'all 150ms ease'
          }}>
            <EmotionFace kind={em.key} size={compact ? 48 : 56} animate={active} />
            <div style={{ fontSize: 12, fontWeight: 600, color: active ? 'var(--bave-700)' : 'var(--ink-700)' }}>{em.label}</div>
          </button>);

      })}
    </div>);

}

// — Bottom sheet wrapper
function Sheet({ children, onClose }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 30,
      background: 'rgba(15,30,55,0.32)',
      backdropFilter: 'blur(2px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
    }} onClick={onClose}>
      <div className="slide-up" onClick={(e) => e.stopPropagation()} style={{
        background: '#F6F8FB', borderRadius: '28px 28px 0 0',
        padding: '14px 0 34px', maxHeight: '88%', minHeight: '60%',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -10px 40px rgba(15,30,55,0.18)'
      }}>
        <div style={{ width: 38, height: 5, background: 'var(--ink-300)', borderRadius: 4, margin: '0 auto 12px' }} />
        {children}
      </div>
    </div>);

}

Object.assign(window, {
  Card, SectionLabel, PrimaryButton, GhostButton, PageHeader, BurnoutGauge,
  OnboardingScreen, HomeScreen, IconBtn, MiniStat, TodayStat, DiaryRow, DiaryRowSimple, TagPill, PhotoPlaceholder,
  QuickCaptureSheet, SheetTitle, StepDots, EmotionGrid, Sheet, BaveLogo,
  BaveWordmark, SplashScreen,
  inputStyle, Field, SegBtn, ValueRow
});