import { ArrowRight } from 'lucide-react';
import { CUSTOMER_SECTORS } from '../data/smartlinkData';

export default function CustomersSection() {
  return (
    <section
      id="customers"
      className="scroll-mt-14 border-t border-[#25313B] bg-[#080B10] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-6 border-b border-[#25313B] pb-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-medium tracking-[0.22em] text-[#56A6A0] uppercase">
              Our Customers
            </p>
            <h2
              className="mt-2.5 font-display text-2xl sm:text-3xl font-medium leading-snug text-[#DCE3E8]"
              style={{ textWrap: 'balance' }}
            >
              Tailored Support Across Import &amp; Export Sectors
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm font-light leading-relaxed text-[#87929D]">
              We align documentation coordination, customs clearance, and inland transport around each client&apos;s commodities and regulatory framework while keeping individual client names confidential.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {CUSTOMER_SECTORS.map((sector) => (
            <div
              key={sector.code}
              className="sector-item flex flex-col justify-between border border-[#25313B] bg-[#101923] p-6 transition-colors duration-200 hover:border-[#56A6A0]/60"
            >
              <div>
                <p className="font-display text-xs font-medium tracking-[0.18em] text-[#56A6A0]">
                  {sector.code}
                </p>
                <h3 className="mt-2.5 font-display text-base sm:text-lg font-medium text-[#DCE3E8]">
                  {sector.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm font-light leading-relaxed text-[#87929D]">
                  {sector.scope}
                </p>
              </div>

              <div className="mt-5 border-t border-[#25313B] pt-4">
                <a
                  href="#quote"
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.14em] text-[#56A6A0] uppercase transition-colors hover:text-[#DCE3E8]"
                >
                  <span>Enquire for Sector</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
