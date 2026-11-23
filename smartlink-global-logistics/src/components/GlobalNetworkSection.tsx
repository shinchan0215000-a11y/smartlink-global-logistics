import { useState } from 'react';
import { Compass, Navigation } from 'lucide-react';
import CinematicVideo from './CinematicVideo';
import {
  CHENNAI_MAP_POINT,
  TRADE_CORRIDORS,
  VIDEO_CLIPS,
  type TradeCorridor,
} from '../data/smartlinkData';

// Minimalist schematic continent outlines mapped to 800x400 equirectangular viewBox
const MAP_OUTLINES = [
  // North America
  'M 40 70 L 145 55 L 220 75 L 250 115 L 210 155 L 185 185 L 155 170 L 125 140 L 80 110 Z',
  // South America
  'M 210 215 L 255 215 L 295 255 L 270 330 L 235 370 L 220 325 L 205 260 Z',
  // Europe
  'M 375 80 L 435 65 L 475 90 L 450 120 L 395 125 L 370 105 Z',
  // Africa
  'M 375 135 L 445 135 L 495 180 L 475 265 L 435 320 L 405 270 L 385 200 Z',
  // Asia & India
  'M 475 75 L 620 55 L 725 85 L 705 145 L 645 175 L 595 155 L 578 182 L 555 150 L 505 145 L 480 115 Z',
  // Australia
  'M 645 250 L 720 250 L 735 305 L 680 320 L 640 290 Z',
];

export default function GlobalNetworkSection() {
  const [selectedCorridor, setSelectedCorridor] = useState<TradeCorridor | null>(null);

  return (
    <section
      id="global-network"
      className="relative scroll-mt-14 overflow-hidden border-t border-[#25313B] bg-[#080B10] py-24 sm:py-28"
    >
      {/* Realistic Shipping Terminal & Channel Video Backdrop */}
      <CinematicVideo
        clips={[VIDEO_CLIPS.shippingChannel, VIDEO_CLIPS.portVessels]}
        cycleMs={10000}
        className="absolute inset-0 z-0 h-full w-full opacity-30"
        overlayClassName="bg-gradient-to-b from-[#080B10] via-[#080B10]/76 to-[#080B10]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[#25313B] pb-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium tracking-[0.22em] text-[#56A6A0] uppercase">
              Global Network
            </p>
            <h2
              className="mt-2.5 font-display text-2xl sm:text-3xl font-medium leading-snug text-[#DCE3E8]"
              style={{ textWrap: 'balance' }}
            >
              International Maritime &amp; Air Trade Corridors
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-light leading-relaxed text-[#87929D]">
            Coordinating import and export documentation, customs clearance, and international freight forwarding from Chennai, India across global shipping lanes.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Minimalist 2D Route Schematic Over Shipping Video */}
          <div className="flex flex-col justify-between border border-[#25313B] bg-[#101923]/88 p-5 sm:p-6 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#25313B] pb-3.5">
              <div className="flex items-center gap-2 text-xs text-[#DCE3E8]">
                <Compass className="h-3.5 w-3.5 text-[#56A6A0]" aria-hidden="true" />
                <span>Origin Coordination Hub: Chennai, India</span>
              </div>
              <span className="text-[11px] text-[#87929D] tabular-nums">
                13.0897° N · 80.2896° E
              </span>
            </div>

            <div className="relative mt-4 aspect-[2/1] w-full overflow-hidden border border-[#25313B] bg-[#080B10]/75">
              <svg
                viewBox="0 0 800 400"
                className="h-full w-full"
                role="img"
                aria-label="Minimalist schematic of international shipping corridors radiating from Chennai, India"
              >
                {/* Hairline Coordinate Grid */}
                <g stroke="#25313B" strokeWidth="0.6" opacity="0.65">
                  {[80, 160, 240, 320].map((y) => (
                    <line key={`h-${y}`} x1="0" y1={y} x2="800" y2={y} />
                  ))}
                  {[160, 320, 480, 640].map((x) => (
                    <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="400" />
                  ))}
                </g>

                {/* Stylized Landmasses */}
                <g fill="#101923" stroke="#25313B" strokeWidth="1">
                  {MAP_OUTLINES.map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </g>

                {/* Curved Animated Trade Route Lines */}
                {TRADE_CORRIDORS.map((corridor) => {
                  const isActive = selectedCorridor?.id === corridor.id;
                  const midX = (CHENNAI_MAP_POINT.x + corridor.svgX) * 0.5;
                  const midY = Math.min(CHENNAI_MAP_POINT.y, corridor.svgY) - 48;
                  const pathD = `M ${CHENNAI_MAP_POINT.x} ${CHENNAI_MAP_POINT.y} Q ${midX} ${midY} ${corridor.svgX} ${corridor.svgY}`;

                  return (
                    <g key={corridor.id}>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={isActive ? '#56A6A0' : '#25313B'}
                        strokeWidth={isActive ? 1.8 : 1.2}
                      />
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#56A6A0"
                        strokeWidth={isActive ? 1.8 : 1.1}
                        strokeDasharray="4 8"
                        opacity={isActive || !selectedCorridor ? 0.9 : 0.25}
                        className="animate-route-dash"
                      />
                      <circle
                        cx={corridor.svgX}
                        cy={corridor.svgY}
                        r={isActive ? 5.5 : 4}
                        fill={isActive ? '#DCE3E8' : '#56A6A0'}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select ${corridor.name}`}
                        aria-pressed={isActive}
                        className="cursor-pointer transition-all focus:outline-none focus-visible:stroke-[#DCE3E8] focus-visible:stroke-2"
                        onClick={() => setSelectedCorridor(isActive ? null : corridor)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedCorridor(isActive ? null : corridor);
                          }
                        }}
                      />
                    </g>
                  );
                })}

                {/* Chennai Origin Marker */}
                <g transform={`translate(${CHENNAI_MAP_POINT.x}, ${CHENNAI_MAP_POINT.y})`}>
                  <circle r="10" fill="#56A6A0" opacity="0.2" />
                  <circle r="4" fill="#DCE3E8" stroke="#56A6A0" strokeWidth="1.5" />
                  <text
                    x="10"
                    y="4"
                    fill="#DCE3E8"
                    fontSize="10"
                    fontFamily="Space Grotesk, sans-serif"
                    letterSpacing="1.2"
                  >
                    CHENNAI
                  </text>
                </g>
              </svg>
            </div>

            {/* Bottom Corridor Selector Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCorridor(null)}
                className={`border px-3 py-1.5 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedCorridor === null
                    ? 'border-[#56A6A0] bg-[#56A6A0] text-[#080B10]'
                    : 'border-[#25313B] bg-[#080B10] text-[#87929D] hover:text-[#DCE3E8]'
                }`}
              >
                All Corridors
              </button>
              {TRADE_CORRIDORS.map((corridor) => {
                const active = selectedCorridor?.id === corridor.id;
                return (
                  <button
                    key={corridor.id}
                    type="button"
                    onClick={() => setSelectedCorridor(corridor)}
                    className={`border px-3 py-1.5 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'border-[#56A6A0] bg-[#56A6A0] text-[#080B10]'
                        : 'border-[#25313B] bg-[#080B10] text-[#87929D] hover:text-[#DCE3E8]'
                    }`}
                  >
                    {corridor.name.replace(' Corridor', '').replace(' Lane', '').replace(' Route', '').replace(' Gateway', '')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Corridor Summary */}
          <div className="flex flex-col justify-between border border-[#25313B] bg-[#101923]/92 p-6 lg:col-span-4">
            <div>
              <p className="text-[11px] font-medium tracking-[0.2em] text-[#56A6A0] uppercase">
                {selectedCorridor ? 'Selected Corridor' : 'Trade Lane Summary'}
              </p>

              {selectedCorridor ? (
                <div className="mt-3 border-b border-[#25313B] pb-5">
                  <h3 className="font-display text-lg font-medium text-[#DCE3E8]">
                    {selectedCorridor.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#56A6A0]">{selectedCorridor.mode}</p>
                  <p className="mt-3 text-xs font-light leading-relaxed text-[#87929D]">
                    {selectedCorridor.summary}
                  </p>
                </div>
              ) : (
                <p className="mt-3 border-b border-[#25313B] pb-5 text-xs font-light leading-relaxed text-[#87929D]">
                  Select any international trade lane on the route schematic or list below to review freight and customs coordination coverage.
                </p>
              )}

              <div className="mt-5 space-y-2">
                {TRADE_CORRIDORS.map((corridor) => {
                  const active = selectedCorridor?.id === corridor.id;
                  return (
                    <button
                      key={corridor.id}
                      type="button"
                      onClick={() => setSelectedCorridor(active ? null : corridor)}
                      className={`flex w-full items-center justify-between border px-3.5 py-2.5 text-left text-xs transition-colors ${
                        active
                          ? 'border-[#56A6A0] bg-[#080B10] text-[#DCE3E8]'
                          : 'border-[#25313B] bg-[#080B10]/55 text-[#87929D] hover:border-[#56A6A0]/50 hover:text-[#DCE3E8]'
                      }`}
                    >
                      <span>{corridor.name}</span>
                      <Navigation className="h-3.5 w-3.5 shrink-0 text-[#56A6A0]" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-6 text-[11px] font-light leading-relaxed text-[#87929D]">
              SmartLink Global Logistics operates from its Chennai headquarters, coordinating international freight shipments across sea and air routes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
