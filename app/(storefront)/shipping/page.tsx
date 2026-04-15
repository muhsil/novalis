import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { getStoreSettings } from '@/lib/store-settings';

export const metadata: Metadata = {
  title: 'Shipping & Delivery',
  description: 'Novalis Perfumes shipping and delivery information. Free delivery across UAE and GCC countries.',
  alternates: { canonical: '/shipping' },
};

const DELIVERY_ICONS: Record<string, React.ReactNode> = {
  'same-day': <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  standard: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  scheduled: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
};

function getDeliveryOptions(currency: string) {
  return [
    { key: 'same-day', title: 'UAE Express Delivery', description: 'Express shipping within 2-4 business days inside the UAE.', price: `Free on orders over ${currency} 100` },
    { key: 'standard', title: 'GCC Delivery', description: 'Delivery to Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman within 5-10 business days.', price: 'Calculated at checkout' },
    { key: 'scheduled', title: 'International Shipping', description: 'Select international destinations. Contact us for availability.', price: 'Calculated at checkout' },
  ];
}

const DELIVERY_AREAS = [
  'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman',
  'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain',
  'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman',
];

export default async function ShippingPage() {
  const settings = await getStoreSettings();
  const { currency } = settings;

  return (
    <div className="max-w-4xl mx-auto px-4 max-md:px-3 py-8 max-md:py-5 max-md:pb-20">
      <nav className="flex items-center gap-2 text-xs text-[#999] mb-6">
        <Link href="/" className="hover:text-[#C9A96E]">Home</Link>
        <span>&gt;</span>
        <span className="text-[#191919] font-medium">Shipping &amp; Delivery</span>
      </nav>

      <h1 className="text-2xl max-md:text-xl font-bold text-[#191919] mb-6">Shipping &amp; Delivery</h1>

      {/* Delivery Options */}
      <div className="space-y-3 mb-6">
        {getDeliveryOptions(currency).map((opt) => (
          <div key={opt.title} className="bg-white rounded-lg border border-[#f0f0f0] p-4 flex gap-3">
            <span className="text-[#C9A96E] shrink-0">{DELIVERY_ICONS[opt.key]}</span>
            <div className="flex-1">
              <h2 className="text-sm font-bold text-[#191919]">{opt.title}</h2>
              <p className="text-xs text-[#666] mt-1">{opt.description}</p>
              <span className={`text-xs font-medium mt-1 inline-block ${opt.price.includes('Free') ? 'text-[#00B578]' : 'text-[#666]'}`}>{opt.price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Areas */}
      <div className="bg-white rounded-lg border border-[#f0f0f0] p-6 max-md:p-4 mb-6">
        <h2 className="text-lg font-bold text-[#191919] mb-3">Delivery Areas</h2>
        <p className="text-sm text-[#666] mb-3 font-light">We ship across the UAE and all GCC countries, including:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {DELIVERY_AREAS.map((area) => (
            <div key={area} className="flex items-center gap-1.5 text-sm text-[#666]">
              <span className="w-1.5 h-1.5 bg-[#C9A96E] rounded-full shrink-0" />
              {area}
            </div>
          ))}
        </div>
        <p className="text-xs text-[#999] mt-3 font-light">Don&apos;t see your location? Contact us — we may deliver there too!</p>
      </div>

      {/* Important Notes */}
      <div className="bg-[#FAF6F0] rounded-lg p-6 max-md:p-4">
        <h2 className="text-lg font-bold text-[#C9A96E] mb-3">Important Notes</h2>
        <ul className="space-y-2 text-sm text-[#666]">
          <li className="flex gap-2"><span className="text-[#C9A96E]">•</span> Delivery times may vary during peak seasons and holidays.</li>
          <li className="flex gap-2"><span className="text-[#C9A96E]">•</span> Someone must be available to receive the delivery at the specified address.</li>
          <li className="flex gap-2"><span className="text-[#C9A96E]">•</span> For bulk or corporate orders, please contact us for special arrangements and pricing.</li>
          <li className="flex gap-2"><span className="text-[#C9A96E]">•</span> Perfumes are packaged securely to prevent damage during transit.</li>
        </ul>
      </div>
    </div>
  );
}
