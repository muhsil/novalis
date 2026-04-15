import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Novalis Perfumes is a luxury fragrance brand from Dubai, UAE, crafting exclusive perfumes with an authentic Emirati soul.',
  alternates: { canonical: '/about' },
};

const STATS = [
  { value: '5,000+', label: 'Happy Customers' },
  { value: '30+', label: 'Unique Fragrances' },
  { value: '4.9', label: 'Average Rating' },
  { value: 'GCC', label: 'Wide Delivery' },
];

const VALUES = [
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    title: 'Premium Ingredients',
    description: 'We source the finest natural oud from Southeast Asia, authentic Arabian musk, natural Mediterranean amber, Damascene rose, and rare botanical extracts.',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: 'GCC Delivery',
    description: 'Express shipping within 2-4 business days inside the UAE and international delivery within 5-10 business days across all GCC countries.',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    title: 'Emirati Heritage',
    description: 'Our formulations blend traditional Arabian perfumery art with modern fragrance-making techniques to produce unique scents reflecting Emirati heritage.',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Cruelty-Free & Sustainable',
    description: 'All products are cruelty-free and not tested on animals. We use recyclable packaging and work with environmentally responsible suppliers.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 max-md:px-3 py-8 max-md:py-5 max-md:pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#999] mb-6">
        <Link href="/" className="hover:text-[#C9A96E]">Home</Link>
        <span>&gt;</span>
        <span className="text-[#191919] font-medium">About Us</span>
      </nav>

      {/* Hero */}
      <div className="bg-[#1A1A2E] rounded-lg p-8 max-md:p-5 mb-8 text-center">
        <span className="text-[#C9A96E] text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">Our Story</span>
        <h1 className="text-2xl max-md:text-xl font-light text-white mb-3">
          About <span className="font-semibold text-[#C9A96E]">Novalis</span>
        </h1>
        <p className="text-white/60 text-sm max-w-lg mx-auto leading-relaxed font-light">
          Novalis Perfumes is a luxury fragrance brand from Dubai, UAE, crafting exclusive perfumes with an authentic Emirati soul using premium ingredients like oud, musk, amber, and rare botanicals.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-[#f0f0f0] p-5 text-center">
            <div className="text-2xl font-light text-[#C9A96E]">{stat.value}</div>
            <div className="text-xs text-[#999] mt-1 font-light tracking-wide uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Brand Story */}
      <div className="bg-white rounded-lg border border-[#f0f0f0] p-6 max-md:p-4 mb-8">
        <h2 className="text-lg font-light text-[#191919] mb-4">Luxury Perfumes Crafted with an <span className="font-semibold">Emirati Soul</span></h2>
        <div className="space-y-3 text-sm text-[#666] leading-relaxed font-light">
          <p>
            Discover luxury perfumes by Novalis, blending premium ingredients with refined craftsmanship. Inspired by Emirati heritage and designed for modern elegance in the UAE.
          </p>
          <p>
            Each Novalis fragrance is handcrafted in limited quantities using premium natural ingredients, ensuring the uniqueness of every piece. We draw inspiration from the rich Emirati heritage to deliver an unforgettable olfactory experience.
          </p>
          <p>
            Our perfumes are composed of three harmonious fragrance layers — top notes featuring citrus and light spices, heart notes including rose, jasmine, and oud, and base notes of musk, amber, and sandalwood — each designed to last 8-12 hours on skin.
          </p>
          <p>
            Novalis is also among the pioneering brands leveraging artificial intelligence and machine learning technologies to analyze customer preferences and develop innovative fragrance compositions.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white rounded-lg border border-[#f0f0f0] p-6 max-md:p-4 mb-8">
        <h2 className="text-lg font-light text-[#191919] mb-5">Our <span className="font-semibold">Values</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="flex gap-3">
              <span className="text-[#C9A96E] shrink-0">{v.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-[#191919]">{v.title}</h3>
                <p className="text-xs text-[#666] leading-relaxed mt-1 font-light">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#FAF6F0] rounded-lg p-6 max-md:p-4 text-center">
        <h2 className="text-lg font-light text-[#191919] mb-2">Discover Our <span className="font-semibold">Collection</span></h2>
        <p className="text-sm text-[#666] mb-4 font-light">Explore luxury fragrances crafted with an Emirati signature.</p>
        <Link href="/shop" className="inline-flex items-center bg-[#C9A96E] text-white font-semibold text-sm px-8 py-3 rounded-none hover:bg-[#B8985D] transition-colors tracking-wide uppercase">
          Shop Collection
        </Link>
      </div>
    </div>
  );
}
