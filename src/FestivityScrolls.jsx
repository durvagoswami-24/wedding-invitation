import React, { useEffect, useRef, useState } from 'react';
import carImg from './assets/car.png';
import { Clock, MapPin, Flower2, Music2, Flame, Sun, Wine, Crown, Calendar, ExternalLink } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  "The Royal Festivities" timeline                                    */
/*  Velvet scrolls with gold rods and tassels hang left and right of a  */
/*  gold centre line. Each scroll unrolls when it scrolls into view.    */
/*  Props: events = the `events` array already in App.jsx.              */
/*  No photographs are used anywhere in this section.                   */
/* ------------------------------------------------------------------ */

const ICONS = { ganesh: Flower2, sangeet: Music2, divine: Flame, haldi: Sun, sunset: Wine, circle: Wine, royal: Crown, grandWedding: Crown };

const mapUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// "FRIDAY, 11 DECEMBER 2026" -> "11 Dec 2026"
const shortDate = (s = '') => {
  const m = s.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!m) return s;
  const mon = m[2].slice(0, 3).toLowerCase();
  return `${m[1]} ${mon[0].toUpperCase()}${mon.slice(1)} ${m[3]}`;
};

// Google Calendar link for one event. The date comes from the event's own date text.
const MONTHS = { JANUARY: 0, FEBRUARY: 1, MARCH: 2, APRIL: 3, MAY: 4, JUNE: 5, JULY: 6, AUGUST: 7, SEPTEMBER: 8, OCTOBER: 9, NOVEMBER: 10, DECEMBER: 11 };
const calendarUrl = (evt) => {
  const d = (evt.date || '').match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  const t = (evt.time || '').match(/(\d{1,2}):(\d{2})\s*([AP])\.?M/i);
  if (!d || !t) return null;
  let h = Number(t[1]) % 12 + (t[3].toUpperCase() === 'P' ? 12 : 0);
  const start = new Date(Date.UTC(+d[3], MONTHS[d[2].toUpperCase()], +d[1], h - 5, +t[2] - 30)); // IST -> UTC
  const end = new Date(start.getTime() + 3 * 36e5);
  const f = (x) => x.toISOString().replace(/[-:]|\.\d{3}/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Taniya & Abhiraj: ' + evt.title)}&dates=${f(start)}/${f(end)}&location=${encodeURIComponent(`${evt.venue}, ${evt.address}`)}`;
};

const useOpenOnView = (threshold = 0.35) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const calm = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm || !('IntersectionObserver' in window)) { setOpen(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOpen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, open];
};

/* ---------- artwork (all inline SVG, no image files) ---------- */
const SharedDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="fs-gold-v" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff0b8" /><stop offset=".35" stopColor="#d9a93a" /><stop offset=".7" stopColor="#8a6418" /><stop offset="1" stopColor="#e8c76a" />
      </linearGradient>
      <radialGradient id="fs-gold-r" cx=".35" cy=".3" r=".8">
        <stop offset="0" stopColor="#fff3c4" /><stop offset=".5" stopColor="#d9a93a" /><stop offset="1" stopColor="#7a560f" />
      </radialGradient>
      <linearGradient id="fs-tassel" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#5a0d1a" /><stop offset=".5" stopColor="#b3182f" /><stop offset="1" stopColor="#5a0d1a" />
      </linearGradient>
    </defs>
  </svg>
);

// Gold rod with bulb finials. `flip` turns it upside down for the bottom rod.
const Rod = ({ flip }) => (
  <svg viewBox="0 0 340 46" className="fs-rod" aria-hidden="true" style={flip ? { transform: 'scaleY(-1)' } : undefined}>
    <path d="M170 2l8 9-8 9-8-9z" fill="url(#fs-gold-r)" stroke="#7a560f" strokeWidth=".6" />
    <circle cx="170" cy="11" r="2" fill="#7a0f22" />
    <path d="M150 22q10-12 20-4 10-8 20 4" fill="none" stroke="#e8c76a" strokeWidth="1.4" />
    <rect x="28" y="22" width="284" height="15" rx="7.5" fill="url(#fs-gold-v)" stroke="#7a560f" strokeWidth=".6" />
    <rect x="28" y="24" width="284" height="3" rx="1.5" fill="#fff6cf" opacity=".55" />
    {[0, 1].map((i) => {
      const x = i ? 320 : 20;
      const s = i ? -1 : 1;
      return (
        <g key={i}>
          <rect x={x - 5 * s - (s > 0 ? 0 : 6)} y="17" width="6" height="25" rx="2" fill="url(#fs-gold-v)" stroke="#7a560f" strokeWidth=".5" />
          <circle cx={x} cy="29.5" r="12" fill="url(#fs-gold-r)" stroke="#7a560f" strokeWidth=".7" />
          <circle cx={x} cy="29.5" r="5" fill="none" stroke="#fff0b8" strokeWidth=".8" opacity=".8" />
          <path d={`M${x - 6 * s} 29.5L${x - 17 * s} 29.5`} stroke="#d9a93a" strokeWidth="3" strokeLinecap="round" />
          <path d={`M${x} 17.5l${2 * s} -9 ${2 * s} 9`} fill="url(#fs-gold-v)" />
        </g>
      );
    })}
  </svg>
);

const Tassel = ({ side }) => (
  <svg viewBox="0 0 26 120" className={`fs-tassel fs-tassel--${side}`} aria-hidden="true">
    <path d="M13 0V46" stroke="#d9a93a" strokeWidth="1.6" />
    <circle cx="13" cy="50" r="5" fill="url(#fs-gold-r)" stroke="#7a560f" strokeWidth=".6" />
    <path d="M7 58h12l3 8H4z" fill="url(#fs-gold-v)" stroke="#7a560f" strokeWidth=".5" />
    <path d="M4 66h18l3 50H1z" fill="url(#fs-tassel)" />
    {[6, 9.5, 13, 16.5, 20].map((x) => <path key={x} d={`M${x} 68V114`} stroke="#3d0711" strokeWidth=".6" opacity=".55" />)}
    <path d="M1 100h24" stroke="#d9a93a" strokeWidth="1.4" />
  </svg>
);

const Cab = () => <img src={carImg} alt="" className="fs-cab" draggable="false" />;

/* ---------- one velvet scroll ---------- */
const Scroll = ({ evt, index, open }) => {
  const Icon = ICONS[evt.colorKey] || Flower2;
  const cal = calendarUrl(evt);
  const n = Number(evt.num) || index + 1;
  return (
    <div className="fs-scroll">
      <Rod />
      <Tassel side="l" />
      <Tassel side="r" />
      <div className="fs-body" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="fs-clip">
          <div className="fs-paper" style={{ opacity: open ? 1 : 0 }}>
            <p className="fs-event font-sans-clean">EVENT {n}</p>
            <span className="fs-icon"><Icon strokeWidth={1.5} /></span>
            <h3 className="fs-title font-serif-luxury">{evt.title}</h3>
            <p className="fs-tag font-script">{(evt.quote || '').replace(/"/g, '')}</p>
            <div className="fs-div" aria-hidden="true"><i /><b /><i /></div>

            <div className="fs-row-line">
              <Clock strokeWidth={1.6} />
              <p className="font-serif-luxury">{shortDate(evt.date)}<br />{evt.time}</p>
            </div>
            <div className="fs-row-line">
              <MapPin strokeWidth={1.6} />
              <p className="font-serif-luxury">{evt.venue}<span>{evt.address}</span></p>
            </div>
            {evt.lunchTime && (
              <p className="fs-lunch font-serif-luxury">
                Lunch {evt.lunchTime}
                {evt.lunchVenue ? ` · ${evt.lunchVenue.split(',')[0]}` : ''}
              </p>
            )}

            <div className="fs-links font-sans-clean">
              <a href={mapUrl(`${evt.venue}, ${evt.address}`)} target="_blank" rel="noopener noreferrer"><MapPin /> Map <ExternalLink /></a>
              {cal && <a href={cal} target="_blank" rel="noopener noreferrer"><Calendar /> Calendar</a>}
            </div>
          </div>
        </div>
      </div>
      <Rod flip />
    </div>
  );
};

const Row = ({ evt, index }) => {
  const [ref, open] = useOpenOnView(0.3);
  const scrollLeft = index % 2 === 0;
  return (
    <div ref={ref} className={`fs-row ${open ? 'is-open' : ''} ${scrollLeft ? 'fs-row--sl' : 'fs-row--sr'}`}>
      <div className="fs-scrollcol"><Scroll evt={evt} index={index} open={open} /></div>
      <div className="fs-datecol">
        <span className="fs-node" aria-hidden="true" />
        <p className="fs-date font-script">{shortDate(evt.date)}</p>
      </div>
    </div>
  );
};

const PETALS = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 37 + 9) % 100,
  size: 7 + ((i * 5) % 8),
  dur: 14 + ((i * 3) % 9),
  delay: -((i * 2.7) % 16),
  sway: (i % 2 ? 1 : -1) * (30 + ((i * 13) % 60)),
  color: ['#E9798F', '#D63B73', '#F08AA8', '#C92A5C'][i % 4],
}));

const Car = ({ wrapRef }) => {
  const carRef = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current; const car = carRef.current;
      if (!wrap || !car) return;
      const r = wrap.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height));
      car.style.transform = `translate3d(0,${Math.max(0, p * (r.height - (car.firstElementChild ? car.firstElementChild.offsetHeight : 0)))}px,0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [wrapRef]);
  return <div ref={carRef} className="fs-car" aria-hidden="true"><Cab /></div>;
};

export const FestivityTimeline = ({ events }) => {
  const wrapRef = useRef(null);
  return (
  <div className="fs-wrap" ref={wrapRef}>
    <style>{`
      .fs-wrap{position:relative;max-width:1180px;margin:0 auto}
      .fs-wrap::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.5;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l24 24-24 24L4 28z' fill='none' stroke='%23d9a93a' stroke-opacity='.18'/%3E%3Ccircle cx='28' cy='28' r='2' fill='%23d9a93a' fill-opacity='.18'/%3E%3C/svg%3E")}
      .fs-line{position:absolute;left:50%;top:0;bottom:0;width:1px;transform:translateX(-.5px);background:linear-gradient(180deg,transparent,#d9a93a 4%,#d9a93a 96%,transparent)}
      .fs-petals{position:sticky;top:0;height:100svh;margin-bottom:-100svh;overflow:hidden;pointer-events:none;z-index:3}
      .fs-petal{position:absolute;top:-24px;border-radius:80% 0 80% 0;opacity:.8;animation:fsFall var(--dur) linear var(--delay) infinite}
      @keyframes fsFall{0%{transform:translate3d(0,-6vh,0) rotate(0)}50%{transform:translate3d(var(--sway),55vh,0) rotate(180deg)}100%{transform:translate3d(calc(var(--sway)*-.5),112vh,0) rotate(360deg)}}

      .fs-row{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;align-items:center;min-height:clamp(480px,70vh,620px)}
      .fs-row--sr .fs-scrollcol{order:2}.fs-row--sr .fs-datecol{order:1}
      .fs-scrollcol{display:flex;justify-content:center;padding:34px clamp(16px,4vw,64px)}
      .fs-datecol{position:relative;align-self:stretch}

      .fs-node{position:absolute;top:34%;width:11px;height:11px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3c4,#c9962c);box-shadow:0 0 0 4px #d9a93a33;transform:translate(-50%,-50%);transition:transform .8s cubic-bezier(.2,.7,.2,1) .2s;z-index:2}
      .fs-row--sl .fs-node{left:0}.fs-row--sr .fs-node{right:0;transform:translate(50%,-50%)}
      .fs-date{position:absolute;top:34%;transform:translateY(-50%);margin:0;font-size:clamp(2.1rem,3.6vw,3.2rem);line-height:1;color:#8a2a3c;white-space:nowrap;
        transition:opacity .9s ease .35s,translate .9s cubic-bezier(.2,.7,.2,1) .35s;opacity:0}
      .fs-row--sl .fs-date{left:clamp(30px,5vw,64px);translate:-14px 0}
      .fs-row--sr .fs-date{right:clamp(30px,5vw,64px);translate:14px 0}
      .is-open .fs-date{opacity:1;translate:0 0}
      .fs-car{position:absolute;left:50%;top:0;width:0;height:0;z-index:6;will-change:transform;pointer-events:none}
      .fs-cab{display:block;width:clamp(88px,9vw,112px);height:auto;margin-left:calc(clamp(88px,9vw,112px)/-2);filter:drop-shadow(0 8px 8px rgba(60,20,0,.4));user-select:none}
      @keyframes fsSwing{0%,100%{transform:rotate(-2.2deg)}50%{transform:rotate(2.2deg)}}

      /* scroll */
      .fs-scroll{position:relative;width:min(340px,100%);transform-origin:50% 0;animation:fsSway 8s ease-in-out infinite}
      .fs-row--sr .fs-scroll{animation-delay:-3s}
      @keyframes fsSway{0%,100%{transform:rotate(-.6deg)}50%{transform:rotate(.6deg)}}
      .fs-rod{display:block;width:100%;height:auto;position:relative;z-index:3;filter:drop-shadow(0 3px 3px rgba(60,20,0,.35))}
      .fs-tassel{position:absolute;top:22px;width:7.6%;height:auto;z-index:4;transform-origin:50% 0;animation:fsSwing 5s ease-in-out infinite}
      .fs-tassel--l{left:2.4%}.fs-tassel--r{right:2.4%;animation-delay:-2s}
      .fs-body{display:grid;transition:grid-template-rows 1.6s cubic-bezier(.4,0,.2,1);margin:-1px 0}
      .fs-clip{overflow:hidden;min-height:0}
      .fs-paper{position:relative;margin:0 8.2%;padding:34px 22px 38px;text-align:center;color:#f5e3bd;transition:opacity .9s ease .5s;
        background:radial-gradient(ellipse at 50% 0,#a8162f,#7a0f22 55%,#5a0a19);
        border-left:3px solid #d9a93a;border-right:3px solid #d9a93a;box-shadow:inset 0 0 0 1px #f3d27a55,inset 0 0 40px #3d071280}
      .fs-paper::before,.fs-paper::after{content:"";position:absolute;left:-3px;right:-3px;height:16px;
        background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='16'%3E%3Crect width='22' height='3' fill='%23d9a93a'/%3E%3Cpath d='M1 3q10 16 20 0' fill='none' stroke='%23f3d27a' stroke-width='1.4'/%3E%3Ccircle cx='11' cy='8' r='1.6' fill='%23f3d27a'/%3E%3C/svg%3E") repeat-x center/auto 100%}
      .fs-paper::before{top:0}.fs-paper::after{bottom:0;transform:scaleY(-1)}
      .fs-event{margin:0;font-size:9px;letter-spacing:.34em;color:#e7c97a99}
      .fs-icon{display:inline-grid;place-items:center;width:34px;height:34px;margin-top:8px;border:1px solid #d9a93a99;border-radius:50%;color:#f3d27a}
      .fs-icon svg{width:17px;height:17px}
      .fs-title{margin:8px 0 0;font-size:clamp(1.7rem,3.4vw,2.2rem);font-weight:600;line-height:1.05;text-transform:uppercase;letter-spacing:.07em;color:#f3d27a;
        background:linear-gradient(180deg,#fff0b8,#e0b44a 55%,#b98c2a);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
      .fs-tag{margin:6px 0 0;font-size:1.3rem;line-height:1.15;color:#f3dfc0}
      .fs-div{display:flex;align-items:center;justify-content:center;gap:8px;margin:14px 0 16px}
      .fs-div i{width:34px;height:1px;background:linear-gradient(90deg,transparent,#d9a93a)}.fs-div i:last-child{transform:scaleX(-1)}
      .fs-div b{width:6px;height:6px;transform:rotate(45deg);background:#d9a93a}
      .fs-row-line{display:flex;gap:9px;align-items:flex-start;justify-content:center;margin-top:10px;text-align:left}
      .fs-row-line svg{flex:none;width:13px;height:13px;margin-top:5px;color:#e7c97a}
      .fs-row-line p{margin:0;font-size:1.02rem;line-height:1.25;color:#f5e3bd}
      .fs-row-line p span{display:block;font-size:.88rem;color:#f3d27acc}
      .fs-lunch{margin:10px 0 0;font-size:.92rem;font-style:italic;color:#f3d27acc}
      .fs-links{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:18px}
      .fs-links a{display:inline-flex;align-items:center;gap:5px;padding:7px 12px;border:1px solid #d9a93a99;border-radius:999px;font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:#f3d27a;text-decoration:none;transition:background .25s,color .25s}
      .fs-links a svg{width:10px;height:10px}
      .fs-links a:hover{background:#f3d27a;color:#5a0d1a}
      .fs-links a:focus-visible{outline:2px solid #f3d27a;outline-offset:3px}

      @media (max-width:767px){
        .fs-line{left:18px}
        .fs-row{grid-template-columns:1fr;min-height:0;padding:30px 0 30px 42px}
        .fs-row--sr .fs-scrollcol,.fs-row--sl .fs-scrollcol{order:2}.fs-row--sr .fs-datecol,.fs-row--sl .fs-datecol{order:1}
        .fs-scrollcol{padding:10px 8px 0 0}
        .fs-datecol{align-self:auto;height:auto;padding-right:8px}
        .fs-date,.fs-row--sl .fs-date,.fs-row--sr .fs-date{position:static;transform:none;translate:0 0;left:auto;right:auto;opacity:1;font-size:2.3rem}
        .fs-node,.fs-row--sl .fs-node,.fs-row--sr .fs-node{left:-24px;right:auto;top:1.1rem;transform:translate(-50%,-50%)}
        .fs-car{left:18px}.fs-cab{width:60px;margin-left:-30px}
      }
      @media (prefers-reduced-motion:reduce){
        .fs-scroll,.fs-tassel,.fs-petal{animation:none!important}
        .fs-body,.fs-paper,.fs-date,.fs-node{transition:none!important}
        .fs-petals{display:none}
      }
    `}</style>

    <SharedDefs />
    <div className="fs-line" aria-hidden="true" />
    <Car wrapRef={wrapRef} />
    <div className="fs-petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span key={i} className="fs-petal" style={{ left: `${p.left}%`, width: p.size, height: p.size * 1.3, background: p.color, '--dur': `${p.dur}s`, '--delay': `${p.delay}s`, '--sway': `${p.sway}px` }} />
      ))}
    </div>
    {events.map((evt, i) => <Row key={evt.title} evt={evt} index={i} />)}
  </div>
  );
};

export default FestivityTimeline;
