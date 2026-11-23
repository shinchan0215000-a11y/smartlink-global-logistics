import { useEffect, useRef, useState } from 'react';
import type { VideoClip } from '../data/smartlinkData';

interface CinematicVideoProps {
  clip?: VideoClip;
  clips?: VideoClip[];
  videoUrl?: string;
  mobileVideoUrl?: string;
  fallbackImage?: string;
  alt?: string;
  className?: string;
  overlayClassName?: string;
  priority?: boolean;
  cycleMs?: number;
}

function useIsMobileStream(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const narrow = window.innerWidth < 768;
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      setIsMobile(narrow || Boolean(conn?.saveData));
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

export default function CinematicVideo({
  clip,
  clips,
  videoUrl,
  mobileVideoUrl,
  fallbackImage,
  alt,
  className = '',
  overlayClassName = 'bg-gradient-to-b from-[#080B10]/78 via-[#080B10]/58 to-[#080B10]/90',
  priority = false,
  cycleMs = 9500,
}: CinematicVideoProps) {
  const normalizedClips: VideoClip[] =
    clips && clips.length > 0
      ? clips
      : clip
        ? [clip]
        : [
            {
              videoUrl: videoUrl || '',
              mobileVideoUrl: mobileVideoUrl || videoUrl || '',
              fallbackImage: fallbackImage || '',
              alt: alt || 'Logistics operations',
            },
          ];

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isInView, setIsInView] = useState(priority);
  const [activeIndex, setActiveIndex] = useState(0);
  const [readyMap, setReadyMap] = useState<Record<string, boolean>>({});
  const [failedMap, setFailedMap] = useState<Record<string, boolean>>({});
  const [reducedMotion, setReducedMotion] = useState(false);
  const isMobileStream = useIsMobileStream();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        setIsInView(visible);
        if (visible) {
          setShouldLoad(true);
        }
      },
      { rootMargin: '180px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Smooth crossfade cycling when visible and multiple clips are supplied
  useEffect(() => {
    if (normalizedClips.length <= 1 || reducedMotion || !isInView) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % normalizedClips.length);
    }, cycleMs);
    return () => window.clearInterval(timer);
  }, [normalizedClips.length, cycleMs, reducedMotion, isInView]);

  const currentClipIdx = activeIndex % normalizedClips.length;
  const currentClip = normalizedClips[currentClipIdx];

  // Enforce muted attribute in DOM and pause off-screen/inactive streams
  useEffect(() => {
    if (!shouldLoad || reducedMotion) return;
    normalizedClips.forEach((item, idx) => {
      const src = isMobileStream ? item.mobileVideoUrl : item.videoUrl;
      const el = videoRefs.current[src];
      if (!el) return;
      el.muted = true;
      el.defaultMuted = true;
      if (isInView && idx === currentClipIdx && !failedMap[src]) {
        const p = el.play();
        if (p && typeof p.catch === 'function') {
          p.catch(() => {
            // Browser autoplay policy blocked playback; fallback poster remains cleanly visible
          });
        }
      } else {
        el.pause();
      }
    });
  }, [shouldLoad, isInView, currentClipIdx, isMobileStream, reducedMotion, failedMap, normalizedClips]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-[#080B10] ${className}`}>
      {/* Photorealistic Fallback Poster */}
      <img
        src={currentClip.fallbackImage}
        alt={currentClip.alt}
        loading={priority ? 'eager' : 'lazy'}
        className="absolute inset-0 h-full w-full object-cover saturate-[0.72] brightness-[0.82] transition-opacity duration-700"
      />

      {/* Looping Video Layer (only active/loaded clips decode while visible) */}
      {shouldLoad &&
        !reducedMotion &&
        normalizedClips.map((item, idx) => {
          const src = isMobileStream ? item.mobileVideoUrl : item.videoUrl;
          const isCurrent = idx === currentClipIdx;
          const isFailed = Boolean(failedMap[src]);
          const isReady = Boolean(readyMap[src]);

          if (!src || isFailed) return null;
          // Only mount active clip (or already-loaded clips) to prevent burst network requests
          if (!isCurrent && !isReady) return null;

          return (
            <video
              key={src}
              ref={(node) => {
                videoRefs.current[src] = node;
                if (node) {
                  node.muted = true;
                  node.defaultMuted = true;
                }
              }}
              src={src}
              poster={item.fallbackImage}
              autoPlay
              muted
              loop
              playsInline
              preload={priority && isCurrent ? 'auto' : 'metadata'}
              onCanPlay={(e) => {
                e.currentTarget.muted = true;
                setReadyMap((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
              }}
              onPlaying={() => setReadyMap((prev) => (prev[src] ? prev : { ...prev, [src]: true }))}
              onError={() => setFailedMap((prev) => (prev[src] ? prev : { ...prev, [src]: true }))}
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover saturate-[0.75] brightness-[0.85] transition-opacity duration-700 ${
                isCurrent && isReady ? 'opacity-100' : 'opacity-0'
              }`}
            />
          );
        })}

      {/* Dark Documentary Contrast Overlay */}
      <div className={`pointer-events-none absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
