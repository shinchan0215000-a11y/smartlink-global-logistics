import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
];

const SERVICE_NAV_LINKS = [
  { label: 'All Services Overview', href: '#services' },
  { label: 'Customs Brokerage', href: '#customs-brokerage' },
  { label: 'Freight Forwarding', href: '#freight-forwarding' },
  { label: 'Air Transportation', href: '#air-transportation' },
  { label: 'Ocean Transportation', href: '#ocean-transportation' },
  { label: 'Road Transportation', href: '#road-transportation' },
  { label: 'SEZ / MEPZ Activities', href: '#sez-mepz' },
  { label: 'SVB Services', href: '#svb-services' },
  { label: 'Value Added Services', href: '#value-added-services' },
];

const TRAILING_LINKS = [
  { label: 'Customers', href: '#customers' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutsideClick);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-[#25313B] bg-[#080B10]/95'
          : 'border-b border-white/5 bg-[#080B10]/65'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-xs font-medium tracking-[0.2em] text-[#DCE3E8] uppercase whitespace-nowrap shrink-0 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#56A6A0]"
        >
          SmartLink <span className="text-[#56A6A0]">Global Logistics</span>
        </a>

        {/* Zone 2: Single-Line Navigation + Services Dropdown */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-4 xl:gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-xs font-normal tracking-[0.1em] text-[#87929D] uppercase transition-colors duration-200 hover:text-[#DCE3E8] whitespace-nowrap shrink-0 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#56A6A0]"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[1px] origin-left scale-x-0 bg-[#56A6A0] transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}

          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              onClick={() => setServicesOpen((prev) => !prev)}
              className="group inline-flex items-center gap-1 py-1 text-xs font-normal tracking-[0.1em] text-[#87929D] uppercase transition-colors duration-200 hover:text-[#DCE3E8] whitespace-nowrap shrink-0 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#56A6A0]"
            >
              <span>Our Services</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-[#56A6A0] transition-transform duration-200 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {servicesOpen && (
              <div
                role="menu"
                aria-label="Service Sections"
                className="absolute left-0 top-full w-64 border border-[#25313B] bg-[#080B10] py-1.5 shadow-xl"
              >
                {SERVICE_NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    role="menuitem"
                    href={item.href}
                    onClick={() => setServicesOpen(false)}
                    className="block border-b border-[#25313B]/40 px-4 py-2 text-[11px] font-normal tracking-[0.08em] text-[#87929D] uppercase transition-colors last:border-b-0 hover:bg-[#101923] hover:text-[#DCE3E8]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="#global-network"
            className="group relative py-1 text-xs font-normal tracking-[0.1em] text-[#87929D] uppercase transition-colors duration-200 hover:text-[#DCE3E8] whitespace-nowrap shrink-0 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#56A6A0]"
          >
            Global Network
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[1px] origin-left scale-x-0 bg-[#56A6A0] transition-transform duration-200 group-hover:scale-x-100"
            />
          </a>

          {TRAILING_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-xs font-normal tracking-[0.1em] text-[#87929D] uppercase transition-colors duration-200 hover:text-[#DCE3E8] whitespace-nowrap shrink-0 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#56A6A0]"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[1px] origin-left scale-x-0 bg-[#56A6A0] transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Quote Action & Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#quote"
            className="hidden sm:inline-flex items-center justify-center border border-[#56A6A0]/75 bg-[#101923]/85 px-4 py-1.5 text-[11px] font-medium tracking-[0.14em] text-[#DCE3E8] uppercase transition-colors duration-200 hover:bg-[#56A6A0] hover:text-[#080B10] whitespace-nowrap shrink-0 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#56A6A0]"
          >
            Get a Quote
          </a>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center border border-[#25313B] bg-[#101923] text-[#DCE3E8] lg:hidden focus-visible:outline-1 focus-visible:outline-[#56A6A0]"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="max-h-[82vh] overflow-y-auto border-t border-[#25313B] bg-[#080B10]/98 px-6 py-4 lg:hidden"
        >
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[42px] items-center border-b border-[#25313B]/60 text-xs font-normal tracking-[0.14em] text-[#DCE3E8] uppercase transition-colors hover:text-[#56A6A0]"
              >
                {link.label}
              </a>
            ))}

            <div className="border-b border-[#25313B]/60 py-2">
              <p className="py-1 text-[10px] font-medium tracking-[0.18em] text-[#56A6A0] uppercase">
                Our Services
              </p>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {SERVICE_NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-[36px] items-center text-[11px] font-light tracking-[0.1em] text-[#87929D] uppercase hover:text-[#DCE3E8]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#global-network"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[42px] items-center border-b border-[#25313B]/60 text-xs font-normal tracking-[0.14em] text-[#DCE3E8] uppercase transition-colors hover:text-[#56A6A0]"
            >
              Global Network
            </a>

            {TRAILING_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[42px] items-center border-b border-[#25313B]/60 text-xs font-normal tracking-[0.14em] text-[#DCE3E8] uppercase transition-colors hover:text-[#56A6A0]"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#quote"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center border border-[#56A6A0] bg-[#101923] px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-[#DCE3E8] uppercase"
            >
              Get a Quote
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
