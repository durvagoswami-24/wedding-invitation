import React, { useEffect, useRef, useState } from 'react';
import monogramLogo from './assets/t-and-a-logo.jpeg';
import palaceBackdrop from './assets/hero-wedding-background.jpg';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Global CSS: petals, gold shimmer, gate lattice ---------- */
export const EnhanceStyles = () => (
  <style>{`
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
    .palace-gate { perspective: 1500px; background: #200b11; }
    .palace-gate__backdrop { background-image: linear-gradient(180deg,rgba(31,9,17,.34),rgba(28,8,15,.68)),url(${palaceBackdrop}); background-size: cover; background-position: center; }
    .palace-gate__arch { position:absolute; inset:5vh 12vw 3vh; border:1px solid rgba(223,184,112,.8); border-radius:48% 48% 0 0 / 18% 18% 0 0; box-shadow:0 0 0 8px rgba(201,154,80,.12), inset 0 0 70px rgba(255,206,122,.34), 0 0 90px rgba(255,186,94,.45); }
    .palace-gate__doors { position:absolute; inset:0; display:flex; transform-style:preserve-3d; }
    .palace-gate__door { position:relative; width:50%; height:100%; transform-style:preserve-3d; transition:transform 2100ms cubic-bezier(.72,.02,.2,1); background:radial-gradient(ellipse at 50% 35%,#8a4a27 0%,#572617 42%,#281018 100%); border:2px solid #B99655; box-shadow:inset 0 0 0 8px rgba(25,8,13,.8),inset 0 0 0 10px rgba(201,154,80,.78),inset 0 0 44px rgba(8,2,5,.8); }
    .palace-gate__door--left { transform-origin:left center; border-radius:50% 0 0 0 / 18% 0 0 0; }
    .palace-gate__door--right { transform-origin:right center; border-radius:0 50% 0 0 / 0 18% 0 0; }
    .palace-gate__door::before { content:''; position:absolute; inset:7% 9%; border:1px solid rgba(224,185,111,.84); box-shadow:inset 0 0 0 5px rgba(201,154,80,.16), inset 0 0 0 6px rgba(224,185,111,.62); background:repeating-radial-gradient(ellipse at center, transparent 0 19px, rgba(221,176,94,.22) 20px 21px, transparent 22px 36px), repeating-linear-gradient(45deg,transparent 0 23px,rgba(221,176,94,.16) 24px 25px,transparent 26px 48px); }
    .palace-gate__door::after { content:'✦'; position:absolute; top:48%; color:#f0d08d; font-size:clamp(28px,5vw,64px); text-shadow:0 0 22px #ffc768; }
    .palace-gate__door--left::after { right:9%; } .palace-gate__door--right::after { left:9%; }
    .palace-gate.is-opening .palace-gate__door--left { transform:rotateY(-105deg); }
    .palace-gate.is-opening .palace-gate__door--right { transform:rotateY(105deg); }
    .palace-gate__glow { position:absolute; inset:0; background:radial-gradient(ellipse at center,rgba(255,207,126,.92),rgba(255,189,99,.2) 35%,transparent 65%); opacity:0; transition:opacity 1500ms ease; }
    .palace-gate.is-opening .palace-gate__glow { opacity:1; }
    .palace-gate__invitation { transition:opacity .6s ease, transform .8s ease; }
    .palace-gate.is-opening .palace-gate__invitation { opacity:0; transform:translateY(-12px) scale(.98); }
    @media (prefers-reduced-motion:reduce) { .palace-gate__door,.palace-gate__glow,.palace-gate__invitation { transition-duration:1ms!important; } }
    @keyframes botanicalSway { 0%,100% { transform: rotate(-1.1deg) translateY(0); } 50% { transform: rotate(1.1deg) translateY(-5px); } }
    @keyframes bloomPulse { 0%,100% { transform: scale(.99); } 50% { transform: scale(1.02); } }
    @keyframes heroImageDrift { 0%,100% { transform: scale(1); } 50% { transform: scale(1.018); } }
    @keyframes heroCurtainSway { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(.35deg); } }
    @keyframes heroSunPulse { 0%,100% { opacity: .54; } 50% { opacity: .7; } }
    @keyframes dividerDraw { to { stroke-dashoffset: 0; } }
    @keyframes ornamentReveal { to { opacity: 1; } }
    @keyframes heroRuleDraw { from { clip-path: inset(0 100% 0 0); opacity: 0; } to { clip-path: inset(0 0 0 0); opacity: .8; } }
    @keyframes heroAmpersandGleam { 0%,65%,100% { text-shadow: none; } 35% { text-shadow: 0 0 7px rgba(213,163,83,.3),0 0 14px rgba(213,163,83,.14); } }
    @keyframes heroSoftSweep { 0%,18% { transform: translateX(-120%) skewX(-14deg); opacity: 0; } 28% { opacity: .18; } 48% { transform: translateX(120%) skewX(-14deg); opacity: 0; } 100% { transform: translateX(120%) skewX(-14deg); opacity: 0; } }
    @keyframes heroCountIn { from { opacity: 0; transform: translateY(12px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
    .wedding-hero { isolation: isolate; }
    .wedding-hero__art { top: 5.5rem; overflow: hidden; }
    .wedding-hero__art img { object-position: center top; animation: heroImageDrift 42s ease-in-out infinite; transform-origin: center 45%; will-change: transform; }
    .hero-curtain { position:absolute; inset:0; pointer-events:none; background-image:inherit; background-size:cover; background-position:center top; }
    .hero-curtain--left { clip-path:polygon(0 0,13.5% 0,13.5% 17%,11% 23%,7% 27%,3% 24%,0 21%); transform-origin:top left; animation:heroCurtainSway 22s ease-in-out infinite; }
    .hero-curtain--right { clip-path:polygon(86.5% 0,100% 0,100% 21%,97% 24%,93% 27%,89% 23%,86.5% 17%); transform-origin:top right; animation:heroCurtainSway 24s ease-in-out -4s infinite reverse; }
    .hero-sunset-glow { background:radial-gradient(ellipse 145px 120px at 84.8% 62%,rgba(255,222,149,.32),rgba(255,190,99,.09) 50%,transparent 78%); animation:heroSunPulse 12s ease-in-out infinite; }
    .hero-flourish .flourish-line { stroke-dasharray:2 2; stroke-dashoffset:120; animation:dividerDraw 1.15s .25s ease-out forwards; }
    .hero-flourish .flourish-ornament { opacity:0; animation:ornamentReveal .65s .9s ease-out forwards; }
    .hero-center-light { background: radial-gradient(ellipse 43% 49% at 50% 43%,rgba(255,251,243,.48) 0%,rgba(255,248,235,.22) 55%,transparent 100%),linear-gradient(180deg,rgba(255,249,238,.04),transparent 28%,transparent 78%,rgba(64,31,22,.08)); }
    .hero-frame-glint { box-shadow: inset 0 0 38px rgba(255,248,232,.08); }
    .wedding-hero::before { content: ''; position: absolute; z-index: 2; pointer-events: none; top: 5.5rem; left: -28%; width: 42%; height: 58%; background: linear-gradient(105deg,transparent 0%,rgba(255,248,221,.0) 35%,rgba(255,246,213,.18) 50%,rgba(255,248,221,.0) 65%,transparent 100%); mix-blend-mode: screen; animation: heroSoftSweep 24s ease-in-out infinite; }
    .wedding-hero::after { content: ''; position: absolute; inset: 5.5rem 0 0; z-index: 1; pointer-events: none; background: radial-gradient(ellipse 125px 125px at 25% 88%,rgba(255,204,112,.18),transparent 72%),radial-gradient(ellipse 125px 125px at 75% 88%,rgba(255,204,112,.18),transparent 72%); animation: lanternAura 12s ease-in-out infinite; }
    @keyframes lanternAura { 0%,100% { opacity: .58; } 50% { opacity: .76; } }
    .hero-eyebrow-wrap { position: relative; top: 5px; min-height: 16px; }
    .hero-eyebrow { text-shadow: 0 1px 10px rgba(255,250,241,.82); white-space: nowrap; }
    .hero-eyebrow-rule { display: block; width: clamp(18px,3vw,34px); height: 1px; transform-origin: center; background: linear-gradient(90deg,transparent,rgba(185,150,85,.88)); animation: heroRuleDraw .85s .4s ease both; }
    .hero-eyebrow-rule:last-child { transform: scaleX(-1); }
    .hero-monogram { box-shadow: 0 5px 18px rgba(91,23,43,.12),0 0 0 5px rgba(255,250,241,.22); transition: transform .55s ease, box-shadow .55s ease; }
    .hero-monogram-wrap::after { content:''; position:absolute; inset:-4px; border-radius:999px; pointer-events:none; background:linear-gradient(115deg,transparent 30%,rgba(255,239,190,.45) 50%,transparent 68%); background-size:220% 100%; animation:goldShimmer 12s 1.3s ease-in-out infinite; opacity:.35; }
    .hero-monogram:hover { transform: translateY(-2px) rotate(4deg); box-shadow: 0 9px 24px rgba(91,23,43,.16),0 0 0 7px rgba(255,250,241,.25); }
    .hero-script { text-shadow: 0 2px 18px rgba(255,249,239,.65); }
    .hero-names { text-wrap: balance; text-shadow: 0 2px 18px rgba(255,249,239,.55); }
    .hero-ampersand { display: inline-block; font-size: .82em; animation: heroAmpersandGleam 3.8s 2s ease-in-out 1 both; }
    .hero-meta { text-shadow: 0 1px 12px rgba(255,250,241,.72); }
    .hero-countdown-wrap [role=timer] > p { font-style: italic; }
    .hero-countdown-wrap [role=timer] > div > div { animation: heroCountIn .7s ease both; }
    .hero-countdown-wrap [role=timer] > div > div:nth-child(1) { animation-delay: 2.05s; }
    .hero-countdown-wrap [role=timer] > div > div:nth-child(2) { animation-delay: 2.16s; }
    .hero-countdown-wrap [role=timer] > div > div:nth-child(3) { animation-delay: 2.27s; }
    .hero-countdown-wrap [role=timer] > div > div:nth-child(4) { animation-delay: 2.38s; }
    .hero-blessing { text-shadow: 0 1px 12px rgba(255,250,241,.75); }
    .hero-countdown-wrap [role=timer] { margin-top: 1.1rem; }
    .hero-countdown-wrap [role=timer] > p { margin-bottom: .65rem; letter-spacing: .04em; }
    .hero-countdown-wrap [role=timer] > div { gap: .65rem; }
    .hero-countdown-wrap [role=timer] > div > div { width: 4rem; min-height: 4.55rem; padding: .72rem .35rem .58rem; border: 1px solid rgba(185,150,85,.62); border-radius: 3px; background: linear-gradient(145deg,rgba(255,252,246,.9),rgba(255,247,234,.76)); box-shadow: 0 5px 16px rgba(91,23,43,.075),inset 0 1px rgba(255,255,255,.8); backdrop-filter: blur(7px); transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
    .hero-countdown-wrap [role=timer] > div > div:hover { transform: translateY(-3px); border-color: rgba(185,150,85,.9); box-shadow: 0 9px 20px rgba(91,23,43,.1),inset 0 1px rgba(255,255,255,.9); }
    .hero-countdown-wrap [role=timer] > div > div > div:first-child { font-size: 1.85rem; }
    .hero-countdown-wrap [role=timer] > div > div > div:last-child { color: #B99655; font-size: 8px; letter-spacing: .13em; text-transform: uppercase; }
    @media (min-width: 640px) { .hero-countdown-wrap [role=timer] > div { gap: .85rem; } .hero-countdown-wrap [role=timer] > div > div { width: 4.55rem; min-height: 4.85rem; padding: .78rem .4rem .62rem; } .hero-countdown-wrap [role=timer] > div > div > div:first-child { font-size: 2rem; } }
    @media (max-width: 380px) { .hero-countdown-wrap [role=timer] > div > div { width: 3.15rem; min-height: 3.9rem; } .hero-countdown-wrap [role=timer] > div > div > div:first-child { font-size: 1.4rem; } }
    .hero-floral-art { transform-origin: 50% 100%; animation: botanicalSway 28s ease-in-out infinite; }
    .hero-bloom { transform-box: fill-box; transform-origin: center; animation: bloomPulse 12s ease-in-out infinite; }
    .event-stack-card { position: sticky; align-self: stretch; }
    .event-card-shell { position:relative; isolation:isolate; transform-origin:center top; border-radius:4px; box-shadow:0 22px 55px rgba(22,5,12,.28),inset 0 0 0 5px rgba(185,150,85,.1); }
    .event-card-shell::before,.event-card-shell::after { content:''; position:absolute; z-index:3; left:0; right:0; height:9px; pointer-events:none; background:linear-gradient(180deg,#f0d99e 0%,#b99655 22%,#76502d 50%,#d8b777 76%,#805b32 100%); box-shadow:0 2px 5px rgba(47,15,20,.28); }
    .event-card-shell::before { top:0; }
    .event-card-shell::after { bottom:0; }
    .event-card-shell:hover { transform:translateY(-5px) scale(1.008); }
    .event-card-shell > div > div:first-child { background:#3e2330; }
    .event-card-shell > div > div:nth-child(2) { background-image:radial-gradient(ellipse at 50% 0%,rgba(231,211,163,.22),transparent 46%),linear-gradient(145deg,#fffaf0,#f4ead8); }
    .gallery-carousel { position:relative; height:clamp(24rem,58vw,39rem); overflow:hidden; perspective:1400px; }
    .gallery-carousel__card { position:absolute; top:0; left:50%; width:min(72%,760px); height:100%; padding:10px; border:1px solid rgba(185,150,85,.72); background:#fbf5e9; box-shadow:0 24px 58px rgba(55,20,29,.2); transition:transform .7s cubic-bezier(.2,.7,.2,1),opacity .7s ease,filter .7s ease; }
    .gallery-carousel__card--current { z-index:3; transform:translateX(-50%) translateZ(70px); opacity:1; }
    .gallery-carousel__card--previous { z-index:2; transform:translateX(-128%) scale(.78) rotateY(16deg); opacity:.55; filter:saturate(.72); }
    .gallery-carousel__card--next { z-index:2; transform:translateX(28%) scale(.78) rotateY(-16deg); opacity:.55; filter:saturate(.72); }
    .gallery-carousel__frame { position:relative; width:100%; height:100%; overflow:hidden; border:1px solid rgba(185,150,85,.36); background:#3e2330; }
    .gallery-carousel__frame > .relative { height:100%; }
    .gallery-carousel__caption { position:absolute; right:0; bottom:0; left:0; display:flex; flex-direction:column; gap:.35rem; padding:3rem 1.5rem 1.4rem; color:#fff8ed; text-align:left; background:linear-gradient(180deg,transparent,rgba(32,10,18,.78)); }
    .gallery-carousel__caption span { color:#e7d3a3; font:9px Montserrat,sans-serif; letter-spacing:.18em; text-transform:uppercase; }
    .gallery-carousel__caption strong { font:normal clamp(1.35rem,3vw,2.25rem) Georgia,serif; }
    .gallery-carousel__arrow { position:absolute; z-index:5; top:50%; display:grid; width:2.8rem; height:2.8rem; place-items:center; transform:translateY(-50%); border:1px solid rgba(185,150,85,.8); border-radius:50%; background:rgba(250,245,236,.94); color:#741b35; box-shadow:0 6px 18px rgba(41,12,20,.16); transition:background .2s,color .2s,transform .2s; }
    .gallery-carousel__arrow:hover { transform:translateY(-50%) scale(1.06); background:#741b35; color:#fff8ed; }
    .gallery-carousel__arrow--previous { left:1rem; }
    .gallery-carousel__arrow--next { right:1rem; }
    .family-section { background: radial-gradient(ellipse at 50% 0%,#FFF9EF 0%,#F3EAD9 62%,#E8D9C3 100%); }
    .family-card { background-image: linear-gradient(145deg,rgba(255,255,255,.7),rgba(250,245,236,.96) 55%,rgba(231,211,163,.16)); }
    .venue-section { background-image: radial-gradient(circle at 8% 15%,rgba(231,211,163,.13),transparent 24%),radial-gradient(circle at 92% 78%,rgba(231,211,163,.12),transparent 25%),linear-gradient(150deg,#5B172B,#32101C); }
    .venue-card { transition: transform .45s ease, box-shadow .45s ease; }
    .venue-card:hover { transform: translateY(-7px); box-shadow: 0 24px 48px rgba(20,4,10,.3); }
    .ceremony-art svg { display:block; }
    .hero-open-button { position: relative; overflow: hidden; border-radius: 2px; }
    .hero-open-button::before { content: ''; position: absolute; inset: 1px; border: 1px solid rgba(231,211,163,.3); pointer-events: none; }
    .hero-open-button:focus-visible, .venue-card a:focus-visible { outline: 2px solid #B99655; outline-offset: 4px; }
    @media (max-width: 767px) {
      .event-stack-card { position: relative; top: auto !important; margin-bottom: 1.25rem; }
      .event-stack-card:last-child { margin-bottom: 0; }
      .wedding-hero__art { top: 4.25rem; }
      .hero-center-light { background: radial-gradient(ellipse 75% 45% at 50% 43%,rgba(255,251,243,.5),rgba(255,248,235,.18) 65%,transparent 100%); }
      .hero-frame-glint { inset-inline: 4%; }
      .hero-countdown-wrap [role=timer] > div { gap: .2rem; }
      .gallery-carousel { height:clamp(23rem,105vw,34rem); }
      .gallery-carousel__card { width:78%; padding:7px; }
      .gallery-carousel__card--previous { transform:translateX(-137%) scale(.72) rotateY(13deg); opacity:.4; }
      .gallery-carousel__card--next { transform:translateX(37%) scale(.72) rotateY(-13deg); opacity:.4; }
      .gallery-carousel__arrow { width:2.45rem; height:2.45rem; }
      .gallery-carousel__arrow--previous { left:.3rem; }
      .gallery-carousel__arrow--next { right:.3rem; }
    }
    @media (hover: none) {
      .event-card-shell:hover, .venue-card:hover { transform: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      .gold-text, .hero-floral-art, .hero-bloom, .hero-open-button, .wedding-hero__art img, .hero-curtain, .hero-sunset-glow, .wedding-hero::before, .wedding-hero::after, .hero-eyebrow-rule, .hero-monogram-wrap::after, .hero-flourish .flourish-line, .hero-flourish .flourish-ornament, .hero-ampersand, .hero-countdown-wrap [role=timer] > div > div { animation: none !important; }
      .hero-flourish .flourish-line { stroke-dashoffset:0; }
      .hero-flourish .flourish-ornament { opacity:1; }
      .event-card-shell, .venue-card, .hero-monogram, .hero-countdown-wrap [role=timer] > div > div, .gallery-carousel__card, .gallery-carousel__arrow { transition: none; }
      .gold-text { color: #5B172B; background: none; }
    }
  `}</style>
);

/* ---------- Gold progress thread at the top of the page ---------- */
export const ScrollProgress = () => {
  const bar = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[70] pointer-events-none">
      <div ref={bar} className="h-full w-full origin-left bg-gradient-to-r from-[#B99655] via-[#E7D3A3] to-[#B99655]" style={{ transform: 'scaleX(0)', willChange: 'transform' }} />
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
      className={`${className} transition-all duration-[650ms] ease-out ${shown ? 'opacity-100 translate-x-0' : `opacity-0 ${hidden}`}`}
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
    setTimeout(() => setPhase('gone'), reduced ? 50 : 2450);
  };

  return (
    <div className={`palace-gate fixed inset-0 z-[80] overflow-hidden ${phase === 'opening' ? 'is-opening' : ''}`} role="dialog" aria-label="Wedding invitation. Open the doors to enter.">
      <div className="palace-gate__backdrop absolute inset-0" />
      <div className="palace-gate__glow" />
      <div className="palace-gate__arch" />
      <div className="palace-gate__doors" aria-hidden="true">
        <div className="palace-gate__door palace-gate__door--left" />
        <div className="palace-gate__door palace-gate__door--right" />
      </div>
      <div className="palace-gate__invitation absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <p className="mb-5 font-serif-luxury text-lg italic text-[#F8E9C8] sm:text-xl">A Celebration of Love</p>
        <button
          onClick={open}
          autoFocus
          aria-label="Open the wedding invitation"
          className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-[#E7D3A3] bg-[#741B35] text-[#E7D3A3] shadow-[0_0_60px_rgba(231,211,163,.45)] transition-transform hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E7D3A3] sm:h-32 sm:w-32"
        >
          <img src={monogramLogo} alt="" className="w-full h-full rounded-full object-cover" />
          <span className="absolute inset-x-0 bottom-1 bg-[#5B172B]/80 py-1 font-sans-clean text-[8px] tracking-widest text-[#F8F0E3]">TAP TO OPEN</span>
        </button>
        <p className="font-sans-clean text-[11px] tracking-[0.25em] text-[#E7D3A3]/80 mt-6">11 – 15 December 2026</p>
      </div>
    </div>
  );
};
