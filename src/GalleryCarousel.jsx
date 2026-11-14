import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MousePointer2 } from 'lucide-react';

/* A gold-edged 3D coverflow carousel with swipe, keyboard and lightbox support. */
export const GalleryCarousel = ({ photos, onOpen }) => {
  const n = photos.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(null);
  const go = useCallback((dir) => setActive((a) => (a + dir + n) % n), [n]);

  useEffect(() => {
    if (paused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, [paused, go]);

  const getOffset = (index) => {
    let offset = index - active;
    if (offset > n / 2) offset -= n;
    if (offset < -n / 2) offset += n;
    return offset;
  };
  const onPointerDown = (event) => { startX.current = event.clientX; };
  const onPointerUp = (event) => {
    if (startX.current == null) return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(delta) > 42) go(delta < 0 ? 1 : -1);
  };
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      className="relative mx-auto w-full max-w-[1100px] outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Couple gallery"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(event) => { if (event.key === 'ArrowRight') go(1); if (event.key === 'ArrowLeft') go(-1); }}
      style={{ touchAction: 'pan-y' }}
    >
      <div
        className="relative h-[340px] overflow-hidden sm:h-[390px] md:h-[420px]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { startX.current = null; }}
      >
        {photos.map((photo, index) => {
          const offset = getOffset(index);
          const distance = Math.abs(offset);
          if (distance > 1) return null;
          const scale = [1, .78, .61, .47][distance];
          const imageSrc = distance === 0 ? photo.full : photo.thumb;
          return (
            <button
              key={photo.id}
              type="button"
              aria-hidden={distance > 1}
              tabIndex={distance === 0 ? 0 : -1}
              aria-label={distance === 0 ? `View photo: ${photo.alt}` : `Show photo: ${photo.alt}`}
              onClick={() => distance === 0 ? onOpen(photo) : setActive(index)}
              className="absolute left-1/2 top-5 w-[78vw] max-w-[360px] cursor-pointer overflow-hidden bg-gradient-to-br from-[#FFF4C9] via-[#D9A441] to-[#F8E9D5] p-[5px] sm:top-4 sm:p-[6px]"
              style={{
                aspectRatio: '1.12 / 1',
                zIndex: 30 - distance,
                opacity: distance > 2 ? .82 : 1,
                transform: `translate3d(calc(-50% + ${offset * 20}vw), ${distance * 10}px, 0) rotateY(${offset * -27}deg) scale(${scale})`,
                transformOrigin: '50% 55%',
                transition: reduced ? 'none' : 'transform 780ms cubic-bezier(.2,.72,.18,1), opacity 600ms ease, box-shadow 600ms ease',
                border: '1px solid rgba(255,244,201,.95)',
                borderRadius: '24px',
                boxShadow: distance === 0 ? '0 24px 48px rgba(62,15,30,.3), 0 0 24px rgba(232,193,106,.5)' : '0 14px 28px rgba(62,15,30,.24)',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
              }}
            >
              <img
                src={imageSrc}
                alt={distance === 0 ? photo.alt : ''}
                loading={distance <= 1 ? 'eager' : 'lazy'}
                decoding="async"
                draggable="false"
                className="h-full w-full object-cover"
                style={{ objectPosition: photo.pos, borderRadius: '19px' }}
              />
            </button>
          );
        })}
      </div>

      <div className="relative z-40 -mt-5 flex items-center justify-center gap-5">
        <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-[#C69A50] bg-[#FFF8ED] text-[#741B35] shadow-md transition hover:-translate-x-0.5 hover:bg-[#741B35] hover:text-white">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="flex items-center gap-2 font-sans-clean text-[9px] tracking-[.18em] text-[#741B35]/75"><MousePointer2 className="h-3.5 w-3.5" /> TAP OR SWIPE</span>
        <button type="button" aria-label="Next photo" onClick={() => go(1)} className="grid h-10 w-10 place-items-center rounded-full border border-[#C69A50] bg-[#FFF8ED] text-[#741B35] shadow-md transition hover:translate-x-0.5 hover:bg-[#741B35] hover:text-white">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Choose photo">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            role="tab"
            aria-label={`Photo ${index + 1}`}
            aria-selected={index === active}
            onClick={() => setActive(index)}
            className={`h-2 w-2 rounded-full border transition-colors ${index === active ? 'border-[#741B35] bg-[#741B35]' : 'border-[#B99655] bg-transparent'}`}
          />
        ))}
      </div>
    </div>
  );
};
