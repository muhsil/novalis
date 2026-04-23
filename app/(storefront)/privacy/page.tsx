import type { Metadata } from 'next';
import { LegalDocPage, Icons, type LegalSection } from '@/components/ui/page';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Novalis Perfumes privacy policy. Learn how we collect, use, and protect your personal information.',
  alternates: { canonical: '/privacy' },
};

const SECTIONS: LegalSection[] = [
  { id: 'information', title: 'Information We Collect', icon: Icons.Doc, content: 'We collect information you provide when placing an order: name, email, phone number, delivery address, and payment details. We also collect usage data through cookies and analytics to improve our service.' },
  { id: 'use', title: 'How We Use Your Information', icon: Icons.Bolt, content: 'Your information is used to process orders, arrange delivery, send order confirmations, provide customer support, and improve our products and services. We may send promotional emails which you can opt out of at any time.' },
  { id: 'security', title: 'Payment Security', icon: Icons.Lock, content: 'All payments are processed through Ziina, a PCI-DSS compliant payment gateway. We do not store your credit card details on our servers. All transactions are encrypted using industry-standard SSL technology.' },
  { id: 'sharing', title: 'Data Sharing', icon: Icons.Share, content: 'We do not sell or rent your personal information to third parties. We may share your data with delivery partners to fulfill your order and with payment processors to complete transactions.' },
  { id: 'cookies', title: 'Cookies', icon: Icons.Cookie, content: 'We use cookies to enhance your browsing experience, remember your cart contents, and analyze site traffic. You can control cookie settings through your browser preferences.' },
  { id: 'rights', title: 'Your Rights', icon: Icons.Shield, content: 'You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at info@novalis.ae.' },
  { id: 'contact', title: 'Contact', icon: Icons.Mail, content: 'For privacy-related inquiries, email info@novalis.ae or WhatsApp +971 56 355 4303.' },
];

export default function PrivacyPage() {
  return (
    <LegalDocPage
      hero={{
        breadcrumb: 'Privacy',
        eyebrow: 'Your data · Our responsibility',
        title: <>Privacy <span className="italic text-[#D4AFB9]">Policy</span></>,
        subtitle: 'Learn how we collect, use, and protect your personal information when you shop with Novalis.',
        patternOrigin: '80% 30%',
      }}
      sections={SECTIONS}
    />
  );
}
