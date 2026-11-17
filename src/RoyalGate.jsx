import React, { useEffect, useRef, useState } from 'react';
import closedGate from './assets/royal-gate-closed.jpg';
import openGate from './assets/royal-gate-open.jpg';
import weddingLogo from './assets/abhiraj-taniya-monogram-transparent.png';

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const GateArt = ({ opening, reduced }) => {
  const leaf = (side) => ({
    position: 'absolute',
    inset: 0,
    clipPath: side === 'left'
      ? 'polygon(31.5% 39%,32% 33%,33.5% 28%,36% 24%,40% 21.4%,45% 19.7%,50% 19.2%,50% 98%,31.5% 98%)'
      : 'polygon(50% 19.2%,55% 19.7%,60% 21.4%,64% 24%,66.5% 28%,68% 33%,68.5% 39%,68.5% 98%,50% 98%)',
    transformOrigin: side === 'left' ? '31.5% 58%' : '68.5% 58%',
    transform: opening ? `rotateY(${side === 'left' ? 78 : -78}deg)` : 'rotateY(0deg)',
    transition: `transform ${reduced ? 0 : 950}ms cubic-bezier(.55,.05,.2,1)`,
    backfaceVisibility: 'hidden',
  });

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}>
      <img src={closedGate} alt="" aria-hidden="true" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" draggable="false" />
      <img src={openGate} alt="" aria-hidden="true" fetchPriority="low" decoding="async" className="absolute inset-0 h-full w-full object-cover" draggable="false" style={{ opacity: opening ? 1 : 0, transition: `opacity ${reduced ? 0 : 650}ms ease ${opening && !reduced ? 300 : 0}ms` }} />
      {['left', 'right'].map((side) => (
        <div key={side} style={leaf(side)}>
          <img src={closedGate} alt="" aria-hidden="true" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" draggable="false" />
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  The gate itself                                                     */
/* ------------------------------------------------------------------ */
export const RoyalGate = ({ onOpen, onReveal, names = 'Taniya & Abhiraj' }) => {
  const [phase, setPhase] = useState('closed'); // closed -> opening -> fade -> gone
  const timers = useRef([]);
  const reduced = reducedMotion();

  useEffect(() => {
    document.body.style.overflow = phase === 'gone' ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  if (phase === 'gone') return null;

  const open = () => {
    if (phase !== 'closed') return;
    setPhase('opening');
    onOpen && onOpen();
    const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
    later(() => { setPhase('fade'); onReveal && onReveal(); }, reduced ? 40 : 2000);
    later(() => setPhase('gone'), reduced ? 300 : 2700);
  };

  const opening = phase !== 'closed';
  const zoomMs = reduced ? 0 : 1400;

  const stageStyle = {
    left: '50%',
    top: '50%',
    width: 'max(calc(100svh * 1.9), 100vw)',
    aspectRatio: '1.9 / 1',
    position: 'absolute',
    transformOrigin: '50% 71.6%',
    transform: opening ? 'translate(-50%,-71.6%) scale(4.2)' : 'translate(-50%,-50%) scale(1)',
    transition: `transform ${zoomMs}ms cubic-bezier(.65,0,.3,1) ${reduced ? 0 : 400}ms`,
  };

  return (
    <div
      className="fixed inset-0 z-[80] overflow-hidden"
      role="dialog"
      aria-label="Wedding invitation. Open the gate to enter."
      onClick={open}
      style={{ background: 'linear-gradient(180deg,#EFD3A8,#D9B27C)', opacity: phase === 'fade' ? 0 : 1, transition: `opacity ${reduced ? 250 : 700}ms ease`, cursor: phase === 'closed' ? 'pointer' : 'default' }}
    >
      <div style={stageStyle}>
        <GateArt opening={opening} reduced={reduced} />
      </div>

      {/* warm light floods in as the doors swing open, then dissolves into the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 55%, #FFF6DD 0%, #FBE7B8 55%, #F3D79B 100%)', opacity: opening ? 1 : 0, transition: `opacity ${reduced ? 0 : 800}ms ease ${opening && !reduced ? 900 : 0}ms` }}
      />

      {/* Visible opening prompt sits on the door, clear of the names plaque. */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); open(); }}
        aria-label="Open the wedding invitation"
        className="pointer-events-auto absolute left-1/2 top-[73%] z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E7D3A3] bg-[#35131D]/92 px-5 py-2.5 font-sans-clean text-[10px] font-semibold tracking-[.28em] text-[#FFF2D2] shadow-[0_5px_18px_rgba(20,4,10,.55)] transition-colors hover:bg-[#5B172B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E7D3A3]"
        style={{ opacity: opening ? 0 : 1, transition: 'opacity .25s ease' }}
      >
        TAP TO OPEN
      </button>

      <div
        aria-label="Abhiraj and Taniya monogram"
        role="img"
        className="pointer-events-none absolute left-1/2 top-[63%] z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: opening ? 0 : 1, transition: 'opacity .25s ease' }}
      >
        <img src={weddingLogo} alt="" className="h-[88px] w-[88px] object-contain shadow-[0_4px_18px_rgba(25,7,10,.5)] sm:h-[100px] sm:w-[100px]" />
      </div>

      {/* names plaque (fixed on screen, not part of the zoom) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[4svh] flex flex-col items-center px-6 text-center"
        style={{ opacity: opening ? 0 : 1, transform: opening ? 'translateY(14px)' : 'none', transition: 'opacity .5s ease, transform .5s ease' }}
      >
        <div className="border border-[#E7D3A3]/70 bg-[#5B172B]/88 px-8 py-3.5 shadow-[0_10px_40px_rgba(20,4,10,.45)] backdrop-blur-sm sm:px-12">
          <p className="font-sans-clean text-[9px] tracking-[.4em] text-[#E7D3A3]/90">THE WEDDING OF</p>
          <p className="font-script mt-1 text-4xl leading-tight text-[#F8E9D5] sm:text-5xl">{names}</p>
          <p className="font-sans-clean mt-2 text-[9px] tracking-[.35em] text-[#E7D3A3]">11 – 15 DECEMBER 2026</p>
        </div>

      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Section transitions: headings and cards rise out of a soft blur,   */
/*  alternating from the left and right as each section scrolls in.    */
/* ------------------------------------------------------------------ */
const FX_TARGETS = ['section:not(#hero) h2', '.rg-fx'];

export const FlowFX = () => {
  useEffect(() => {
    if (reducedMotion() || !('IntersectionObserver' in window)) return undefined;

    const nodes = Array.from(document.querySelectorAll(FX_TARGETS.join(',')));
    const pending = new Set();
    const seenGroup = new Map();

    nodes.forEach((el) => {
      const group = el.parentElement;
      const n = seenGroup.get(group) || 0;
      seenGroup.set(group, n + 1);
      const isCard = el.matches('.rg-fx');
      el.classList.add('fx');
      el.style.setProperty('--fx-x', '0px');
      el.style.setProperty('--fx-d', `${Math.min(n, 3) * 0.08}s`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          io.unobserve(el);
          el.classList.add('fx-in');
          const t = setTimeout(() => {
            el.classList.remove('fx', 'fx-in');
            el.style.removeProperty('--fx-x');
            el.style.removeProperty('--fx-d');
            pending.delete(t);
          }, 1100);
          pending.add(t);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }
    );
    nodes.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      pending.forEach(clearTimeout);
      nodes.forEach((el) => el.classList.remove('fx', 'fx-in'));
    };
  }, []);

  return (
    <style>{`
      .fx { opacity: 0; transform: translate3d(0, 18px, 0);
        transition: opacity .6s cubic-bezier(.2,.7,.2,1) var(--fx-d,0s), transform .7s cubic-bezier(.2,.7,.2,1) var(--fx-d,0s); will-change: transform, opacity; }
      .fx.fx-in { opacity: 1; transform: none; }
      .hero-held, .hero-held *, .hero-held::before, .hero-held::after { animation-play-state: paused !important; }
    `}</style>
  );
};



