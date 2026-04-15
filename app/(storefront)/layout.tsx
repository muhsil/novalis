import Navbar from '@/components/ui/Navbar';
import WhatsAppFab from '@/components/ui/WhatsAppFab';
import MobileBottomNav from '@/components/ui/mobile/MobileBottomNav';
import Link from 'next/link';
import { Suspense } from 'react';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar />

      <main className="flex-1 mobile-body-padding">{children}</main>

      {/* Footer - Desktop */}
      <footer className="bg-[#1A1A2E] max-md:hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <img src="/novalis-logo.png" alt="Novalis" className="h-8 w-auto brightness-0 invert" />
              </Link>
              <p className="text-white/50 text-sm leading-relaxed font-light">
                Luxury Arabic fragrances crafted in the UAE. Premium Emirati-inspired scents with refined craftsmanship.
              </p>
              {/* Social Links */}
              <div className="flex gap-3 mt-4">
                <a href="https://instagram.com/novalis.ae" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9A96E] transition-colors" aria-label="Instagram">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://tiktok.com/@novalis.ae" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9A96E] transition-colors" aria-label="TikTok">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase">Shop</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'All Fragrances', href: '/shop' },
                  { label: 'Perfumes', href: '/shop?category=perfumes' },
                  { label: 'Oud Collection', href: '/shop?category=oud-collection' },
                  { label: 'Luxury Fragrances', href: '/shop?category=luxury-fragrances' },
                  { label: 'Oils', href: '/shop?category=oils' },
                ].map(link => (
                  <Link key={link.href} href={link.href} className="text-white/50 text-sm hover:text-[#C9A96E] transition-colors font-light">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase">Company</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'FAQ', href: '/faq' },
                  { label: 'Shipping & Delivery', href: '/shipping' },
                  { label: 'Terms & Conditions', href: '/terms' },
                  { label: 'Privacy Policy', href: '/privacy' },
                ].map(link => (
                  <Link key={link.href} href={link.href} className="text-white/50 text-sm hover:text-[#C9A96E] transition-colors font-light">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase">Contact Us</h4>
              <div className="flex flex-col gap-2.5 text-white/50 text-sm font-light">
                <span className="flex items-center gap-2"><svg className="w-4 h-4 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Dubai, Abu Dhabi, Sharjah</span>
                <a href="https://wa.me/971563554303" className="hover:text-[#C9A96E] transition-colors flex items-center gap-2"><svg className="w-4 h-4 text-[#C9A96E]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> +971 56 355 4303</a>
                <a href="mailto:info@novalis.ae" className="hover:text-[#C9A96E] transition-colors flex items-center gap-2"><svg className="w-4 h-4 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> info@novalis.ae</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex items-center justify-between">
            <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} Novalis Perfumes. All rights reserved.</p>
            <p className="text-white/30 text-xs">Dubai, UAE</p>
          </div>
        </div>
      </footer>

      {/* Mobile Footer - compact */}
      <footer className="md:hidden bg-[#1A1A2E] mb-14 px-4 py-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-3">
            <img src="/novalis-logo.png" alt="Novalis" className="h-7 w-auto brightness-0 invert" />
          </Link>
          <p className="text-white/40 text-[10px] mb-3 font-light">Luxury Arabic Fragrances | Dubai, UAE</p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <a href="https://instagram.com/novalis.ae" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center" aria-label="Instagram">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://tiktok.com/@novalis.ae" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center" aria-label="TikTok">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg>
            </a>
          </div>
          <div className="flex items-center justify-center gap-3 text-xs text-white/40 flex-wrap font-light">
            <Link href="/shop" className="hover:text-[#C9A96E]">Shop</Link>
            <span className="text-white/20">|</span>
            <Link href="/about" className="hover:text-[#C9A96E]">About</Link>
            <span className="text-white/20">|</span>
            <Link href="/contact" className="hover:text-[#C9A96E]">Contact</Link>
            <span className="text-white/20">|</span>
            <Link href="/faq" className="hover:text-[#C9A96E]">FAQ</Link>
          </div>
          <div className="flex items-center justify-center gap-3 text-[10px] text-white/30 mt-2 font-light">
            <Link href="/terms" className="hover:text-[#C9A96E]">Terms</Link>
            <span className="text-white/15">|</span>
            <Link href="/privacy" className="hover:text-[#C9A96E]">Privacy</Link>
            <span className="text-white/15">|</span>
            <Link href="/shipping" className="hover:text-[#C9A96E]">Shipping</Link>
          </div>
          <p className="text-white/20 text-[10px] mt-3">&copy; {new Date().getFullYear()} Novalis Perfumes</p>
        </div>
      </footer>

      <WhatsAppFab />
      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>
    </div>
  );
}
