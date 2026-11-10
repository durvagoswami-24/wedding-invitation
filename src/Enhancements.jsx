import React, { useEffect, useRef, useState } from 'react';
import monogramLogo from './assets/t-and-a-logo.jpeg';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Global CSS: petals, gold shimmer, gate lattice ---------- */
export const EnhanceStyles = () => (
  <style>{`
    @keyframes petalFall {
      0%   { transform: translate3d(0,-10vh,0) rotate(0deg); opacity: 0; }
      10%  { opacity: .9; }
      50%  { transform: translate3d(var(--sway),50vh,0) rotate(180deg); }
      100% { transform: translate3d(calc(var(--sway) * -.6),110vh,0) rotate(360deg); opacity: 0; }
    }
    .petal {
      position: absolute; top: 0; border-radius: 80% 0 80% 0;
      animation: petalFall var(--dur) linear var(--delay) infinite;
      will-change: transform;
    }
    @keyframes goldShimmer { to { background-position: 200% center; } }
    .gold-text {
      background: linear-gradient(100deg,#5B172B 0%,#5B172B 38%,#B99655 50%,#5B172B 62%,#5B172B 100%);
      background-size: 200% auto;
      -webkit-background-clip: text; background-clip: text; color: transparent;
      animation: goldShimmer 6s linear infinite;
    }
    .gate-lattice {
      background-color: #5B172B;
      background-image:
        radial-gradient(circle at center, transparent 0 9px, rgba(185,150,85,.45) 9px 10px, transparent 10px),
        repeating-linear-gradient(45deg, rgba(185,150,85,.12) 0 1px, transparent 1px 22px),
        repeating-linear-gradient(-45deg, rgba(185,150,85,.12) 0 1px, transparent 1px 22px);
      background-size: 44px 44px, auto, auto;
    }
    @keyframes botanicalSway { 0%,100% { transform: rotate(-1.1deg) translateY(0); } 50% { transform: rotate(1.1deg) translateY(-5px); } }
    @keyframes bloomPulse { 0%,100% { transform: scale(.96); } 50% { transform: scale(1.06); } }
    @keyframes invitationGlow { 0%,100% { box-shadow: 0 8px 22px rgba(91,23,43,.16); } 50% { box-shadow: 0 12px 32px rgba(185,150,85,.34); } }
    .hero-floral-art { transform-origin: 50% 100%; animation: botanicalSway 18s ease-in-out infinite; }
    .hero-bloom { transform-box: fill-box; transform-origin: center; animation: bloomPulse 6s ease-in-out infinite; }
    .hero-open-button { animation: invitationGlow 5s ease-in-out infinite; }
    .event-stack-card { position: sticky; align-self: stretch; }
    .event-card-shell { transform-origin: center top; }
    .event-card-shell:hover { transform: translateY(-5px) scale(1.008); }
    .family-section { background: radial-gradient(ellipse at 50% 0%,#FFF9EF 0%,#F3EAD9 62%,#E8D9C3 100%); }
    .family-card { background-image: linear-gradient(145deg,rgba(255,255,255,.7),rgba(250,245,236,.96) 55%,rgba(231,211,163,.16)); }
    .venue-section { background-image: radial-gradient(circle at 8% 15%,rgba(231,211,163,.13),transparent 24%),radial-gradient(circle at 92% 78%,rgba(231,211,163,.12),transparent 25%),linear-gradient(150deg,#5B172B,#32101C); }
    .venue-card { transition: transform .45s ease, box-shadow .45s ease; }
    .venue-card:hover { transform: translateY(-7px); box-shadow: 0 24px 48px rgba(20,4,10,.3); }
    .ceremony-art svg { display:block; }
    .hero-open-button:focus-visible, .venue-card a:focus-visible { outline: 2px solid #B99655; outline-offset: 4px; }
    @media (max-width: 767px) {
      .event-stack-card { position: relative; top: auto !important; margin-bottom: 1.25rem; }
      .event-stack-card:last-child { margin-bottom: 0; }
      .petal:nth-child(n+9) { display: none; }
    }
    @media (hover: none) {
      .event-card-shell:hover, .venue-card:hover { transform: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      .petal, .gold-text, .hero-floral-art, .hero-bloom, .hero-open-button { animation: none; }
      .event-card-shell, .venue-card { transition: none; }
      .gold-text { color: #5B172B; background: none; }
    }
  `}</style>
);

/* ---------- Falling marigold & rose petals (use inside the hero) ---------- */
const PETALS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 8 + ((i * 5) % 9),
  dur: 11 + ((i * 3) % 8),
  delay: -((i * 2.3) % 14),
  sway: ((i % 2 ? 1 : -1) * (30 + ((i * 11) % 60))),
  color: ['#E39A22', '#F4BF3A', '#C98B86', '#8A2341'][i % 4],
}));

export const PetalFall = () => (
  <div className="absolute inset-0 z-[15] overflow-hidden pointer-events-none" aria-hidden="true">
    {PETALS.map((p, i) => (
      <span
        key={i}
        className="petal"
        style={{
          left: `${p.left}%`,
          width: p.size,
          height: p.size * 1.3,
          background: p.color,
          opacity: 0.85,
          '--dur': `${p.dur}s`,
          '--delay': `${p.delay}s`,
          '--sway': `${p.sway}px`,
        }}
      />
    ))}
  </div>
);

/* ---------- Gold progress thread at the top of the page ---------- */
export const ScrollProgress = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[70] pointer-events-none">
      <div className="h-full bg-gradient-to-r from-[#B99655] via-[#E7D3A3] to-[#B99655]" style={{ width: `${pct}%` }} />
    </div>
  );
};

/* ---------- Reveal: event spreads slide in from their artwork side ---------- */
export const Reveal = ({ from = 'left', children, className = '', style }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(prefersReducedMotion());
  useEffect(() => {
    if (shown || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown]);
  const hidden = from === 'left' ? '-translate-x-10' : 'translate-x-10';
  return (
    <div
      ref={ref}
      style={style}
      className={`${className} transition-all duration-[900ms] ease-out ${shown ? 'opacity-100 translate-x-0' : `opacity-0 ${hidden}`}`}
    >
      {children}
    </div>
  );
};

/* ---------- Countdown to the Anand Karaj (15 Dec 2026, 9:00 AM IST) ---------- */
const TARGET = new Date('2026-12-15T09:00:00+05:30').getTime();

export const Countdown = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = TARGET - now;
  if (diff <= 0) {
    return <p className="font-script text-3xl text-[#741B35] mt-6">Today, we celebrate.</p>;
  }
  const s = Math.floor(diff / 1000);
  const units = [
    ['Days', Math.floor(s / 86400)],
    ['Hours', Math.floor((s % 86400) / 3600)],
    ['Minutes', Math.floor((s % 3600) / 60)],
    ['Seconds', s % 60],
  ];
  return (
    <div className="mt-6" role="timer" aria-label="Time until the Anand Karaj">
      <p className="font-serif-luxury italic text-sm text-[#741B35]/80 mb-2">Until we say yes</p>
      <div className="flex justify-center gap-2 sm:gap-3">
        {units.map(([label, v]) => (
          <div key={label} className="w-14 sm:w-16 py-2 border border-[#B99655]/50 bg-[#FDFBF7]/70">
            <div className="font-serif-luxury text-2xl sm:text-3xl text-[#5B172B] tabular-nums leading-none">
              {String(v).padStart(2, '0')}
            </div>
            <div className="font-sans-clean text-[9px] tracking-widest text-[#B99655] mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- The one big moment: carved doors that swing open ---------- */
export const InvitationGate = ({ onOpen }) => {
  const [phase, setPhase] = useState('closed'); // closed -> opening -> gone
  const reduced = prefersReducedMotion();

  useEffect(() => {
    document.body.style.overflow = phase === 'gone' ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  if (phase === 'gone') return null;

  const open = () => {
    if (phase !== 'closed') return;
    setPhase('opening');
    onOpen && onOpen();
    setTimeout(() => setPhase('gone'), reduced ? 50 : 1700);
  };

  const dur = reduced ? '0ms' : '1500ms';
  const door = 'gate-lattice absolute top-0 h-full w-1/2 border-[#B99655]/70 transition-transform ease-[cubic-bezier(.7,0,.2,1)]';

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden" role="dialog" aria-label="Wedding invitation. Open the doors to enter.">
      <div className={`${door} left-0 border-r`} style={{ transitionDuration: dur, transform: phase === 'opening' ? 'translateX(-102%)' : 'none' }}>
        <div className="absolute inset-4 sm:inset-8 border border-[#B99655]/50" />
      </div>
      <div className={`${door} right-0 border-l`} style={{ transitionDuration: dur, transform: phase === 'opening' ? 'translateX(102%)' : 'none' }}>
        <div className="absolute inset-4 sm:inset-8 border border-[#B99655]/50" />
      </div>

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-500 ${phase === 'opening' ? 'opacity-0' : 'opacity-100'}`}
      >
        <p className="font-serif-luxury italic text-[#E7D3A3] text-lg sm:text-xl mb-5">
          Taniya &amp; Abhiraj invite you in
        </p>
        <button
          onClick={open}
          autoFocus
          aria-label="Open the wedding invitation"
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#741B35] border-2 border-[#E7D3A3] text-[#E7D3A3] shadow-[0_0_60px_rgba(231,211,163,.35)] hover:scale-105 active:scale-95 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E7D3A3] overflow-hidden"
        >
          <img src={monogramLogo} alt="" className="w-full h-full rounded-full object-cover" />
          <span className="absolute inset-x-0 bottom-1 bg-[#5B172B]/80 py-1 font-sans-clean text-[8px] tracking-widest text-[#F8F0E3]">TAP TO OPEN</span>
        </button>
        <p className="font-sans-clean text-[11px] tracking-[0.25em] text-[#E7D3A3]/80 mt-6">11 – 15 December 2026</p>
      </div>
    </div>
  );
};
