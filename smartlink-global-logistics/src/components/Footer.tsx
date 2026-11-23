import { COMPANY_INFO } from '../data/smartlinkData';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Global Network', href: '#global-network' },
  { label: 'Our Customers', href: '#customers' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Get a Quote', href: '#quote' },
];

const FOOTER_SERVICES = [
  { label: 'Customs Brokerage', href: '#customs-brokerage' },
  { label: 'Freight Forwarding', href: '#freight-forwarding' },
  { label: 'Air Transportation', href: '#air-transportation' },
  { label: 'Ocean Transportation', href: '#ocean-transportation' },
  { label: 'Road Transportation', href: '#road-transportation' },
  { label: 'SEZ / MEPZ Activities', href: '#sez-mepz' },
  { label: 'SVB Services', href: '#svb-services' },
  { label: 'Value Added Services', href: '#value-added-services' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#25313B] bg-[#080B10] py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-xs font-medium tracking-[0.2em] text-[#DCE3E8] uppercase">
              SmartLink <span className="text-[#56A6A0]">Global Logistics</span>
            </p>
            <p className="mt-3 max-w-sm text-xs font-light leading-relaxed text-[#87929D]">
              Indian Customs Brokerage Agency providing Customs Clearance, Transportation, Freight Forwarding and Integrated Logistics solutions.
            </p>
            <p className="mt-3 text-xs text-[#87929D]">
              Managing Partner:{' '}
              <span className="text-[#DCE3E8]">{COMPANY_INFO.managingPartner}</span>
            </p>
            <p className="mt-1.5 text-[11px] font-light text-[#87929D]">
              CHA License No. {COMPANY_INFO.licenseNumber} ({COMPANY_INFO.licenseAuthority}) — verify currency prior to publication.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] font-medium tracking-[0.18em] text-[#56A6A0] uppercase">
              Navigation
            </p>
            <ul className="mt-3 space-y-2 text-xs">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#87929D] transition-colors hover:text-[#DCE3E8]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-medium tracking-[0.18em] text-[#56A6A0] uppercase">
              Service Divisions
            </p>
            <ul className="mt-3 space-y-2 text-xs">
              {FOOTER_SERVICES.map((service) => (
                <li key={service.href}>
                  <a
                    href={service.href}
                    className="text-[#87929D] transition-colors hover:text-[#DCE3E8]"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-medium tracking-[0.18em] text-[#56A6A0] uppercase">
              Chennai Office
            </p>
            <address className="mt-3 not-italic text-xs font-light leading-relaxed text-[#87929D]">
              {COMPANY_INFO.fullAddress}
            </address>
            <div className="mt-3 space-y-1 text-xs">
              <div>
                <a
                  href="tel:+914442036894"
                  className="text-[#DCE3E8] transition-colors hover:text-[#56A6A0] tabular-nums"
                >
                  +91 44 4203 6894
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-[#56A6A0] transition-colors hover:text-[#DCE3E8]"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[#25313B] pt-5 text-[11px] text-[#87929D] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} SmartLink Global Logistics. All rights reserved.</p>
          <p>Customs Brokerage · Freight Forwarding · Integrated Logistics</p>
        </div>
      </div>
    </footer>
  );
}
