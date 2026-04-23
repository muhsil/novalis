import type { Metadata } from 'next';
import { LegalDocPage, Icons, type LegalSection } from '@/components/ui/page';
import { getStoreSettings } from '@/lib/store-settings';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: "Read Novalis's terms and conditions for ordering luxury perfumes and fragrances in the UAE.",
  alternates: { canonical: '/terms' },
};

function buildSections(currency: string): LegalSection[] {
  return [
    { id: 'general', title: 'General', icon: Icons.Doc, content: 'By accessing and using Novalis Perfumes, you agree to be bound by these Terms & Conditions. We reserve the right to modify these terms at any time without prior notice.' },
    { id: 'pricing', title: 'Products & Pricing', icon: Icons.Tag, content: `All prices are listed in ${currency} and include VAT where applicable. Prices are subject to change without notice. Product images are for illustration purposes and may vary slightly from the actual product.` },
    { id: 'orders', title: 'Orders & Payment', icon: Icons.Card, content: 'Orders are confirmed upon successful payment through our Ziina payment gateway. We accept all major credit and debit cards. Payment must be completed in full at the time of ordering.' },
    { id: 'delivery', title: 'Delivery', icon: Icons.Truck, content: `We ship across all GCC countries including UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman. Express shipping within 2-4 business days inside the UAE. Delivery times are estimates and may vary. Free delivery on orders over ${currency} 100.` },
    { id: 'returns', title: 'Returns & Refunds', icon: Icons.Return, content: 'We offer a complete satisfaction guarantee. Unopened products can be returned within 14 days of delivery for a full refund or exchange. In case of a product defect, we provide immediate free replacement. If your order arrives damaged or incorrect, please contact us within 48 hours of delivery.' },
    { id: 'liability', title: 'Liability', icon: Icons.Warn, content: 'Novalis shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our total liability shall not exceed the amount paid for the order in question.' },
    { id: 'contact', title: 'Contact', icon: Icons.Mail, content: 'For questions about these terms, contact us at info@novalis.ae or WhatsApp +971 56 355 4303.' },
  ];
}

export default async function TermsPage() {
  const { currency } = await getStoreSettings();
  return (
    <LegalDocPage
      hero={{
        breadcrumb: 'Terms',
        eyebrow: 'The fine print',
        title: <>Terms &amp; <span className="italic text-[#D4AFB9]">Conditions</span></>,
        subtitle: 'The agreement between you and Novalis Perfumes when you shop, browse, or interact with our services.',
        patternOrigin: '30% 70%',
      }}
      sections={buildSections(currency)}
    />
  );
}
