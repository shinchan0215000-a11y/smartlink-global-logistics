import { AlertCircle, Check } from 'lucide-react';
import CinematicVideo from './CinematicVideo';
import { ABOUT_CONTENT, COMPANY_INFO, VIDEO_CLIPS } from '../data/smartlinkData';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-14 overflow-hidden border-t border-[#25313B] bg-[#080B10] py-24 sm:py-28"
    >
      {/* Real Moving Warehouse & Logistics Video Background */}
      <CinematicVideo
        clips={[VIDEO_CLIPS.warehouseDocks, VIDEO_CLIPS.warehouseInterior]}
        cycleMs={10000}
        className="absolute inset-0 z-0 h-full w-full opacity-35"
        overlayClassName="bg-gradient-to-b from-[#080B10] via-[#080B10]/74 to-[#080B10]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Warehouse Video Monitor, Managing Partner & License Advisory */}
          <div className="about-reveal flex flex-col justify-between border border-[#25313B] bg-[#101923]/94 p-6 sm:p-7 lg:col-span-5">
            <div>
              <div className="relative aspect-video w-full overflow-hidden border border-[#25313B]">
                <CinematicVideo
                  clip={VIDEO_CLIPS.warehouseInterior}
                  className="h-full w-full"
                  overlayClassName="bg-gradient-to-t from-[#080B10]/75 via-transparent to-transparent"
                />
              </div>
              <p className="mt-2 text-[11px] font-light text-[#87929D]">
                Illustrative cargo staging and warehouse handling operations.
              </p>

              <div className="mt-6 border-t border-[#25313B] pt-5">
                <p className="text-[11px] font-medium tracking-[0.2em] text-[#56A6A0] uppercase">
                  Leadership
                </p>
                <h3 className="mt-1.5 font-display text-lg font-medium text-[#DCE3E8]">
                  {COMPANY_INFO.managingPartner}
                </h3>
                <p className="mt-0.5 text-xs text-[#87929D]">
                  Managing Partner · {COMPANY_INFO.name}
                </p>
              </div>

              {/* Reference License No. R-247/13 + Required Verification Note */}
              <div className="mt-5 border border-[#25313B] bg-[#080B10]/85 p-4">
                <p className="text-[10px] font-medium tracking-[0.18em] text-[#56A6A0] uppercase">
                  Customs House Agency Reference
                </p>
                <p className="mt-1.5 font-display text-sm font-medium text-[#DCE3E8]">
                  License No. {COMPANY_INFO.licenseNumber}
                </p>
                <p className="mt-0.5 text-xs text-[#87929D]">
                  Issued by {COMPANY_INFO.licenseAuthority}
                </p>
                <div className="mt-3 flex items-start gap-2 border-t border-[#25313B] pt-2.5 text-[11px] font-light leading-relaxed text-[#87929D]">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#56A6A0]" aria-hidden="true" />
                  <span>{COMPANY_INFO.licenseVerificationNote}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-[#25313B] pt-4 text-xs text-[#87929D]">
              <span>Sea Clearance</span>
              <span aria-hidden="true" className="mx-2 text-[#25313B]">
                ·
              </span>
              <span>Air Cargo</span>
              <span aria-hidden="true" className="mx-2 text-[#25313B]">
                ·
              </span>
              <span>Land Transport</span>
            </div>
          </div>

          {/* Right Column: Company Overview, Core Capabilities & Commitment */}
          <div className="flex flex-col justify-between border border-[#25313B] bg-[#080B10]/90 p-6 sm:p-8 lg:col-span-7">
            <div className="about-reveal">
              <p className="text-[11px] font-medium tracking-[0.22em] text-[#56A6A0] uppercase">
                About Us
              </p>
              <h2
                className="mt-3 font-display text-2xl sm:text-3xl font-medium leading-snug text-[#DCE3E8]"
                style={{ textWrap: 'balance' }}
              >
                Indian Customs Brokerage, Freight Forwarding &amp; Integrated Logistics
              </h2>

              <p className="mt-4 text-sm sm:text-[15px] font-normal leading-relaxed text-[#DCE3E8]">
                {ABOUT_CONTENT.lead}
              </p>
              <p className="mt-3 text-sm font-light leading-relaxed text-[#87929D]">
                {ABOUT_CONTENT.summary}
              </p>

              <ul className="mt-6 divide-y divide-[#25313B] border-y border-[#25313B]">
                {ABOUT_CONTENT.operationalPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 py-3 text-xs sm:text-[13px] text-[#DCE3E8]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#56A6A0]" aria-hidden="true" />
                    <span className="font-light leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Commitment Block */}
            <div className="about-reveal mt-8 border-t border-[#25313B] pt-6">
              <p className="text-[11px] font-medium tracking-[0.2em] text-[#56A6A0] uppercase">
                Our Commitment
              </p>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {ABOUT_CONTENT.commitments.map((item) => (
                  <div key={item.index} className="border border-[#25313B] bg-[#101923]/75 p-4">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display text-xs font-medium text-[#56A6A0] tabular-nums">
                        {item.index}
                      </span>
                      <h3 className="font-display text-sm font-medium text-[#DCE3E8]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-xs font-light leading-relaxed text-[#87929D]">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
