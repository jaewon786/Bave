// bave-screens-3.jsx — Figma-faithful Login, My, Emotion Diary, Insight, Burnout Modal
const { useState: useState3, useMemo: useMemo3 } = React;

// ───────────────────────── Login ─────────────────────────

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState3('');
  const [pw, setPw] = useState3('');
  return (
    <div className="phone-scroll" style={{
      height: '100%', overflow: 'auto', background: '#fff',
      display: 'flex', flexDirection: 'column', position: 'relative',
      fontFamily: "Inter, 'Noto Sans KR', Pretendard, sans-serif",
    }}>
      {/* iOS status bar spacer */}
      <div style={{ height: 47 }}/>
      {/* Wordmark — Figma: top=207, center vertically at y=233 (52h, w=168) */}
      <div style={{ paddingTop: 160, display: 'flex', justifyContent: 'center' }}>
        <BaveWordmark color="var(--bave-500)" height={52}/>
      </div>

      {/* Form — Figma: top=335 (gap 76 from wordmark bottom), w=343, gap 15, 40h, rounded 8 */}
      <div style={{
        padding: '76px 25px 0', display: 'flex', flexDirection: 'column', gap: 15,
      }}>
        <input
          value={email} onChange={e => setEmail(e.target.value)}
          placeholder="이메일 또는 아이디"
          style={{ ...loginInputStyle, borderColor: '#DADADA', fontWeight: 500 }}
        />
        <input
          type="password" value={pw} onChange={e => setPw(e.target.value)}
          placeholder="비밀번호"
          style={{ ...loginInputStyle, borderColor: '#E0E0E0', fontWeight: 400 }}
        />
        <button onClick={onLogin} style={{
          height: 40, borderRadius: 8, border: 0,
          background: 'var(--bave-500)',
          color: '#fff', fontSize: 14, fontWeight: 400,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>로그인</button>
        <button onClick={onLogin} style={{
          height: 40, borderRadius: 8, border: 0,
          background: 'transparent',
          color: 'var(--ink-900)', fontSize: 14, fontWeight: 500,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>회원가입</button>

        {/* Divider with 아이디/비밀번호 찾기 */}
        <div style={{
          height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 0, fontSize: 11, color: 'var(--ink-900)', position: 'relative',
          fontWeight: 400,
        }}>
          <span style={{ padding: '0 30px 0 0' }}>아이디 찾기</span>
          <span style={{
            width: 1, height: 12, background: '#DCDCDC', display: 'inline-block',
          }}/>
          <span style={{ padding: '0 0 0 30px' }}>비밀번호 찾기</span>
        </div>
      </div>

      <div style={{ flex: 1 }}/>

      {/* Social divider — "3초 만에 시작하기" cyan link with side lines */}
      <div style={{ padding: '0 25px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 1, background: '#E4E7EE' }}/>
          <span style={{
            fontSize: 11, color: 'var(--bave-500)', whiteSpace: 'nowrap', fontWeight: 400,
          }}>3초 만에 시작하기</span>
          <div style={{ flex: 1, height: 1, background: '#E4E7EE' }}/>
        </div>
      </div>

      {/* Social buttons — Figma: 4×38px circles with 25px gap (Frame30 = 227w),
          order Kakao → Naver → Google → Apple.
          Figma Frame30 top=687 ends at 725 in 852h page → padding-bottom 127. */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 25,
        padding: '14px 24px 127px',
      }}>
        <SocialBtn bg="#FEE500">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#3C1E1E"><path d="M12 4C6.5 4 2 7.6 2 12c0 2.8 1.9 5.3 4.8 6.7l-1 3.4 3.9-2.5c.7.1 1.5.2 2.3.2 5.5 0 10-3.6 10-8s-4.5-7.8-10-7.8z"/></svg>
        </SocialBtn>
        <SocialBtn bg="#03C75A">
          {/* Naver brand 'N' — three solid blocks (left vert + diagonal + right vert)
              gives uniform stroke thickness across all parts. */}
          <svg viewBox="0 0 24 24" width="18" height="18">
            <rect x="3" y="3" width="6" height="18" fill="#fff"/>
            <polygon points="3,3 9,3 21,21 15,21" fill="#fff"/>
            <rect x="15" y="3" width="6" height="18" fill="#fff"/>
          </svg>
        </SocialBtn>
        <SocialBtn bg="#fff" border>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22 12.2c0-.8-.1-1.4-.2-2H12v3.8h5.6c-.1.9-.8 2.4-2.3 3.4l3.5 2.8c2.1-2 3.2-4.9 3.2-8z"/>
            <path fill="#34A853" d="M12 22c3 0 5.5-1 7.3-2.8l-3.5-2.8c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.3-1.9-6.2-4.5l-3.7 2.8C3.9 19.5 7.6 22 12 22z"/>
            <path fill="#FBBC05" d="M5.8 13.5c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2L2.1 6.3C1.4 7.7 1 9.3 1 11s.4 3.3 1.1 4.7l3.7-2.2z"/>
            <path fill="#EA4335" d="M12 5.4c2 0 3.4.9 4.2 1.6L19.4 4C17.5 2.2 14.9 1 12 1 7.6 1 3.9 3.5 2.1 7.3l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4z"/>
          </svg>
        </SocialBtn>
        <SocialBtn bg="#000">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M18 17c-.4 1-.9 1.9-1.5 2.7-.8 1.1-1.8 1.8-2.8 1.8-1 0-1.6-.3-2.8-.3-1.1 0-1.8.3-2.8.3-1 0-2.1-.7-2.9-1.8-2.1-3-2.4-7.7-1-10.6.7-1.4 2-2.3 3.4-2.3 1 0 2 .3 2.7.3.7 0 1.9-.4 3-.4 1.4 0 2.8.7 3.6 1.9-3.2 1.7-2.7 6.3 1 7.3l.1.1zM14 4.3c.6-.7 1-1.6 1-2.6 0-.1 0-.3-.1-.4-1 0-2.1.6-2.7 1.4-.5.6-1 1.6-.9 2.5 1.1.1 2.1-.5 2.7-1.1z"/></svg>
        </SocialBtn>
      </div>
    </div>
  );
}

const loginInputStyle = {
  height: 40, borderRadius: 8,
  padding: '0 17px', fontSize: 14,
  border: '1px solid #DADADA', background: '#fff',
  color: 'var(--ink-900)', outline: 'none',
  fontFamily: "Inter, 'Noto Sans KR', Pretendard, sans-serif",
};

function SocialBtn({ bg, border, children }) {
  return (
    <button style={{
      width: 38, height: 38, borderRadius: '50%', border: 0,
      background: bg, cursor: 'pointer', padding: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: border ? 'inset 0 0 0 1px var(--ink-200)' : 'none',
    }}>{children}</button>
  );
}

// ───────────────────────── My ─────────────────────────

function MyScreen({ onLogout }) {
  return (
    <div className="phone-scroll" style={{ height: '100%', overflow: 'auto', paddingBottom: 110, background: 'var(--bave-soft)' }}>
      {/* iOS status bar spacer */}
      <div style={{ height: 47, background: '#fff' }}/>
      {/* Header — Figma: 56h, white, border-b, "마이" center 20px */}
      <div style={{
        height: 56, background: '#fff', borderBottom: '1px solid var(--ink-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <h1 style={{
          margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--ink-900)',
          letterSpacing: '-0.16px', lineHeight: '28px',
        }}>마이</h1>
      </div>

      {/* Profile card — Figma: white card 112h, avatar 64 round bg #E2F9FE, 수정 button */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: '#fff', borderRadius: 20, padding: 24,
          boxShadow: 'var(--shadow-soft)',
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--bave-100)', color: 'var(--bave-500)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 600, flexShrink: 0,
            letterSpacing: '-0.52px', lineHeight: '26px',
          }}>지</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 20, fontWeight: 600, color: 'var(--ink-900)',
              letterSpacing: '-0.16px', lineHeight: '26px',
            }}>김지영</div>
            <div style={{
              fontSize: 15, fontWeight: 400, color: 'var(--ink-700)',
              letterSpacing: '-0.16px', lineHeight: '21px', marginTop: 4,
            }}>엄마 · 채이 보호자</div>
          </div>
          <button style={{
            height: 32, padding: '0 12px', borderRadius: 8, border: 0,
            background: 'var(--ink-100)', color: 'var(--ink-700)',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            letterSpacing: '-0.16px', fontFamily: 'inherit',
          }}>수정</button>
        </div>
      </div>

      {/* Premium card — gradient #37CEFF → #9BE8FF */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          padding: 20, borderRadius: 16,
          background: 'linear-gradient(163deg, var(--bave-500) 0%, var(--bave-300) 100%)',
          color: '#fff', cursor: 'pointer',
          boxShadow: '0px 8px 12px rgba(66,151,237,0.32)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.9)',
              letterSpacing: '0.12px', lineHeight: '16.8px',
            }}>💎 Premium 무료 체험 중</div>
            <div style={{
              fontSize: 18, fontWeight: 600, color: '#fff',
              letterSpacing: '-0.16px', lineHeight: '23.4px', marginTop: 4,
            }}>잔여 7일</div>
            <div style={{
              fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.72)',
              letterSpacing: '-0.16px', lineHeight: '16.8px', marginTop: 4,
            }}>체험 종료 후 월 9,900원</div>
          </div>
          <IconChevronRight size={24} style={{ color: '#fff' }}/>
        </div>
      </div>

      {/* Sections */}
      <SettingsGroup title="계정 정보">
        <SettingsRow icon={<IconUser size={18}/>}>프로필 수정</SettingsRow>
        <SettingsRow icon={<IconBaby size={18}/>}>아이 정보 관리</SettingsRow>
        <SettingsRow icon={<TwoPeopleIcon/>}>부부 계정 연동</SettingsRow>
        <SettingsRow icon={<DBIcon/>} last>데이터 백업/내보내기</SettingsRow>
      </SettingsGroup>

      <SettingsGroup title="고객센터">
        <SettingsRow icon={<ChatIcon/>} right={<PremiumPill/>}>전문가와 대화하기</SettingsRow>
        <SettingsRow icon={<PhoneIcon/>} right={<span style={{
          color: 'var(--bave-500)', fontSize: 13, fontWeight: 500,
          letterSpacing: '0.13px', lineHeight: '19.5px',
        }}>1393, 129</span>}>위기 시 상담전화</SettingsRow>
        <SettingsRow icon={<QuestionIcon/>} last>자주 묻는 질문</SettingsRow>
      </SettingsGroup>

      <SettingsGroup title="서비스 설정">
        <SettingsRow icon={<DocIcon/>}>개인정보 처리방침</SettingsRow>
        <SettingsRow icon={<DocIcon/>}>서비스 약관</SettingsRow>
        <SettingsRow icon={<LogoutIcon/>} red last noChevron onClick={onLogout}>로그아웃</SettingsRow>
      </SettingsGroup>

      <div style={{
        padding: '24px 16px 12px', textAlign: 'center',
        fontSize: 12, color: '#C5CAD5', fontWeight: 400,
        letterSpacing: '0.12px', lineHeight: '16.8px',
      }}>
        Bave v1.0.0 · made with hnulion
      </div>
    </div>
  );
}

function SettingsGroup({ title, children }) {
  return (
    <div style={{ padding: '24px 16px 0' }}>
      <div style={{
        fontSize: 13, fontWeight: 600, color: 'var(--ink-400)', marginBottom: 8, paddingLeft: 20,
        letterSpacing: '-0.13px', lineHeight: '18.2px',
      }}>{title}</div>
      <div style={{
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        boxShadow: '0px 1px 4px rgba(31,34,48,0.06)',
      }}>
        {children}
      </div>
    </div>
  );
}

function SettingsRow({ icon, children, right, red, last, noChevron, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', height: 56, padding: '0 16px 0 20px', border: 0, background: 'transparent',
      display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
      borderBottom: last ? 'none' : '1px solid var(--ink-100)',
      fontFamily: 'inherit',
    }}>
      <div style={{
        width: 20, height: 20,
        color: red ? '#EF4444' : 'var(--ink-700)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</div>
      <div style={{
        flex: 1, textAlign: 'left',
        fontSize: 16, fontWeight: 400,
        color: red ? '#EF4444' : 'var(--ink-900)',
        letterSpacing: '-0.16px', lineHeight: '22.4px',
      }}>{children}</div>
      {right ? right : (noChevron ? null : <IconChevronRight size={18} style={{ color: 'var(--ink-300)' }}/>)}
    </button>
  );
}

function PremiumPill() {
  return (
    <span style={{
      padding: '0 8px', height: 20, lineHeight: '20px',
      borderRadius: 999,
      background: 'linear-gradient(161deg, var(--bave-500) 0%, var(--bave-300) 100%)',
      color: '#fff',
      fontSize: 10, fontWeight: 600, letterSpacing: '0.2px',
    }}>Premium</span>
  );
}

// tiny inline icons for settings
const TwoPeopleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/>
    <path d="M3 19c0-3 3-5 6-5s6 2 6 5"/><path d="M15 18c.5-2 2-3 4-3s3 1 3 3"/>
  </svg>
);
const DBIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a8 8 0 11-3.4-6.6L21 4l-1.4 3.4A8 8 0 0121 12z"/>
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1l-1.3 1.3a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/>
  </svg>
);
const QuestionIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2 2-2.5 3v1"/><circle cx="12" cy="16.5" r=".5" fill="currentColor"/>
  </svg>
);
const DocIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/>
  </svg>
);
const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>
  </svg>
);

// ───────────────────────── Emotion Diary (figma) ─────────────────────────

const FIGMA_EMOTIONS = [
  { key: 'joy',      label: '기쁨',    emoji: '😊' },
  { key: 'tired',    label: '지침',    emoji: '😴' },
  { key: 'guilty',   label: '죄책감',  emoji: '😔' },
  { key: 'anxious',  label: '불안',    emoji: '😟' },
  { key: 'angry',    label: '짜증',    emoji: '😣' },
  { key: 'proud',    label: '보람',    emoji: '💛' },
  { key: 'numb',     label: '무기력',  emoji: '😶' },
  { key: 'calm',     label: '평온',    emoji: '🌿' },
];

function EmotionDiaryScreen({ onClose, onSave }) {
  const [emo, setEmo] = useState3('');  // no default selection
  const [text, setText] = useState3('');
  // Figma 기록1 reference photos (3 actual images from the design file)
  const photos = ['assets/diary-photo-1.jpg', 'assets/diary-photo-2.jpg', 'assets/diary-photo-3.jpg'];
  const canSave = !!emo;
  return (
    <div className="phone-scroll" style={{ height: '100%', overflow: 'auto', paddingBottom: 100, background: '#fff' }}>
      {/* iOS status bar spacer */}
      <div style={{ height: 47, background: '#fff' }}/>
      {/* Header — Figma: 56h, white, border-b #F1F3F7 */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10, background: '#fff',
        height: 56, padding: '0 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--ink-100)',
      }}>
        <button onClick={onClose} style={{
          height: 40, padding: '0 8px 0 8px', borderRadius: 12, border: 0,
          background: 'transparent', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'inherit',
        }}>
          <IconClose size={18} style={{ color: 'var(--ink-700)' }}/>
          <span style={{
            fontSize: 15, fontWeight: 500, color: 'var(--ink-700)',
            letterSpacing: '-0.15px',
          }}>닫기</span>
        </button>
        <div style={{
          fontSize: 16, fontWeight: 600, color: 'var(--ink-900)',
          letterSpacing: '-0.16px', lineHeight: '20.8px',
        }}>감정 일기</div>
        <button
          onClick={() => canSave && onSave({ emo, text })}
          disabled={!canSave}
          style={{
            height: 36, padding: '0 14px', borderRadius: 12, border: 0,
            background: canSave ? 'var(--bave-500)' : 'var(--ink-200)',
            color: canSave ? '#fff' : 'var(--ink-400)',
            fontSize: 15, fontWeight: 600,
            cursor: canSave ? 'pointer' : 'default',
            letterSpacing: '-0.16px', fontFamily: 'inherit',
          }}>저장</button>
      </div>

      {/* Title — 24px SemiBold, 2 lines */}
      <div style={{ padding: '28px 20px 0' }}>
        <h2 style={{
          margin: 0, fontSize: 24, fontWeight: 600,
          letterSpacing: '-0.16px', lineHeight: '31.2px', color: 'var(--ink-900)',
        }}>
          오늘 하루,<br/>어떤 감정이 컸나요?
        </h2>
      </div>

      {/* Emotion pills — 4 cols × 2 rows, each 81×44 rounded-999, gap 7.5/8 */}
      <div style={{ padding: '24px 15.75px 0' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          columnGap: 7.5, rowGap: 8,
        }}>
          {FIGMA_EMOTIONS.map(em => {
            const active = emo === em.key;
            return (
              <button key={em.key} onClick={() => setEmo(em.key)} style={{
                height: 44, borderRadius: 999, border: 0,
                background: active ? 'var(--bave-100)' : 'var(--ink-100)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                cursor: 'pointer', padding: 0,
                boxShadow: active ? 'inset 0 0 0 1.5px var(--bave-400)' : 'none',
                transition: 'all 150ms ease',
                fontFamily: 'inherit',
              }}>
                <span style={{ fontSize: 16, lineHeight: '16px' }}>{em.emoji}</span>
                <span style={{
                  fontSize: 14, fontWeight: 500,
                  color: active ? 'var(--bave-700)' : 'var(--ink-700)',
                  letterSpacing: '-0.16px', lineHeight: '14px',
                }}>{em.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Photos — Figma: label + add-slot + 3 real photos, 80×80 rounded-12, gap 8 */}
      <div style={{ padding: '28px 16px 0' }}>
        <div style={{
          fontSize: 13, fontWeight: 500, color: 'var(--ink-700)', marginBottom: 10,
          letterSpacing: '-0.16px', lineHeight: '18.2px',
        }}>
          오늘의 사진 <span style={{ color: 'var(--ink-400)' }}>(선택)</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            width: 80, height: 80, borderRadius: 12, flexShrink: 0,
            border: '1px dashed var(--ink-400)', background: 'var(--bave-soft)',
            color: 'var(--ink-400)', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
            padding: 0,
          }}>
            <IconPlus size={20}/>
            <span style={{
              fontSize: 10, fontWeight: 500,
              letterSpacing: '-0.16px', lineHeight: '10px',
            }}>사진 추가</span>
          </button>
          {photos.map((p, i) => (
            <div key={i} style={{
              width: 80, height: 80, borderRadius: 12,
              overflow: 'hidden', flexShrink: 0, position: 'relative',
            }}>
              <img src={p} alt="" draggable={false} style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', borderRadius: 12,
              }}/>
              <button style={{
                position: 'absolute', top: 4, right: 4,
                width: 20, height: 20, borderRadius: '50%', border: 0,
                background: 'rgba(17,20,28,0.6)', color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 0,
              }}><IconClose size={11}/></button>
            </div>
          ))}
        </div>
      </div>

      {/* Text — label + voice link + textarea bg #F8F9FB */}
      <div style={{ padding: '24px 16px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10,
        }}>
          <div style={{
            fontSize: 13, fontWeight: 500, color: 'var(--ink-700)',
            letterSpacing: '-0.16px', lineHeight: '18.2px',
          }}>하고 싶은 말</div>
          <button style={{
            background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'inherit',
          }}>
            <IconMic size={14} style={{ color: 'var(--bave-500)' }}/>
            <span style={{
              fontSize: 13, fontWeight: 500, color: 'var(--bave-500)',
              letterSpacing: '-0.16px',
            }}>음성으로 쓰기</span>
          </button>
        </div>
        <textarea
          value={text} onChange={e => setText(e.target.value)}
          placeholder={`지영님, 오늘 하루 어떠셨어요?\n잘한 일도, 후회되는 일도,\n편하게 적어주세요.`}
          style={{
            width: '100%', minHeight: 200, borderRadius: 12,
            padding: 16, fontSize: 16, lineHeight: '25.6px',
            border: '1px solid var(--ink-200)', background: 'var(--bave-soft)',
            color: 'var(--ink-900)', resize: 'none', outline: 'none',
            letterSpacing: '-0.16px', fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Bottom hint — 11px gray center */}
      <div style={{
        marginTop: 20, padding: '0 20px',
        fontSize: 11, color: 'var(--ink-400)', textAlign: 'center', fontWeight: 500,
        letterSpacing: '-0.16px', lineHeight: '16.5px',
      }}>
        💛 솔직한 감정을 표현해주세요. 누구도 보지 않아요.
      </div>
    </div>
  );
}

// ───────────────────────── Insight (figma) ─────────────────────────

function InsightScreen({ go }) {
  const [metric, setMetric] = useState3('weight');
  const [period, setPeriod] = useState3('이번 주');

  return (
    <div className="phone-scroll" style={{ height: '100%', overflow: 'auto', paddingBottom: 110, background: 'var(--bave-soft)' }}>
      {/* iOS status bar spacer */}
      <div style={{ height: 47, background: '#fff' }}/>
      {/* Header — Figma: 56h white border-b, title centered, "이번 주 ▼" right */}
      <div style={{
        height: 56, background: '#fff', borderBottom: '1px solid var(--ink-100)',
        padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ width: 75 }}/>
        <h1 style={{
          margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--ink-900)',
          letterSpacing: '-0.16px', lineHeight: '28px',
        }}>인사이트</h1>
        <button style={{
          height: 32, padding: '0 12px', borderRadius: 8, border: 0,
          background: 'var(--bave-100)', color: 'var(--bave-500)',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          letterSpacing: '-0.16px', lineHeight: '19.5px', fontFamily: 'inherit',
        }}>
          {period} ▼
        </button>
      </div>

      {/* Intro encouragement card — gradient sky → white, rounded-20 */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: 'linear-gradient(180deg, var(--bave-100) 0%, #fff 100%)',
          borderRadius: 20, padding: 24, boxShadow: 'var(--shadow-soft)',
          display: 'flex', gap: 16, alignItems: 'flex-start',
        }}>
          <div style={{ fontSize: 32, lineHeight: '38.4px' }}>💛</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 18, fontWeight: 600, color: 'var(--ink-900)',
              letterSpacing: '-0.16px', lineHeight: '25.2px',
            }}>지영님 잘 키우고 계세요!</div>
            <div style={{
              fontSize: 18, fontWeight: 600, color: 'var(--ink-900)',
              letterSpacing: '-0.16px', lineHeight: '25.2px',
            }}>이번 주 채이는 정상 발달 범위에서 쑥쑥 잘 자랐어요.</div>
          </div>
        </div>
      </div>

      {/* 발달 지표 */}
      <div style={{ padding: '24px 16px 0' }}>
        <h3 style={{
          margin: '0 0 12px', fontSize: 20, fontWeight: 600, color: 'var(--ink-900)',
          letterSpacing: '-0.16px', lineHeight: '28px',
        }}>📈 발달 지표</h3>
        {/* Tabs row outside card */}
        <div style={{
          display: 'flex', borderBottom: '1px solid var(--ink-200)', background: 'transparent',
        }}>
          {[['height','키'],['weight','체중'],['meals','식사'],['sleep','수면']].map(([k, l]) => (
            <button key={k} onClick={() => setMetric(k)} style={{
              flex: 1, height: 40, border: 0, background: 'transparent',
              fontSize: 14, fontWeight: metric === k ? 600 : 400,
              color: metric === k ? 'var(--bave-500)' : 'var(--ink-700)',
              cursor: 'pointer', position: 'relative',
              borderBottom: metric === k ? '2px solid var(--bave-500)' : '2px solid transparent',
              letterSpacing: '-0.14px', fontFamily: 'inherit',
            }}>
              {l}
            </button>
          ))}
        </div>
        {/* Chart card */}
        <div style={{
          background: '#fff', borderRadius: '0 0 16px 16px',
          boxShadow: 'var(--shadow-soft)', padding: 16,
        }}>
          <GrowthChart metric={metric}/>
          {/* Legend */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8,
            fontSize: 11, color: 'var(--ink-400)', fontWeight: 500,
            letterSpacing: '-0.16px', lineHeight: '16.5px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 20, height: 4, background: 'var(--bave-500)', borderRadius: 2 }}/>
              채이 (kg)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 20, height: 10, borderRadius: 3,
                border: '1px dashed #ABCFF7', background: 'rgba(66,151,237,0.12)',
              }}/>
              정상 범위
            </div>
          </div>
          <div style={{
            marginTop: 14, padding: '10px 14px', borderRadius: 10,
            background: 'var(--bave-soft)',
          }}>
            <span style={{
              fontSize: 13, fontWeight: 500, color: 'var(--ink-700)',
              letterSpacing: '-0.16px', lineHeight: '18.2px',
            }}>📊 정상 범위 안에 있어요. 안심하세요.</span>
          </div>
        </div>
      </div>

      {/* 부모님 마음 추이 */}
      <div style={{ padding: '24px 16px 0' }}>
        <h3 style={{
          margin: '0 0 12px', fontSize: 20, fontWeight: 600, color: 'var(--ink-900)',
          letterSpacing: '-0.16px', lineHeight: '28px',
        }}>🌡 부모님 마음 추이</h3>
        <div style={{
          background: '#fff', borderRadius: 16,
          boxShadow: 'var(--shadow-soft)', padding: '20px 20px 17px',
        }}>
          <ParentMoodChart/>
          <div style={{
            marginTop: 14, fontSize: 15, color: 'var(--ink-700)', fontWeight: 400,
            letterSpacing: '-0.16px', lineHeight: '22.5px',
          }}>
            이번 주 수요일부터 좀 힘드셨나봐요. 푹 쉬셨길 바라요.
          </div>
        </div>
      </div>

      {/* AI 코멘트 — yellow bg */}
      <div style={{ padding: '24px 16px 0' }}>
        <div style={{
          background: 'var(--warm-bg)', borderRadius: 16,
          boxShadow: 'var(--shadow-soft)', padding: 20,
        }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: 'var(--warm-fg)',
            letterSpacing: '-0.16px', lineHeight: '18.2px',
          }}>🤖 AI 코멘트</div>
          <div style={{ marginTop: 16 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: 'var(--ink-700)',
              letterSpacing: '-0.16px', lineHeight: '18.2px',
            }}>지난주 분석</div>
            <div style={{
              marginTop: 8, fontSize: 16, color: 'var(--ink-900)', fontWeight: 400,
              letterSpacing: '-0.16px', lineHeight: '24px',
            }}>
              이번 주는 떼쓰기가 평소보다 많았어요. 5세는 자아가 강해지는 시기라 자연스러운 발달이에요.
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--ink-100)', margin: '16px 0' }}/>
          <div>
            <div style={{
              fontSize: 13, fontWeight: 600, color: 'var(--ink-700)',
              letterSpacing: '-0.16px', lineHeight: '18.2px',
            }}>다음 주 양육 팁</div>
            <div style={{
              marginTop: 8, fontSize: 16, color: 'var(--ink-900)', fontWeight: 400,
              letterSpacing: '-0.16px', lineHeight: '24px',
            }}>
              다음 주는 호기심이 폭발할 시기예요. '왜?' 라는 질문에 천천히 답해주세요.
            </div>
          </div>
        </div>
      </div>

      {/* Share — light sky bg, link blue text */}
      <div style={{ padding: '20px 16px 0' }}>
        <button style={{
          width: '100%', height: 56, borderRadius: 16, border: 0,
          background: '#EBF3FD', color: 'var(--bave-link)',
          fontSize: 16, fontWeight: 600, cursor: 'pointer',
          letterSpacing: '-0.16px', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <ShareIcon/> 👫 배우자에게 공유하기
        </button>
      </div>
    </div>
  );
}

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/>
    <path d="M8 11l8-4M8 13l8 4"/>
  </svg>
);

function GrowthChart({ metric }) {
  const data = {
    height:  [108, 108.2, 108, 108.4, 108.3, 108.6, 108.5],
    weight:  [15.8, 15.9, 15.7, 16.0, 15.9, 16.1, 16.0],
    meals:   [3, 3, 2, 3, 3, 3, 2],
    sleep:   [10, 10.5, 9.5, 11, 10.8, 11.2, 11],
  }[metric];
  const ranges = {
    height: { min: 105, max: 112, band: [106, 111], unit: 'cm' },
    weight: { min: 13, max: 19, band: [14.5, 17.5], unit: 'kg' },
    meals:  { min: 0, max: 5, band: [2, 4], unit: '회' },
    sleep:  { min: 7, max: 13, band: [9, 12], unit: 'h' },
  }[metric];
  const days = ['월','화','수','목','금','토','일'];
  const w = 280, h = 180;
  const xPad = 28, yPad = 14;
  const cw = w - xPad, ch = h - yPad - 18;
  const xFor = i => xPad + (i / (data.length - 1)) * cw;
  const yFor = v => yPad + (1 - (v - ranges.min) / (ranges.max - ranges.min)) * ch;
  const bandY1 = yFor(ranges.band[1]);
  const bandY2 = yFor(ranges.band[0]);

  const yTicks = [];
  const tickStep = (ranges.max - ranges.min) / 4;
  for (let i = 0; i <= 4; i++) {
    const v = ranges.min + i * tickStep;
    yTicks.push({ v, y: yFor(v) });
  }

  const path = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`).join(' ');

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      {/* y-axis labels and gridlines */}
      {yTicks.map((t, i) => (
        <g key={i}>
          <text x={xPad - 6} y={t.y + 3} fontSize="9" fill="var(--ink-400)" textAnchor="end" fontFamily="Pretendard">{Number(t.v.toFixed(1))}</text>
          <line x1={xPad} x2={w} y1={t.y} y2={t.y} stroke="var(--ink-100)" strokeDasharray="2 4"/>
        </g>
      ))}
      {/* band */}
      <rect x={xPad} y={bandY1} width={cw} height={bandY2 - bandY1}
        fill="var(--bave-50)" stroke="var(--bave-300)" strokeDasharray="4 4" strokeWidth="1" rx="4"/>
      {/* line */}
      <path d={path} stroke="var(--bave-500)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((v, i) => (
        <circle key={i} cx={xFor(i)} cy={yFor(v)} r="3.2" fill="var(--bave-500)"/>
      ))}
      {/* x labels */}
      {days.map((d, i) => (
        <text key={i} x={xFor(i)} y={h - 4} fontSize="10" fill="var(--ink-500)" textAnchor="middle" fontFamily="Pretendard" fontWeight="500">{d}</text>
      ))}
    </svg>
  );
}

function ParentMoodChart() {
  const moods = ['😊','😊','😐','😞','😐','😊','😊'];
  const values = [80, 75, 55, 35, 55, 75, 82];
  const days = ['월','화','수','목','금','토','일'];
  const w = 280, h = 100;
  const xPad = 14;
  const cw = w - xPad * 2;
  const xFor = i => xPad + (i / (values.length - 1)) * cw;
  const yFor = v => 30 + (1 - v / 100) * 50;
  const path = values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`).join(' ');

  return (
    <div>
      {/* emoji row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 6px', marginBottom: 6 }}>
        {moods.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
            <div style={{ fontSize: 22 }}>{m}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 600 }}>{days[i]}</div>
          </div>
        ))}
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', marginTop: -10 }}>
        <line x1={xPad} x2={w - xPad} y1={h - 18} y2={h - 18} stroke="var(--ink-100)"/>
        <path d={path} stroke="var(--bave-400)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ───────────────────────── Burnout modal (figma) ─────────────────────────

function BurnoutModal({ onClose, onStartCare }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 40,
      background: 'rgba(17,20,28,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 24px',
    }} onClick={onClose}>
      <div className="pop" onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 32, padding: 32,
        width: '100%', maxWidth: 345,
        boxShadow: 'var(--shadow-pop)', position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 20, right: 20,
          width: 32, height: 32, borderRadius: '50%', border: 0,
          background: 'var(--ink-100)', color: 'var(--ink-700)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><IconClose size={15}/></button>

        {/* 💛 64px */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          fontSize: 64, lineHeight: '64px', height: 64, marginBottom: 20,
        }}>💛</div>

        {/* Title 26px SemiBold */}
        <h2 style={{
          margin: 0, fontSize: 26, fontWeight: 600, textAlign: 'center',
          letterSpacing: '-0.16px', lineHeight: '33.8px', color: 'var(--ink-900)',
        }}>
          혼자 견디지 마세요.<br/>5분만 같이 있을게요.
        </h2>

        {/* Body 15px Regular */}
        <p style={{
          margin: '12px 0 0', fontSize: 15, color: 'var(--ink-700)',
          textAlign: 'center', lineHeight: '24px', letterSpacing: '-0.16px', fontWeight: 400,
        }}>
          최근 기록을 보니 좀 지쳐 보이세요.<br/>따뜻한 말 한 마디 드릴게요.
        </p>

        {/* Primary CTA — 56h cyan rounded-16, Figma gap=32 from body.
            Click is a no-op per design, but cursor stays as pointer. */}
        <button onClick={(e) => e.preventDefault()} style={{
          width: '100%', marginTop: 32,
          height: 56, borderRadius: 16, border: 0,
          background: 'var(--bave-500)', color: '#fff',
          fontSize: 16, fontWeight: 600, cursor: 'pointer',
          letterSpacing: '-0.32px', fontFamily: 'inherit',
        }}>
          🌬 5분 호흡 가이드 시작
        </button>

        {/* Secondary — 56h sky-tint with INLINE Premium badge (Figma: badge next to text, not absolute) */}
        <button style={{
          width: '100%', marginTop: 12,
          height: 56, borderRadius: 16, border: 0,
          background: '#E2F9FE', color: 'var(--bave-500)',
          fontSize: 16, fontWeight: 600, cursor: 'pointer',
          letterSpacing: '-0.32px', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <span>💬 익명 전문가와 대화하기</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 8px', height: 20,
            borderRadius: 999, background: 'var(--warm-border)',
            color: 'var(--warm-fg2)', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.2px', lineHeight: 1,
          }}>Premium</span>
        </button>

        {/* "나중에 할게요" link 15px Medium gray — Figma gap=16 from secondary */}
        <button onClick={onClose} style={{
          width: '100%', marginTop: 16, height: 21, border: 0,
          background: 'transparent', color: 'var(--ink-400)',
          fontSize: 15, fontWeight: 500, cursor: 'pointer',
          letterSpacing: '-0.15px', fontFamily: 'inherit',
        }}>나중에 할게요</button>

        {/* Hotlines */}
        <div style={{
          marginTop: 24, paddingTop: 17,
          borderTop: '1px solid var(--ink-100)',
        }}>
          <div style={{
            fontSize: 11, color: 'var(--ink-400)', textAlign: 'center',
            letterSpacing: '0.11px', lineHeight: '16.5px', fontWeight: 500,
          }}>* 위급 시 즉시 연락</div>
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12,
            marginTop: 6, fontSize: 13, letterSpacing: '-0.16px', lineHeight: '19.5px',
          }}>
            <span><b style={{ color: '#EF4444', fontWeight: 600 }}>1393</b> <span style={{ color: '#000' }}>자살예방상담전화</span></span>
            <span style={{ width: 1, height: 12, background: '#FECACA' }}/>
            <span><b style={{ color: '#EF4444', fontWeight: 600 }}>129</b> <span style={{ color: '#000' }}>보건복지콜센터</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  LoginScreen, MyScreen,
  EmotionDiaryScreen, InsightScreen, BurnoutModal,
  FIGMA_EMOTIONS,
});
