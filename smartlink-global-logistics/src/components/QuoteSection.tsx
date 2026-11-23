import { useState, type FormEvent } from 'react';
import { AlertCircle, Check, CheckCircle2, Copy, Info, Mail, Send } from 'lucide-react';

interface QuoteFormState {
  companyName: string;
  contactName: string;
  email: string;
  telephone: string;
  shipmentType: 'Import' | 'Export';
  origin: string;
  destination: string;
  modeOfTransport: 'Air' | 'Sea';
  packages: string;
  weightKg: string;
  measurementCubic: string;
  commodity: string;
  value: string;
  customsClearance: 'Required' | 'Not Required';
  specialInstructions: string;
}

const INITIAL_STATE: QuoteFormState = {
  companyName: '',
  contactName: '',
  email: '',
  telephone: '',
  shipmentType: 'Import',
  origin: '',
  destination: '',
  modeOfTransport: 'Sea',
  packages: '',
  weightKg: '',
  measurementCubic: '',
  commodity: '',
  value: '',
  customsClearance: 'Required',
  specialInstructions: '',
};

interface SubmitResult {
  ok: boolean;
  emailed?: boolean;
  referenceId?: string;
  mailtoUrl?: string;
  message: string;
}

export default function QuoteSection() {
  const [form, setForm] = useState<QuoteFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [copied, setCopied] = useState(false);

  const updateField = <K extends keyof QuoteFormState>(key: K, value: QuoteFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validateClient = (): boolean => {
    const nextErrors: Partial<Record<keyof QuoteFormState, string>> = {};
    if (!form.companyName.trim()) nextErrors.companyName = 'Company Name is required.';
    if (!form.contactName.trim()) nextErrors.contactName = 'Contact Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    const phoneDigits = form.telephone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 7) {
      nextErrors.telephone = 'Please enter a valid telephone number.';
    }
    if (!form.origin.trim()) nextErrors.origin = 'Origin port or city is required.';
    if (!form.destination.trim()) nextErrors.destination = 'Destination port or city is required.';
    if (!form.packages.trim()) nextErrors.packages = 'Number or type of packages is required.';
    if (!form.weightKg.trim()) nextErrors.weightKg = 'Weight (kg) is required.';
    if (!form.commodity.trim()) nextErrors.commodity = 'Commodity description is required.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setResult(null);
    if (!validateClient()) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        emailed?: boolean;
        referenceId?: string;
        mailtoUrl?: string;
        message?: string;
        error?: string;
        errors?: Partial<Record<keyof QuoteFormState, string>>;
      };

      if (!response.ok || !payload.ok) {
        if (payload.errors) setErrors(payload.errors);
        setResult({
          ok: false,
          message: payload.error || 'Please review the highlighted fields and try again.',
        });
        return;
      }

      setResult({
        ok: true,
        emailed: payload.emailed,
        referenceId: payload.referenceId,
        mailtoUrl: payload.mailtoUrl,
        message:
          payload.message ||
          'Enquiry validated. Connect with our team via email or telephone to finalize booking.',
      });
      if (payload.emailed) {
        setForm(INITIAL_STATE);
      }
    } catch {
      setResult({
        ok: false,
        message:
          'Unable to reach the enquiry server. Please email info@smartlinkglobal.in or call +91 98418 96000.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    'mt-2 w-full border border-[#25313B] bg-[#080B10] px-3.5 py-2.5 text-sm text-[#DCE3E8] placeholder:text-[#87929D]/55 transition-colors focus:border-[#56A6A0] focus:outline-none';

  const labelBase =
    'block text-[11px] font-medium tracking-[0.12em] text-[#87929D] uppercase';

  const handleCopySummary = async () => {
    const lines = [
      result?.referenceId ? `Reference ID: ${result.referenceId}` : null,
      `Company Name: ${form.companyName}`,
      `Contact Name: ${form.contactName}`,
      `Email: ${form.email}`,
      `Telephone Number: ${form.telephone}`,
      `Shipment Type: ${form.shipmentType}`,
      `Mode of Transport: ${form.modeOfTransport}`,
      `Origin: ${form.origin}`,
      `Destination: ${form.destination}`,
      `Packages: ${form.packages}`,
      `Weight (kg): ${form.weightKg}`,
      `Measurement (Cubic): ${form.measurementCubic || 'Not specified'}`,
      `Commodity: ${form.commodity}`,
      `Value: ${form.value || 'Not specified'}`,
      `Customs Clearance: ${form.customsClearance}`,
      `Special Instructions: ${form.specialInstructions || 'None'}`,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(lines);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="quote"
      className="scroll-mt-14 border-t border-[#25313B] bg-[#080B10] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="border-b border-[#25313B] pb-6">
          <p className="text-[11px] font-medium tracking-[0.22em] text-[#56A6A0] uppercase">
            Get a Quote
          </p>
          <h2
            className="mt-2.5 font-display text-2xl sm:text-3xl font-medium leading-snug text-[#DCE3E8]"
            style={{ textWrap: 'balance' }}
          >
            Shipment &amp; Customs Clearance Enquiry
          </h2>
          <p className="mt-2.5 max-w-2xl text-xs sm:text-sm font-light leading-relaxed text-[#87929D]">
            Complete the shipment details below for import, export, air or sea freight forwarding, and customs brokerage coordination. Fields marked with{' '}
            <span className="text-[#56A6A0]">*</span> are required.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 border border-[#25313B] bg-[#101923] p-6 sm:p-9"
        >
          {/* Group 1 */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="companyName" className={labelBase}>
                1. Company Name <span className="text-[#56A6A0]">*</span>
              </label>
              <input
                id="companyName"
                type="text"
                required
                value={form.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                placeholder="Enter registered company name"
                className={inputBase}
              />
              {errors.companyName && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.companyName}</p>
              )}
            </div>

            <div>
              <label htmlFor="contactName" className={labelBase}>
                2. Contact Name <span className="text-[#56A6A0]">*</span>
              </label>
              <input
                id="contactName"
                type="text"
                required
                value={form.contactName}
                onChange={(e) => updateField('contactName', e.target.value)}
                placeholder="Full name"
                className={inputBase}
              />
              {errors.contactName && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.contactName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelBase}>
                3. Email <span className="text-[#56A6A0]">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="name@company.com"
                className={inputBase}
              />
              {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="telephone" className={labelBase}>
                4. Telephone Number <span className="text-[#56A6A0]">*</span>
              </label>
              <input
                id="telephone"
                type="tel"
                required
                value={form.telephone}
                onChange={(e) => updateField('telephone', e.target.value)}
                placeholder="+91 98418 96000"
                className={inputBase}
              />
              {errors.telephone && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.telephone}</p>
              )}
            </div>
          </div>

          {/* Group 2 */}
          <div className="mt-7 grid grid-cols-1 gap-5 border-t border-[#25313B] pt-7 sm:grid-cols-2">
            <div>
              <span className={labelBase}>
                5. Shipment Type <span className="text-[#56A6A0]">*</span>
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(['Import', 'Export'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateField('shipmentType', type)}
                    className={`min-h-[40px] border px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors ${
                      form.shipmentType === type
                        ? 'border-[#56A6A0] bg-[#56A6A0] text-[#080B10]'
                        : 'border-[#25313B] bg-[#080B10] text-[#87929D] hover:border-[#56A6A0]/60 hover:text-[#DCE3E8]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className={labelBase}>
                8. Mode of Transport <span className="text-[#56A6A0]">*</span>
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(['Air', 'Sea'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updateField('modeOfTransport', mode)}
                    className={`min-h-[40px] border px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors ${
                      form.modeOfTransport === mode
                        ? 'border-[#56A6A0] bg-[#56A6A0] text-[#080B10]'
                        : 'border-[#25313B] bg-[#080B10] text-[#87929D] hover:border-[#56A6A0]/60 hover:text-[#DCE3E8]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="origin" className={labelBase}>
                6. Origin <span className="text-[#56A6A0]">*</span>
              </label>
              <input
                id="origin"
                type="text"
                required
                value={form.origin}
                onChange={(e) => updateField('origin', e.target.value)}
                placeholder="Origin port, airport, or city"
                className={inputBase}
              />
              {errors.origin && <p className="mt-1.5 text-xs text-rose-400">{errors.origin}</p>}
            </div>

            <div>
              <label htmlFor="destination" className={labelBase}>
                7. Destination <span className="text-[#56A6A0]">*</span>
              </label>
              <input
                id="destination"
                type="text"
                required
                value={form.destination}
                onChange={(e) => updateField('destination', e.target.value)}
                placeholder="Destination port, airport, or city"
                className={inputBase}
              />
              {errors.destination && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.destination}</p>
              )}
            </div>
          </div>

          {/* Group 3 */}
          <div className="mt-7 grid grid-cols-1 gap-5 border-t border-[#25313B] pt-7 sm:grid-cols-3">
            <div>
              <label htmlFor="packages" className={labelBase}>
                9. Packages <span className="text-[#56A6A0]">*</span>
              </label>
              <input
                id="packages"
                type="text"
                required
                value={form.packages}
                onChange={(e) => updateField('packages', e.target.value)}
                placeholder="e.g., 12 Pallets / 1x40ft FCL"
                className={inputBase}
              />
              {errors.packages && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.packages}</p>
              )}
            </div>

            <div>
              <label htmlFor="weightKg" className={labelBase}>
                10. Weight (kg) <span className="text-[#56A6A0]">*</span>
              </label>
              <input
                id="weightKg"
                type="text"
                required
                value={form.weightKg}
                onChange={(e) => updateField('weightKg', e.target.value)}
                placeholder="Gross weight in kg"
                className={inputBase}
              />
              {errors.weightKg && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.weightKg}</p>
              )}
            </div>

            <div>
              <label htmlFor="measurementCubic" className={labelBase}>
                11. Measurement (Cubic)
              </label>
              <input
                id="measurementCubic"
                type="text"
                value={form.measurementCubic}
                onChange={(e) => updateField('measurementCubic', e.target.value)}
                placeholder="CBM / Dimensions"
                className={inputBase}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="commodity" className={labelBase}>
                12. Commodity <span className="text-[#56A6A0]">*</span>
              </label>
              <input
                id="commodity"
                type="text"
                required
                value={form.commodity}
                onChange={(e) => updateField('commodity', e.target.value)}
                placeholder="Goods description / HS classification if known"
                className={inputBase}
              />
              {errors.commodity && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.commodity}</p>
              )}
            </div>

            <div>
              <label htmlFor="value" className={labelBase}>
                13. Value
              </label>
              <input
                id="value"
                type="text"
                value={form.value}
                onChange={(e) => updateField('value', e.target.value)}
                placeholder="Invoice value & currency"
                className={inputBase}
              />
            </div>
          </div>

          {/* Group 4 */}
          <div className="mt-7 grid grid-cols-1 gap-5 border-t border-[#25313B] pt-7">
            <div>
              <span className={labelBase}>
                14. Customs Clearance <span className="text-[#56A6A0]">*</span>
              </span>
              <div className="mt-2 grid max-w-md grid-cols-2 gap-3">
                {(['Required', 'Not Required'] as const).map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => updateField('customsClearance', choice)}
                    className={`min-h-[40px] border px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors ${
                      form.customsClearance === choice
                        ? 'border-[#56A6A0] bg-[#56A6A0] text-[#080B10]'
                        : 'border-[#25313B] bg-[#080B10] text-[#87929D] hover:border-[#56A6A0]/60 hover:text-[#DCE3E8]'
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="specialInstructions" className={labelBase}>
                15. Special Instructions
              </label>
              <textarea
                id="specialInstructions"
                rows={4}
                value={form.specialInstructions}
                onChange={(e) => updateField('specialInstructions', e.target.value)}
                placeholder="Specify SEZ/MEPZ, SVB, DGFT/EPCG, fumigation, over-dimensional dimensions, or delivery notes."
                className={inputBase}
              />
            </div>
          </div>

          {/* Status Message Banner */}
          {result && (
            <div
              role="status"
              aria-live="polite"
              className={`mt-6 border p-5 ${
                !result.ok
                  ? 'border-rose-500/50 bg-rose-950/30 text-rose-200'
                  : result.emailed
                    ? 'border-[#56A6A0]/70 bg-[#080B10] text-[#DCE3E8]'
                    : 'border-amber-500/45 bg-[#080B10] text-[#DCE3E8]'
              }`}
            >
              <div className="flex items-start gap-3">
                {!result.ok ? (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                ) : result.emailed ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#56A6A0]" />
                ) : (
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                )}
                <div className="flex-1">
                  <p
                    className={`font-display text-xs font-medium tracking-[0.14em] uppercase tabular-nums ${
                      !result.ok
                        ? 'text-rose-300'
                        : result.emailed
                          ? 'text-[#56A6A0]'
                          : 'text-amber-300'
                    }`}
                  >
                    {!result.ok
                      ? 'Validation Required'
                      : result.emailed
                        ? `Quote Request Delivered${result.referenceId ? ` · ${result.referenceId}` : ''}`
                        : `Enquiry Validated — Email Delivery Not Configured${result.referenceId ? ` · ${result.referenceId}` : ''}`}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm font-light leading-relaxed text-[#DCE3E8]">
                    {result.message}
                  </p>

                  {result.ok && result.emailed === false && result.mailtoUrl && (
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <a
                        href={result.mailtoUrl}
                        className="inline-flex min-h-[38px] items-center gap-2 border border-[#56A6A0] bg-[#56A6A0] px-4 py-2 text-xs font-medium tracking-[0.12em] text-[#080B10] uppercase transition-colors hover:bg-[#56A6A0]/90"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span>Send via Email Client</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex min-h-[38px] items-center gap-2 border border-[#25313B] bg-[#101923] px-4 py-2 text-xs font-normal tracking-[0.1em] text-[#DCE3E8] uppercase transition-colors hover:border-[#56A6A0]"
                      >
                        {copied ? <Check className="h-3.5 w-3.5 text-[#56A6A0]" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copied ? 'Summary Copied' : 'Copy Enquiry Summary'}</span>
                      </button>
                      <span className="text-xs text-[#87929D]">
                        Or call Business Enquiry:{' '}
                        <a href="tel:+919841896000" className="text-[#56A6A0] underline">
                          +91 98418 96000
                        </a>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit Row */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#25313B] pt-6">
            <p className="text-xs font-light text-[#87929D]">
              All enquiries are reviewed directly by our Chennai customs and freight coordination desk.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[42px] items-center gap-2 border border-[#56A6A0] bg-[#56A6A0] px-6 py-2.5 text-xs font-medium tracking-[0.14em] text-[#080B10] uppercase transition-colors hover:bg-[#56A6A0]/90 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{submitting ? 'Submitting...' : 'Submit Quote Request'}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
