import type { Metadata } from 'next';
import { PageHero, SectionHeader, IconCard, ChipList } from '@/components/ui/page';
import { getStoreSettings } from '@/lib/store-settings';

export const metadata: Metadata = {
  title: 'Shipping & Delivery',
  description: 'Novalis Perfumes shipping and delivery information. Free delivery across UAE and GCC countries.',
  alternates: { canonical: '/shipping' },
};

const BoltIcon = (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);
const BoxIcon = (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
);
const GlobeIcon = (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" /></svg>
);

const STEPS = [
  { step: '01', title: 'Order placed', description: 'You place your order online with secure Ziina payment.' },
  { step: '02', title: 'Packaged with care', description: 'Each fragrance is hand-packed in our Dubai workshop.' },
  { step: '03', title: 'On its way', description: 'Dispatched within 24 hours on business days.' },
  { step: '04', title: 'Enjoy', description: 'Delivered to your door. Unbox and experience your scent.' },
];

const AREAS = [
  { group: 'UAE Emirates', items: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'] },
  { group: 'GCC Countries', items: ['Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'] },
  { group: 'International', items: ['United Kingdom', 'United States', 'Canada', 'Australia'] },
];

const INTL_RATES = {
  weights: ['0.5 kg', '1.0 kg', '1.5 kg', '2.0 kg', '2.5 kg', '3.0 kg'],
  destinations: [
    { name: 'GCC', note: 'SA · KW · QA · BH · OM', rates: [39, 45, 53, 59, 65, 70] },
    { name: 'United Kingdom', note: null, rates: [70, 97, 115, 132, 163, 173] },
    { name: 'United States', note: null, rates: [83, 122, 156, 190, 225, 247] },
    { name: 'Canada', note: null, rates: [83, 122, 156, 190, 225, 247] },
    { name: 'Australia', note: null, rates: [92, 125, 161, 198, 234, 249] },
  ],
} as const;

export default async function ShippingPage() {
  const { currency } = await getStoreSettings();

  const options = [
    { key: 'express', title: 'UAE Express Delivery', badge: '2-4 days', description: 'Express shipping inside the UAE, including all seven emirates.', price: `Free on orders over ${currency} 100`, isFree: true, accent: '#742938', icon: BoltIcon },
    { key: 'gcc', title: 'GCC Delivery', badge: '5-10 days', description: 'Delivery to Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman.', price: 'Calculated at checkout', isFree: false, accent: '#8a3648', icon: BoxIcon },
    { key: 'intl', title: 'International Shipping', badge: 'On request', description: 'Select international destinations worldwide. Contact us for availability.', price: 'Calculated at checkout', isFree: false, accent: '#D4AFB9', icon: GlobeIcon },
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <PageHero
        breadcrumb="Shipping"
        eyebrow="Fast · Tracked · Secure"
        title={<>Shipping &amp; <span className="italic text-[#D4AFB9]">Delivery</span></>}
        subtitle="We deliver across the UAE and all GCC countries with express service from our Dubai workshop."
        patternOrigin="70% 30%"
      />

      {/* Delivery Options */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 max-md:-mt-8 relative z-10 mb-12 max-md:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-md:gap-3">
          {options.map((opt) => (
            <IconCard key={opt.key} icon={opt.icon} title={opt.title} description={opt.description} accent={opt.accent} badge={opt.badge}>
              <div className="pt-4 mt-4 border-t border-[#E8E4DE]">
                <span className={`text-xs font-semibold tracking-[0.1em] uppercase ${opt.isFree ? 'text-[#1B4332]' : 'text-[#121212]/70'}`}>
                  {opt.price}
                </span>
              </div>
            </IconCard>
          ))}
        </div>
      </section>

      {/* Delivery Process */}
      <section className="max-w-6xl mx-auto px-6 mb-12 max-md:mb-8">
        <SectionHeader
          eyebrow="How it works"
          title={<>From order to <span className="italic text-[#742938]">your door</span></>}
          className="mb-10 max-md:mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-md:gap-3">
          {STEPS.map((s) => (
            <div key={s.step} className="relative bg-white border border-[#E8E4DE] p-6 max-md:p-5">
              <span className="text-4xl font-serif italic text-[#D4AFB9]/50 leading-none">{s.step}</span>
              <h3 className="text-base font-serif font-semibold text-[#121212] mt-3 mb-2">{s.title}</h3>
              <p className="text-sm text-[#121212]/60 font-light leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas */}
      <section className="max-w-6xl mx-auto px-6 mb-12 max-md:mb-8">
        <div className="bg-white border border-[#E8E4DE] p-8 max-md:p-5">
          <SectionHeader
            eyebrow="Coverage"
            title={<>Delivery <span className="italic text-[#742938]">Areas</span></>}
            className="mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AREAS.map((group) => (
              <div key={group.group}>
                <h3 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#742938] mb-3">{group.group}</h3>
                <ChipList items={group.items} />
              </div>
            ))}
          </div>
          <p className="text-xs text-[#121212]/50 mt-6 font-light text-center">
            Don&apos;t see your location? <a href="https://wa.me/971563554303" className="text-[#742938] font-semibold hover:underline">Contact us</a> — we may deliver there too.
          </p>
        </div>
      </section>

      {/* International Shipping Rates */}
      <section className="max-w-6xl mx-auto px-6 mb-12 max-md:mb-8">
        <div className="bg-white border border-[#E8E4DE] p-8 max-md:p-5">
          <SectionHeader
            eyebrow="International rates"
            title={<>Shipping <span className="italic text-[#742938]">Rates</span></>}
            className="mb-6"
          />
          <p className="text-sm text-[#121212]/60 font-light text-center mb-8 max-w-2xl mx-auto">
            Rates shown in AED for express international shipping from Dubai. Final cost calculated at checkout based on package weight.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#742938]/20">
                  <th className="text-start py-3 px-4 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#742938]">Destination</th>
                  {INTL_RATES.weights.map((w) => (
                    <th key={w} className="py-3 px-3 text-[10px] font-semibold tracking-[0.15em] uppercase text-[#121212]/50 text-center">{w}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INTL_RATES.destinations.map((dest, i) => (
                  <tr key={dest.name} className={`border-b border-[#E8E4DE] ${i % 2 === 0 ? 'bg-[#FCFAF7]' : 'bg-white'}`}>
                    <td className="py-4 px-4">
                      <span className="font-serif font-semibold text-[#121212]">{dest.name}</span>
                      {dest.note && <span className="block text-[10px] text-[#121212]/40 mt-0.5">{dest.note}</span>}
                    </td>
                    {dest.rates.map((rate, j) => (
                      <td key={INTL_RATES.weights[j]} className="py-4 px-3 text-center font-medium text-[#121212]/80">
                        <span className="text-[10px] text-[#121212]/40">AED </span>{rate}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[#121212]/40 mt-6 font-light text-center">
            Rates effective October 2024 via Zajel Express. Customs duties may apply at destination. For packages over 3 kg, <a href="https://wa.me/971563554303" className="text-[#742938] font-semibold hover:underline">contact us</a> for a quote.
          </p>
        </div>
      </section>

      {/* Notes */}
      <section className="max-w-6xl mx-auto px-6 pb-16 max-md:pb-10">
        <div className="bg-[#742938] text-white p-8 max-md:p-5">
          <div className="flex items-start gap-3 mb-4">
            <svg className="w-6 h-6 text-[#D4AFB9] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.3em] uppercase">Good to know</span>
              <h2 className="text-xl md:text-2xl font-serif mt-1">Important Notes</h2>
            </div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#F9F7F2]/80 font-light">
            {[
              'Delivery times may vary during peak seasons and public holidays.',
              'Someone must be available at the delivery address to receive the parcel.',
              'For bulk or corporate orders, contact us for preferential rates.',
              'All perfumes are packaged securely to prevent damage in transit.',
            ].map((n) => (
              <li key={n} className="flex gap-2"><span className="text-[#D4AFB9] shrink-0">•</span> {n}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
