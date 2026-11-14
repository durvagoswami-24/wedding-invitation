import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import countdownFrame from './assets/countdown-frame.webp';
import closingTerrace from './assets/closing-terrace-cutout.png';
import mandalaArt from './assets/mandala-line.webp';

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
    .rg-sway { transform-origin: 50% 0; }
    .rg-cloud { }
    .rg-glow { }
    .rg-arch-inner figure { border: 0 !important; border-radius: 0 !important; box-shadow: none !important; max-width: none !important; }
    .rg-venue-card { background: linear-gradient(150deg,#7E2140 0%,#5B172B 48%,#3E0F1E 100%); border: 1px solid rgba(231,211,163,.7);
      box-shadow: 0 18px 44px rgba(62,15,30,.35), inset 0 0 0 5px rgba(62,15,30,.9), inset 0 0 0 6px rgba(231,211,163,.4);
      transition: transform .45s ease, box-shadow .45s ease; }
    .rg-venue-card:hover { transform: translateY(-6px); box-shadow: 0 26px 54px rgba(62,15,30,.42), inset 0 0 0 5px rgba(62,15,30,.9), inset 0 0 0 6px rgba(231,211,163,.6); }
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
      <img src={countdownFrame} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full select-none object-contain" draggable="false" />
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
/*  Palace skyline for the hero (ivory & gold, drawn to the reference)  */
/*  Coordinates are in the reference's pixel space; the left half is    */
/*  drawn once and mirrored, the central block is drawn once.           */
/* ------------------------------------------------------------------ */
const ptArchPath = (x, y, w, h) =>
  `M${x} ${y + h} V${y + h * 0.4} Q${x} ${y + h * 0.12} ${x + w / 2} ${y} Q${x + w} ${y + h * 0.12} ${x + w} ${y + h * 0.4} V${y + h} Z`;

const PtArch = ({ x, y, w, h, fill = 'url(#pl-win)' }) => (
  <g>
    <path d={ptArchPath(x - 5, y - 5, w + 10, h + 7)} fill="#F8EAD0" stroke="#E2B866" strokeWidth="2" />
    <path d={ptArchPath(x, y, w, h)} fill={fill} />
    <rect x={x - 6} y={y + h} width={w + 12} height="4" fill="#E9CD92" />
  </g>
);

const Balustrade = ({ x1, x2, y, h = 22, posts = [] }) => (
  <g>
    <rect x={x1} y={y} width={x2 - x1} height="4" fill="#F3DFB2" />
    <rect x={x1} y={y + h - 4} width={x2 - x1} height="5" fill="#EBCB93" />
    {Array.from({ length: Math.floor((x2 - x1) / 9) }, (_, i) => (
      <rect key={i} x={x1 + 4 + i * 9} y={y + 4} width="4" height={h - 8} rx="1.5" fill="#F9EBCB" stroke="#E7C98C" strokeWidth=".6" />
    ))}
    {posts.map((px) => (
      <g key={px}>
        <rect x={px - 5} y={y - 12} width="10" height={h + 10} fill="#F5E2B8" stroke="#E2B866" strokeWidth=".8" />
        <circle cx={px} cy={y - 19} r="7" fill="url(#pl-dome)" />
      </g>
    ))}
  </g>
);

const RibDome = ({ cx, base, r, h, ribs = 7, fin = 20 }) => (
  <g>
    <path d={`M${cx - r} ${base} C${cx - r} ${base - h * 0.55} ${cx - r * 0.5} ${base - h * 0.95} ${cx} ${base - h} C${cx + r * 0.5} ${base - h * 0.95} ${cx + r} ${base - h * 0.55} ${cx + r} ${base} Z`} fill="url(#pl-dome)" />
    {Array.from({ length: ribs }, (_, i) => {
      const t = -1 + (2 * (i + 1)) / (ribs + 1);
      return <path key={i} d={`M${cx + t * r} ${base} Q${cx + t * r * 0.55} ${base - h * 0.82} ${cx} ${base - h}`} stroke="#C58F3E" strokeOpacity=".5" strokeWidth="1.5" fill="none" />;
    })}
    <rect x={cx - r - 4} y={base - 6} width={r * 2 + 8} height="8" rx="2" fill="#EBCB93" stroke="#E2B866" strokeWidth="1" />
    <line x1={cx} y1={base - h} x2={cx} y2={base - h - fin} stroke="#D9A441" strokeWidth="3" />
    <circle cx={cx} cy={base - h - fin * 0.45} r="4.5" fill="#E8B766" />
    <circle cx={cx} cy={base - h - fin} r="3" fill="#F3D58E" />
  </g>
);

const Turret = ({ cx, base, w = 40, h = 30, r = 27, dh = 38 }) => (
  <g>
    <rect x={cx - w / 2} y={base - h} width={w} height={h} fill="url(#pl-wall)" stroke="#EBCB93" strokeWidth="1" />
    <rect x={cx - w / 2 - 4} y={base - h - 6} width={w + 8} height="7" fill="#F3DFB2" stroke="#E2B866" strokeWidth="1.2" />
    <PtArch x={cx - 15} y={base - h + 6} w={10} h={18} />
    <PtArch x={cx + 5} y={base - h + 6} w={10} h={18} />
    <RibDome cx={cx} base={base - h - 6} r={r} h={dh} ribs={3} fin={12} />
  </g>
);

const Palace = () => (
  <svg viewBox="98 462 1524 420" preserveAspectRatio="xMidYMax meet" className="block max-w-none shrink-0" style={{ height: 'max(300px, min(46svh, 31vw))', width: 'auto' }} aria-hidden="true">
    <defs>
      <linearGradient id="pl-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFF8EA" />
        <stop offset="1" stopColor="#F4DEB6" />
      </linearGradient>
      <linearGradient id="pl-dome" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FBE8B8" />
        <stop offset=".5" stopColor="#E9B965" />
        <stop offset="1" stopColor="#C48A3A" />
      </linearGradient>
      <linearGradient id="pl-win" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6C1227" />
        <stop offset=".7" stopColor="#8F2540" />
        <stop offset="1" stopColor="#B4506A" />
      </linearGradient>
      <radialGradient id="pl-glow" cx="50%" cy="72%" r="75%">
        <stop offset="0" stopColor="#FFFDF0" />
        <stop offset=".45" stopColor="#FFE9A6" />
        <stop offset="1" stopColor="#F2B84A" />
      </radialGradient>

      {/* left half of the palace: outer wing, small tower and the domed inner block */}
      <g id="pl-left">
        <rect x="108" y="770" width="338" height="104" fill="url(#pl-wall)" />
        <rect x="100" y="764" width="354" height="10" fill="#F3DFB2" stroke="#E2B866" strokeWidth="1.5" />
        <Balustrade x1={104} x2={446} y={742} h={22} posts={[132, 245, 357]} />
        {[140, 205, 268, 333, 398].map((x) => <PtArch key={x} x={x} y={806} w={34} h={58} />)}

        <rect x="444" y="702" width="60" height="172" fill="url(#pl-wall)" />
        <rect x="438" y="696" width="72" height="10" fill="#F3DFB2" stroke="#E2B866" strokeWidth="1.5" />
        <PtArch x={466} y={736} w={16} h={42} />
        <PtArch x={466} y={806} w={16} h={52} />
        <RibDome cx={474} base={696} r={32} h={50} ribs={4} fin={16} />

        <rect x="502" y="684" width="210" height="190" fill="url(#pl-wall)" />
        <rect x="540" y="664" width="136" height="22" fill="#F3DFB2" stroke="#E2B866" strokeWidth="1.5" />
        <rect x="566" y="628" width="84" height="38" fill="url(#pl-wall)" stroke="#EBCB93" strokeWidth="1" />
        <PtArch x={580} y={638} w={16} h={22} />
        <PtArch x={620} y={638} w={16} h={22} />
        <RibDome cx={608} base={628} r={52} h={62} ribs={5} fin={18} />
        <Balustrade x1={504} x2={546} y={662} h={22} />
        <Balustrade x1={672} x2={712} y={662} h={22} />
        {[536, 590, 644].map((x) => <PtArch key={x} x={x} y={778} w={36} h={66} />)}
        <rect x="502" y="846" width="210" height="28" fill="#F1DDB4" />
      </g>
    </defs>

    {/* plinth */}
    <rect x="98" y="872" width="1524" height="10" fill="#EDCF98" />
    <rect x="98" y="872" width="1524" height="2.5" fill="#D9AE62" />

    <use href="#pl-left" />
    <use href="#pl-left" transform="translate(1716 0) scale(-1 1)" />

    {/* central block */}
    <rect x="710" y="690" width="296" height="184" fill="url(#pl-wall)" />
    <rect x="696" y="672" width="324" height="20" fill="#F3DFB2" stroke="#E2B866" strokeWidth="1.5" />
    <Balustrade x1={700} x2={1016} y={650} h={22} posts={[712, 1004]} />
    <rect x="768" y="590" width="180" height="62" fill="url(#pl-wall)" stroke="#EBCB93" strokeWidth="1" />
    {[812, 847, 882].map((x) => <PtArch key={x} x={x} y={612} w={22} h={30} />)}
    <rect x="758" y="582" width="200" height="10" fill="#F3DFB2" stroke="#E2B866" strokeWidth="1.5" />
    <RibDome cx={858} base={582} r={86} h={118} ribs={9} fin={28} />
    <Turret cx={741} base={650} />
    <Turret cx={975} base={650} />

    {/* grand portal with glowing doorway */}
    <path d="M788 874 V772 Q788 728 858 702 Q928 728 928 772 V874 Z" fill="#F8E6BE" stroke="#E2B866" strokeWidth="3" />
    <path d="M806 874 V778 Q806 744 858 722 Q910 744 910 778 V874 Z" fill="none" stroke="#E9C98A" strokeWidth="2" />
    <path d="M826 868 V802 Q826 774 858 758 Q890 774 890 802 V868 Z" fill="url(#pl-glow)" className="rg-glow" />
    {[842, 858, 874].map((x) => <line key={x} x1={x} y1="772" x2={x} y2="868" stroke="#D9A441" strokeOpacity=".55" strokeWidth="1.4" />)}
    {[800, 830].map((y) => <line key={y} x1="828" y1={y} x2="888" y2={y} stroke="#D9A441" strokeOpacity=".5" strokeWidth="1.4" />)}
    <PtArch x={738} y={774} w={28} h={64} />
    <PtArch x={950} y={774} w={28} h={64} />
    {[702, 1006].map((x) => (
      <g key={x}>
        <rect x={x - 2} y={836} width="16" height="38" fill="#F3DFB2" stroke="#E2B866" strokeWidth="1" />
        <circle cx={x + 6} cy={826} r="8" fill="url(#pl-dome)" />
      </g>
    ))}
    {/* steps */}
    <rect x="722" y="850" width="272" height="8" fill="#F3DFB2" stroke="#E2B866" strokeWidth="1" />
    <rect x="716" y="858" width="284" height="8" fill="#EFD6A6" stroke="#E2B866" strokeWidth="1" />
    <rect x="710" y="866" width="296" height="8" fill="#EBCB93" stroke="#E2B866" strokeWidth="1" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Hero: sunset sky, names, palace; scrolling walks you through gate   */
/* ------------------------------------------------------------------ */
export const RoyalHero = ({ live, reduced }) => {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const palaceScale = useTransform(p, [0, 1], [1, reduced ? 1 : 7]);
  const textY = useTransform(p, [0, 0.4], [0, reduced ? 0 : -60]);
  const textOpacity = useTransform(p, [0, 0.35], [1, reduced ? 1 : 0]);
  const skyScale = useTransform(p, [0, 1], [1, reduced ? 1 : 1.25]);
  const flood = useTransform(p, [0.4, 0.85], [0, reduced ? 0 : 1]);

  const item = (delay) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 22 }, animate: live ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }, transition: { duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] } };

  return (
    <section id="hero" ref={ref} className={`relative ${reduced ? 'h-svh min-h-[640px]' : 'h-[200svh]'}`}>
      <div className="sticky top-0 h-svh min-h-[640px] overflow-hidden">
        {/* sky */}
        <motion.div className="absolute inset-0" style={{ scale: skyScale, background: 'radial-gradient(ellipse 48% 40% at 50% 84%, rgba(255,224,140,.9), rgba(255,224,140,0) 72%), linear-gradient(180deg,#F7C5D1 0%,#FACFD2 26%,#FDE0D2 58%,#FDE6CB 100%)' }}>
          <div className="absolute inset-0 opacity-35" style={{ background: 'linear-gradient(105deg,transparent 0 32%,rgba(255,247,218,.25) 32.2% 32.6%,transparent 32.8% 45%,rgba(255,247,218,.18) 45.2% 45.6%,transparent 45.8% 62%,rgba(255,247,218,.2) 62.2% 62.6%,transparent 62.8%)' }} />
          <div className="rg-cloud absolute -left-[10%] top-[5%] h-[35%] w-[70%] rounded-full opacity-55" style={{ background: 'radial-gradient(ellipse, rgba(255,232,228,.86), rgba(238,164,174,.18) 48%, transparent 73%)' }} />
          <div className="rg-cloud absolute -right-[12%] top-[14%] h-[42%] w-[76%] rounded-full opacity-55" style={{ background: 'radial-gradient(ellipse, rgba(255,225,220,.9), rgba(224,143,155,.14) 49%, rgba(194,145,150,.08) 67%, transparent 76%)', animationDuration: '34s' }} />
          <div className="rg-cloud absolute left-[-8%] top-[35%] h-[32%] w-[62%] rounded-full opacity-65" style={{ background: 'radial-gradient(ellipse, rgba(255,242,208,.9), rgba(255,189,130,.32) 53%, transparent 76%)', animationDuration: '30s' }} />
          <div className="rg-cloud absolute right-[8%] top-[48%] h-[24%] w-[48%] rounded-full opacity-55" style={{ background: 'radial-gradient(ellipse, rgba(255,228,198,.82), rgba(201,139,150,.12) 58%, transparent 76%)', animationDuration: '32s' }} />
          <div
            className="absolute inset-x-0 bottom-0 h-[85%] opacity-70"
            style={{
            background: 'repeating-conic-gradient(from 270deg at 50% 100%, rgba(255,244,200,.38) 0 2.6deg, transparent 2.6deg 8deg)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 100%, #000 0%, transparent 70%)',
              maskImage: 'radial-gradient(ellipse at 50% 100%, #000 0%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* names */}
        <motion.div className="relative z-20 flex h-full flex-col items-center px-3 pt-[9svh] text-center sm:px-4 sm:pt-[5svh]" style={{ y: textY, opacity: textOpacity }}>
          <motion.p {...item(0.1)} className="font-script text-[2rem] text-[#8A1530] min-[380px]:text-3xl sm:text-5xl">Shubh Vivah</motion.p>
          <motion.div {...item(0.2)} aria-hidden="true" className="mt-1 mb-1 flex w-40 items-center justify-center gap-2 text-[#B8923E] min-[380px]:w-44 sm:w-72">
            <span className="h-px flex-1 bg-[#B8923E]/80" />
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#8A1530] sm:h-7 sm:w-7">
              <circle cx="12" cy="5" r="3" /><circle cx="19" cy="12" r="3" /><circle cx="12" cy="19" r="3" /><circle cx="5" cy="12" r="3" /><circle cx="12" cy="12" r="2" />
            </svg>
            <span className="h-px flex-1 bg-[#B8923E]/80" />
          </motion.div>
          <motion.h1 {...item(0.3)} className="font-serif-luxury mt-0 text-[2.65rem] font-semibold uppercase leading-[.95] tracking-[.04em] text-[#7A1226] min-[380px]:text-[3.1rem] min-[420px]:text-6xl sm:text-7xl lg:text-8xl" style={{ textShadow: '0 2px 22px rgba(255,244,225,.6)' }}>
            Taniya
            <span className="font-script block text-4xl font-normal normal-case tracking-normal text-[#B8923E] sm:text-6xl">&amp;</span>
            Abhiraj
          </motion.h1>
          <motion.p {...item(0.55)} className="font-sans-clean mt-3 max-w-full text-[8px] tracking-[.14em] text-[#7A1226] min-[380px]:text-[9px] sm:mt-4 sm:text-xs sm:tracking-[.3em]">
            11 – 15 DECEMBER 2026 • KOTA, RAJASTHAN
          </motion.p>
        </motion.div>

        {/* palace */}
        <div className="absolute inset-x-0 bottom-0 z-[9] h-[4.4svh]" style={{ background: 'linear-gradient(180deg,#F7D9B4 0%,#F4CDA4 100%)', boxShadow: 'inset 0 2px 0 rgba(217,174,98,.7)' }} aria-hidden="true" />
        <motion.div className="absolute inset-x-0 bottom-[4.4svh] z-10 flex justify-center" style={{ scale: palaceScale, transformOrigin: '50% 80%' }}>
          <Palace />
        </motion.div>

        {/* the light of the gateway floods the screen as you pass through */}
        <motion.div className="pointer-events-none absolute inset-0 z-40" style={{ opacity: flood, background: 'radial-gradient(ellipse at 50% 85%, #FFF6DD 0%, #F8F0E3 60%, #F8F0E3 100%)' }} />
      </div>
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
