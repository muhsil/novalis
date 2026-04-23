import type { Metadata } from 'next';
import { PageHero, CtaBanner, ChipList } from '@/components/ui/page';
import { WhatsAppIcon, MailIcon, PhoneIcon, InstagramIcon, ArrowIcon, ClockIcon, PinIcon } from '@/components/ui/page/icons';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Get in touch with Novalis Perfumes. We're here to help with your fragrance orders, questions, and consultations.",
  alternates: { canonical: '/contact' },
};

const METHODS = [
  { key: 'whatsapp', label: 'WhatsApp', value: '+971 56 355 4303', href: 'https://wa.me/971563554303', accent: '#25D366', tagline: 'Fastest response — within minutes', icon: WhatsAppIcon },
  { key: 'email', label: 'Email', value: 'info@novalis.ae', href: 'mailto:info@novalis.ae', accent: '#742938', tagline: 'For detailed enquiries — within 24 hours', icon: MailIcon },
  { key: 'phone', label: 'Call us', value: '+971 56 355 4303', href: 'tel:+971563554303', accent: '#D4AFB9', tagline: 'Speak with our fragrance team', icon: PhoneIcon },
  { key: 'instagram', label: 'Instagram', value: '@novalis.ae', href: 'https://instagram.com/novalis.ae', accent: '#E4405F', tagline: 'DMs for quick questions', icon: InstagramIcon },
];

const HOURS = [
  { day: 'Saturday — Thursday', time: '9:00 AM — 9:00 PM' },
  { day: 'Friday', time: '2:00 PM — 9:00 PM' },
];

const AREAS = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];

function InfoCard({ icon, eyebrow, title, children }: { icon: React.ReactNode; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#E8E4DE] p-8 max-md:p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-[#F9F7F2] text-[#742938] flex items-center justify-center">{icon}</div>
        <div>
          <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.25em] uppercase">{eyebrow}</span>
          <h2 className="text-lg font-serif text-[#121212] mt-0.5">{title}</h2>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <PageHero
        breadcrumb="Contact"
        eyebrow="Get in touch"
        title={<>We&apos;d Love to <span className="italic text-[#D4AFB9]">Hear from You</span></>}
        subtitle="Whether you need fragrance advice, have a question about an order, or just want to say hello — our team is ready to help."
      />

      <section className="max-w-6xl mx-auto px-6 -mt-10 max-md:-mt-8 relative z-10 mb-12 max-md:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-md:gap-3">
          {METHODS.map((m) => (
            <a
              key={m.key}
              href={m.href}
              target={m.href.startsWith('http') ? '_blank' : undefined}
              rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group bg-white border border-[#E8E4DE] p-6 max-md:p-5 hover:border-[#742938]/40 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-4 text-white" style={{ backgroundColor: m.accent }}>{m.icon}</div>
              <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.25em] uppercase">{m.label}</span>
              <h3 className="text-base font-serif font-semibold text-[#121212] mt-1">{m.value}</h3>
              <p className="text-xs text-[#121212]/60 mt-2 font-light">{m.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-[#742938] tracking-[0.15em] uppercase group-hover:gap-2 transition-all">
                Connect
                {ArrowIcon}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mb-12 max-md:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-md:gap-3">
          <InfoCard icon={ClockIcon} eyebrow="Opening hours" title={<>Business <span className="italic">Hours</span></>}>
            <div className="divide-y divide-[#E8E4DE]">
              {HOURS.map((h) => (
                <div key={h.day} className="flex justify-between text-sm py-3">
                  <span className="text-[#121212]/70 font-light">{h.day}</span>
                  <span className="font-semibold text-[#121212]">{h.time}</span>
                </div>
              ))}
            </div>
          </InfoCard>
          <InfoCard icon={PinIcon} eyebrow="We deliver to" title={<>All of the <span className="italic">UAE</span></>}>
            <ChipList items={AREAS} />
            <p className="text-xs text-[#121212]/50 mt-4 font-light">Plus all GCC destinations. International shipping available on request.</p>
          </InfoCard>
        </div>
      </section>

      <CtaBanner
        eyebrow="Let's chat"
        title={<>Need Help <span className="italic text-[#D4AFB9]">Now?</span></>}
        subtitle="Our team is available to assist you with any questions about our fragrances."
        buttonLabel="Chat on WhatsApp"
        buttonHref="https://wa.me/971563554303"
        buttonTarget="_blank"
        buttonIcon={WhatsAppIcon}
      />
    </div>
  );
}
