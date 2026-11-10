import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, MapPin, Calendar, Music2,
  ChevronRight, Sparkles, Compass,
  Share2, ArrowUp, Check, ExternalLink
} from 'lucide-react';
import { InvitationGate, Reveal, PetalFall, Countdown, ScrollProgress, EnhanceStyles } from './Enhancements';
import ganeshPujanPhoto from './assets/events/ganesh-pujan.png';
import sangeetPhoto from './assets/events/sangeet.png';
import monogramLogo from './assets/t-and-a-logo.jpeg';
import divineGracePhoto from './assets/events/divine-grace-v2.png';
import haldiPhotoUpdate from './assets/events/haldi-v2.png';
import sunsetSipsPhoto from './assets/events/sunset-sips-v2.png';
import foreverPhoto from './assets/events/circle-forever-v2.png';
import royalGatheringPhoto from './assets/events/royal-gathering-v4.png';
import gurudwaraArtwork from './assets/gurudwara-anand-karaj-wide.png';
import heroWeddingBackground from './assets/hero-wedding-background.png';
import familyHeritageBackground from './assets/family-heritage-background.png';
// --- CUSTOM SVG WATERCOLOR & BOTANICAL ARTWORK COMPONENTS ---

// Ornate Indian Wedding Medallion & Divider
const GoldFlourish = ({ className = "w-36 h-6" }) => (
  <svg viewBox="0 0 160 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} mx-auto text-[#B99655]`}>
    <path d="M0 12h58m44 0h58" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
    <path d="M80 3l9 9-9 9-9-9 9-9z" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="80" cy="12" r="2.5" fill="currentColor" />
    <circle cx="68" cy="12" r="1.5" fill="currentColor" />
    <circle cx="92" cy="12" r="1.5" fill="currentColor" />
    <path d="M72 8c2-3 5-4 8-4s6 1 8 4" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M72 16c2 3 5 4 8 4s6-1 8-4" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

// Botanical Floral Border for Hero Left
const BotanicalHeroLeft = () => (
  <svg viewBox="0 0 320 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-floral-art w-full h-full object-cover">
    <defs>
      <radialGradient id="maroonFlower" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8A2341" />
        <stop offset="60%" stopColor="#69142A" />
        <stop offset="100%" stopColor="#3F0A17" />
      </radialGradient>
      <radialGradient id="marigoldFlower" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F9BC38" />
        <stop offset="70%" stopColor="#E28612" />
        <stop offset="100%" stopColor="#B35800" />
      </radialGradient>
      <radialGradient id="dustyRoseFlower" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E5ACA7" />
        <stop offset="75%" stopColor="#C98B86" />
        <stop offset="100%" stopColor="#9C5E59" />
      </radialGradient>
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7E8765" />
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
    {[ [30, 470, '#C98B86'], [205, 245, '#E28612'], [224, 615, '#8A2341'], [40, 865, '#F4BF3A'] ].map(([x, y, color], flowerIndex) => (
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
          fill="#942646"
          transform={`rotate(${i * (360 / 10) + 12})`}
        />
      ))}
      <circle cx="0" cy="0" r="12" fill="#E28612" />
      <circle cx="0" cy="0" r="6" fill="#69142A" />
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
      <circle cx="0" cy="0" r="18" fill="#F9BC38" />
      <circle cx="0" cy="0" r="8" fill="#B35800" />
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
      <circle cx="0" cy="0" r="16" fill="#F9BC38" />
      <circle cx="0" cy="0" r="7" fill="#69142A" />
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
    <path d="M43 128C72 110 93 112 104 132C78 147 59 145 43 128Z" fill="#71805D" opacity=".48" />
    <path d="M42 130C28 105 13 98 1 105C10 127 25 136 42 130Z" fill="#71805D" opacity=".38" />
    <path d="M49 322C77 294 99 292 112 309C90 335 68 342 49 322Z" fill="#71805D" opacity=".44" />
    <path d="M49 324C34 300 17 296 5 306C15 328 31 336 49 324Z" fill="#71805D" opacity=".36" />
    <path d="M56 550C82 525 103 523 116 540C94 565 74 571 56 550Z" fill="#71805D" opacity=".42" />
    <path d="M57 552C40 530 24 527 12 538C23 559 39 566 57 552Z" fill="#71805D" opacity=".34" />
    <path d="M70 754C91 734 108 733 119 746C101 768 84 772 70 754Z" fill="#71805D" opacity=".4" />
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
    <path d="M8 748V350C8 316 28 294 62 294C62 250 94 221 139 221C140 178 182 152 225 148C260 144 278 117 280 48C282 117 300 144 335 148C378 152 420 178 421 221C466 221 498 250 498 294C532 294 552 316 552 350V748Z" fill="#FFFAF1" fillOpacity=".84" stroke="#C38D3E" strokeWidth="2.4" />
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
      <div className="absolute inset-0 bg-gradient-to-t from-[#210b13]/65 via-transparent to-black/10" />
      <span className="absolute bottom-4 left-5 text-[10px] tracking-[0.24em] uppercase font-serif text-white/90 drop-shadow">
        {subtitle || title}
      </span>
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
    <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 border border-[#B99655]/60 bg-[#F8F0E3]/90 px-4 py-2 text-[10px] sm:text-xs font-serif tracking-widest text-[#741B35] backdrop-blur">
      <Sparkles className="h-3.5 w-3.5 text-[#B99655]" /> BADGAON GURUDWARA SAHIB · KOTA
    </figcaption>
  </figure>
);
// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
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
      colorKey: "royal",
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
      bgColor: "bg-[#E39A22]/20",
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
      bgColor: "bg-[#B85A3C]/20",
      type: "sangeet"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F0E3] text-[#3A141E] font-serif selection:bg-[#741B35] selection:text-[#F8F0E3] relative antialiased">
      <EnhanceStyles />
<ScrollProgress />
<InvitationGate onOpen={toggleBackgroundMusic} />
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
        src="/music/Sajna_flute___Ringtone_Darshan_raval_dharal_surelia_DarshanRavalDZ_viralvideo_pl.mp3"
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
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#F8F0E3]/95 backdrop-blur-md shadow-sm border-b border-[#B99655]/30 py-3.5' 
          : 'bg-[#F8F0E3]/85 backdrop-blur-sm border-b border-[#B99655]/20 py-4 md:py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Couple Monogram Logo */}
          <button 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2 group text-left"
          >
            <img src={monogramLogo} alt="T & A" className="h-10 w-10 rounded-full border border-[#B99655]/70 object-cover shadow-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 sm:h-11 sm:w-11" />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-10">
            {[
              ['HOME', 'hero'],
              ['CELEBRATIONS', 'celebrations'],
              ['ANAND KARAJ', 'anand-karaj'],
              ['GALLERY', 'gallery'],
              ['FAMILY', 'family'],
              ['VENUE', 'venue']
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="font-sans-clean text-[11px] uppercase tracking-[0.22em] text-[#741B35] hover:text-[#B99655] transition-colors duration-200 relative group py-1"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B99655] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Trigger & Share */}
          <div className="flex items-center gap-3 md:hidden">
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
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="md:hidden max-h-[calc(100dvh_-_4rem)] overflow-y-auto bg-[#F8F0E3] border-b border-[#B99655]/40 px-4 py-4 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-300 sm:px-6 sm:py-6">
            {[
              ['HOME', 'hero'],
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
              <span>11 — 15 DECEMBER 2026</span>
            </div>
          </div>
        )}
      </header>

      {/* 1. HERO SECTION (EXACT VISUAL REPLICA OF REFERENCE SCREENSHOT 1) */}
      <section id="hero" className="relative min-h-[95svh] md:min-h-screen pt-16 md:pt-20 flex items-center justify-center overflow-hidden bg-[#F8F0E3]">
        {/* Ken Burns Watercolor Heritage Landscape Background Layer */}
        <div className="hidden">
          <div className="w-full h-full ken-burns relative">
            {/* Scenic Royal Indian Sunset Landscape Art */}
            <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full min-w-full min-h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FAF2E4" />
                  <stop offset="35%" stopColor="#F9DFB8" />
                  <stop offset="70%" stopColor="#EDA967" />
                  <stop offset="100%" stopColor="#DF7B47" />
                </linearGradient>
                <radialGradient id="sunGlow" cx="78%" cy="58%" r="20%">
                  <stop offset="0%" stopColor="#FFF4D0" stopOpacity="1" />
                  <stop offset="40%" stopColor="#FCD179" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#DF7B47" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Sky with Sunset */}
              <rect width="1440" height="900" fill="url(#skyGrad)" />
              <circle cx="1120" cy="520" r="140" fill="url(#sunGlow)" />
              <circle cx="1120" cy="520" r="45" fill="#FFF9E5" opacity="0.9" />

              {/* Mountains & Hills in Distance */}
              <path d="M0 640 Q 300 480 650 560 Q 950 490 1440 590 V 900 H 0 Z" fill="#C59368" opacity="0.45" />
              <path d="M0 670 Q 380 540 820 630 Q 1120 560 1440 640 V 900 H 0 Z" fill="#99684C" opacity="0.5" />

              {/* Royal Rajasthani Palace Architecture Skyline on Horizon */}
              <g transform="translate(680, 500)" fill="#784A3B" opacity="0.75">
                {/* Central Palace Domes */}
                <path d="M120 180 V 120 C 120 90, 160 90, 160 120 V 180 Z" />
                <path d="M220 180 V 70 C 220 30, 270 30, 270 70 V 180 Z" />
                <circle cx="245" cy="25" r="5" fill="#DFB24B" />
                <path d="M330 180 V 100 C 330 60, 380 60, 380 100 V 180 Z" />
                {/* Jharokhas & Wall Balconies */}
                <rect x="100" y="110" width="320" height="70" />
                {/* Chhatris */}
                <path d="M40 180 V 130 C 40 110, 70 110, 70 130 V 180 Z" />
                <path d="M440 180 V 130 C 440 110, 470 110, 470 130 V 180 Z" />
              </g>

              {/* Lush Mughal Gardens & Courtyard Terraces */}
              <rect x="0" y="690" width="1440" height="210" fill="#435532" opacity="0.8" />
              <path d="M0 720 Q 720 670 1440 720 V 900 H 0 Z" fill="#2E3C21" />

              {/* Water Reflection Pool / Lotus Pond in Foreground */}
              <polygon points="620,740 820,740 920,900 520,900" fill="#758A8A" opacity="0.6" />

              {/* ELEGANT INDIAN WEDDING COUPLE FROM BEHIND (As in screenshot) */}
              <g transform="translate(670, 640)">
                {/* Groom (Sikh Turban, Royal Sherwani & Dupatta) */}
                <g transform="translate(-25, 0)">
                  {/* Turban (Burgundy & Gold) */}
                  <ellipse cx="20" cy="18" rx="14" ry="11" fill="#741B35" />
                  <path d="M10 18 Q 20 6 30 18" stroke="#DFB24B" strokeWidth="2" fill="none" />
                  {/* Neck & Royal Ivory Sherwani with gold zardozi embroidery */}
                  <path d="M4 35 Q 20 28 36 35 L 42 165 L -2 165 Z" fill="#F8F0E3" stroke="#B99655" strokeWidth="0.5" />
                  {/* Royal Burgundy Velvet Shawl / Dupatta draped over shoulder */}
                  <path d="M-2 42 Q 10 38 12 70 L 6 175 L -10 170 Z" fill="#5B172B" />
                  <line x1="-10" y1="170" x2="6" y2="175" stroke="#DFB24B" strokeWidth="3" />
                </g>

                {/* Bride (Royal Crimson & Deep Maroon Lehenga with Gold Dupatta) */}
                <g transform="translate(25, 15)">
                  {/* Bun & Sheeshpatti / Floral Hair Accessory */}
                  <circle cx="20" cy="14" r="11" fill="#1C1412" />
                  <circle cx="20" cy="14" r="12" stroke="#E39A22" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                  {/* Elaborate Embroidered Bridal Odhani / Dupatta with intricate zari */}
                  <path d="M8 26 Q 20 20 32 26 L 48 160 L -8 160 Z" fill="#741B35" />
                  {/* Zari Gold Border along veil */}
                  <path d="M8 26 L -8 160" stroke="#DFB24B" strokeWidth="2.5" />
                  <path d="M32 26 L 48 160" stroke="#DFB24B" strokeWidth="2.5" />
                  {/* Scattered gold motifs */}
                  {[
                    [15, 60], [25, 75], [10, 100], [30, 110], [18, 135]
                  ].map(([mx, my], idx) => (
                    <circle key={idx} cx={mx} cy={my} r="1.5" fill="#FFECA8" />
                  ))}
                </g>
              </g>

              {/* Stone Urns & Planters */}
              <rect x="360" y="780" width="50" height="60" fill="#B39B7C" opacity="0.8" />
              <ellipse cx="385" cy="775" rx="30" ry="15" fill="#4B5E39" />
              <rect x="1030" y="780" width="50" height="60" fill="#B39B7C" opacity="0.8" />
              <ellipse cx="1055" cy="775" rx="30" ry="15" fill="#4B5E39" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <img src={heroWeddingBackground} alt="" fetchPriority="high" className="h-full w-full object-cover object-center" />
        </div>
        {/* Soft ambient light and paper texture for the invitation backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 50% 42%, rgba(255, 248, 232, 0.46) 0%, rgba(255, 248, 232, 0.12) 38%, transparent 68%), radial-gradient(ellipse at 50% 100%, rgba(91, 23, 43, 0.18) 0%, transparent 52%), linear-gradient(180deg, rgba(255, 250, 239, 0.08), rgba(255, 250, 239, 0.02) 55%, rgba(36, 40, 22, 0.12))',
          }}
        />
        <PetalFall />

        {/* CENTRAL IVORY INVITATION CARD (MATCHING REFERENCE SCREENSHOT) */}
        <div className="relative z-20 my-6 w-[96%] max-w-4xl px-2 py-5 text-center sm:my-8 sm:w-[90%] sm:px-8 sm:py-8 md:px-12">
          
          {/* Small Top Header */}
          <p className="font-sans-clean text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#741B35] font-medium mb-3">
            TOGETHER WITH OUR FAMILIES
          </p>

          <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full border border-[#B99655] bg-[#F8F0E3] p-1 shadow-[0_3px_12px_rgba(91,23,43,0.12)]">
            <img src={monogramLogo} alt="T and A monogram" className="h-full w-full rounded-full object-cover" />
          </div>

          {/* Delicate Diamond Divider */}
          <div className="my-3">
            <GoldFlourish className="w-28 sm:w-36 h-5" />
          </div>

          {/* Calligraphic "You're Invited" */}
          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#741B35] my-2 transform -rotate-1 font-normal leading-tight">
            You're Invited
          </h2>

          {/* Couple Names */}
          <h1 className="font-serif-luxury text-3xl min-[390px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#5B172B] tracking-normal sm:tracking-wide my-3 sm:my-6 leading-tight">
            Taniya & Abhiraj
          </h1>

          <div className="mx-auto my-3"><GoldFlourish className="h-5 w-48" /></div>
          <p className="font-serif-luxury text-base sm:text-lg text-[#A96C2F] italic mb-4">
            Celebrating Love and a New Beginning
          </p>

          {/* Wedding Dates */}
          <p className="font-sans-clean text-[10px] sm:text-sm tracking-[0.12em] sm:tracking-[0.22em] text-[#741B35] font-normal my-3 sm:my-4">
            11 — 15 DECEMBER 2026
          </p>
          <p className="inline-flex items-center gap-2 font-sans-clean text-[10px] sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[#741B35] -mt-2 mb-3 sm:mb-4">
            <MapPin className="h-4 w-4 text-[#8A2341]" /> Kota, Rajasthan
          </p>
          <Countdown />

          {/* Action Button: Burgundy with gold trim */}
          <div className="mt-7">
            <button
              onClick={() => scrollToSection('celebrations')}
              className="hero-open-button inline-flex items-center gap-2 rounded-full px-10 py-3.5 bg-[#7D1027] hover:bg-[#5B172B] text-[#F8F0E3] font-sans-clean text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:shadow-xl border border-[#D6A44F]/80 group"
            >
              <span>OPEN INVITATION</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#E7D3A3] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. CHAPTER TWO: THE CELEBRATIONS (EXACT VISUAL REPLICA OF SCREENSHOT 2) */}
      <section id="celebrations" className="py-24 md:py-32 bg-[#741B35] text-[#F8F0E3] relative px-6 md:px-12">
        {/* Subtle royal pattern backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E7D3A3_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header as in Screenshot 2 */}
          <div className="text-center mb-16 md:mb-24">
            <span className="font-sans-clean text-xs uppercase tracking-[0.3em] text-[#E7D3A3] block mb-2 font-medium">
              CHAPTER TWO / THE ITINERARY
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#F8F0E3] font-light">
              The Celebrations
            </h2>
            <p className="font-serif-luxury italic text-lg sm:text-xl text-[#E7D3A3]/90 mt-4 max-w-xl mx-auto">
              "A little tradition, a little magic, and all the people we love."
            </p>

            <div className="my-5">
              <GoldFlourish className="w-32 h-5 text-[#E7D3A3]" />
            </div>

            <p className="font-sans-clean text-xs sm:text-sm tracking-[0.25em] text-[#E7D3A3]/90 uppercase font-light">
              11 — 14 DECEMBER 2026
            </p>
          </div>

          {/* TWO-PAGE WEDDING INVITATION SPREADS (ALTERNATING AS IN SCREENSHOT) */}
          <div className="event-stack flex flex-col pb-24">
            {events.map((evt, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <Reveal
                  key={evt.title}
                  from={isEven ? 'left' : 'right'}
                  className="event-stack-card"
                  style={{ zIndex: idx + 1, top: `calc(5.5rem + ${idx * 10}px)` }}
                >
                <div className="event-card-shell bg-[#FAF5EC] text-[#5B172B] shadow-2xl border border-[#B99655]/70 overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
                  <div className={`grid grid-cols-1 md:grid-cols-2 items-stretch ${isEven ? '' : 'md:flex-row-reverse'}`}>
                    
                    {/* ARTWORK SPREAD (LEFT ON EVEN, RIGHT ON ODD) */}
                    <div className={`relative min-h-[320px] sm:min-h-[380px] md:min-h-[460px] overflow-hidden ${isEven ? 'order-1' : 'order-1 md:order-2'}`}>
                      <EventArtwork type={evt.colorKey} title={evt.title} subtitle={evt.chapter} />
                      <div className="absolute inset-0 border-r border-[#B99655]/20 pointer-events-none" />
                    </div>

                    {/* INVITATION DETAILS SPREAD (WARM IVORY PANEL WITH THIN GOLD BORDER) */}
                    <div className={`p-6 sm:p-10 md:p-14 flex flex-col justify-center text-center relative bg-[#FAF5EC] ${isEven ? 'order-2' : 'order-2 md:order-1'}`}>
                      {/* Inner gold border inside invitation spread */}
                      <div className="absolute inset-3 sm:inset-4 border border-[#B99655]/30 pointer-events-none" />

                      {/* Number & Chapter label */}
                      <span className="font-sans-clean text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#741B35]/80 block mb-2 font-medium">
                        {evt.num} / {evt.chapter}
                      </span>

                      {/* Event Title */}
                      <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#5B172B] font-normal my-2">
                        {evt.title}
                      </h3>

                      {/* Divider */}
                      <div className="my-2">
                        <GoldFlourish className="w-24 sm:w-28 h-4 text-[#B99655]" />
                      </div>

                      {/* Quote */}
                      <p className="font-serif-luxury italic text-base sm:text-lg text-[#741B35] max-w-md mx-auto my-3 leading-relaxed">
                        "{evt.quote.replace(/"/g, '')}"
                      </p>

                      {evt.subText && (
                        <p className="text-xs font-sans-clean uppercase tracking-wider text-[#B99655] mb-2">
                          {evt.subText}
                        </p>
                      )}

                      {/* Date & Time */}
                      <div className="my-4 space-y-1">
                        <p className="font-sans-clean text-xs sm:text-sm tracking-[0.08em] sm:tracking-[0.16em] md:tracking-[0.2em] text-[#5B172B] font-medium uppercase">
                          {evt.date} · {evt.time}
                        </p>
                        {evt.lunchTime && (
                          <p className="font-sans-clean text-[11px] tracking-wider text-[#741B35] uppercase">
                            Lunch: {evt.lunchTime}
                          </p>
                        )}
                      </div>

                      {/* Venue */}
                      <div className="mt-2 text-sm text-[#741B35] font-serif-luxury">
                        <p className="text-base font-semibold text-[#5B172B]">{evt.venue}</p>
                        <p className="text-xs text-[#741B35]/80 font-sans-clean tracking-wider mt-0.5">{evt.address}</p>
                        {evt.lunchVenue && (
                          <div className="mt-1">
                            <p className="text-xs italic text-[#741B35]/90">Lunch Venue: {evt.lunchVenue}</p>
                            <a
                              href={mapSearchUrl(`${evt.lunchVenue}, ${evt.lunchAddress || evt.address}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-sans-clean uppercase tracking-widest text-[#741B35] hover:text-[#B99655]"
                            >
                              <MapPin className="w-3 h-3" /> MAP LUNCH VENUE
                            </a>
                          </div>
                        )}
                      </div>

                      <a
                        href={mapSearchUrl(`${evt.venue}, ${evt.address}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 mt-3 text-[10px] font-sans-clean uppercase tracking-widest text-[#741B35] hover:text-[#B99655] transition-colors"
                        aria-label={`Open map for ${evt.venue}, ${evt.address}`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>OPEN VENUE MAP</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {/* Add to Calendar helper */}
                      <div className="mt-6">
                        <a
                          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Taniya & Abhiraj: ' + evt.title)}&dates=20261211T043000Z/20261215T183000Z&details=${encodeURIComponent(evt.quote)}&location=${encodeURIComponent(evt.venue + ', ' + evt.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-sans-clean uppercase tracking-widest text-[#B99655] hover:text-[#741B35] transition-colors py-1 px-3 border border-[#B99655]/40 hover:border-[#741B35]"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>ADD TO CALENDAR</span>
                        </a>
                      </div>

                    </div>

                  </div>
                </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. CHAPTER THREE: ANAND KARAJ (SACRED UNION CLIMAX - SCREENSHOT 3) */}
      <section id="anand-karaj" className="py-16 sm:py-24 md:py-36 bg-[#F8F0E3] relative px-4 sm:px-6 md:px-12 text-center overflow-hidden">
        {/* Subtle watercolor texture & sun halo */}
        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Chapter Top Title */}
          <span className="font-sans-clean text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.32em] text-[#741B35] block mb-3 font-medium">
            CHAPTER THREE / THE SACRED UNION
          </span>

          <p className="font-sans-clean text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.25em] text-[#741B35]/80 mb-4">
            ANAND KARAJ · A PROMISE BEFORE WAHEGURU
          </p>

          {/* Heading */}
          <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#5B172B] font-light tracking-tight sm:tracking-wide my-4 leading-tight">
            One Soul, Two Bodies
          </h2>

          {/* Calligraphic Couple Script */}
          <h3 className="font-script text-4xl sm:text-6xl md:text-7xl text-[#741B35] my-2 drop-shadow-sm leading-tight">
            Taniya & Abhiraj
          </h3>

          {/* Date & Time */}
          <p className="font-sans-clean text-[10px] sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] text-[#5B172B] uppercase my-5 sm:my-6 font-medium">
            TUESDAY, 15 DECEMBER 2026 · 9:00 A.M.
          </p>

          {/* Gold Flourish */}
          <div className="my-5">
            <GoldFlourish className="w-36 h-6" />
          </div>

          {/* Gurudwara Venue Banner */}
          <div className="mb-10 sm:mb-14">
            <h4 className="font-serif-luxury text-xl sm:text-3xl md:text-4xl tracking-[0.12em] sm:tracking-widest text-[#5B172B] uppercase font-light">
              BADGAON GURUDWARA
            </h4>
            <p className="font-sans-clean text-[10px] sm:text-sm tracking-[0.12em] sm:tracking-[0.2em] text-[#741B35] mt-1 uppercase">
              Bundi Road, Kota, Rajasthan
            </p>
          </div>

          {/* MONUMENTAL SACRED WATERCOLOR GURUDWARA ARTWORK (SIKH SANCTUARY) */}
          <div className="relative my-8">
            <RefinedGurudwaraArtwork />
          </div>

          {/* Sacred Ceremony Note */}
          <div className="max-w-2xl mx-auto mt-8 sm:mt-12 p-5 sm:p-8 bg-[#FAF5EC] border border-[#B99655]/40 shadow-md">
            <p className="font-serif-luxury italic text-base sm:text-lg text-[#741B35] leading-relaxed">
              The Anand Karaj celebrates a shared life of faith, love, and the four sacred Laavan.
            </p>

            <span className="font-sans-clean text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-widest text-[#B99655] uppercase block mt-3">A SIKH WEDDING CEREMONY</span>
          </div>

        </div>
      </section>

      {/* 5. FAMILY SECTION: TOGETHER WITH OUR FAMILIES */}
      <section id="family" className="family-section relative overflow-hidden border-t border-b border-[#B99655]/30 px-6 py-24 md:px-12 md:py-28">
        <img src={familyHeritageBackground} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#FFF9EF]/10 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center md:mb-16">
            <span className="mb-3 inline-flex items-center gap-3 font-sans-clean text-[11px] uppercase tracking-[0.3em] text-[#741B35] font-semibold">
              <span className="h-px w-10 bg-[#B99655] sm:w-16" />HERITAGE & LINEAGE<span className="h-px w-10 bg-[#B99655] sm:w-16" />
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#5B172B] font-light">
              Together With Our Families
            </h2>
            <GoldFlourish className="mt-4 h-7 w-44" />
          </div>

          {/* Two Large Elegant Columns (Bride & Groom) */}
          <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
            
            {/* BRIDE SIDE */}
            <div className="family-arch-card relative mx-auto min-h-[620px] w-full max-w-[560px] px-7 pb-12 pt-28 text-center transition-transform duration-500 hover:-translate-y-1 sm:px-12 sm:pt-32">
              <FamilyArchFrame />
              <div className="relative z-10">
              <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#B99655]/70 bg-[#F8F0E3] font-serif-luxury text-2xl text-[#741B35] shadow-sm">T</div>
              
              <span className="font-sans-clean text-[11px] tracking-[0.3em] uppercase text-[#B99655] block mb-2">
                THE BRIDE'S FAMILY
              </span>
              <h3 className="font-script text-5xl sm:text-6xl text-[#741B35] font-normal mb-6">
                Taniya
              </h3>

              <div className="space-y-6 text-[#5B172B] font-serif-luxury text-base">
                <div>
                  <p className="font-sans-clean text-[10px] tracking-widest uppercase text-[#741B35]/70 mb-1">
                    GRANDDAUGHTER OF
                  </p>
                  <p className="text-lg font-medium">Late Mr. Tarachand ji Gera</p>
                  <p className="text-lg font-medium">Late Mrs. Krishna Devi ji Gera</p>
                </div>

                <div className="w-12 h-[1px] bg-[#B99655]/40 mx-auto" />

                <div>
                  <p className="font-sans-clean text-[10px] tracking-widest uppercase text-[#741B35]/70 mb-1">
                    DAUGHTER OF
                  </p>
                  <p className="text-xl font-medium text-[#741B35]">Mr. Pankaj Gera</p>
                  <p className="text-xl font-medium text-[#741B35]">Mrs. Ruby Gera</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#B99655]/20 text-xs italic font-serif-luxury text-[#741B35]/80">
                Warmly inviting you to celebrate with us
              </div>
              </div>
            </div>

            {/* GROOM SIDE */}
            <div className="family-arch-card relative mx-auto min-h-[620px] w-full max-w-[560px] px-7 pb-12 pt-28 text-center transition-transform duration-500 hover:-translate-y-1 sm:px-12 sm:pt-32">
              <FamilyArchFrame />
              <div className="relative z-10">
              <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#B99655]/70 bg-[#F8F0E3] font-serif-luxury text-2xl text-[#741B35] shadow-sm">A</div>

              <span className="font-sans-clean text-[11px] tracking-[0.3em] uppercase text-[#B99655] block mb-2">
                THE GROOM'S FAMILY
              </span>
              <h3 className="font-script text-5xl sm:text-6xl text-[#741B35] font-normal mb-6">
                Abhiraj
              </h3>

              <div className="space-y-6 text-[#5B172B] font-serif-luxury text-base">
                <div>
                  <p className="font-sans-clean text-[10px] tracking-widest uppercase text-[#741B35]/70 mb-1">
                    GRANDSON OF
                  </p>
                  <p className="text-lg font-medium">S. Gurubanchan Singh Chhabra</p>
                  <p className="text-lg font-medium">Late Sdn. Ramkaur Chhabra</p>
                </div>

                <div className="w-12 h-[1px] bg-[#B99655]/40 mx-auto" />

                <div>
                  <p className="font-sans-clean text-[10px] tracking-widest uppercase text-[#741B35]/70 mb-1">
                    SON OF
                  </p>
                  <p className="text-xl font-medium text-[#741B35]">Mr. Raj Bahadur Singh Chhabra</p>
                  <p className="text-xl font-medium text-[#741B35]">Mrs. Gurjinder Kaur Chhabra</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#B99655]/20 text-xs italic font-serif-luxury text-[#741B35]/80">
                With gratitude and joy in our hearts
              </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. EDITORIAL GALLERY SECTION */}
      <section id="gallery" className="py-24 md:py-32 bg-[#F8F0E3] relative px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-sans-clean text-xs uppercase tracking-[0.3em] text-[#741B35] block mb-2 font-medium">
              ALBUM OF CHERISHED MOMENTS
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#5B172B] font-light">
              Glimpses of Forever
            </h2>
            <GoldFlourish className="w-32 h-6 mt-4" />
          </div>

          {/* Asymmetric Editorial Museum Layout */}
          <div className="grid grid-cols-12 items-center gap-3 sm:gap-6 md:gap-8">
            {galleryPhotos.map((photo) => (
              <div 
                key={photo.id}
                onClick={() => setLightboxImg(photo)}
                className={`${photo.ratio} relative overflow-hidden bg-[#FAF5EC] border border-[#B99655]/50 shadow-lg cursor-pointer group transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div className="w-full h-full p-2">
                  <div className="w-full h-full relative overflow-hidden border border-[#B99655]/30">
                    <EventArtwork type={photo.type} title={photo.title} subtitle={photo.caption} />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#5B172B]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                      <span className="font-sans-clean text-[10px] uppercase tracking-widest text-[#E7D3A3]">
                        {photo.caption}
                      </span>
                      <h4 className="font-serif-luxury text-2xl text-[#F8F0E3] font-normal">
                        {photo.title}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxImg && (
          <div 
            className="fixed inset-0 z-50 bg-[#260A12]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
            onClick={() => setLightboxImg(null)}
          >
            <div className="relative max-w-3xl w-full bg-[#FAF5EC] border border-[#B99655] p-3 shadow-2xl sm:p-4" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 text-[#741B35] hover:text-[#5B172B] p-2"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="min-h-[250px] flex items-center justify-center sm:min-h-[400px]">
                <EventArtwork type={lightboxImg.type} title={lightboxImg.title} subtitle={lightboxImg.caption} />
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-serif-luxury text-2xl text-[#741B35]">{lightboxImg.title}</h4>
                <p className="font-sans-clean text-xs uppercase tracking-widest text-[#B99655] mt-1">{lightboxImg.caption}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 8. VENUE & DESTINATION GUIDE */}
      <section id="venue" className="venue-section py-24 md:py-32 relative px-6 md:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <span className="font-sans-clean text-xs uppercase tracking-[0.3em] text-[#E7D3A3] block mb-2 font-medium">
              DESTINATION & DIRECTIONS
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#F8F0E3] font-light">
              Wedding Venues
            </h2>
            <GoldFlourish className="w-32 h-6 mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            
            {/* Venue 1: Badgaon Gurudwara Sahib */}
            <div className="venue-card bg-[#FAF5EC] border border-[#B99655]/60 border-t-4 p-8 sm:p-9 shadow-xl flex flex-col justify-between relative">
              <div className="absolute top-4 right-4 text-[#B99655]">
                <Compass className="w-6 h-6 opacity-60" />
              </div>
              <div>
                <span className="font-sans-clean text-[10px] uppercase tracking-widest text-[#741B35] font-semibold">
                  SACRED ANAND KARAJ VENUE
                </span>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#5B172B] mt-2 mb-3">
                  Badgaon Gurudwara
                </h3>
                <p className="font-serif-luxury text-base text-[#741B35]/90 mb-4">
                  Bundi Road, Kota, Rajasthan
                </p>
                <div className="h-[1px] w-full bg-[#B99655]/30 my-4" />
                <p className="font-serif-luxury text-sm text-[#5B172B]/80 leading-relaxed mb-6">
                  A peaceful setting for the Anand Karaj on Bundi Road, Kota.
                </p>
              </div>

              <div>
                <a
                  href="https://maps.google.com/?q=Badgaon+Gurudwara+Bundi+Road+Kota+Rajasthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#741B35] hover:bg-[#5B172B] text-[#F8F0E3] font-sans-clean text-xs uppercase tracking-widest transition-colors border border-[#B99655]/50"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E7D3A3]" />
                  <span>VIEW LOCATION ON MAP</span>
                  <ExternalLink className="w-3 h-3 text-[#E7D3A3]" />
                </a>
              </div>
            </div>

            {/* Venue 2: Hotel Shri Kripa */}
            <div className="venue-card bg-[#FAF5EC] border border-[#B99655]/60 border-t-4 p-8 sm:p-9 shadow-xl flex flex-col justify-between relative">
              <div className="absolute top-4 right-4 text-[#B99655]"><Compass className="w-6 h-6 opacity-60" /></div>
              <div>
                <span className="font-sans-clean text-[10px] uppercase tracking-widest text-[#741B35] font-semibold">RANG-E-JASHN & WEDDING CELEBRATION</span>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#5B172B] mt-2 mb-3">Hotel Shri Kripa</h3>
                <p className="font-serif-luxury text-base text-[#741B35]/90 mb-4">Near Mahalok Deepo, Tarana, Madhya Pradesh</p>
                <div className="h-[1px] w-full bg-[#B99655]/30 my-4" />
                <p className="font-serif-luxury text-sm text-[#5B172B]/80 leading-relaxed mb-6">Venue for Rang-e-Jashn and the wedding celebration in Tarana.</p>
              </div>
              <div>
                <a href={mapSearchUrl('Hotel Shri Kripa, Near Mahalok Deepo, Tarana, Madhya Pradesh')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#741B35] hover:bg-[#5B172B] text-[#F8F0E3] font-sans-clean text-xs uppercase tracking-widest transition-colors border border-[#B99655]/50">
                  <MapPin className="w-3.5 h-3.5 text-[#E7D3A3]" /><span>VIEW LOCATION ON MAP</span><ExternalLink className="w-3 h-3 text-[#E7D3A3]" />
                </a>
              </div>
            </div>

            {/* Venue 3: Hotel Menaal Residency */}
            <div className="venue-card bg-[#FAF5EC] border border-[#B99655]/60 border-t-4 p-8 sm:p-9 shadow-xl flex flex-col justify-between relative">
              <div className="absolute top-4 right-4 text-[#B99655]">
                <Compass className="w-6 h-6 opacity-60" />
              </div>
              <div>
                <span className="font-sans-clean text-[10px] uppercase tracking-widest text-[#741B35] font-semibold">
                  CELEBRATIONS & ROYAL GATHERING
                </span>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#5B172B] mt-2 mb-3">
                  Hotel Menaal Residency
                </h3>
                <p className="font-serif-luxury text-base text-[#741B35]/90 mb-4">
                  Bundi Road, Kota, Rajasthan
                </p>
                <div className="h-[1px] w-full bg-[#B99655]/30 my-4" />
                <p className="font-serif-luxury text-sm text-[#5B172B]/80 leading-relaxed mb-6">
                  Host to the evening celebrations, with lawns, banquet spaces, and guest parking on Bundi Road.
                </p>
              </div>

              <div>
                <a
                  href="https://maps.google.com/?q=Hotel+Menaal+Residency+Bundi+Road+Kota+Rajasthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#741B35] hover:bg-[#5B172B] text-[#F8F0E3] font-sans-clean text-xs uppercase tracking-widest transition-colors border border-[#B99655]/50"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E7D3A3]" />
                  <span>VIEW LOCATION ON MAP</span>
                  <ExternalLink className="w-3 h-3 text-[#E7D3A3]" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FINAL CLOSING INVITATION CARD (FULL SCREEN LETTERPRESS FINALE) */}
      <section className="min-h-[75svh] py-16 sm:py-24 md:py-28 bg-[#FAF5EC] relative flex items-center justify-center px-4 sm:px-6 text-center border-t border-[#B99655]/40 overflow-hidden">
        {/* Subtle background paper seal pattern */}
        <div className="max-w-2xl w-full mx-auto relative z-10 p-6 sm:p-10 md:p-16 border-2 border-[#B99655]/60 bg-[#FDFBF7] shadow-2xl">
          {/* Inner hairline */}
          <div className="absolute inset-3 border border-[#B99655]/30 pointer-events-none" />

          {/* Wax Seal Motif */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#F8F0E3] border-2 border-[#B99655] mx-auto flex items-center justify-center shadow-lg mb-6 sm:mb-8 overflow-hidden">
            <img src={monogramLogo} alt="T & A" className="w-full h-full object-cover" />
          </div>

          <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#5B172B] font-light leading-snug">
            Two Hearts.<br />One Beautiful Beginning.
          </h3>

          <div className="my-6">
            <GoldFlourish className="w-36 h-6" />
          </div>

          <h4 className="font-script text-4xl sm:text-5xl text-[#741B35] my-4">
            Taniya & Abhiraj
          </h4>

          <p className="font-sans-clean text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.3em] text-[#741B35] uppercase font-medium mt-6">
            15 · 12 · 2026
          </p>

          <p className="font-serif-luxury italic text-sm text-[#741B35]/75 mt-8">
            "Your presence and blessings are our greatest wedding gift."
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FAF5EC] hover:bg-[#741B35] hover:text-[#F8F0E3] text-[#741B35] font-sans-clean text-xs uppercase tracking-widest border border-[#B99655] transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>SHARE INVITATION</span>
            </button>
            <button
              onClick={() => scrollToSection('hero')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#741B35] hover:bg-[#5B172B] text-[#F8F0E3] font-sans-clean text-xs uppercase tracking-widest transition-all"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP</span>
            </button>
          </div>

          {copiedNotice && (
            <p className="text-xs font-sans-clean text-[#741B35] mt-4 flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5 text-green-700" /> Invitation Link Copied to Clipboard
            </p>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#5B172B] text-[#E7D3A3]/85 py-6 px-6 text-center text-[10px] sm:text-xs font-sans-clean tracking-[0.14em] sm:tracking-[0.2em] border-t border-[#B99655]/30">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>&copy; 2026 · INVITATION DESIGNED BY DISCOVER WEBSOFT</p>
          <p>DESIGNED WITH LOVE</p>
        </div>
      </footer>

    </div>
  );
}
