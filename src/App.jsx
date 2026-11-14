import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { 
  Menu, X, MapPin, Calendar, Music2,
  ChevronRight, Sparkles, Compass,
  Share2, ArrowUp, Check, ExternalLink,
  ChevronLeft,
} from 'lucide-react';
import { ScrollProgress, EnhanceStyles } from './Enhancements';
import { RoyalGate, FlowFX } from './RoyalGate';
import { GalleryCarousel } from './GalleryCarousel';
import { byId, GALLERY_IDS, CLOSING_IDS } from './couplePhotos';
import { RoyalStyles, RoyalBackdrop, RoyalHero, ArchFrame, ARCH_ORDER, ArchCountdown, ScrollBanner, DesertScene } from './RoyalTheme';
import ganeshPujanPhoto from './assets/events/ganesh-pujan.jpg';
import sangeetPhoto from './assets/events/sangeet.jpg';
import monogramLogo from './assets/t-and-a-logo.jpeg';
import divineGracePhoto from './assets/events/divine-grace-v2.jpg';
import haldiPhotoUpdate from './assets/events/haldi-v2.jpg';
import sunsetSipsPhoto from './assets/events/sunset-sips-v2.jpg';
import foreverPhoto from './assets/events/circle-forever-v2.jpg';
import royalGatheringPhoto from './assets/events/royal-gathering-reference.jpg';
import grandWeddingPhoto from './assets/events/royal-gathering-v4.jpg';
import gurudwaraArtwork from './assets/gurudwara-anand-karaj-wide.jpg';
// --- CUSTOM SVG WATERCOLOR & BOTANICAL ARTWORK COMPONENTS ---

// Ornate Indian Wedding Medallion & Divider
const GoldFlourish = ({ className = "w-36 h-6" }) => (
  <svg viewBox="0 0 160 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} mx-auto text-[#B99655]`}>
    <path className="flourish-line" d="M0 12h58m44 0h58" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
    <path className="flourish-ornament" d="M80 3l9 9-9 9-9-9 9-9z" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle className="flourish-ornament" cx="80" cy="12" r="2.5" fill="currentColor" />
    <circle className="flourish-ornament" cx="68" cy="12" r="1.5" fill="currentColor" />
    <circle className="flourish-ornament" cx="92" cy="12" r="1.5" fill="currentColor" />
    <path className="flourish-ornament" d="M72 8c2-3 5-4 8-4s6 1 8 4" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path className="flourish-ornament" d="M72 16c2 3 5 4 8 4s6-1 8-4" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

// Botanical Floral Border for Hero Left
const BotanicalHeroLeft = () => (
  <svg viewBox="0 0 320 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-floral-art w-full h-full object-cover">
    <defs>
      <radialGradient id="maroonFlower" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#741B35" />
        <stop offset="60%" stopColor="#5B172B" />
        <stop offset="100%" stopColor="#3F0A17" />
      </radialGradient>
      <radialGradient id="marigoldFlower" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E7D3A3" />
        <stop offset="70%" stopColor="#B99655" />
        <stop offset="100%" stopColor="#8C6A2E" />
      </radialGradient>
      <radialGradient id="dustyRoseFlower" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E5ACA7" />
        <stop offset="75%" stopColor="#C98B86" />
        <stop offset="100%" stopColor="#9C5E59" />
      </radialGradient>
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6B7852" />
        <stop offset="50%" stopColor="#556142" />
        <stop offset="100%" stopColor="#363E27" />
      </linearGradient>
    </defs>
    {/* Vines & Foliage */}
    <path d="M40 0 Q 140 300 60 600 T 120 900" stroke="#556142" strokeWidth="2.5" fill="none" opacity="0.6" />
    <path d="M10 120 Q 90 200 130 180 Q 70 260 20 220" fill="url(#leafGrad)" opacity="0.85" />
    <path d="M100 80 Q 160 120 180 90 Q 140 50 100 80" fill="url(#leafGrad)" opacity="0.9" />
    <path d="M80 420 Q 170 460 190 420 Q 130 380 80 420" fill="url(#leafGrad)" opacity="0.85" />
    <path d="M30 650 Q 110 700 140 660 Q 80 620 30 650" fill="url(#leafGrad)" opacity="0.9" />
    <path d="M44 255 C 100 275 126 312 138 352 M40 600 C 82 570 124 566 161 580 M74 825 C 120 785 147 780 182 790" stroke="#B99655" strokeWidth="1" fill="none" opacity="0.55" />
    <path d="M86 293 Q 48 270 34 286 Q 52 313 86 293 M132 335 Q 161 304 184 316 Q 166 346 132 335 M89 572 Q 52 548 36 564 Q 54 588 89 572 M125 578 Q 160 548 182 561 Q 161 590 125 578 M128 798 Q 100 764 77 779 Q 96 808 128 798" fill="url(#leafGrad)" opacity="0.72" />
    {[ [30, 470, '#C98B86'], [205, 245, '#B99655'], [224, 615, '#741B35'], [40, 865, '#E7D3A3'] ].map(([x, y, color], flowerIndex) => (
      <g key={`sprig-${flowerIndex}`} transform={`translate(${x}, ${y})`}>
        <g className="hero-bloom" style={{ animationDelay: `${flowerIndex * -1.1}s` }}>
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <ellipse key={angle} cx="0" cy="-8" rx="5" ry="10" fill={color} opacity="0.82" transform={`rotate(${angle})`} />
          ))}
          <circle r="4" fill="#F8F0E3" />
        </g>
      </g>
    ))}

    {/* Big Dahlia Top */}
    <g transform="translate(100, 150)">
      {[...Array(14)].map((_, i) => (
        <path
          key={i}
          d="M0 0 C 15 -30, 30 -30, 45 0 C 30 30, 15 30, 0 0"
          fill="url(#maroonFlower)"
          transform={`rotate(${i * (360 / 14)})`}
          opacity="0.95"
        />
      ))}
      {[...Array(10)].map((_, i) => (
        <path
          key={`in-${i}`}
          d="M0 0 C 10 -20, 20 -20, 30 0 C 20 20, 10 20, 0 0"
          fill="#741B35"
          transform={`rotate(${i * (360 / 10) + 12})`}
        />
      ))}
      <circle cx="0" cy="0" r="12" fill="#B99655" />
      <circle cx="0" cy="0" r="6" fill="#5B172B" />
    </g>

    {/* Marigold Middle-Top */}
    <g transform="translate(65, 340)">
      {[...Array(16)].map((_, i) => (
        <circle
          key={i}
          cx={Math.cos((i * 22.5 * Math.PI) / 180) * 24}
          cy={Math.sin((i * 22.5 * Math.PI) / 180) * 24}
          r="16"
          fill="url(#marigoldFlower)"
          opacity="0.9"
        />
      ))}
      <circle cx="0" cy="0" r="18" fill="#E7D3A3" />
      <circle cx="0" cy="0" r="8" fill="#8C6A2E" />
    </g>

    {/* Dusty Rose Center */}
    <g transform="translate(110, 520)">
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={i}
          cx={Math.cos((i * 30 * Math.PI) / 180) * 28}
          cy={Math.sin((i * 30 * Math.PI) / 180) * 28}
          rx="22"
          ry="15"
          fill="url(#dustyRoseFlower)"
          transform={`rotate(${i * 30})`}
          opacity="0.88"
        />
      ))}
      <circle cx="0" cy="0" r="14" fill="#F8F0E3" opacity="0.6" />
    </g>

    {/* Large Royal Maroon Dahlia Bottom */}
    <g transform="translate(90, 760)">
      {[...Array(16)].map((_, i) => (
        <path
          key={i}
          d="M0 0 C 18 -35, 35 -35, 50 0 C 35 35, 18 35, 0 0"
          fill="url(#maroonFlower)"
          transform={`rotate(${i * 22.5})`}
        />
      ))}
      <circle cx="0" cy="0" r="16" fill="#E7D3A3" />
      <circle cx="0" cy="0" r="7" fill="#5B172B" />
    </g>
  </svg>
);

// Botanical Floral Border for Hero Right (Mirrored)
const BotanicalHeroRight = () => (
  <div className="w-full h-full transform scale-x-[-1]">
    <BotanicalHeroLeft />
  </div>
);

// Fine gold foliage keeps the hero edges framed without competing with the card.
const HeroSideFoliage = () => (
  <svg viewBox="0 0 120 900" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path d="M16 0C78 150 28 260 72 390S30 660 90 900" stroke="#B99655" strokeWidth="1.2" opacity=".58" />
    <path d="M43 128C72 110 93 112 104 132C78 147 59 145 43 128Z" fill="#556142" opacity=".48" />
    <path d="M42 130C28 105 13 98 1 105C10 127 25 136 42 130Z" fill="#556142" opacity=".38" />
    <path d="M49 322C77 294 99 292 112 309C90 335 68 342 49 322Z" fill="#556142" opacity=".44" />
    <path d="M49 324C34 300 17 296 5 306C15 328 31 336 49 324Z" fill="#556142" opacity=".36" />
    <path d="M56 550C82 525 103 523 116 540C94 565 74 571 56 550Z" fill="#556142" opacity=".42" />
    <path d="M57 552C40 530 24 527 12 538C23 559 39 566 57 552Z" fill="#556142" opacity=".34" />
    <path d="M70 754C91 734 108 733 119 746C101 768 84 772 70 754Z" fill="#556142" opacity=".4" />
    <path d="M47 224L53 232L47 240L41 232L47 224Z" fill="#B99655" opacity=".78" />
    <circle cx="47" cy="232" r="1.5" fill="#FAF5EC" />
    <path d="M67 438L73 446L67 454L61 446L67 438Z" fill="#B99655" opacity=".72" />
    <circle cx="67" cy="446" r="1.5" fill="#FAF5EC" />
    <path d="M60 664L66 672L60 680L54 672L60 664Z" fill="#B99655" opacity=".74" />
    <circle cx="60" cy="672" r="1.5" fill="#FAF5EC" />
    <path d="M8 875C36 854 63 853 91 868" stroke="#B99655" strokeWidth=".8" opacity=".42" />
  </svg>
);

const FamilyArchFrame = () => (
  <svg aria-hidden="true" viewBox="0 0 560 760" preserveAspectRatio="none" className="absolute inset-0 h-full w-full pointer-events-none drop-shadow-[0_14px_20px_rgba(91,23,43,0.12)]">
    <path d="M8 748V350C8 316 28 294 62 294C62 250 94 221 139 221C140 178 182 152 225 148C260 144 278 117 280 48C282 117 300 144 335 148C378 152 420 178 421 221C466 221 498 250 498 294C532 294 552 316 552 350V748Z" fill="#FFFAF1" fillOpacity=".84" stroke="#B99655" strokeWidth="2.4" />
    <path d="M8 748V350C8 316 28 294 62 294C62 250 94 221 139 221C140 178 182 152 225 148C260 144 278 117 280 48C282 117 300 144 335 148C378 152 420 178 421 221C466 221 498 250 498 294C532 294 552 316 552 350V748Z" transform="translate(12 10) scale(.957 .97)" fill="none" stroke="#D9B777" strokeWidth="1.2" opacity=".8" />
  </svg>
);

// Event photography shared by the invitation cards and gallery.
const eventPhotos = {
  ganesh: divineGracePhoto,
  sangeet: sangeetPhoto,
  divine: ganeshPujanPhoto,
  haldi: haldiPhotoUpdate,
  sunset: sunsetSipsPhoto,
  circle: foreverPhoto,
  royal: royalGatheringPhoto,
  grandWedding: grandWeddingPhoto,
};

const mapSearchUrl = (location) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

const EventArtwork = ({ type, title, subtitle }) => {
  return (
  <div className="relative w-full h-full min-h-[220px] overflow-hidden bg-[#3B1220] sm:min-h-[280px] md:min-h-[380px]">
      <img
        src={eventPhotos[type] || ganeshPujanPhoto}
        alt={`${title}${subtitle ? `: ${subtitle}` : ''}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
  );
};

// Custom sanctuary artwork generated for the Anand Karaj ceremony.
const RefinedGurudwaraArtwork = () => (
  <figure className="relative mx-auto w-full max-w-[1100px] overflow-hidden rounded-[2rem] border border-[#B99655]/60 bg-[#F8F0E3] shadow-2xl aspect-[3/2]">
    <img
      src={gurudwaraArtwork}
      alt="Anand Karaj sanctuary with an ornate golden arch, flower-draped canopy, sacred palki, and the couple seated in prayer"
      className="h-full w-full object-cover"
      loading="lazy"
    />
    <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 border border-[#B99655]/60 bg-[#F8F0E3]/90 px-4 py-2 text-[10px] sm:text-xs font-serif tracking-widest text-[#741B35]">
      <Sparkles className="h-3.5 w-3.5 text-[#B99655]" /> BADGAON GURUDWARA SAHIB · KOTA
    </figcaption>
  </figure>
);

const LotusMark = ({ className = 'h-8 w-10' }) => (
  <svg viewBox="0 0 48 32" aria-hidden="true" className={className}>
    <path d="M24 28C10 28 4 22 5 13c8 0 14 4 19 15ZM24 28C10 24 12 13 19 4c4 7 6 15 5 24ZM24 28c14-4 12-15 5-24-4 7-6 15-5 24ZM24 28c14 0 20-6 19-15-8 0-14 4-19 15Z" fill="#C98B86" stroke="#FFE9AE" strokeWidth="1.2" />
    <path d="M5 29h38" stroke="#556142" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Save-the-date plaque: scalloped crimson arch on saffron & marigold  */
/* ------------------------------------------------------------------ */
const SD_W = 600;
const SD_H = 236;
const sdPath = (fx, fy) => {
  const x0 = 44, x1 = 556, yt = 86, yb = 192, n = 14;
  const w = (x1 - x0 - 56) / n;
  let d = `M${fx(x0)} ${fy(yb)} V${fy(112)} Q${fx(x0)} ${fy(yt)} ${fx(x0 + 28)} ${fy(yt)}`;
  for (let i = 0; i < n; i += 1) {
    d += ` A${fx(w / 2)} ${fy(w / 2)} 0 0 1 ${fx(x0 + 28 + (i + 1) * w)} ${fy(yt)}`;
  }
  d += ` Q${fx(x1)} ${fy(yt)} ${fx(x1)} ${fy(112)} V${fy(yb)} Z`;
  return d;
};
const SD_ABS = sdPath((v) => v, (v) => v);
const SD_NORM = sdPath((v) => +(v / SD_W).toFixed(5), (v) => +(v / SD_H).toFixed(5));

const LotusGroup = ({ x, y, w = 46 }) => (
  <svg x={x} y={y} width={w} height={(w * 32) / 48} viewBox="0 0 48 32" overflow="visible">
    <path d="M24 28C10 28 4 22 5 13c8 0 14 4 19 15ZM24 28C10 24 12 13 19 4c4 7 6 15 5 24ZM24 28c14-4 12-15 5-24-4 7-6 15-5 24ZM24 28c14 0 20-6 19-15-8 0-14 4-19 15Z" fill="#C98B86" stroke="#FFE9AE" strokeWidth="1.2" />
    <path d="M3 29h42" stroke="#556142" strokeWidth="3.4" strokeLinecap="round" />
  </svg>
);

const SaveDateWindow = () => {
  const panelRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const node = panelRef.current;
    if (!node) return undefined;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      setOpen(true);
      return undefined;
    }
    let timer;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      timer = window.setTimeout(() => setOpen(true), 350);
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, []);

  const shutter = (side) => ({
    transformOrigin: side === 'left' ? 'left center' : 'right center',
    transform: open ? `perspective(900px) rotateY(${side === 'left' ? -108 : 108}deg)` : 'perspective(900px) rotateY(0deg)',
    transition: 'transform 950ms cubic-bezier(.2,.7,.2,1) 120ms',
    backfaceVisibility: 'hidden',
  });

  const sideDiamonds = Array.from({ length: 6 }, (_, i) => 100 + i * 17);
  const bottomDiamonds = Array.from({ length: 31 }, (_, i) => 50 + i * 16.9);

  return (
    <div
      ref={panelRef}
      className="rg-fx relative mx-auto mb-14 w-full max-w-[640px] sm:mb-16"
      style={{ aspectRatio: `${SD_W} / ${SD_H}`, containerType: 'inline-size', borderRadius: 10, boxShadow: '0 18px 30px rgba(62,15,30,.22)' }}
    >
      <svg viewBox={`0 0 ${SD_W} ${SD_H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="sd-orange" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#741B35" />
            <stop offset="1" stopColor="#8A2341" />
          </linearGradient>
          <linearGradient id="sd-yellow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#D9BE82" />
            <stop offset="1" stopColor="#E7D3A3" />
          </linearGradient>
          <radialGradient id="sd-crimson" cx="50%" cy="40%" r="75%">
            <stop offset="0" stopColor="#741B35" />
            <stop offset="1" stopColor="#3E0F1E" />
          </radialGradient>
        </defs>
        <rect x="2" y="2" width={SD_W - 4} height={SD_H - 4} rx="8" fill="url(#sd-yellow)" />
        <path d={`M2 62V10Q2 2 10 2H${SD_W - 10}Q${SD_W - 2} 2 ${SD_W - 2} 10V62Q${SD_W / 2} 96 2 62Z`} fill="url(#sd-orange)" />
        <rect x="2" y="2" width={SD_W - 4} height="120" rx="8" fill="url(#sd-orange)" />
        <rect x="2" y="92" width={SD_W - 4} height={SD_H - 94} rx="8" fill="url(#sd-yellow)" />
        <rect x="14" y="14" width={SD_W - 28} height={SD_H - 28} rx="3" fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="1.5" />
        {/* scalloped arch */}
        <path d={SD_ABS} fill="url(#sd-crimson)" stroke="#E7D3A3" strokeWidth="6" strokeLinejoin="round" />
        <path d={SD_ABS} fill="none" stroke="#FFF3C6" strokeWidth="3" strokeDasharray="0.1 6.5" strokeLinecap="round" />
        <path d={SD_ABS} fill="none" stroke="#8A5A12" strokeOpacity=".55" strokeWidth=".8" transform="translate(0 4)" />
        {/* studs */}
        {sideDiamonds.map((y) => (
          <g key={y}>
            <rect x="-3" y="-3" width="6" height="6" transform={`translate(28 ${y}) rotate(45)`} fill="#FFF1C0" stroke="#B99655" strokeWidth=".8" />
            <rect x="-3" y="-3" width="6" height="6" transform={`translate(${SD_W - 28} ${y}) rotate(45)`} fill="#FFF1C0" stroke="#B99655" strokeWidth=".8" />
          </g>
        ))}
        {bottomDiamonds.map((x) => (
          <rect key={x} x="-3" y="-3" width="6" height="6" transform={`translate(${x} 214) rotate(45)`} fill="#FFF1C0" stroke="#B99655" strokeWidth=".8" />
        ))}
        <circle cx={SD_W / 2} cy="30" r="4" fill="#fff" stroke="#C98B86" strokeWidth="2" />
        <LotusGroup x={34} y={22} />
        <LotusGroup x={SD_W - 80} y={22} />
      </svg>

      <p className="font-sans-clean absolute left-0 right-0 text-center font-medium text-[#FFF5DE]" style={{ top: '9%', fontSize: '1.7cqw', letterSpacing: '.28em' }}>
        A CELEBRATION OF LOVE
      </p>

      <div
        className="absolute z-0 flex flex-col items-center justify-center text-center"
        style={{ left: '9%', right: '9%', top: '40%', height: '40%', opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(9px)', transition: 'opacity 650ms ease 550ms, transform 650ms ease 550ms' }}
      >
        <p className="font-serif-luxury uppercase text-[#FFF0D2]" style={{ fontSize: '5.4cqw', letterSpacing: '.1em', textShadow: '0 2px 4px rgba(60,5,15,.4)' }}>11 – 15 December</p>
        <p className="font-serif-luxury text-[#FFF0D2]" style={{ fontSize: '4.2cqw', letterSpacing: '.2em' }}>2026</p>
      </div>

      {/* shutters, clipped to the scalloped arch */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="sd-clip" clipPathUnits="objectBoundingBox"><path d={SD_NORM} /></clipPath>
        </defs>
      </svg>
      <div className="absolute inset-0 z-10 flex" style={{ clipPath: 'url(#sd-clip)', perspective: '1200px', pointerEvents: 'none' }} aria-hidden="true">
        {['left', 'right'].map((side) => (
          <div
            key={side}
            className="relative flex h-full w-1/2 items-center justify-center"
            style={{
              ...shutter(side),
              background: side === 'left' ? 'linear-gradient(135deg,#741B35,#5B172B)' : 'linear-gradient(225deg,#741B35,#5B172B)',
              boxShadow: 'inset 0 0 0 4px rgba(255,224,125,.4)',
            }}
          >
            <LotusMark className="h-10 w-14" />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const reduceHeroMotion = useReducedMotion();
  const [heroLive, setHeroLive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const visiblePhotos = GALLERY_IDS.map(byId);
  const stepLightbox = (dir) => {
    setLightboxImg((cur) => {
      if (!cur) return cur;
      const i = visiblePhotos.findIndex((p) => p.id === cur.id);
      return visiblePhotos[(i + dir + visiblePhotos.length) % visiblePhotos.length];
    });
  };
  useEffect(() => {
    if (!lightboxImg) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxImg(null);
      if (e.key === 'ArrowRight') stepLightbox(1);
      if (e.key === 'ArrowLeft') stepLightbox(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = (document.querySelector('header')?.getBoundingClientRect().height ?? 70) + 8;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleBackgroundMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch {
        setIsMusicPlaying(false);
      }
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Taniya & Abhiraj Wedding Invitation',
        text: 'Join us in celebrating the sacred union of Taniya & Abhiraj (11 - 15 December 2026).',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2600);
    }
  };

  // Celebration Events Data (Strictly following the brief & reference screenshots)
  const events = [
    {
      num: "01",
      chapter: "AUSPICIOUS BEGINNINGS",
      title: "Ganesh Pujan",
      date: "FRIDAY, 11 DECEMBER 2026",
      time: "10:00 A.M.",
      venue: "Own Residence — Dream House",
      address: "Dream House, Kota",
      quote: "With the blessings of our elders, we welcome you to Ganesh Pujan.",
      colorKey: "ganesh",
      layout: "image-left"
    },
    {
      num: "02",
      chapter: "COLOURS OF CELEBRATION",
      title: "Rang-e-Jashn",
      date: "FRIDAY, 11 DECEMBER 2026",
      time: "3:00 P.M.",
      venue: "Hotel Shri Kripa",
      address: "Near Mahalok Deepo, Tarana",
      quote: "Let's paint the day with colours, love & joy.",
      subText: "Sangeet, Dhol Beats & Festive Splendour",
      colorKey: "sangeet",
      layout: "image-right"
    },
    {
      num: "03",
      chapter: "ETERNAL BLESSINGS",
      title: "Divine Grace",
      date: "SATURDAY, 12 DECEMBER 2026",
      time: "9:30 A.M.",
      venue: "Dream House — Own Residence",
      address: "Kota, Rajasthan",
      lunchTime: "12:30 P.M. onwards",
      lunchVenue: "Hotel Shri Kripa, Near Mahalok Deepo",
      lunchAddress: "Tarana, Madhya Pradesh",
      quote: "To seek the blessings of Maa for a bright and prosperous new beginning.",
      colorKey: "divine",
      layout: "image-left"
    },
    {
      num: "04",
      chapter: "FESTIVE GRANDEUR",
      title: "The Grand Wedding Celebration",
      date: "SATURDAY, 12 DECEMBER 2026",
      time: "Mata Poojan: 9:30 A.M.",
      lunchTime: "12:30 P.M. onwards",
      venue: "Hotel Shri Kripa, Near Mahalok Deepo, Tarana",
      address: "Tarana, Madhya Pradesh",
      quote: "Surrounded by heritage, sacred traditions and laughter of cherished friends.",
      colorKey: "grandWedding",
      layout: "image-right"
    },
    {
      num: "05",
      chapter: "SUNSHINE & TRADITION",
      title: "The Golden Glow",
      date: "SUNDAY, 13 DECEMBER 2026",
      time: "11:30 A.M. onwards",
      venue: "Hotel Menaal Residency",
      address: "Bundi Road, Kota, Rajasthan",
      quote: "A Day To Drench In Traditions, Laughter & Love.",
      subText: "Haldi ceremony filled with marigold petals & golden memories.",
      colorKey: "haldi",
      layout: "image-left"
    },
    {
      num: "06",
      chapter: "TWILIGHT RENDEZVOUS",
      title: "The Sunset Sips",
      date: "SUNDAY, 13 DECEMBER 2026",
      time: "8:30 P.M. onwards",
      venue: "Hotel Menaal Residency",
      address: "Bundi Road, Kota, Rajasthan",
      quote: "A Night of Toasts, Tunes & Togetherness.",
      subText: "Acoustic strings, clinking flutes & starry conversation.",
      colorKey: "sunset",
      layout: "image-right"
    },
    {
      num: "07",
      chapter: "THE SACRED PROMISE",
      title: "The Circle of Forever",
      date: "SUNDAY, 13 DECEMBER 2026",
      time: "8:30 P.M. onwards",
      venue: "Hotel Menaal Residency",
      address: "Bundi Road, Kota, Rajasthan",
      quote: "A Promise Today, A Beautiful Tomorrow.",
      subText: "Exchange of vows under a canopy of roses and starlight.",
      colorKey: "circle",
      layout: "image-left"
    },
    {
      num: "08",
      chapter: "THE REGAL SOIREE",
      title: "The Royal Gathering",
      date: "MONDAY, 14 DECEMBER 2026",
      time: "8:00 P.M.",
      venue: "Hotel Menaal Residency",
      address: "Bundi Road, Kota, Rajasthan",
      quote: "An evening of love, togetherness & New Beginnings.",
      subText: "Royal banquet dinner, candlelit courtyards & heartfelt melodies.",
      colorKey: "royal",
      layout: "image-right"
    }
  ];

  // Gallery Editorial Items
  const galleryPhotos = [
    {
      id: 1,
      title: "Royal Courtyard Silhouette",
      caption: "Under the arches of Rajasthan",
      ratio: "col-span-12 md:col-span-7 h-[250px] sm:h-[340px] md:h-[420px]",
      bgColor: "bg-[#741B35]/20",
      type: "royal"
    },
    {
      id: 2,
      title: "The Haldi Garland",
      caption: "Fragrance of fresh marigold",
      ratio: "col-span-12 md:col-span-5 h-[250px] sm:h-[340px] md:h-[420px]",
      bgColor: "bg-[#B99655]/20",
      type: "haldi"
    },
    {
      id: 3,
      title: "The Golden Twilight",
      caption: "Holding hands at dusk",
      ratio: "col-span-12 md:col-span-4 h-[230px] sm:h-[290px] md:h-[340px]",
      bgColor: "bg-[#5B172B]/30",
      type: "sunset"
    },
    {
      id: 4,
      title: "Sacred Anand Karaj",
      caption: "Walking the four sacred Laavan",
      ratio: "col-span-12 md:col-span-4 h-[230px] sm:h-[290px] md:h-[340px]",
      bgColor: "bg-[#B99655]/20",
      type: "divine"
    },
    {
      id: 5,
      title: "Festive Rang-e-Jashn",
      caption: "Laughter, dhol & dance",
      ratio: "col-span-12 md:col-span-4 h-[230px] sm:h-[290px] md:h-[340px]",
      bgColor: "bg-[#9C5E59]/20",
      type: "sangeet"
    }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-clip text-[#3A141E] font-serif antialiased selection:bg-[#741B35] selection:text-[#F8F0E3]">
      <EnhanceStyles />
      <RoyalStyles />
      <RoyalBackdrop />
<ScrollProgress />
<RoyalGate onOpen={toggleBackgroundMusic} onReveal={() => setHeroLive(true)} />
      <FlowFX />
      {/* GOOGLE FONTS INJECTION */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');
        
        .font-serif-luxury {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-script {
          font-family: 'Great Vibes', cursive;
        }
        .font-sans-clean {
          font-family: 'Montserrat', sans-serif;
          letter-spacing: 0.12em;
        }

        /* Subtle Ken Burns Zoom Animation for Hero */
        @keyframes subtleKenBurns {
          0% { transform: scale(1); }
          50% { transform: scale(1.04); }
          100% { transform: scale(1); }
        }
        .ken-burns {
          animation: subtleKenBurns 28s ease-in-out infinite alternate;
        }

        /* Paper subtle grain overlay */
        .paper-texture {
          background-image: radial-gradient(#B99655 0.5px, transparent 0.5px);
          background-size: 24px 24px;
        }
      `}} />

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music/Sajna_flute___Ringtone_Darshan_raval_dharal_surelia_DarshanRavalDZ_viralvideo_pl.mp3`}
        loop
        preload="none"
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
      />
      <button
        type="button"
        onClick={toggleBackgroundMusic}
        aria-label={isMusicPlaying ? 'Pause background music' : 'Play background music'}
        aria-pressed={isMusicPlaying}
        className="fixed bottom-4 right-4 z-50 h-11 w-11 rounded-full bg-[#741B35] hover:bg-[#5B172B] text-[#E7D3A3] flex items-center justify-center shadow-xl border border-[#B99655] transition-transform active:scale-95 hover:scale-105 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
      >
        <Music2 className="w-5 h-5" />
        <span className="sr-only">{isMusicPlaying ? 'Pause music' : 'Play music'}</span>
      </button>

      {/* FIXED NAVIGATION BAR */}
      <header className="absolute top-0 left-0 z-40 w-full bg-transparent py-4 md:py-5">
        <div className="max-w-none mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between">
          {/* Couple Monogram Logo */}
          <button 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2 group text-left"
          >
            <img src={monogramLogo} alt="T & A" className="h-12 w-12 rounded-full border border-[#741B35]/80 object-cover shadow-[0_2px_10px_rgba(91,23,43,.1)] transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14" />
          </button>

          {/* Mobile Menu Trigger & Share */}
          {isScrolled && <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              aria-label="Share Invitation"
              className="p-2 text-[#741B35] hover:text-[#B99655]"
            >
              <Share2 className="w-5 h-5" />
            </button>
        <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
              className="p-2 text-[#741B35]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>}
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="md:ml-auto md:max-w-sm md:rounded-b-2xl md:border-x max-h-[calc(100dvh_-_4rem)] overflow-y-auto bg-[#F8F0E3] border-b border-[#B99655]/40 px-4 py-4 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-300 sm:px-6 sm:py-6">
            {[
              ['HOME', 'hero'],
              ['THE INVITATION', 'invitation'],
              ['THE ROYAL COUPLE', 'couple'],
              ['THE CELEBRATIONS', 'celebrations'],
              ['SACRED ANAND KARAJ', 'anand-karaj'],
              ['MEMORIES GALLERY', 'gallery'],
              ['OUR FAMILIES', 'family'],
              ['WEDDING VENUES', 'venue']
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="block w-full text-left font-sans-clean text-xs uppercase tracking-[0.2em] text-[#741B35] py-2 border-b border-[#B99655]/15"
              >
                {label}
              </button>
            ))}
            <div className="pt-2 flex justify-between items-center text-xs text-[#741B35]/70 font-sans-clean">
              <span>11 – 15 DECEMBER 2026</span>
            </div>
          </div>
        )}
      </header>

      {/* ===== ROYAL GATEWAY LAYOUT ===== */}
      <RoyalHero live={heroLive} reduced={!!reduceHeroMotion} onOpen={() => scrollToSection('invitation')} />

      <main className="relative z-10">
        {/* INVITATION INTRO */}
        <section id="invitation" className="relative overflow-hidden px-5 py-16 text-center sm:px-6 md:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[310px] -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-dashed border-[#B99655]/40 sm:h-[520px] sm:w-[520px]" />
          <div className="mx-auto max-w-5xl">
            <SaveDateWindow />

            <p className="font-script rg-fx mt-4 text-5xl leading-tight text-[#741B35] sm:text-6xl md:text-7xl">Together with their families</p>
            <p className="font-serif-luxury rg-fx mx-auto mt-5 max-w-4xl text-xl italic leading-snug text-[#741B35] sm:text-2xl md:text-3xl">
              request the honour of your presence to celebrate the union of two souls and the joining of two families.
            </p>
            <GoldFlourish className="rg-fx mx-auto mt-10 h-6 w-44 text-[#B99655]" />
            <p className="font-script rg-fx mt-8 text-4xl text-[#741B35] sm:text-5xl">Counting the moments</p>
            <div className="mt-10"><ArchCountdown /></div>
            <p className="font-sans-clean mt-7 text-[9px] font-medium tracking-[.3em] text-[#741B35]/80">UNTIL THE ANAND KARAJ &middot; 15 DECEMBER 2026</p>
          </div>
        </section>
        {/* THE ROYAL COUPLE */}
        <section id="couple" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl text-center">
            <p className="font-script text-3xl text-[#B99655] sm:text-4xl">With the blessings of our elders</p>
            <h2 className="font-serif-luxury text-4xl font-light uppercase tracking-[.08em] text-[#741B35] sm:text-5xl md:text-6xl">The Royal Couple</h2>
            <div className="mt-14 grid grid-cols-1 items-end gap-12 md:mt-20 md:grid-cols-[1fr_1.25fr_1fr] md:gap-8">
              {[
                { id: 13, color: 'blue', cls: 'md:order-1 h-[360px] max-w-[290px] sm:h-[420px] sm:max-w-[320px] md:h-[440px]' },
                { id: 14, color: 'red', cls: 'order-first md:order-2 h-[460px] max-w-[340px] sm:h-[520px] sm:max-w-[380px] md:h-[600px] md:max-w-[440px]' },
                { id: 17, color: 'orange', cls: 'md:order-3 h-[360px] max-w-[290px] sm:h-[420px] sm:max-w-[320px] md:h-[440px]' },
              ].map((c) => {
                const ph = byId(c.id);
                return (
                  <ArchFrame key={c.id} color={c.color} className={`rg-fx mx-auto w-full ${c.cls}`}>
                    <img src={ph.thumb} alt={ph.alt} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: ph.pos }} />
                  </ArchFrame>
                );
              })}
            </div>
            <p className="font-script mt-12 text-5xl text-[#741B35] sm:text-6xl">Taniya &amp; Abhiraj</p>
            <p className="font-serif-luxury mx-auto mt-3 max-w-xl text-lg italic leading-relaxed text-[#5B172B]">Two souls, one journey, and a lifetime of laughter ahead.</p>
          </div>
        </section>

        {/* THE ROYAL FESTIVITIES */}
        <section id="celebrations" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center md:mb-24">
              <p className="font-script text-3xl text-[#B99655] sm:text-4xl">Days of celebration</p>
              <h2 className="font-serif-luxury text-4xl font-light uppercase tracking-[.08em] text-[#741B35] sm:text-5xl md:text-6xl">The Royal Festivities</h2>
              <p className="font-sans-clean mt-4 text-[10px] tracking-[.3em] text-[#741B35]/80">11 – 14 DECEMBER 2026</p>
            </div>

            <div className="flex flex-col gap-14 sm:gap-20 md:gap-32">
              {events.map((evt, idx) => {
                const isEven = idx % 2 === 0;
                const color = ARCH_ORDER[idx % ARCH_ORDER.length];
                return (
                  <div key={evt.title} className="rg-fx grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-10">
                    <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                      <ArchFrame color={color} className="mx-auto h-[430px] w-full max-w-[340px] sm:h-[500px] sm:max-w-[390px]">
                        <EventArtwork type={evt.colorKey} title={evt.title} subtitle={evt.chapter} />
                      </ArchFrame>
                    </div>

                    <div className={`${isEven ? 'md:order-2' : 'md:order-1'} pt-10 md:pt-0`}>
                      <ScrollBanner>
                        <span className="font-sans-clean block text-[10px] font-medium uppercase tracking-[0.26em] text-[#E7D3A3]">
                          {evt.num} / {evt.chapter}
                        </span>
                        <h3 className="font-serif-luxury my-2 text-3xl font-normal text-[#F8E9D5] sm:text-4xl">{evt.title}</h3>
                        <GoldFlourish className="mx-auto h-4 w-28 text-[#E7D3A3]" />
                        <p className="font-serif-luxury mx-auto my-3 max-w-sm text-base italic leading-relaxed text-[#F3DFC0] sm:text-lg">
                          “{evt.quote.replace(/"/g, '')}”
                        </p>
                        {evt.subText && <p className="font-sans-clean mb-2 text-[10px] uppercase tracking-wider text-[#E7D3A3]">{evt.subText}</p>}

                        <div className="my-4 space-y-1">
                          <p className="font-sans-clean text-[11px] font-medium uppercase tracking-[0.14em] text-[#F8E9D5] sm:text-xs">
                            {evt.date} · {evt.time}
                          </p>
                          {evt.lunchTime && (
                            <p className="font-sans-clean text-[10px] uppercase tracking-wider text-[#E7D3A3]">Lunch: {evt.lunchTime}</p>
                          )}
                        </div>

                        <div className="font-serif-luxury text-sm">
                          <p className="text-base font-semibold text-[#F8E9D5]">{evt.venue}</p>
                          <p className="font-sans-clean mt-0.5 text-[10px] tracking-wider text-[#E7D3A3]/85">{evt.address}</p>
                          {evt.lunchVenue && (
                            <div className="mt-1">
                              <p className="text-xs italic text-[#F3DFC0]">Lunch Venue: {evt.lunchVenue}</p>
                              <a
                                href={mapSearchUrl(`${evt.lunchVenue}, ${evt.lunchAddress || evt.address}`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-sans-clean inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#E7D3A3] hover:text-white"
                              >
                                <MapPin className="h-3 w-3" /> MAP LUNCH VENUE
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                          <a
                            href={mapSearchUrl(`${evt.venue}, ${evt.address}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open map for ${evt.venue}, ${evt.address}`}
                            className="rg-gold-btn font-sans-clean inline-flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-widest"
                          >
                            <MapPin className="h-3.5 w-3.5" /> Venue map <ExternalLink className="h-3 w-3" />
                          </a>
                          <a
                            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Taniya & Abhiraj: ' + evt.title)}&dates=20261211T043000Z/20261215T183000Z&details=${encodeURIComponent(evt.venue + ', ' + evt.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-sans-clean inline-flex items-center gap-1.5 border border-[#E7D3A3]/70 px-4 py-2 text-[10px] uppercase tracking-widest text-[#E7D3A3] transition-colors hover:bg-[#E7D3A3]/15"
                          >
                            <Calendar className="h-3 w-3" /> Add to calendar
                          </a>
                        </div>
                      </ScrollBanner>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ANAND KARAJ */}
        <section id="anand-karaj" className="overflow-hidden px-4 py-20 text-center sm:px-6 md:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="font-script text-3xl text-[#B99655] sm:text-4xl">The sacred union</p>
            <p className="font-sans-clean mb-3 text-[10px] uppercase tracking-[0.25em] text-[#741B35]/80 sm:text-xs">Anand Karaj · A promise before Waheguru</p>
            <h2 className="font-serif-luxury my-3 text-4xl font-light uppercase leading-tight tracking-[.06em] text-[#741B35] sm:text-6xl md:text-7xl">One Soul, Two Bodies</h2>
            <h3 className="font-script my-2 text-4xl leading-tight text-[#741B35] sm:text-6xl">Taniya &amp; Abhiraj</h3>
            <p className="font-sans-clean my-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#5B172B] sm:text-sm">Tuesday, 15 December 2026 · 9:00 A.M.</p>

            <div className="mb-10 sm:mb-12">
              <h4 className="font-serif-luxury text-xl font-light uppercase tracking-[0.14em] text-[#5B172B] sm:text-3xl">Badgaon Gurudwara</h4>
              <p className="font-sans-clean mt-1 text-[10px] uppercase tracking-[0.2em] text-[#741B35] sm:text-sm">Bundi Road, Kota, Rajasthan</p>
            </div>

            <ArchFrame color="red" className="rg-fx mx-auto w-full max-w-[860px]" style={{ borderRadius: '50% 50% 14px 14px / 34% 34% 14px 14px' }} innerClassName="!rounded-[inherit]">
              <RefinedGurudwaraArtwork />
            </ArchFrame>

            <div className="mx-auto mt-10 max-w-2xl">
              <ScrollBanner className="max-w-2xl">
                <p className="font-serif-luxury text-base italic leading-relaxed text-[#F3DFC0] sm:text-lg">
                  The Anand Karaj celebrates a shared life of faith, love, and the four sacred Laavan.
                </p>
                <span className="font-sans-clean mt-3 block text-[10px] uppercase tracking-widest text-[#E7D3A3]">A Sikh wedding ceremony</span>
              </ScrollBanner>
            </div>
          </div>
        </section>

        {/* FAMILIES */}
        <section id="family" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center md:mb-20">
              <p className="font-script text-3xl text-[#B99655] sm:text-4xl">With the blessings of our elders</p>
              <h2 className="font-serif-luxury text-4xl font-light uppercase tracking-[.08em] text-[#741B35] sm:text-5xl md:text-6xl">Our Families</h2>
            </div>

            <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
              {[
                {
                  color: 'red', initial: 'T', side: "The Bride's Family", name: 'Taniya',
                  lines: [['Granddaughter of', ['Late Mr. Tarachand ji Gera', 'Late Mrs. Krishna Devi ji Gera']], ['Daughter of', ['Mr. Pankaj Gera', 'Mrs. Ruby Gera']]],
                  blessing: 'Warmly inviting you to celebrate with us',
                },
                {
                  color: 'red', initial: 'A', side: "The Groom's Family", name: 'Abhiraj',
                  lines: [['Grandson of', ['S. Gurubanchan Singh Chhabra', 'Late Sdn. Ramkaur Chhabra']], ['Son of', ['Mr. Raj Bahadur Singh Chhabra', 'Mrs. Gurjinder Kaur Chhabra']]],
                  blessing: 'With gratitude and joy in our hearts',
                },
              ].map((f) => (
                <ArchFrame key={f.name} color={f.color} className="rg-fx mx-auto w-full max-w-[460px]">
                  <div className="flex min-h-[500px] flex-col items-center bg-[#FFF6E6] px-5 pb-8 pt-24 text-center sm:min-h-[600px] sm:px-10 sm:pb-10 sm:pt-32">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#B99655]/70 bg-[#F8F0E3] font-serif-luxury text-2xl text-[#741B35] shadow-sm">{f.initial}</div>
                    <span className="font-sans-clean mb-2 block text-[11px] uppercase tracking-[0.3em] text-[#B99655]">{f.side}</span>
                    <h3 className="font-script mb-6 text-5xl text-[#741B35] sm:text-6xl">{f.name}</h3>
                    <div className="space-y-6 font-serif-luxury text-base text-[#5B172B]">
                      {f.lines.map(([label, names], i) => (
                        <div key={label}>
                          {i > 0 && <div className="mx-auto mb-6 h-px w-12 bg-[#B99655]/40" />}
                          <p className="font-sans-clean mb-1 text-[10px] uppercase tracking-widest text-[#741B35]/70">{label}</p>
                          {names.map((n) => (
                            <p key={n} className={i === 0 ? 'text-lg font-medium' : 'text-xl font-medium text-[#741B35]'}>{n}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                    <p className="font-serif-luxury mt-auto border-t border-[#B99655]/30 pt-4 text-xs italic text-[#741B35]/80">{f.blessing}</p>
                  </div>
                </ArchFrame>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="scroll-mt-24 px-6 pb-20 pt-28 md:pb-28 md:pt-36">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <p className="font-script text-3xl text-[#B99655] sm:text-4xl">Album of cherished moments</p>
              <h2 className="font-serif-luxury text-4xl font-light uppercase tracking-[.08em] text-[#741B35] sm:text-5xl md:text-6xl">Glimpses of Forever</h2>
            </div>
            <GalleryCarousel photos={visiblePhotos} onOpen={setLightboxImg} />
          </div>

          {lightboxImg && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#260A12]/92 p-3 sm:p-8" onClick={() => setLightboxImg(null)} role="dialog" aria-label="Photo viewer">
              <button onClick={() => setLightboxImg(null)} aria-label="Close" className="absolute right-4 top-4 z-10 p-2 text-[#F8E9D5] hover:text-white">
                <X className="h-7 w-7" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); stepLightbox(-1); }} aria-label="Previous photo" className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-3 text-[#F8E9D5] hover:text-white sm:left-6">
                <ChevronLeft className="h-9 w-9" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); stepLightbox(1); }} aria-label="Next photo" className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-3 text-[#F8E9D5] hover:text-white sm:right-6">
                <ChevronRight className="h-9 w-9" />
              </button>
              <img src={lightboxImg.full} alt={lightboxImg.alt} onClick={(e) => e.stopPropagation()} className="max-h-[88svh] max-w-full border-[6px] border-[#F8E9D5] object-contain shadow-2xl sm:max-w-[min(90vw,1100px)]" />
            </div>
          )}
        </section>

        {/* VENUES */}
        <section id="venue" className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center md:mb-20">
              <p className="font-script text-3xl text-[#B99655] sm:text-4xl">Destination &amp; directions</p>
              <h2 className="font-serif-luxury text-4xl font-light uppercase tracking-[.08em] text-[#741B35] sm:text-5xl md:text-6xl">Wedding Venues</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
              {[
                { tag: 'Sacred Anand Karaj venue', name: 'Badgaon Gurudwara', addr: 'Bundi Road, Kota, Rajasthan', desc: 'A peaceful setting for the Anand Karaj on Bundi Road, Kota.', href: 'https://maps.google.com/?q=Badgaon+Gurudwara+Bundi+Road+Kota+Rajasthan' },
                { tag: 'Rang-e-Jashn & wedding celebration', name: 'Hotel Shri Kripa', addr: 'Near Mahalok Deepo, Tarana, Madhya Pradesh', desc: 'Venue for Rang-e-Jashn and the wedding celebration in Tarana.', href: mapSearchUrl('Hotel Shri Kripa, Near Mahalok Deepo, Tarana, Madhya Pradesh') },
                { tag: 'Celebrations & royal gathering', name: 'Hotel Menaal Residency', addr: 'Bundi Road, Kota, Rajasthan', desc: 'Host to the evening celebrations, with lawns, banquet spaces, and guest parking on Bundi Road.', href: 'https://maps.google.com/?q=Hotel+Menaal+Residency+Bundi+Road+Kota+Rajasthan' },
              ].map((v) => (
                <div key={v.name} className="rg-venue-card rg-fx relative flex flex-col justify-between p-9 text-[#F8E9D5]">
                  <div>
                    <p className="font-script text-3xl text-[#E7D3A3]">Join us at</p>
                    <span className="font-sans-clean mt-1 block text-[9px] uppercase tracking-[0.24em] text-[#E7D3A3]/80">{v.tag}</span>
                    <h3 className="font-serif-luxury mb-2 mt-3 text-3xl uppercase leading-tight tracking-wide text-[#E7D3A3] sm:text-4xl">{v.name}</h3>
                    <p className="font-serif-luxury text-base text-[#F3DFC0]">{v.addr}</p>
                    <div className="my-4 h-px w-full bg-[#E7D3A3]/30" />
                    <p className="font-serif-luxury mb-7 text-sm leading-relaxed text-[#F3DFC0]/85">{v.desc}</p>
                  </div>
                  <a href={v.href} target="_blank" rel="noopener noreferrer" className="rg-gold-btn font-sans-clean inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-widest">
                    <MapPin className="h-3.5 w-3.5" /> Get directions <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="px-5 pb-6 pt-20 text-center sm:px-6 md:pb-8 md:pt-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 grid grid-cols-3 items-end gap-2 sm:mb-12 sm:grid-cols-[1fr_1.3fr_1fr] sm:gap-8">
              {CLOSING_IDS.map((id, i) => {
                const ph = byId(id);
                const center = i === 1;
                return (
                  <ArchFrame
                    key={id}
                    color={['pink', 'red', 'blue'][i]}
                    className={`rg-fx mx-auto w-full ${center ? 'h-[220px] max-w-[300px] sm:h-[460px]' : 'h-[160px] max-w-[230px] sm:h-[340px]'}`}
                    style={{ padding: center ? 8 : 6 }}
                  >
                    <img src={ph.thumb} alt={ph.alt} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: ph.pos }} />
                  </ArchFrame>
                );
              })}
            </div>

            <p className="font-script text-4xl text-[#B99655] sm:text-5xl">We await your gracious presence</p>
            <h3 className="font-serif-luxury mt-3 text-[2.6rem] font-light uppercase leading-tight tracking-[.04em] text-[#741B35] sm:text-7xl">Taniya &amp; Abhiraj</h3>
            <p className="font-sans-clean mt-5 text-xs font-medium uppercase tracking-[0.3em] text-[#741B35]">15 · 12 · 2026</p>
            <p className="font-serif-luxury mt-8 text-sm italic text-[#741B35]/75">“Your presence and blessings are our greatest wedding gift.”</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <button onClick={handleShare} className="rg-gold-btn font-sans-clean inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest">
                <Share2 className="h-3.5 w-3.5" /> Share invitation
              </button>
              <button onClick={() => scrollToSection('hero')} className="font-sans-clean inline-flex items-center gap-1.5 bg-[#741B35] px-5 py-3 text-xs uppercase tracking-widest text-[#F8F0E3] transition-all hover:bg-[#5B172B]">
                <ArrowUp className="h-3.5 w-3.5" /> Top
              </button>
            </div>
            {copiedNotice && (
              <p className="font-sans-clean mt-4 flex items-center justify-center gap-1 text-xs text-[#741B35]">
                <Check className="h-3.5 w-3.5 text-green-700" /> Invitation link copied to clipboard
              </p>
            )}
          </div>
        </section>
      </main>

      <div className="relative z-10">
        <DesertScene />
        <footer className="bg-gradient-to-b from-[#5B172B] to-[#3E0F1E] px-6 pb-8 pt-10 text-center text-[#E7D3A3]">
          <img src={monogramLogo} alt="T & A" className="mx-auto h-14 w-14 rounded-full border border-[#E7D3A3]/70 object-cover" />
          <p className="font-script mt-3 text-4xl text-[#E7D3A3]">Taniya &amp; Abhiraj</p>
          <p className="font-sans-clean mt-2 text-[10px] tracking-[.3em]">11 – 15 DECEMBER 2026 · KOTA, RAJASTHAN</p>
          <nav className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-3">
            {[['The Couple', 'couple'], ['Celebrations', 'celebrations'], ['Anand Karaj', 'anand-karaj'], ['Gallery', 'gallery'], ['Families', 'family'], ['Venues', 'venue']].map(([label, id]) => (
              <button key={id} onClick={() => scrollToSection(id)} className="font-sans-clean text-[10px] uppercase tracking-[.22em] text-[#E7D3A3]/90 transition-colors hover:text-white">
                {label}
              </button>
            ))}
          </nav>
          <div className="mx-auto mt-8 max-w-3xl border-t border-[#E7D3A3]/20 pt-5 font-sans-clean text-[10px] tracking-[.16em] text-[#E7D3A3]/70">
            <p>&copy; 2026 · INVITATION DESIGNED BY DISCOVER WEBSOFT</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

