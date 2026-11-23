import { ArrowRight, Check } from 'lucide-react';
import CinematicVideo from './CinematicVideo';
import { COMPANY_INFO, SERVICES_LIST, VIDEO_CLIPS, type ServiceDivision } from '../data/smartlinkData';

function ServiceCard({ service, index }: { service: ServiceDivision; index: number }) {
  const reverse = index % 2 === 1;
  const twoColumnItems = service.items.length > 7;

  return (
    <article
      id={service.id}
      className="service-card scroll-mt-20 border border-[#25313B] bg-[#101923]/94"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Moving Mode Video Panel */}
        <div
          className={`flex flex-col justify-between border-b border-[#25313B] bg-[#080B10]/70 p-5 sm:p-6 lg:col-span-5 lg:border-b-0 ${
            reverse ? 'lg:order-2 lg:border-l' : 'lg:border-r'
          }`}
        >
          <div>
            <div className="relative aspect-video w-full overflow-hidden border border-[#25313B]">
              <CinematicVideo
                clip={service.video}
                className="h-full w-full"
                overlayClassName="bg-gradient-to-t from-[#080B10]/75 via-transparent to-transparent"
              />
            </div>
            <p className="mt-2.5 text-[11px] font-light text-[#87929D]">
              Representative mode footage · {service.subtitle}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#25313B] pt-4">
            <span className="font-display text-xs font-medium tracking-[0.16em] text-[#56A6A0] uppercase tabular-nums">
              Division {service.code}
            </span>
            <a
              href="#quote"
              className="inline-flex min-h-[38px] items-center gap-2 border border-[#56A6A0]/80 bg-[#080B10] px-4 py-1.5 text-[11px] font-medium tracking-[0.14em] text-[#DCE3E8] uppercase transition-colors hover:bg-[#56A6A0] hover:text-[#080B10] whitespace-nowrap shrink-0"
            >
              <span>Request Quote</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Detailed Service Specification */}
        <div className={`p-6 sm:p-8 lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`}>
          <p className="text-[11px] font-medium tracking-[0.2em] text-[#56A6A0] uppercase">
            {service.code} · {service.subtitle}
          </p>
          <h3 className="mt-2 font-display text-xl sm:text-2xl font-medium text-[#DCE3E8]">
            {service.title}
          </h3>
          <p className="mt-3 text-sm font-light leading-relaxed text-[#87929D]">
            {service.description}
          </p>

          <div className="mt-6 border-t border-[#25313B] pt-5">
            <p className="text-[11px] font-medium tracking-[0.18em] text-[#87929D] uppercase">
              Scope of Service
            </p>
            <ul
              className={`mt-4 grid gap-x-6 gap-y-2.5 ${
                twoColumnItems ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {service.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 border-b border-[#25313B]/65 pb-2 text-xs sm:text-[13px] text-[#DCE3E8]"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#56A6A0]" aria-hidden="true" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const primaryServices = SERVICES_LIST.filter((s) => s.group !== 'transportation');
  const transportServices = SERVICES_LIST.filter((s) => s.group === 'transportation');

  const customsBrokerage = primaryServices.find((s) => s.id === 'customs-brokerage');
  const freightForwarding = primaryServices.find((s) => s.id === 'freight-forwarding');
  const regulatoryServices = primaryServices.filter(
    (s) => s.id !== 'customs-brokerage' && s.id !== 'freight-forwarding',
  );

  return (
    <section
      id="services"
      className="relative scroll-mt-14 overflow-hidden border-t border-[#25313B] bg-[#080B10] py-24 sm:py-28"
    >
      {/* Subtle Full-Width Moving Maritime & Port Backdrop */}
      <CinematicVideo
        clip={VIDEO_CLIPS.portCranes}
        className="absolute inset-0 z-0 h-full w-full opacity-20"
        overlayClassName="bg-gradient-to-b from-[#080B10] via-[#080B10]/85 to-[#080B10]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#25313B] pb-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium tracking-[0.22em] text-[#56A6A0] uppercase">
              Our Services
            </p>
            <h2
              className="mt-2.5 font-display text-2xl sm:text-3xl font-medium leading-snug text-[#DCE3E8]"
              style={{ textWrap: 'balance' }}
            >
              Customs Brokerage, Freight Forwarding, Transportation &amp; Regulatory Services
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-light leading-relaxed text-[#87929D]">
            Dedicated divisions managing regulatory customs clearance, global air and ocean movement, India-wide haulage, SEZ/MEPZ compliance, SVB filings, and trade licensing.
          </p>
        </div>

        {/* Quick-Jump Service Directory Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-[#25313B] pb-6">
          {SERVICES_LIST.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="inline-flex items-center gap-2 border border-[#25313B] bg-[#101923]/90 px-3 py-1.5 text-[11px] font-normal tracking-[0.08em] text-[#DCE3E8] transition-colors hover:border-[#56A6A0] hover:text-[#56A6A0] whitespace-nowrap"
            >
              <span className="font-display text-[#56A6A0] tabular-nums">{service.code}</span>
              <span>{service.title}</span>
            </a>
          ))}
        </div>

        {/* Individual Detailed Service Sections */}
        <div className="mt-10 space-y-8">
          {customsBrokerage && <ServiceCard service={customsBrokerage} index={0} />}
          {freightForwarding && <ServiceCard service={freightForwarding} index={1} />}

          {/* Grouped Transportation Subsection (Air, Ocean, Road) */}
          <div id="transportation" className="scroll-mt-20 space-y-6 pt-4">
            <div className="flex flex-col justify-between gap-3 border-b border-[#25313B] pb-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] text-[#56A6A0] uppercase">
                  Multimodal Transportation
                </p>
                <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-medium text-[#DCE3E8]">
                  Air, Ocean &amp; Road Cargo Solutions
                </h3>
              </div>
              <p className="text-xs font-light text-[#87929D]">
                Coordinated global transit and India-wide inland freight movement.
              </p>
            </div>

            {transportServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx + 2} />
            ))}
          </div>

          {/* SEZ / MEPZ, SVB & Value Added Services */}
          <div className="space-y-8 pt-4">
            {regulatoryServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx + 5} />
            ))}
          </div>
        </div>

        {/* Mode Footage Clarification */}
        <p className="mt-8 border-t border-[#25313B] pt-4 text-[11px] font-light leading-relaxed text-[#87929D]">
          {COMPANY_INFO.videoDisclaimer}
        </p>
      </div>
    </section>
  );
}
