// bave-icons.jsx — Icon set for Bave

// — Stroke icons (2px stroke, currentColor)
const SI = ({ d, size = 24, sw = 1.8, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {d}
  </svg>
);

const IconHome = (p) => SI({ ...p, d: <><path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z"/></>});
const IconArchive = (p) => SI({ ...p, d: <><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>});
const IconInsight = (p) => SI({ ...p, d: <><path d="M3 20h18"/><path d="M6 16V9"/><path d="M11 16V5"/><path d="M16 16v-5"/><path d="M21 16v-8"/></>});
const IconUser = (p) => SI({ ...p, d: <><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></>});
const IconCamera = (p) => SI({ ...p, d: <><path d="M4 8h3l2-3h6l2 3h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2v-9a2 2 0 012-2z"/><circle cx="12" cy="13" r="4"/></>});
const IconPlus = (p) => SI({ ...p, d: <><path d="M12 5v14M5 12h14"/></>});
const IconBack = (p) => SI({ ...p, d: <><path d="M15 18l-6-6 6-6"/></>});
const IconClose = (p) => SI({ ...p, d: <><path d="M18 6L6 18M6 6l12 12"/></>});
const IconBell = (p) => SI({ ...p, d: <><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 004 0"/></>});
const IconHeart = (p) => SI({ ...p, d: <><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 000-7.6z"/></>});
const IconSparkle = (p) => SI({ ...p, d: <><path d="M12 3l1.7 4.6L18 9l-4.3 1.4L12 15l-1.7-4.6L6 9l4.3-1.4L12 3z"/><path d="M19 16l.7 1.8L21 18l-1.3.6L19 20l-.7-1.4L17 18l1.3-.6L19 16z"/></>});
const IconMoon = (p) => SI({ ...p, d: <><path d="M21 13.5A8.5 8.5 0 1110.5 3a7 7 0 0010.5 10.5z"/></>});
const IconBowl = (p) => SI({ ...p, d: <><path d="M3 11h18"/><path d="M5 11a7 7 0 0014 0"/><path d="M12 4v3"/><path d="M9 4l1 3M15 4l-1 3"/></>});
const IconBaby = (p) => SI({ ...p, d: <><circle cx="12" cy="9" r="5"/><path d="M9 9h.01M15 9h.01M9.5 12c.5 1 1.5 1.5 2.5 1.5s2-.5 2.5-1.5"/><path d="M5 21c0-3 3-5 7-5s7 2 7 5"/></>});
const IconChevronRight = (p) => SI({ ...p, d: <><path d="M9 6l6 6-6 6"/></>});
const IconChevronLeft = (p) => SI({ ...p, d: <><path d="M15 6l-6 6 6 6"/></>});
const IconCalendar = (p) => SI({ ...p, d: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>});
const IconPlay = (p) => SI({ ...p, d: <><path d="M6 4l14 8-14 8V4z" fill="currentColor" stroke="none"/></>});
const IconImage = (p) => SI({ ...p, d: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 16l-5-5-9 9"/></>});
const IconMic = (p) => SI({ ...p, d: <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></>});
const IconTag = (p) => SI({ ...p, d: <><path d="M3 12l9-9 9 9-9 9-9-9z"/><circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none"/></>});
const IconCheck = (p) => SI({ ...p, d: <><path d="M5 12l5 5L20 7"/></>});
const IconWind = (p) => SI({ ...p, d: <><path d="M3 8h12a3 3 0 100-6"/><path d="M3 14h16a3 3 0 110 6"/><path d="M3 11h8"/></>});
const IconShield = (p) => SI({ ...p, d: <><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/></>});
const IconCloud = (p) => SI({ ...p, d: <><path d="M7 18a4 4 0 010-8 5 5 0 019.6-1A4 4 0 0118 18H7z"/></>});
const IconWarn = (p) => SI({ ...p, d: <><path d="M12 3l10 17H2L12 3z"/><path d="M12 10v4M12 17h.01" stroke="currentColor"/></>});
const IconBookHeart = (p) => SI({ ...p, d: <><path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4z"/><path d="M5 17h14"/><path d="M11 9c0-1 1-2 2-2s2 1 2 2-3 3-3 3-3-2-3-3z" fill="currentColor" stroke="none" opacity=".6"/></>});
const IconPalette = (p) => SI({ ...p, d: <><path d="M12 3a9 9 0 100 18 2 2 0 002-2v-1a2 2 0 012-2h2a3 3 0 003-3 9 9 0 00-9-10z"/><circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="16.5" cy="10.5" r="1" fill="currentColor" stroke="none"/></>});
const IconSettings = (p) => SI({ ...p, d: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h.01a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.01a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></>});

// — Emotion icons (8 faces). Each renders as a soft-tinted circle with face glyph.
function EmotionFace({ kind, size = 56, animate = false }) {
  const palette = {
    joy:       { bg: '#FFF1D6', fg: '#C8821F' },
    calm:      { bg: '#E1F0FE', fg: '#2068B1' },
    grateful:  { bg: '#FCE2EC', fg: '#B7427A' },
    proud:     { bg: '#DEF6EC', fg: '#1F8A65' },
    tired:     { bg: '#EAE5F7', fg: '#5E47AD' },
    anxious:   { bg: '#FDE5D8', fg: '#B85C2A' },
    sad:       { bg: '#E0EAF4', fg: '#3F6595' },
    anger:     { bg: '#FBD9D9', fg: '#B0322F' },
  };
  const c = palette[kind] || palette.calm;
  const s = size;
  // Each face is a distinct simple SVG
  const face = {
    joy:      <g><circle cx="9" cy="11" r="1.4" fill={c.fg}/><circle cx="19" cy="11" r="1.4" fill={c.fg}/><path d="M9 17c1.5 2 5.5 2 7 0" stroke={c.fg} strokeWidth="1.9" fill="none" strokeLinecap="round"/></g>,
    calm:     <g><path d="M7.5 12h3M17.5 12h3" stroke={c.fg} strokeWidth="1.9" strokeLinecap="round"/><path d="M10 17c1.5 1 5 1 8 0" stroke={c.fg} strokeWidth="1.9" fill="none" strokeLinecap="round"/></g>,
    grateful: <g><path d="M9 11c0 1 1 1.5 1.5 1.5S11 12 11 11" stroke={c.fg} strokeWidth="1.9" fill="none" strokeLinecap="round"/><path d="M17 11c0 1 1 1.5 1.5 1.5s.5-.5.5-1.5" stroke={c.fg} strokeWidth="1.9" fill="none" strokeLinecap="round"/><path d="M10 17c1.5 1.8 5.5 1.8 7 0" stroke={c.fg} strokeWidth="1.9" fill="none" strokeLinecap="round"/><path d="M14 6c.5 1 0 2-1 2.5" stroke={c.fg} strokeWidth="1.5" fill="none" strokeLinecap="round"/></g>,
    proud:    <g><circle cx="9" cy="11" r="1.4" fill={c.fg}/><circle cx="19" cy="11" r="1.4" fill={c.fg}/><path d="M9 17.5c1 1 2 1.5 5 1.5s4-.5 5-1.5" stroke={c.fg} strokeWidth="1.9" fill="none" strokeLinecap="round"/><path d="M5 8l2-3 2 3M19 8l2-3 2 3" stroke={c.fg} strokeWidth="1.5" fill="none" strokeLinecap="round"/></g>,
    tired:    <g><path d="M7 11l3 1.5M21 11l-3 1.5" stroke={c.fg} strokeWidth="1.9" strokeLinecap="round"/><path d="M10 18c1 0 1.5-.6 3-.6s2 .6 4 .6" stroke={c.fg} strokeWidth="1.9" fill="none" strokeLinecap="round"/></g>,
    anxious:  <g><path d="M7 10l3-1.5M21 10l-3-1.5" stroke={c.fg} strokeWidth="1.9" strokeLinecap="round"/><circle cx="9.5" cy="12" r="1.2" fill={c.fg}/><circle cx="18.5" cy="12" r="1.2" fill={c.fg}/><path d="M10 18c1.5-1 5.5-1 7 0" stroke={c.fg} strokeWidth="1.9" fill="none" strokeLinecap="round"/></g>,
    sad:      <g><circle cx="9" cy="11" r="1.3" fill={c.fg}/><circle cx="19" cy="11" r="1.3" fill={c.fg}/><path d="M10 19c1.5-2 5.5-2 7 0" stroke={c.fg} strokeWidth="1.9" fill="none" strokeLinecap="round"/><path d="M9 13c-.4 1.5-.2 3 .6 4.2" stroke={c.fg} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity=".6"/></g>,
    anger:    <g><path d="M7 9l3 1.5M21 9l-3 1.5" stroke={c.fg} strokeWidth="2" strokeLinecap="round"/><circle cx="9.5" cy="12" r="1.2" fill={c.fg}/><circle cx="18.5" cy="12" r="1.2" fill={c.fg}/><path d="M10 19c1.5-2 5.5-2 7 0" stroke={c.fg} strokeWidth="1.9" fill="none" strokeLinecap="round"/></g>,
  }[kind] || null;

  return (
    <div style={{
      width: s, height: s, borderRadius: '50%',
      background: c.bg, color: c.fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'transform 200ms cubic-bezier(.2,.7,.2,1)',
      transform: animate ? 'scale(1.05)' : 'scale(1)',
    }}>
      <svg viewBox="0 0 28 28" width={s * 0.78} height={s * 0.78}>{face}</svg>
    </div>
  );
}

const EMOTIONS = [
  { key: 'joy',       label: '기쁨' },
  { key: 'calm',      label: '평온' },
  { key: 'grateful',  label: '감사' },
  { key: 'proud',     label: '뿌듯' },
  { key: 'tired',     label: '지침' },
  { key: 'anxious',   label: '불안' },
  { key: 'sad',       label: '우울' },
  { key: 'anger',     label: '분노' },
];

// — Tiny "child portrait" placeholder. A soft circle with baby silhouette.
function ChildAvatar({ size = 40, hue = 'rose' }) {
  const tones = {
    rose:  { bg: '#FFE3E8', fg: '#C9697F' },
    sky:   { bg: '#DCEAFB', fg: '#3F77B8' },
    mint:  { bg: '#DDF1E7', fg: '#3A8B69' },
    cream: { bg: '#FFF1D6', fg: '#B27E2A' },
  };
  const c = tones[hue] || tones.rose;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: c.bg, color: c.fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg viewBox="0 0 32 32" width={size * 0.72} height={size * 0.72} fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="13" r="5.5"/>
        <path d="M6 27c1-4 5-6 10-6s9 2 10 6"/>
        <circle cx="13.5" cy="13" r=".9" fill="currentColor" stroke="none"/>
        <circle cx="18.5" cy="13" r=".9" fill="currentColor" stroke="none"/>
      </svg>
    </div>
  );
}

Object.assign(window, {
  IconHome, IconArchive, IconInsight, IconUser, IconCamera, IconPlus,
  IconBack, IconClose, IconBell, IconHeart, IconSparkle, IconMoon,
  IconBowl, IconBaby, IconChevronRight, IconChevronLeft, IconCalendar,
  IconPlay, IconImage, IconMic, IconTag, IconCheck, IconWind, IconShield,
  IconCloud, IconWarn, IconBookHeart, IconPalette, IconSettings,
  EmotionFace, EMOTIONS, ChildAvatar,
});
