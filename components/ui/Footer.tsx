"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useLocaleStore } from '@/store/useLocaleStore';
import { t } from '@/lib/i18n/translations';

const SOCIAL_LINKS = [
  { href: 'https://instagram.com/novalis.ae', label: 'Instagram', icon: <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { href: 'https://tiktok.com/@novalis.ae', label: 'TikTok', icon: <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg> },
];

const SHOP_LINKS = [
  { labelKey: 'footer.all_fragrances', href: '/shop' },
  { labelKey: 'nav.perfumes', href: '/shop?category=perfumes' },
  { labelKey: 'nav.oud_collection', href: '/shop?category=oud-collection' },
  { labelKey: 'nav.luxury_fragrances', href: '/shop?category=luxury-fragrances' },
  { labelKey: 'nav.oils', href: '/shop?category=oils' },
];

const COMPANY_LINKS = [
  { labelKey: 'footer.about_us', href: '/about' },
  { labelKey: 'footer.contact', href: '/contact' },
  { labelKey: 'footer.faq', href: '/faq' },
  { labelKey: 'footer.shipping', href: '/shipping' },
  { labelKey: 'footer.terms', href: '/terms' },
  { labelKey: 'footer.privacy', href: '/privacy' },
];

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return <p className="text-[#C9A96E] text-sm font-light">Thank you for subscribing.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-0 max-w-sm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 bg-[#f5f5f5] border border-[#e8e8e8] text-[#191919] text-sm px-4 py-3 placeholder:text-[#999] focus:outline-none focus:border-[#191919] transition-colors"
        required
      />
      <button
        type="submit"
        className="bg-[#191919] text-white text-xs font-semibold px-6 py-3 hover:bg-[#333] transition-colors tracking-wide uppercase whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}

function PaymentIcons() {
  return (
    <div className="flex items-center gap-3">
      {/* Visa */}
      <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none"><rect x="0.5" y="0.5" width="47" height="31" rx="3.5" fill="white" stroke="#e0e0e0"/><path d="M19.5 21H17L18.9 11H21.4L19.5 21ZM15.3 11L12.9 18L12.6 16.5L11.7 12C11.7 12 11.6 11 10.3 11H6.1L6 11.2C6 11.2 7.5 11.5 9.2 12.5L11.3 21H13.9L18 11H15.3ZM37.2 21H39.5L37.5 11H35.5C34.4 11 34 11.8 34 11.8L30.3 21H32.9L33.4 19.5H36.6L37.2 21ZM34.2 17.5L35.5 14L36.2 17.5H34.2ZM30 13.5L30.4 11.3C30.4 11.3 29 10.8 27.6 10.8C26 10.8 22.6 11.5 22.6 14.5C22.6 17.3 26.5 17.3 26.5 18.8C26.5 20.3 23 20.1 21.7 19.1L21.3 21.4C21.3 21.4 22.7 22 24.6 22C26.5 22 30 20.9 30 18.2C30 15.4 26 15.1 26 13.9C26 12.7 28.7 12.9 30 13.5Z" fill="#1A1F71"/></svg>
      {/* Mastercard */}
      <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none"><rect x="0.5" y="0.5" width="47" height="31" rx="3.5" fill="white" stroke="#e0e0e0"/><circle cx="20" cy="16" r="8" fill="#EB001B"/><circle cx="28" cy="16" r="8" fill="#F79E1B"/><path d="M24 10.3C25.8 11.7 27 13.7 27 16C27 18.3 25.8 20.3 24 21.7C22.2 20.3 21 18.3 21 16C21 13.7 22.2 11.7 24 10.3Z" fill="#FF5F00"/></svg>
      {/* Apple Pay */}
      <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none"><rect x="0.5" y="0.5" width="47" height="31" rx="3.5" fill="white" stroke="#e0e0e0"/><path d="M17.2 12.3C17.6 11.8 17.9 11.1 17.8 10.4C17.2 10.4 16.4 10.8 16 11.3C15.6 11.7 15.3 12.5 15.3 13.1C16 13.2 16.8 12.8 17.2 12.3ZM17.8 13.3C16.9 13.2 16.1 13.8 15.7 13.8C15.2 13.8 14.5 13.3 13.8 13.3C12.8 13.4 11.9 13.9 11.4 14.8C10.4 16.5 11.1 19.1 12.1 20.4C12.6 21.1 13.2 21.8 14 21.8C14.7 21.8 15 21.3 15.8 21.3C16.6 21.3 16.9 21.8 17.6 21.8C18.4 21.7 18.9 21.1 19.4 20.4C20 19.6 20.2 18.8 20.2 18.8C20.2 18.7 18.8 18.2 18.8 16.6C18.8 15.2 19.9 14.6 20 14.5C19.3 13.5 18.2 13.3 17.8 13.3Z" fill="#333"/><text x="23" y="19" fontSize="7" fontWeight="700" fill="#333" fontFamily="system-ui">Pay</text></svg>
    </div>
  );
}

export default function Footer() {
  const locale = useLocaleStore((s) => s.locale);
  const year = new Date().getFullYear();

  return (
    <>
      {/* Desktop Footer */}
      <footer className="bg-[#f5f5f5] max-md:hidden border-t border-[#e8e8e8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Newsletter Section */}
          <div className="py-10 border-b border-[#e0e0e0] flex items-center justify-between gap-8 flex-wrap">
            <div>
              <h3 className="text-lg text-[#191919] font-bold mb-1">{t(locale, 'footer.newsletter_title') || 'Be the first to know about sales and new arrivals!'}</h3>
            </div>
            <NewsletterForm />
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-10">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <img src="/novalis-logo.png" alt="Novalis" className="h-8 w-auto" />
              </Link>
              <p className="text-[#666] text-sm leading-relaxed mb-4">
                {t(locale, 'footer.brand_description')}
              </p>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#191919] flex items-center justify-center hover:bg-[#C9A96E] transition-colors" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-[#191919] text-sm font-bold mb-4 uppercase tracking-wide">{t(locale, 'footer.shop')}</h4>
              <div className="flex flex-col gap-2.5">
                {SHOP_LINKS.map(link => (
                  <Link key={link.href} href={link.href} className="text-[#666] text-sm hover:text-[#191919] transition-colors">
                    {t(locale, link.labelKey)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[#191919] text-sm font-bold mb-4 uppercase tracking-wide">{t(locale, 'footer.company')}</h4>
              <div className="flex flex-col gap-2.5">
                {COMPANY_LINKS.map(link => (
                  <Link key={link.href} href={link.href} className="text-[#666] text-sm hover:text-[#191919] transition-colors">
                    {t(locale, link.labelKey)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#191919] text-sm font-bold mb-4 uppercase tracking-wide">{t(locale, 'footer.contact_us')}</h4>
              <div className="flex flex-col gap-2.5 text-[#666] text-sm">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#191919] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {t(locale, 'nav.dubai_uae')}
                </span>
                <a href="https://wa.me/971563554303" className="hover:text-[#191919] transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#191919] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  +971 56 355 4303
                </a>
                <a href="mailto:info@novalis.ae" className="hover:text-[#191919] transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#191919] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  info@novalis.ae
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#e0e0e0] py-5 flex items-center justify-between flex-wrap gap-4">
            <p className="text-[#999] text-xs">{t(locale, 'footer.copyright', { year: String(year) })}</p>
            <PaymentIcons />
            <p className="text-[#999] text-xs">{t(locale, 'footer.tagline')}</p>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <footer className="md:hidden bg-[#f5f5f5] border-t border-[#e8e8e8] mb-14">
        {/* Newsletter - mobile */}
        <div className="px-4 py-6 border-b border-[#e0e0e0] text-center">
          <h3 className="text-base text-[#191919] font-bold mb-3">{t(locale, 'footer.newsletter_title') || 'Be the first to know about sales and new arrivals!'}</h3>
          <NewsletterForm />
        </div>

        <div className="px-4 py-5 text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-3">
            <img src="/novalis-logo.png" alt="Novalis" className="h-7 w-auto" />
          </Link>
          <p className="text-[#999] text-[10px] mb-3">{t(locale, 'footer.tagline')}</p>
          <div className="flex items-center justify-center gap-2 mb-3">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#191919] flex items-center justify-center" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 text-xs text-[#666] flex-wrap mb-3">
            <Link href="/shop" className="hover:text-[#191919]">{t(locale, 'footer.shop')}</Link>
            <span className="text-[#ddd]">|</span>
            <Link href="/about" className="hover:text-[#191919]">{t(locale, 'footer.about_us')}</Link>
            <span className="text-[#ddd]">|</span>
            <Link href="/contact" className="hover:text-[#191919]">{t(locale, 'footer.contact')}</Link>
            <span className="text-[#ddd]">|</span>
            <Link href="/faq" className="hover:text-[#191919]">{t(locale, 'footer.faq')}</Link>
          </div>
          <div className="flex items-center justify-center gap-3 text-[10px] text-[#999] mb-3">
            <Link href="/terms" className="hover:text-[#191919]">{t(locale, 'footer.terms')}</Link>
            <span className="text-[#ddd]">|</span>
            <Link href="/privacy" className="hover:text-[#191919]">{t(locale, 'footer.privacy')}</Link>
            <span className="text-[#ddd]">|</span>
            <Link href="/shipping" className="hover:text-[#191919]">{t(locale, 'footer.shipping')}</Link>
          </div>
          <div className="flex justify-center mb-3">
            <PaymentIcons />
          </div>
          <p className="text-[#bbb] text-[10px]">{t(locale, 'footer.copyright', { year: String(year) })}</p>
        </div>
      </footer>
    </>
  );
}
