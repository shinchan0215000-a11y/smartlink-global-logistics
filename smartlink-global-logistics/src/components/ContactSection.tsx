import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import CinematicVideo from './CinematicVideo';
import OfficeGoogleMap from './OfficeGoogleMap';
import { COMPANY_INFO, CONTACT_CHANNELS, VIDEO_CLIPS } from '../data/smartlinkData';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-14 overflow-hidden border-t border-[#25313B] bg-[#080B10] py-24 sm:py-28"
    >
      {/* Subtle Dark Logistics Video Background */}
      <CinematicVideo
        clip={VIDEO_CLIPS.portVessels}
        className="absolute inset-0 z-0 h-full w-full opacity-22"
        overlayClassName="bg-gradient-to-b from-[#080B10] via-[#080B10]/82 to-[#080B10]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[#25313B] pb-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium tracking-[0.22em] text-[#56A6A0] uppercase">
              Contact Us
            </p>
            <h2
              className="mt-2.5 font-display text-2xl sm:text-3xl font-medium leading-snug text-[#DCE3E8]"
              style={{ textWrap: 'balance' }}
            >
              Chennai Operations &amp; Enquiry Desk
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-light leading-relaxed text-[#87929D]">
            Direct telephone lines for customs documentation, new business enquiries, and road transport coordination.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Address, Email & 4 Verified Telephone Cards */}
          <div className="flex flex-col justify-between gap-5 lg:col-span-6">
            <div className="border border-[#25313B] bg-[#101923]/94 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#25313B] bg-[#080B10] text-[#56A6A0]">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.18em] text-[#56A6A0] uppercase">
                    Head Office · India
                  </p>
                  <h3 className="mt-1 font-display text-base font-medium text-[#DCE3E8]">
                    {COMPANY_INFO.name}
                  </h3>
                  <address className="mt-2 not-italic text-xs sm:text-sm font-light leading-relaxed text-[#87929D]">
                    {COMPANY_INFO.addressLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </address>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#25313B] pt-4">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#56A6A0] transition-colors hover:text-[#DCE3E8]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{COMPANY_INFO.email}</span>
                </a>

                <a
                  href={COMPANY_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.12em] text-[#87929D] uppercase transition-colors hover:text-[#DCE3E8]"
                >
                  <span>Directions</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CONTACT_CHANNELS.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  className="group flex flex-col justify-between border border-[#25313B] bg-[#101923]/92 p-5 transition-colors duration-200 hover:border-[#56A6A0] focus-visible:outline-1 focus-visible:outline-[#56A6A0]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-medium tracking-[0.14em] text-[#56A6A0] uppercase">
                        {channel.label}
                      </span>
                      <Phone
                        className="h-3.5 w-3.5 shrink-0 text-[#87929D] transition-colors group-hover:text-[#56A6A0]"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-2.5 font-display text-base font-medium text-[#DCE3E8] tabular-nums">
                      {channel.number}
                    </p>
                  </div>
                  <p className="mt-2 text-xs font-light leading-relaxed text-[#87929D]">
                    {channel.description}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Dark-Themed Google Map for Parrys, Chennai */}
          <div className="flex flex-col justify-between border border-[#25313B] bg-[#101923]/94 p-6 lg:col-span-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#25313B] pb-4">
              <div>
                <p className="text-[11px] font-medium tracking-[0.18em] text-[#56A6A0] uppercase">
                  Google Map · Parrys, Chennai
                </p>
                <p className="mt-1 text-xs text-[#87929D]">
                  Thambu Chetty Street · Parrys, Chennai – 600001
                </p>
              </div>
              <span className="text-xs text-[#87929D] tabular-nums">
                13.0897° N · 80.2896° E
              </span>
            </div>

            <OfficeGoogleMap />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#87929D]">
              <span>Parrys Commercial District, Chennai – 600001</span>
              <a
                href={COMPANY_INFO.externalMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#56A6A0] underline underline-offset-4 hover:text-[#DCE3E8]"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
