import type { Metadata } from 'next';
import Link from 'next/link';
import { getStoreSettings } from '@/lib/store-settings';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Read Novalis\'s terms and conditions for ordering luxury perfumes and fragrances in the UAE.',
  alternates: { canonical: '/terms' },
};

const SECTIONS = [
  {
    title: '1. General',
    content: 'By accessing and using Novalis Perfumes, you agree to be bound by these Terms & Conditions. We reserve the right to modify these terms at any time without prior notice.',
  },
  {
    title: '2. Products & Pricing',
    content: 'DYNAMIC_PRICING_TERMS',
  },
  {
    title: '3. Orders & Payment',
    content: 'Orders are confirmed upon successful payment through our Ziina payment gateway. We accept all major credit and debit cards. Payment must be completed in full at the time of ordering.',
  },
  {
    title: '4. Delivery',
    content: 'DYNAMIC_DELIVERY_TERMS',
  },
  {
    title: '5. Returns & Refunds',
    content: 'We offer a complete satisfaction guarantee. Unopened products can be returned within 14 days of delivery for a full refund or exchange. In case of a product defect, we provide immediate free replacement. If your order arrives damaged or incorrect, please contact us within 48 hours of delivery.',
  },
  {
    title: '6. Liability',
    content: 'Novalis shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our total liability shall not exceed the amount paid for the order in question.',
  },
  {
    title: '7. Contact',
    content: 'For questions about these terms, contact us at info@novalis.ae or WhatsApp +971 56 355 4303.',
  },
];

export default async function TermsPage() {
  const settings = await getStoreSettings();
  const { currency } = settings;

  const resolvedSections = SECTIONS.map((section) => ({
    ...section,
    content: section.content === 'DYNAMIC_PRICING_TERMS'
      ? `All prices are listed in ${currency} and include VAT where applicable. Prices are subject to change without notice. Product images are for illustration purposes and may vary slightly from the actual product.`
      : section.content === 'DYNAMIC_DELIVERY_TERMS'
        ? `We ship across all GCC countries including UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman. Express shipping within 2-4 business days inside the UAE. Delivery times are estimates and may vary. Free delivery on orders over ${currency} 100.`
        : section.content,
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 max-md:px-3 py-8 max-md:py-5 max-md:pb-20">
      <nav className="flex items-center gap-2 text-xs text-[#999] mb-6">
        <Link href="/" className="hover:text-[#C9A96E]">Home</Link>
        <span>&gt;</span>
        <span className="text-[#191919] font-medium">Terms &amp; Conditions</span>
      </nav>

      <h1 className="text-2xl max-md:text-xl font-bold text-[#191919] mb-6">Terms &amp; Conditions</h1>

      <div className="bg-white rounded-lg border border-[#f0f0f0] divide-y divide-[#f0f0f0]">
        {resolvedSections.map((section) => (
          <div key={section.title} className="p-4">
            <h2 className="text-sm font-bold text-[#191919] mb-2">{section.title}</h2>
            <p className="text-sm text-[#666] leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-[#999] mt-4 text-center">Last updated: January 2025</p>
    </div>
  );
}
