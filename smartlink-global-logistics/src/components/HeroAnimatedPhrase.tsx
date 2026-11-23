import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const PHRASES = ['IMPORT', 'EXPORT', 'GLOBAL LOGISTICS'] as const;

export default function HeroAnimatedPhrase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const lineRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = lineRef.current;
    if (!container) return;

    const chars = container.querySelectorAll<HTMLElement>('.phrase-char');
    if (chars.length === 0) return;

    if (reducedMotion) {
      gsap.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(
      chars,
      {
        opacity: 0,
        x: 10,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.45,
        stagger: 0.025,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      },
    );

    return () => {
      tl.kill();
    };
  }, [activeIndex, reducedMotion]);

  const currentPhrase = PHRASES[activeIndex];

  return (
    <div className="select-none" aria-live="polite">
      {/* Fixed-height single-cell container so phrase switches never cause layout shift */}
      <div className="grid h-8 items-center overflow-hidden">
        <div
          ref={lineRef}
          key={currentPhrase}
          className="col-start-1 row-start-1 flex items-center font-display text-sm sm:text-base font-medium tracking-[0.26em] text-[#56A6A0] uppercase whitespace-nowrap"
        >
          {currentPhrase.split('').map((char, idx) => (
            <span
              key={`${currentPhrase}-${idx}`}
              className="phrase-char inline-block"
              style={{ minWidth: char === ' ' ? '0.45em' : undefined }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>

      {/* Minimal selector row */}
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.18em] uppercase">
        {PHRASES.map((phrase, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={phrase}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`py-0.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-1 focus-visible:outline-[#56A6A0] ${
                active ? 'text-[#DCE3E8]' : 'text-[#87929D] hover:text-[#DCE3E8]'
              }`}
            >
              {phrase}
              {idx < PHRASES.length - 1 && (
                <span aria-hidden="true" className="ml-3 text-[#25313B]">
                  /
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
