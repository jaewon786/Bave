// bave-screens-2.jsx — Archive, Insight, Trend, Growth, Report, Burnout popup, Diary
const { useState: useState2, useMemo: useMemo2 } = React;

// ───────────────────────── Emotion Diary (full) ─────────────────────────

function EmotionDiaryScreen({ onClose, onSave }) {
  const [emo, setEmo] = useState2('tired');
  const [text, setText] = useState2('');
  const [intensity, setIntensity] = useState2(2);
  const [photos, setPhotos] = useState2([1, 2]); // placeholder count
  const [voice, setVoice] = useState2(false);

  return (
    <div className="phone-scroll" style={{ height: '100%', overflow: 'auto', paddingBottom: 110, background: 'var(--bave-soft)' }}>
      <PageHeader title="감정 일기" onBack={onClose} right={
        <button onClick={() => onSave({ emo, text })} style={{
          height: 36, padding: '0 14px', borderRadius: 12, border: 0,
          background: 'var(--bave-500)', color: '#fff', fontSize: 14, fontWeight: 700,
          boxShadow: '0 4px 10px rgba(74,152,234,0.32)',
        }}>저장</button>
      }/>

      <div style={{ padding: '6px 20px 0' }}>
        <div style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 500 }}>2026년 5월 16일 · 화요일 오후 3:24</div>
        <h2 style={{ margin: '6px 0 0', fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>지금, 마음이 어때요?</h2>
      </div>

      {/* 01 Emotion selection */}
      <div style={{ padding: '18px 20px 0' }}>
        <Card pad={18}>
          <EmotionGrid value={emo} onChange={setEmo}/>
          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-500)', marginBottom: 10 }}>강도</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['약하게', '조금', '꽤', '많이', '강하게'].map((l, i) => (
                <button key={i} onClick={() => setIntensity(i)} style={{
                  flex: 1, height: 38, borderRadius: 12, border: 0,
                  background: i === intensity ? 'var(--bave-500)' : 'var(--ink-50)',
                  color: i === intensity ? '#fff' : 'var(--ink-700)',
                  fontSize: 12, fontWeight: 600,
                }}>{l}</button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* 02 Multimodal — photo */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 10, paddingLeft: 4 }}>이 순간의 흔적</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          <button style={{
            width: 84, height: 84, borderRadius: 18, flexShrink: 0,
            border: '1.5px dashed var(--ink-300)', background: '#fff',
            color: 'var(--ink-500)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
          }}>
            <IconPlus size={20}/> <span style={{ fontSize: 11, fontWeight: 600 }}>사진</span>
          </button>
          {photos.map((p, i) => (
            <div key={i} style={{ width: 84, height: 84, borderRadius: 18, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
              <PhotoPlaceholder tint={['plum','sky','mint','cream','rose'][i % 5]}/>
            </div>
          ))}
        </div>
      </div>

      {/* 03 Text + voice */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 10, paddingLeft: 4 }}>편하게 털어놔도 괜찮아요</div>
        <div style={{ position: 'relative' }}>
          <textarea
            value={text} onChange={e => setText(e.target.value)}
            placeholder="아무에게도 말 못 한 속마음을 적어보세요. 베이브가 듣고 있어요."
            style={{
              width: '100%', minHeight: 160, borderRadius: 22,
              padding: 18, fontSize: 15, lineHeight: 1.65,
              border: 0, background: '#fff',
              boxShadow: 'var(--shadow-soft)', resize: 'none', outline: 'none',
              color: 'var(--ink-900)',
            }}
          />
          <div style={{ position: 'absolute', right: 12, bottom: 12, display: 'flex', gap: 8 }}>
            <button onClick={() => setVoice(v => !v)} style={{
              width: 36, height: 36, borderRadius: 12, border: 0,
              background: voice ? 'var(--bave-500)' : 'var(--ink-100)',
              color: voice ? '#fff' : 'var(--ink-700)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><IconMic size={16}/></button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, paddingLeft: 8 }}>
          <IconSparkle size={14} style={{ color: 'var(--bave-600)' }}/>
          <span style={{ fontSize: 12, color: 'var(--ink-500)' }}>AI가 내용을 분석해 맞춤 안심 피드백을 제안해요</span>
        </div>
      </div>

      {/* tags */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-700)', marginBottom: 10, paddingLeft: 4 }}>태그</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['#죄책감','#번아웃','#감정폭발','#남편','#아이떼쓰기','#수면부족'].map(t => (
            <button key={t} style={{
              padding: '8px 12px', borderRadius: 999, border: 0,
              background: '#fff', color: 'var(--ink-700)',
              fontSize: 13, fontWeight: 600,
              boxShadow: 'var(--shadow-soft)',
            }}>{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── Archive ─────────────────────────

function ArchiveScreen({ entries, onOpen }) {
  const [tab, setTab] = useState2('emotion'); // emotion | photo | calendar
  return (
    <div className="phone-scroll" style={{ height: '100%', overflow: 'auto', paddingBottom: 110 }}>
      <div style={{ padding: '52px 20px 6px' }}>
        <div style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 500 }}>모든 순간이 모이는 곳</div>
        <h1 style={{ margin: '2px 0 0', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>기록</h1>
      </div>

      {/* Tab pills */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ display: 'flex', gap: 6, padding: 4, background: 'var(--ink-100)', borderRadius: 14 }}>
          {[['emotion','감정 로그'],['photo','사진'],['calendar','달력']].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, height: 36, borderRadius: 10, border: 0,
              background: tab === k ? '#fff' : 'transparent',
              color: tab === k ? 'var(--ink-900)' : 'var(--ink-500)',
              fontSize: 13, fontWeight: 700,
              boxShadow: tab === k ? '0 1px 3px rgba(15,30,55,0.08)' : 'none',
            }}>{l}</button>
          ))}
        </div>
      </div>

      {tab === 'emotion' && (
        <ArchiveEmotionList entries={entries} onOpen={onOpen}/>
      )}
      {tab === 'photo' && (
        <ArchivePhotos entries={entries}/>
      )}
      {tab === 'calendar' && (
        <ArchiveCalendar entries={entries}/>
      )}
    </div>
  );
}

function ArchiveEmotionList({ entries, onOpen }) {
  // group by date
  const grouped = useMemo2(() => {
    const g = {};
    entries.forEach(e => { (g[e.dateLabel] = g[e.dateLabel] || []).push(e); });
    return g;
  }, [entries]);
  return (
    <div style={{ padding: '18px 20px 0' }}>
      {Object.entries(grouped).map(([date, list]) => (
        <div key={date} style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10, paddingLeft: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{date}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-400)' }}>{list.length}건</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {list.map((e, i) => (
              <DiaryRow key={i} entry={e} onClick={() => onOpen(e)}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ArchivePhotos({ entries }) {
  const photoEntries = entries.filter(e => e.hasPhoto);
  return (
    <div style={{ padding: '18px 20px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{
            aspectRatio: '1 / 1', borderRadius: 14, overflow: 'hidden', position: 'relative',
          }}>
            <PhotoPlaceholder tint={['rose','sky','mint','cream','plum'][i % 5]}/>
            <div style={{
              position: 'absolute', left: 6, bottom: 6,
              width: 22, height: 22, borderRadius: '50%',
              background: 'rgba(255,255,255,0.92)', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <EmotionFace kind={['joy','calm','tired','grateful','anxious'][i % 5]} size={18}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchiveCalendar({ entries }) {
  // mini 5-week grid
  const days = Array.from({ length: 35 });
  const filled = {3: 'joy', 4: 'calm', 5: 'tired', 8: 'grateful', 10: 'anxious', 11: 'sad', 14: 'joy', 15: 'calm', 17: 'tired', 18: 'anger', 20: 'anxious', 22: 'calm', 24: 'proud', 25: 'joy', 27: 'grateful', 28: 'tired', 30: 'calm'};

  return (
    <div style={{ padding: '18px 20px 0' }}>
      <Card pad={16}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <button style={{ background:'transparent', border:0, color:'var(--ink-500)', padding: 6 }}><IconChevronLeft size={18}/></button>
          <div style={{ fontSize: 16, fontWeight: 800 }}>2026 · 5월</div>
          <button style={{ background:'transparent', border:0, color:'var(--ink-500)', padding: 6 }}><IconChevronRight size={18}/></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, fontSize: 11, color: 'var(--ink-400)', textAlign: 'center', marginBottom: 6 }}>
          {['일','월','화','수','목','금','토'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {days.map((_, i) => {
            const d = i - 3; // start offset
            const valid = d >= 1 && d <= 31;
            const emo = filled[d];
            return (
              <div key={i} style={{
                aspectRatio: '1 / 1', borderRadius: 12,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: d === 16 ? 'var(--bave-500)' : emo ? 'var(--bave-50)' : 'transparent',
                color: d === 16 ? '#fff' : valid ? 'var(--ink-700)' : 'var(--ink-300)',
                fontSize: 12, fontWeight: 600, gap: 2,
              }}>
                <span>{valid ? d : ''}</span>
                {emo && <EmotionFace kind={emo} size={16}/>}
              </div>
            );
          })}
        </div>
      </Card>
      <Card pad={16} style={{ marginTop: 14 }}>
        <SectionLabel>이번 달 요약</SectionLabel>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[['평온', 11, 'calm'],['기쁨', 6, 'joy'],['지침', 5, 'tired'],['감사', 4, 'grateful']].map(([l,n,k]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <EmotionFace kind={k} size={28}/>
              <div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{l}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{n}회</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ───────────────────────── Insight ─────────────────────────

function InsightScreen({ go }) {
  return (
    <div className="phone-scroll" style={{ height: '100%', overflow: 'auto', paddingBottom: 110, background: 'var(--bave-soft)' }}>
      <div style={{ padding: '52px 20px 6px' }}>
        <div style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 500 }}>지난 7일을 돌아봤어요</div>
        <h1 style={{ margin: '2px 0 0', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>인사이트</h1>
      </div>

      {/* 03 AI 안심 리포트 헤더 카드 */}
      <div style={{ padding: '14px 20px 0' }}>
        <Card onClick={() => go('report')} style={{
          background: 'linear-gradient(140deg, #FFF5DD 0%, #FFE9C4 100%)',
          padding: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 18,
              background: 'rgba(255,255,255,0.7)', color: '#C8821F',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><IconSparkle size={26}/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#A56A1D', letterSpacing: '0.05em' }}>WEEKLY · NEW</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink-900)', marginTop: 2 }}>AI 맞춤형 코칭 리포트</div>
              <div style={{ fontSize: 12, color: 'var(--ink-700)', marginTop: 3 }}>지유의 이번 주, 부모의 마음 추이까지</div>
            </div>
            <IconChevronRight size={20} style={{ color: 'var(--ink-500)' }}/>
          </div>
        </Card>
      </div>

      {/* 01 시각화된 발달 지표 */}
      <div style={{ padding: '20px 20px 0' }}>
        <SectionLabel action={{ label: '자세히', onClick: () => go('growth') }}>지유의 성장 지표</SectionLabel>
        <Card pad={18}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            <GrowthChip label="키" value="112 cm" range="정상" trend="+1.2" tint="#DCEAFB" fg="#23629F"/>
            <GrowthChip label="체중" value="19.4 kg" range="정상" trend="+0.3" tint="#DEF6EC" fg="#1F8A65"/>
            <GrowthChip label="수면" value="10.2h" range="권장" trend="안정" tint="#EAE5F7" fg="#5E47AD"/>
          </div>
          <div style={{
            padding: 14, borderRadius: 16, background: 'var(--bave-50)',
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <IconShield size={18} style={{ color: 'var(--bave-600)', marginTop: 2, flexShrink: 0 }}/>
            <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.6 }}>
              <b>또래 평균 범위 안</b>에서 안정적으로 자라고 있어요. 비교 대신, 지유만의 흐름을 함께 봐요.
            </div>
          </div>
        </Card>
      </div>

      {/* 02 부모 감정 추이 */}
      <div style={{ padding: '20px 20px 0' }}>
        <SectionLabel action={{ label: '추이 보기', onClick: () => go('trend') }}>부모 마음 추이</SectionLabel>
        <Card pad={18} onClick={() => go('trend')}>
          <TrendMiniChart/>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            {[['joy', 5], ['calm', 9], ['tired', 4], ['anxious', 3]].map(([k,n]) => (
              <div key={k} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 10px', borderRadius: 999, background: 'var(--ink-50)',
                fontSize: 12, fontWeight: 600, color: 'var(--ink-700)',
              }}>
                <EmotionFace kind={k} size={18}/> {n}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Feedback */}
      <div style={{ padding: '20px 20px 0' }}>
        <SectionLabel>이번 주 안심 피드백</SectionLabel>
        <Card pad={18}>
          <FeedbackRow tint="#DEF6EC" fg="#1F8A65" icon={<IconCheck size={18}/>} title="잘하고 있어요" body="지난주보다 ‘평온’ 기록이 24% 늘었어요. 일관된 일과가 회복에 도움이 되고 있어요."/>
          <div style={{ height: 1, background: 'var(--ink-100)', margin: '14px 0' }}/>
          <FeedbackRow tint="#FFF1D6" fg="#B27E2A" icon={<IconCloud size={18}/>} title="이런 신호도 보였어요" body="화요일 저녁에 ‘지침/불안’이 연속 기록됐어요. 그 시간대 케어 루틴이 필요할 수 있어요."/>
          <div style={{ height: 1, background: 'var(--ink-100)', margin: '14px 0' }}/>
          <FeedbackRow tint="#E1F0FE" fg="#23629F" icon={<IconHeart size={18}/>} title="다음 한 주 제안" body="지유의 ‘떼쓰기’ 기록이 식사 전에 몰려 있어요. 식사 30분 전 신호 루틴을 시도해볼까요?"/>
        </Card>
      </div>
    </div>
  );
}

function GrowthChip({ label, value, range, trend, tint, fg }) {
  return (
    <div style={{ flex: 1, padding: 12, borderRadius: 16, background: tint }}>
      <div style={{ fontSize: 11, color: fg, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink-900)', marginTop: 2, letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{range} · {trend}</div>
    </div>
  );
}

function FeedbackRow({ tint, fg, icon, title, body }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 12, background: tint, color: fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 3, lineHeight: 1.55 }}>{body}</div>
      </div>
    </div>
  );
}

function TrendMiniChart() {
  // 7-day moods, dual line: parent (sky) + child mood (rose)
  const w = 280, h = 110;
  const parent = [55, 48, 62, 70, 58, 45, 52];
  const child  = [70, 78, 72, 65, 80, 75, 82];
  const days = ['월','화','수','목','금','토','일'];
  const toPath = (arr) => arr.map((v, i) => {
    const x = (i / (arr.length - 1)) * w;
    const y = h - (v / 100) * h;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${w} ${h + 20}`} style={{ display: 'block' }}>
        <defs>
          <linearGradient id="trend-p" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A98EA" stopOpacity=".25"/>
            <stop offset="100%" stopColor="#4A98EA" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((p, i) => (
          <line key={i} x1="0" x2={w} y1={h*p} y2={h*p} stroke="var(--ink-100)" strokeDasharray="3 4"/>
        ))}
        <path d={`${toPath(parent)} L ${w} ${h} L 0 ${h} Z`} fill="url(#trend-p)"/>
        <path d={toPath(parent)} stroke="var(--bave-500)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={toPath(child)} stroke="#C9697F" strokeWidth="2.5" strokeDasharray="4 4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {parent.map((v, i) => {
          const x = (i / (parent.length - 1)) * w;
          const y = h - (v / 100) * h;
          return <circle key={i} cx={x} cy={y} r="3" fill="#fff" stroke="var(--bave-500)" strokeWidth="2"/>;
        })}
        {days.map((d, i) => (
          <text key={i} x={(i / (days.length - 1)) * w} y={h + 16} fontSize="10" fill="var(--ink-400)" textAnchor="middle" fontFamily="Pretendard">{d}</text>
        ))}
      </svg>
      <div style={{ display: 'flex', gap: 14, marginTop: 6, fontSize: 11, color: 'var(--ink-500)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 14, height: 2, background: 'var(--bave-500)' }}/> 부모
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 14, height: 2, background: '#C9697F', borderTop: '2px dashed #C9697F' }}/> 아이
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── Emotion Trend (full screen) ─────────────────────────

function EmotionTrendScreen({ onBack }) {
  const [range, setRange] = useState2('7d');
  const w = 320, h = 180;
  const parent = [55, 48, 62, 70, 58, 45, 52];
  const child  = [70, 78, 72, 65, 80, 75, 82];
  const days = ['월','화','수','목','금','토','일'];
  const toPath = (arr) => arr.map((v, i) => {
    const x = (i / (arr.length - 1)) * w;
    const y = h - (v / 100) * h;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="phone-scroll" style={{ height: '100%', overflow: 'auto', paddingBottom: 110, background: 'var(--bave-soft)' }}>
      <PageHeader title="감정 추이" onBack={onBack}/>

      <div style={{ padding: '6px 20px 0' }}>
        <div style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 500 }}>한 주간의 마음 흐름</div>
        <h2 style={{ margin: '4px 0 0', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>지영님의 마음, 지유와 나란히</h2>
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ display: 'flex', gap: 6, padding: 4, background: 'var(--ink-100)', borderRadius: 12 }}>
          {[['7d','7일'],['30d','한 달'],['90d','3개월']].map(([k,l]) => (
            <button key={k} onClick={() => setRange(k)} style={{
              flex: 1, height: 32, borderRadius: 8, border: 0,
              background: range === k ? '#fff' : 'transparent',
              color: range === k ? 'var(--ink-900)' : 'var(--ink-500)',
              fontSize: 12, fontWeight: 700,
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        <Card pad={20}>
          <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>이번 주 평균</div>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>54<span style={{ fontSize: 13, color: 'var(--ink-500)' }}>/100</span></div>
              <div style={{ display: 'inline-flex', gap: 4, alignItems: 'center', marginTop: 4, fontSize: 11, fontWeight: 700, color: '#1F8A65' }}>↑ +12 회복중</div>
            </div>
            <div style={{ width: 1, background: 'var(--ink-100)' }}/>
            <div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>지유 컨디션</div>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>74<span style={{ fontSize: 13, color: 'var(--ink-500)' }}>/100</span></div>
              <div style={{ display: 'inline-flex', gap: 4, alignItems: 'center', marginTop: 4, fontSize: 11, fontWeight: 700, color: '#23629F' }}>안정 유지</div>
            </div>
          </div>
          <svg width="100%" viewBox={`0 0 ${w} ${h + 22}`} style={{ display: 'block' }}>
            <defs>
              <linearGradient id="trend-pf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A98EA" stopOpacity=".22"/>
                <stop offset="100%" stopColor="#4A98EA" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {[0.2, 0.5, 0.8].map((p, i) => (
              <line key={i} x1="0" x2={w} y1={h*p} y2={h*p} stroke="var(--ink-100)" strokeDasharray="3 4"/>
            ))}
            <path d={`${toPath(parent)} L ${w} ${h} L 0 ${h} Z`} fill="url(#trend-pf)"/>
            <path d={toPath(parent)} stroke="var(--bave-500)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d={toPath(child)} stroke="#C9697F" strokeWidth="2.5" strokeDasharray="4 4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            {parent.map((v, i) => {
              const x = (i / (parent.length - 1)) * w;
              const y = h - (v / 100) * h;
              return <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke="var(--bave-500)" strokeWidth="2"/>;
            })}
            {days.map((d, i) => (
              <text key={i} x={(i / (days.length - 1)) * w} y={h + 18} fontSize="11" fill="var(--ink-400)" textAnchor="middle" fontFamily="Pretendard">{d}</text>
            ))}
          </svg>
        </Card>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <SectionLabel>감정 분포</SectionLabel>
        <Card pad={18}>
          {[['calm', '평온', 9, 'var(--emo-calm)'], ['joy', '기쁨', 5, 'var(--emo-joy)'], ['tired', '지침', 4, 'var(--emo-tired)'], ['anxious', '불안', 3, 'var(--emo-anxious)'], ['grateful', '감사', 2, 'var(--emo-grateful)']].map(([k, l, n, c], i, arr) => {
            const total = arr.reduce((s, x) => s + x[2], 0);
            const pct = (n / total) * 100;
            return (
              <div key={k} style={{ marginBottom: i === arr.length - 1 ? 0 : 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <EmotionFace kind={k} size={26}/>
                  <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{l}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-500)' }}>{n}회 · {pct.toFixed(0)}%</div>
                </div>
                <div style={{ height: 8, borderRadius: 6, background: 'var(--ink-100)', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: c, borderRadius: 6 }}/>
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <Card pad={18} style={{ background: 'var(--bave-50)', boxShadow: 'none' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: 'var(--bave-100)', color: 'var(--bave-700)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><IconWind size={20}/></div>
            <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.6 }}>
              <b style={{ color: 'var(--ink-900)' }}>객관적으로 보면,</b> 지영님의 마음은 화요일 저녁에 가장 낮았지만 주말로 갈수록 회복됐어요. 지유의 컨디션과 비슷한 흐름이에요.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ───────────────────────── Growth Data (full screen) ─────────────────────────

function GrowthScreen({ onBack }) {
  return (
    <div className="phone-scroll" style={{ height: '100%', overflow: 'auto', paddingBottom: 110, background: 'var(--bave-soft)' }}>
      <PageHeader title="성장 데이터" onBack={onBack}/>

      <div style={{ padding: '6px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ChildAvatar size={56} hue="rose"/>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink-900)', letterSpacing: '-0.02em' }}>지유 · 5세 2개월</div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>모든 지표가 또래 평균 범위 안이에요</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <Card pad={20}>
          <SectionLabel>키 성장 그래프</SectionLabel>
          <GrowthCurve metric="height"/>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, padding: '14px 16px', background: 'var(--bave-50)', borderRadius: 14 }}>
            <Stat label="현재" value="112 cm"/>
            <Stat label="3개월 전" value="109 cm"/>
            <Stat label="또래 평균" value="111 cm"/>
          </div>
        </Card>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <Card pad={20}>
          <SectionLabel>체중 추이</SectionLabel>
          <GrowthCurve metric="weight"/>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, padding: '14px 16px', background: 'var(--bave-50)', borderRadius: 14 }}>
            <Stat label="현재" value="19.4 kg"/>
            <Stat label="3개월 전" value="18.7 kg"/>
            <Stat label="또래 평균" value="19.1 kg"/>
          </div>
        </Card>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <Card pad={20}>
          <SectionLabel>수면 패턴</SectionLabel>
          <SleepGrid/>
          <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 11, color: 'var(--ink-500)' }}>
            <Legend color="var(--bave-200)" label="얕은 수면"/>
            <Legend color="var(--bave-500)" label="깊은 수면"/>
            <Legend color="#F0A0A0" label="깸"/>
          </div>
        </Card>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <Card pad={18} style={{ background: 'linear-gradient(140deg, #E6F1FD 0%, #DCEAFB 100%)', boxShadow: 'none' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', color: 'var(--bave-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IconShield size={20}/>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.6 }}>
              <b style={{ color: 'var(--ink-900)' }}>걱정하지 않으셔도 돼요.</b> 지유는 또래 평균 안에서 안정적으로 자라고 있어요. 비교 대신 지유만의 흐름을 함께 봐요.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink-900)', marginTop: 2 }}>{value}</div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 10, height: 10, borderRadius: 3, background: color }}/> {label}
    </div>
  );
}

function GrowthCurve({ metric }) {
  const w = 280, h = 140;
  const data = metric === 'height' ? [102, 104, 106, 108, 109, 110, 111, 112] : [16.5, 17.0, 17.6, 18.1, 18.5, 18.9, 19.2, 19.4];
  const min = Math.min(...data) - (metric === 'height' ? 4 : 1);
  const max = Math.max(...data) + (metric === 'height' ? 2 : 1);
  const upper = data.map(v => v + (metric === 'height' ? 2.5 : 0.7));
  const lower = data.map(v => v - (metric === 'height' ? 2.5 : 0.7));
  const months = ['10','11','12','1','2','3','4','5'];

  const toPath = (arr) => arr.map((v, i) => {
    const x = (i / (arr.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
  const bandPath = `${toPath(upper)} L ${w} ${h - ((lower[lower.length-1] - min) / (max - min)) * h} ${lower.slice().reverse().map((v, i) => {
    const x = ((lower.length - 1 - i) / (lower.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ')} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h + 22}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`gc-${metric}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A98EA" stopOpacity=".15"/>
          <stop offset="100%" stopColor="#4A98EA" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={bandPath} fill="var(--bave-100)" opacity=".7"/>
      <path d={toPath(data)} stroke="var(--bave-500)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / (max - min)) * h;
        return <circle key={i} cx={x} cy={y} r="3" fill="#fff" stroke="var(--bave-500)" strokeWidth="2"/>;
      })}
      {months.map((m, i) => (
        <text key={i} x={(i / (months.length - 1)) * w} y={h + 16} fontSize="10" fill="var(--ink-400)" textAnchor="middle" fontFamily="Pretendard">{m}월</text>
      ))}
    </svg>
  );
}

function SleepGrid() {
  // 7 days × 24 hours grid
  const w = 280, hours = 24, days = 7;
  const cellW = w / hours, cellH = 12;
  const labels = ['월','화','수','목','금','토','일'];
  // pattern: deep sleep mostly 21-7, light around 13-15 nap
  const get = (d, h) => {
    if (h >= 21 || h < 6) return Math.random() > 0.18 ? 'deep' : 'light';
    if (h === 6) return Math.random() > 0.5 ? 'deep' : 'light';
    if (h === 13 || h === 14) return Math.random() > 0.4 ? 'light' : (Math.random() > 0.7 ? 'deep' : null);
    if (h === 7 && Math.random() > 0.7) return 'wake';
    return null;
  };
  const c = { deep: 'var(--bave-500)', light: 'var(--bave-200)', wake: '#F0A0A0' };

  return (
    <svg width="100%" viewBox={`0 0 ${w + 20} ${days * (cellH + 4) + 24}`}>
      {[0, 6, 12, 18].map((h, i) => (
        <text key={i} x={h * cellW + 18} y="10" fontSize="9" fill="var(--ink-400)" textAnchor="middle" fontFamily="Pretendard">{h}</text>
      ))}
      <text x={w + 18} y="10" fontSize="9" fill="var(--ink-400)" textAnchor="middle" fontFamily="Pretendard">24</text>
      {labels.map((l, d) => (
        <g key={d}>
          <text x="0" y={20 + d * (cellH + 4) + 9} fontSize="10" fill="var(--ink-500)" fontFamily="Pretendard">{l}</text>
          {Array.from({ length: hours }).map((_, h) => {
            const k = get(d, h);
            return <rect key={h} x={h * cellW + 18} y={16 + d * (cellH + 4)} width={cellW - 1} height={cellH} rx="2" fill={k ? c[k] : 'var(--ink-100)'}/>;
          })}
        </g>
      ))}
    </svg>
  );
}

// ───────────────────────── AI Coaching Report (full) ─────────────────────────

function ReportScreen({ onBack }) {
  return (
    <div className="phone-scroll" style={{ height: '100%', overflow: 'auto', paddingBottom: 110, background: '#FFFCF4' }}>
      <PageHeader title="AI 코칭 리포트" onBack={onBack}/>

      <div style={{ padding: '6px 20px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#A56A1D', letterSpacing: '0.06em' }}>WEEK 20 · 5월 10–16</div>
        <h2 style={{ margin: '6px 0 4px', fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          잘 키우고 있어요, 지영님
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-500)', lineHeight: 1.55 }}>
          지유와 함께한 7일을 베이브가 정리했어요.
        </p>
      </div>

      {/* Stat row */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Card pad={14} style={{ flex: 1, borderRadius: 18 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>기록</div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>23<span style={{ fontSize: 12, color: 'var(--ink-500)' }}>건</span></div>
          </Card>
          <Card pad={14} style={{ flex: 1, borderRadius: 18 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>안정일</div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>5<span style={{ fontSize: 12, color: 'var(--ink-500)' }}>/7</span></div>
          </Card>
          <Card pad={14} style={{ flex: 1, borderRadius: 18 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>회복</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1F8A65', letterSpacing: '-0.02em' }}>+12</div>
          </Card>
        </div>
      </div>

      {/* Section 1 */}
      <ReportSection num="01" title="지유는 잘 자라고 있어요">
        <p style={{ margin: '0 0 14px', fontSize: 14, color: 'var(--ink-700)', lineHeight: 1.65 }}>
          이번 주 지유의 키·체중·수면 모두 또래 평균 범위 안에 있어요. 특히 수면이 일정해진 게 정서 안정에 도움이 되고 있어요.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Pill tint="#DCEAFB" fg="#23629F">키 +1.2 cm</Pill>
          <Pill tint="#DEF6EC" fg="#1F8A65">수면 +0.4 h</Pill>
          <Pill tint="#FCE2EC" fg="#B7427A">정서 안정</Pill>
        </div>
      </ReportSection>

      {/* Section 2 */}
      <ReportSection num="02" title="지영님의 마음, 살피고 있어요">
        <p style={{ margin: '0 0 14px', fontSize: 14, color: 'var(--ink-700)', lineHeight: 1.65 }}>
          화요일 저녁 ‘지침/불안’이 몰렸어요. 같은 시간대에 지유의 떼쓰기 기록이 겹쳐 있어요. 정서적 부담이 큰 시간대일 수 있어요.
        </p>
        <div style={{
          padding: 14, borderRadius: 16, background: 'var(--bave-50)', display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <IconHeart size={18} style={{ color: 'var(--bave-600)', flexShrink: 0, marginTop: 2 }}/>
          <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.6 }}>
            <b>지영님의 잘못이 아니에요.</b> 데이터로 보면 이건 ‘저녁 식사 전 에너지 저점’에 가까운 신호예요.
          </div>
        </div>
      </ReportSection>

      {/* Section 3 — Recommendations */}
      <ReportSection num="03" title="다음 주, 이 한 가지만 해볼까요">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <RecCard icon={<IconBowl size={18}/>} title="식사 30분 전 신호 루틴" body="놀이→식사 전, 같은 노래·등불·말로 ‘식사 신호’를 만들어요." tag="떼쓰기 ↓"/>
          <RecCard icon={<IconMoon size={18}/>} title="지영님 5분 마음 환기" body="화요일 19시, 알림이 오면 5분 호흡 케어를 시작해요." tag="번아웃 ↓"/>
          <RecCard icon={<IconBookHeart size={18}/>} title="감사 일기 한 줄" body="잘한 한 가지를 적는 ‘감사 일기’를 3일에 한 번 권해요." tag="안정 ↑"/>
        </div>
      </ReportSection>

      {/* Section 4 — Reassurance */}
      <ReportSection num="04" title="베이브의 한 줄">
        <Card pad={20} style={{ background: 'linear-gradient(140deg, #FFEEC9 0%, #FFE0A6 100%)', boxShadow: 'none' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#7A5318', lineHeight: 1.55 }}>
            완벽하지 않아도 괜찮아요.<br/>
            오늘도 기록한 당신은,<br/>
            충분히 좋은 부모예요.
          </div>
        </Card>
      </ReportSection>

      <div style={{ padding: '8px 20px 24px' }}>
        <GhostButton full>전문가 1:1 코멘트 요청하기</GhostButton>
      </div>
    </div>
  );
}

function ReportSection({ num, title, children }) {
  return (
    <div style={{ padding: '24px 20px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--bave-600)', letterSpacing: '0.08em', marginBottom: 4 }}>{num}</div>
      <h3 style={{ margin: '0 0 14px', fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink-900)' }}>{title}</h3>
      <Card pad={18}>{children}</Card>
    </div>
  );
}

function Pill({ tint, fg, children }) {
  return (
    <div style={{ padding: '6px 12px', borderRadius: 999, background: tint, color: fg, fontSize: 12, fontWeight: 700 }}>{children}</div>
  );
}

function RecCard({ icon, title, body, tag }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: 14, borderRadius: 16, background: 'var(--bave-soft)' }}>
      <div style={{
        width: 36, height: 36, borderRadius: 12,
        background: 'var(--bave-100)', color: 'var(--bave-700)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{title}</div>
          <div style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: 999, background: '#fff', fontSize: 10, color: 'var(--bave-700)', fontWeight: 700 }}>{tag}</div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 4, lineHeight: 1.55 }}>{body}</div>
      </div>
    </div>
  );
}

// ───────────────────────── Burnout warning popup ─────────────────────────

function BurnoutModal({ onClose, onStartCare }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 40,
      background: 'rgba(15,30,55,0.42)',
      backdropFilter: 'blur(2px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }} onClick={onClose}>
      <div className="pop" onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 28, padding: 24,
        width: '100%', maxWidth: 360,
        boxShadow: 'var(--shadow-pop)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <div style={{
            width: 86, height: 86, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFE3D5, #FFCAB7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#B0512C',
            boxShadow: '0 0 0 8px rgba(240,128,121,0.10)',
          }}>
            <svg viewBox="0 0 36 36" width="44" height="44" fill="none">
              <path d="M18 5l2 8 7-1-4 6 6 5-8 1 1 7-7-5-6 4 1-7-7-4 7-3 1-7 7 5z" fill="currentColor" opacity=".18"/>
              <circle cx="18" cy="18" r="3.2" fill="currentColor"/>
              <path d="M18 11v4M18 21v3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, textAlign: 'center', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          🌡 번아웃 지수가 높아졌어요
        </h2>
        <p style={{ margin: '10px 0 0', fontSize: 14, color: 'var(--ink-500)', textAlign: 'center', lineHeight: 1.6 }}>
          지영님, 지금은 충전이 필요한 순간이에요.<br/>
          5분만 마음을 쉬어가요.
        </p>

        <div style={{
          marginTop: 18, padding: 14, borderRadius: 16,
          background: 'var(--bave-50)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'var(--bave-500)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IconPlay size={16}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-900)' }}>5분 케어 프로그램</div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>호흡 · 안심 메시지 · 한 줄 일기</div>
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton full onClick={onStartCare}>5분 케어 시작하기</PrimaryButton>
          <button onClick={onClose} style={{
            height: 48, borderRadius: 14, border: 0,
            background: 'transparent', color: 'var(--ink-500)',
            fontSize: 14, fontWeight: 600,
          }}>지금은 괜찮아요</button>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── Care Program (sheet) ─────────────────────────

function CareSheet({ onClose }) {
  const [step, setStep] = useState2(0);
  const steps = [
    { title: '깊게 숨을 들이마셔요', body: '4초 들이마시고, 4초 멈추고, 6초 내쉽니다.', icon: <IconWind size={28}/> },
    { title: '이 한 줄을 읽어요', body: '"나는 오늘도 충분히 좋은 부모입니다."', icon: <IconHeart size={28}/> },
    { title: '한 줄만 적어볼까요', body: '오늘 잘한 일 한 가지를 떠올려봐요.', icon: <IconBookHeart size={28}/> },
  ];
  return (
    <Sheet onClose={onClose}>
      <div style={{ padding: '0 20px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--bave-700)', letterSpacing: '0.08em' }}>5분 케어 · {step + 1}/3</div>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: 999, border: 0,
          background: 'var(--ink-100)', color: 'var(--ink-700)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><IconClose size={18}/></button>
      </div>

      <div className="fade-in" key={step} style={{ padding: '14px 20px 8px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{
          width: 120, height: 120, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--bave-200), var(--bave-400))',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 18px 40px rgba(74,152,234,0.30)',
          marginBottom: 24,
        }}>{steps[step].icon}</div>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>{steps[step].title}</h2>
        <p style={{ marginTop: 10, fontSize: 14, color: 'var(--ink-500)', lineHeight: 1.65, maxWidth: 280 }}>{steps[step].body}</p>
      </div>

      <div style={{ padding: '12px 20px 20px' }}>
        {step < 2 ? (
          <PrimaryButton full onClick={() => setStep(step + 1)}>다음 · {step + 2}/3</PrimaryButton>
        ) : (
          <PrimaryButton full onClick={onClose}>마치고 홈으로</PrimaryButton>
        )}
      </div>
    </Sheet>
  );
}

Object.assign(window, {
  EmotionDiaryScreen, ArchiveScreen, InsightScreen,
  EmotionTrendScreen, GrowthScreen, ReportScreen,
  BurnoutModal, CareSheet, TrendMiniChart,
});
