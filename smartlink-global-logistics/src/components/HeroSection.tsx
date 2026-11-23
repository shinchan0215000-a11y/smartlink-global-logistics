import { ArrowRight, ChevronDown } from 'lucide-react';
import CinematicVideo from './CinematicVideo';
import HeroAnimatedPhrase from './HeroAnimatedPhrase';
import { HERO_SEQUENCE } from '../data/smartlinkData';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#080B10] pt-20 pb-20 sm:pb-16"
    >
      {/* Full-Screen Real Moving Maritime & Terminal Video Sequence */}
      <CinematicVideo
        clips={HERO_SEQUENCE}
        priority
        cycleMs={9000}
        className="absolute inset-0 z-0 h-full w-full"
        overlayClassName="bg-gradient-to-b from-[#080B10]/78 via-[#080B10]/52 to-[#080B10]/92"
      />

      {/* Side readability vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#080B10]/85 via-[#080B10]/45 to-transparent"
      />

      {/* Restrained Editorial Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium tracking-[0.26em] text-[#87929D] uppercase">
            SmartLink Global Logistics
          </p>

          <div className="mt-5">
            <HeroAnimatedPhrase />
          </div>

          <h1
            className="mt-5 font-display text-2xl sm:text-3xl md:text-[34px] font-medium leading-[1.28] tracking-tight text-[#DCE3E8]"
            style={{ textWrap: 'balance' }}
          >
            Connecting Businesses Through Global Logistics.
          </h1>

          <p className="mt-4 max-w-lg text-sm font-light leading-relaxed text-[#87929D]">
            Indian Customs Brokerage Agency coordinating import and export clearance, freight forwarding, and multimodal transportation across sea, air, and land.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#services"
              className="inline-flex min-h-[42px] items-center gap-2 border border-[#56A6A0] bg-[#101923]/90 px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-[#DCE3E8] uppercase transition-colors duration-200 hover:bg-[#56A6A0] hover:text-[#080B10] whitespace-nowrap shrink-0 focus-visible:outline-1 focus-visible:outline-[#56A6A0]"
            >
              <span>Explore Services</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="#quote"
              className="inline-flex min-h-[42px] items-center justify-center border border-[#25313B] bg-[#080B10]/70 px-5 py-2.5 text-xs font-normal tracking-[0.14em] text-[#87929D] uppercase transition-colors duration-200 hover:border-[#56A6A0]/60 hover:text-[#DCE3E8] whitespace-nowrap shrink-0 focus-visible:outline-1 focus-visible:outline-[#56A6A0]"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#about"
        aria-label="Scroll to About Us"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] font-normal tracking-[0.22em] text-[#87929D] uppercase transition-colors hover:text-[#56A6A0]"
      >
        <span>Scroll</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </a>
    </section>
  );
}
