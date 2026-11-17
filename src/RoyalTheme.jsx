import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import countdownFrame from './assets/countdown-frame.webp';
import closingTerrace from './assets/closing-terrace-cutout.png';
import mandalaArt from './assets/mandala-line.webp';
import palaceArt from './assets/palace-cutout.webp';

/* ------------------------------------------------------------------ */
/*  Shared palette                                                      */
/* ------------------------------------------------------------------ */
const ARCH_COLORS = {
  yellow: ['#741B35', '#5B172B'],
  red: ['#741B35', '#5B172B'],
  orange: ['#D9BE82', '#B99655'],
  blue: ['#D9A39E', '#9C5E59'],
  pink: ['#E7D3A3', '#C9A765'],
  green: ['#6B7852', '#556142'],
};
export const ARCH_ORDER = ['red', 'orange', 'blue', 'pink', 'green'];

/* ------------------------------------------------------------------ */
/*  Global styles for the whole theme                                   */
/* ------------------------------------------------------------------ */
export const RoyalStyles = () => (
  <style>{`
    @keyframes rgSpin { to { transform: rotate(360deg); } }
    @keyframes rgSway { 0%,100% { transform: rotate(-1.1deg); } 50% { transform: rotate(1.1deg); } }
    @keyframes rgCloud { 0% { transform: translateX(-6%); } 100% { transform: translateX(6%); } }
    @keyframes rgGlow { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
        .rg-mandala { animation: rgSpin 140s linear infinite; }
    .rg-mandala--rev { animation: rgSpin 170s linear infinite reverse; }
    .rg-sway { }
    .rg-cloud { }
    .rg-glow { }
    .rg-arch-inner figure { border: 0 !important; border-radius: 0 !important; box-shadow: none !important; max-width: none !important; }
    .rg-venue-card { background: linear-gradient(150deg,#7E2140 0%,#5B172B 48%,#3E0F1E 100%); border: 1px solid rgba(231,211,163,.7);
      box-shadow: 0 18px 44px rgba(62,15,30,.35), inset 0 0 0 5px rgba(62,15,30,.9), inset 0 0 0 6px rgba(231,211,163,.4);
      transition: box-shadow .45s ease; }
    .rg-venue-card:hover { box-shadow: 0 26px 54px rgba(62,15,30,.42), inset 0 0 0 5px rgba(62,15,30,.9), inset 0 0 0 6px rgba(231,211,163,.6); }
    .rg-gold-btn { background: linear-gradient(135deg,#E7D3A3,#B99655 55%,#E7D3A3); color: #4E1124; transition: filter .3s ease, transform .3s ease; }
    .rg-gold-btn:hover { filter: brightness(1.08); transform: translateY(-2px); }
    @media (hover: none) { .rg-venue-card:hover, .rg-gold-btn:hover { transform: none; } }
    @media (prefers-reduced-motion: reduce) {
      .rg-mandala, .rg-sway, .rg-cloud, .rg-glow { animation: none !important; }
    }
  `}</style>
);

/* ------------------------------------------------------------------ */
/*  Page backdrop: ivory wash, slowly turning mandalas, drifting petals */
/* ------------------------------------------------------------------ */
const MandalaImg = ({ className = '' }) => (
  <img src={mandalaArt} alt="" aria-hidden="true" draggable="false" decoding="async" className={`absolute select-none ${className}`} />
);

export const RoyalBackdrop = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true"
    style={{ background: 'linear-gradient(165deg,#FAF5EC 0%,#F8F0E3 48%,#F3E7D3 100%)' }}>
    <MandalaImg className="rg-mandala -right-[220px] -top-[160px] h-[560px] w-[560px] opacity-[.11] sm:-right-[200px] sm:h-[700px] sm:w-[700px]" />
    <MandalaImg className="rg-mandala--rev -left-[260px] top-[34%] h-[560px] w-[560px] opacity-[.11] sm:-left-[220px] sm:h-[700px] sm:w-[700px]" />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Arched frames                                                       */
/* ------------------------------------------------------------------ */
export const ArchFrame = ({ color = 'yellow', className = '', innerClassName = '', children, style }) => {
  const c = ARCH_COLORS[color] || ARCH_COLORS.yellow;
  return (
    <div
      className={`relative ${className}`}
      style={{
        padding: 10,
        borderRadius: '999px 999px 14px 14px',
        background: `linear-gradient(160deg, ${c[0]}, ${c[1]})`,
        boxShadow: '0 16px 38px rgba(91,23,43,.22), inset 0 0 0 2px rgba(255,236,170,.7)',
        ...style,
      }}
    >
      <span className="absolute left-1/2 top-[-9px] z-10 h-[18px] w-[18px] -translate-x-1/2 rotate-45 border border-[#F8E9D5] bg-[#B99655] shadow" />
      <div
        className={`rg-arch-inner relative h-full overflow-hidden ${innerClassName}`}
        style={{ borderRadius: '999px 999px 8px 8px', boxShadow: 'inset 0 0 0 3px #B99655' }}
      >
        {children}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Countdown in four coloured arches                                   */
/* ------------------------------------------------------------------ */
const TARGET = new Date('2026-12-15T09:00:00+05:30').getTime();
const COUNT_X = [22.8, 39.7, 57.5, 76.1]; // tile centres, % of artwork width

export const ArchCountdown = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = TARGET - now;
  if (diff <= 0) return <p className="font-script mt-4 text-4xl text-[#741B35]">Today, we celebrate.</p>;
  const s = Math.floor(diff / 1000);
  const units = [
    ['Days', Math.floor(s / 86400)],
    ['Hours', Math.floor((s % 86400) / 3600)],
    ['Minutes', Math.floor((s % 3600) / 60)],
    ['Seconds', s % 60],
  ];
  return (
    <div
      className="relative mx-auto w-full max-w-[1040px]"
      style={{ aspectRatio: '2172 / 724', containerType: 'inline-size' }}
      role="timer"
      aria-label="Time until the Anand Karaj"
    >
      <img src={countdownFrame} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full select-none object-contain" draggable="false" />
      {units.map(([label, v], i) => (
        <span
          key={label}
          className="font-serif-luxury absolute font-bold leading-none text-[#5B172B] tabular-nums"
          style={{ left: `${COUNT_X[i]}%`, top: '42%', transform: 'translate(-50%,-50%)', fontSize: '7.4cqw', textShadow: '0 2px 3px rgba(91,23,43,.2)' }}
          aria-label={`${v} ${label}`}
        >
          {String(v).padStart(2, '0')}
        </span>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Hanging scroll banner (event details)                               */
/* ------------------------------------------------------------------ */
export const ScrollBanner = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const calm = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm || !('IntersectionObserver' in window)) {
      setOpen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOpen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`rg-sway relative mx-auto w-full max-w-[540px] ${className}`}>
      <div className="absolute left-1/2 top-[-34px] h-9 w-px -translate-x-1/2 bg-[#B99655]" aria-hidden="true" />
      <img src={`${import.meta.env.BASE_URL}banner/rod-top.svg`} alt="" aria-hidden="true" className="relative z-10 -mx-[2%] block w-[104%] max-w-none drop-shadow-[0_3px_5px_rgba(0,0,0,.3)]" />
      <div className="grid" style={{ gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 900ms cubic-bezier(.3,.7,.2,1)' }}>
        <div className="overflow-hidden">
          <div
            className="relative mx-[1.2%] px-7 pb-9 pt-8 text-center text-[#F8E9D5] sm:px-10"
            style={{
              opacity: open ? 1 : 0,
              transition: 'opacity 500ms ease 200ms',
              backgroundImage: 'linear-gradient(170deg,#741B35 0%,#5B172B 60%,#45101F 100%)',
              boxShadow: 'inset 0 0 0 1px rgba(231,211,163,.55), inset 0 0 0 7px rgba(69,16,31,.55), inset 0 0 0 8px rgba(231,211,163,.35), 0 18px 40px rgba(62,15,30,.28)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
      <img src={`${import.meta.env.BASE_URL}banner/rod-bottom.svg`} alt="" aria-hidden="true" className="relative z-10 -mx-[2%] -mt-px mb-6 block w-[104%] max-w-none drop-shadow-[0_3px_5px_rgba(0,0,0,.3)]" />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Hero: sunset sky, names, palace. Scrolling glides through the       */
/*  glowing doorway and the light becomes the invitation page.          */
/* ------------------------------------------------------------------ */
export const RoyalHero = ({ live, reduced }) => {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const palaceScale = useTransform(p, [0, 0.45, 0.85], [1, 3, 11]);
  const textY = useTransform(p, [0, 0.35], [0, -50]);
  const textOpacity = useTransform(p, [0, 0.3], [1, 0]);
  const flood = useTransform(p, [0.25, 0.8], [0, 1])
  const fade = useTransform(p, [0.7, 1], ['linear-gradient(to bottom,#000 100%,transparent 100%)', 'linear-gradient(to bottom,#000 72%,transparent 100%)']);

  const item = (delay) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 14 }, animate: live ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }, transition: { duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] } };

  return (
    <section id="hero" ref={ref} className={`relative ${reduced ? 'h-svh min-h-[600px]' : 'mb-[-32svh] h-[150svh]'}`}>
      <motion.div className="sticky top-0 h-svh min-h-[600px] overflow-hidden" style={{ ...(reduced ? {} : { WebkitMaskImage: fade, maskImage: fade }), background: 'linear-gradient(180deg,#F7C5D1 0%,#FACFD2 28%,#FDE0D2 60%,#FDE6CB 100%)' }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 88%, rgba(255,224,140,.85), rgba(255,224,140,0) 72%)' }} />
        <div
          className="absolute inset-x-0 bottom-0 h-[80%] opacity-60"
          aria-hidden="true"
          style={{
            background: 'repeating-conic-gradient(from 270deg at 50% 100%, rgba(255,244,200,.38) 0 2.6deg, transparent 2.6deg 8deg)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 100%, #000 0%, transparent 70%)',
            maskImage: 'radial-gradient(ellipse at 50% 100%, #000 0%, transparent 70%)',
          }}
        />

        <motion.div className="relative z-20 flex flex-col items-center px-4 pt-[8svh] text-center" style={reduced ? undefined : { y: textY, opacity: textOpacity }}>
          <motion.p {...item(0.1)} className="font-script text-[clamp(1.8rem,6svh,3.2rem)] leading-none text-[#8A1530]">Shubh Vivah</motion.p>
          <motion.div {...item(0.2)} aria-hidden="true" className="mb-1 mt-2 flex w-40 items-center justify-center gap-2 text-[#B8923E] sm:w-72">
            <span className="h-px flex-1 bg-[#B8923E]/80" />
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#8A1530] sm:h-6 sm:w-6">
              <circle cx="12" cy="5" r="3" /><circle cx="19" cy="12" r="3" /><circle cx="12" cy="19" r="3" /><circle cx="5" cy="12" r="3" /><circle cx="12" cy="12" r="2" />
            </svg>
            <span className="h-px flex-1 bg-[#B8923E]/80" />
          </motion.div>
          <motion.h1 {...item(0.3)} className="font-serif-luxury text-[clamp(2.4rem,9.5svh,6.2rem)] font-semibold uppercase leading-[.95] tracking-[.04em] text-[#7A1226]" style={{ textShadow: '0 2px 22px rgba(255,244,225,.6)' }}>
            Taniya
            <span className="font-script block text-[.55em] font-normal normal-case leading-[.9] tracking-normal text-[#B8923E]">&amp;</span>
            Abhiraj
          </motion.h1>
          <motion.p {...item(0.45)} className="font-sans-clean mt-3 max-w-full text-[9px] tracking-[.16em] text-[#7A1226] sm:text-xs sm:tracking-[.3em]">
            15 DECEMBER · KOTA
          </motion.p>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-[9] h-[3.5svh] min-h-[18px]" style={{ background: 'linear-gradient(180deg,#F7D9B4 0%,#F4CDA4 100%)', boxShadow: 'inset 0 2px 0 rgba(217,174,98,.7)' }} aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-[3.5svh] z-10 flex justify-center">
          <motion.div style={reduced ? undefined : { scale: palaceScale, transformOrigin: '50% 79%', willChange: 'transform' }}>
            <motion.img
              src={palaceArt}
              alt="Ivory and golden palace with a glowing arched doorway"
              draggable="false"
              decoding="async"
              loading="eager"
              fetchPriority="high"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={live || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
              className="block h-auto max-w-none w-[min(165vw,138svh)] sm:w-[min(120vw,138svh)]"
            />
          </motion.div>
        </div>

        <motion.a href="#invitation" aria-label="Scroll to invitation" style={reduced ? undefined : { opacity: textOpacity }} className="font-sans-clean absolute bottom-[5svh] left-1/2 z-20 hidden -translate-x-1/2 rounded-full bg-[#5B172B]/85 px-4 py-1.5 text-[9px] tracking-[.3em] text-[#F8E9D5] sm:block">SCROLL NOW</motion.a>

        {/* the light of the doorway becomes the invitation page */}
        {!reduced && (
          <motion.div className="pointer-events-none absolute inset-0 z-40" style={{ opacity: flood, background: 'radial-gradient(ellipse at 50% 88%, #FFF3D1 0%, #FAF5EC 55%, #FAF5EC 100%)' }} />
        )}
      </motion.div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Palace terrace finale                                               */
/* ------------------------------------------------------------------ */
export const DesertScene = () => (
  <img
    src={closingTerrace}
    alt="Sunset palace terrace decorated for a Punjabi wedding with a dhol, marigolds, lanterns and a traditional charpai"
    className="block h-auto w-full"
    loading="lazy"
    decoding="async"
  />
);
