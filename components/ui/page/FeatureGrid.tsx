import Link from 'next/link';
import React from 'react';

export interface FeaturePanel {
  eyebrow?: string;
  title: string;
  /** Optional italic second line in the title. */
  titleAccent?: string;
  description?: string;
  cta?: string;
  href?: string;
  image: string;
  /** Accent background color for the text-side (used when image is half-width). */
  textBg?: string;
  /** Text color class applied to title/description inside the panel. */
  textClass?: string;
  /** Accent color for CTA text. */
  ctaClass?: string;
}

interface FeatureGridProps {
  /** Large top panel. Renders image-right on desktop, image-below on mobile. */
  top: FeaturePanel;
  /** Two smaller panels rendered side-by-side below the top panel. */
  bottom: [FeaturePanel, FeaturePanel];
}

/**
 * 3-card feature grid used on the home page. One big top card with a
 * text block on the left and an image on the right, plus two half-width
 * cards underneath that overlay copy on a full-bleed image. Matches the
 * "Shama" layout but uses the site's maroon / secondary palette.
 */
export default function FeatureGrid({ top, bottom }: FeatureGridProps) {
  return (
    <section className="fade-up max-w-7xl mx-auto px-4 max-md:px-3 py-6 max-md:py-3">
      <div className="grid grid-cols-2 gap-3 max-md:gap-2">
        {/* Top — full-width split card */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-[#742938] text-white min-h-[360px] max-md:min-h-[260px]">
          <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center gap-4 order-2 md:order-1">
            {top.eyebrow && (
              <span className="text-[#D4AFB9] text-[10px] font-bold tracking-[0.3em] uppercase">
                {top.eyebrow}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-white">
              {top.title}
              {top.titleAccent && (
                <>
                  {' '}
                  <span className="italic text-[#D4AFB9]">{top.titleAccent}</span>
                </>
              )}
            </h2>
            {top.description && (
              <p className="text-[#F9F7F2]/70 text-sm md:text-base leading-relaxed font-light max-w-md">
                {top.description}
              </p>
            )}
            {top.cta && top.href && (
              <Link
                href={top.href}
                className="inline-flex items-center self-start gap-2 mt-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D4AFB9] border border-[#D4AFB9] px-5 py-2.5 hover:bg-[#D4AFB9] hover:text-[#121212] transition-colors"
              >
                {top.cta}
                <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            )}
          </div>
          <div className="relative overflow-hidden order-1 md:order-2 min-h-[220px] md:min-h-[420px]">
            <img
              src={top.image}
              alt={top.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Bottom — two half-width image cards with overlay copy */}
        {bottom.map((panel, i) => (
          <Link
            key={panel.title + i}
            href={panel.href || '#'}
            className="relative col-span-2 md:col-span-1 group overflow-hidden min-h-[300px] max-md:min-h-[240px] block"
          >
            <img
              src={panel.image}
              alt={panel.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/70 via-[#121212]/20 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8 text-white">
              <div>
                {panel.eyebrow && (
                  <span className="block text-[#D4AFB9] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
                    {panel.eyebrow}
                  </span>
                )}
                <h3 className="text-2xl md:text-3xl font-serif leading-tight">
                  {panel.title}
                  {panel.titleAccent && (
                    <>
                      {' '}
                      <span className="italic text-[#D4AFB9]">{panel.titleAccent}</span>
                    </>
                  )}
                </h3>
                {panel.description && (
                  <p className="mt-2 text-[#F9F7F2]/80 text-sm leading-relaxed font-light max-w-xs">
                    {panel.description}
                  </p>
                )}
              </div>
              {panel.cta && (
                <span className="inline-flex items-center gap-2 self-start text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D4AFB9] border border-[#D4AFB9]/70 bg-[#121212]/30 px-4 py-2 backdrop-blur-sm group-hover:bg-[#D4AFB9] group-hover:text-[#121212] transition-colors">
                  {panel.cta}
                  <svg className="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
