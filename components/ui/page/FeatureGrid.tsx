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
  /** Tone of the overlaid text card. */
  tone?: 'dark' | 'light' | 'warm';
}

interface FeatureGridProps {
  /** Large top panel. Full-bleed image with a text card overlaid on the left. */
  top: FeaturePanel;
  /** Two smaller panels rendered side-by-side below the top panel. */
  bottom: [FeaturePanel, FeaturePanel];
}

/**
 * Shama-style 3-card feature section. Each card is a full-bleed image
 * with a text block anchored to the TOP-LEFT — no heavy gradients,
 * no split-panel layouts. Matches the reference provided by the brand.
 */
export default function FeatureGrid({ top, bottom }: FeatureGridProps) {
  return (
    <section className="fade-up max-w-7xl mx-auto px-4 max-md:px-3 py-8 max-md:py-5">
      <div className="grid grid-cols-2 gap-4 max-md:gap-2.5">
        {/* Top — full-width feature panel, image-first with text card on the left */}
        <FeatureCard
          panel={top}
          className="col-span-2 aspect-[21/9] max-md:aspect-[4/3] min-h-[320px] max-md:min-h-[360px]"
          textBoxCls="md:max-w-[48%] max-md:max-w-full md:inset-y-0 md:start-0 max-md:inset-x-0 max-md:top-0 md:p-10 lg:p-14 max-md:p-5 max-md:pb-8"
          titleCls="text-3xl md:text-4xl lg:text-[44px] leading-[1.1]"
          descCls="mt-4 text-[13px] md:text-sm max-w-sm"
        />

        {/* Bottom — two half-width panels */}
        {bottom.map((panel, i) => (
          <FeatureCard
            key={panel.title + i}
            panel={panel}
            className="col-span-2 md:col-span-1 aspect-[4/3] max-md:aspect-[5/4] min-h-[320px]"
            textBoxCls="inset-x-0 top-0 p-6 md:p-8"
            titleCls="text-2xl md:text-[32px] leading-[1.1]"
            descCls="mt-2.5 text-[13px] max-w-xs"
          />
        ))}
      </div>
    </section>
  );
}

interface FeatureCardProps {
  panel: FeaturePanel;
  className: string;
  textBoxCls: string;
  titleCls: string;
  descCls: string;
}

function FeatureCard({ panel, className, textBoxCls, titleCls, descCls }: FeatureCardProps) {
  const tone = panel.tone || 'dark';
  const textColor =
    tone === 'light' ? 'text-[#2A1E1A]' : 'text-white';
  const descColor =
    tone === 'light' ? 'text-[#2A1E1A]/75' : 'text-white/85';
  const ctaCls =
    tone === 'light'
      ? 'bg-[#2A1E1A] text-white hover:bg-[#742938]'
      : tone === 'warm'
        ? 'bg-[#d2c7bf] text-[#2A1E1A] hover:bg-white'
        : 'bg-[#d2c7bf] text-[#2A1E1A] hover:bg-white';
  const eyebrowColor =
    tone === 'light' ? 'text-[#742938]' : 'text-[#d2c7bf]';

  const inner = (
    <>
      <img
        src={panel.image}
        alt={panel.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        loading="lazy"
      />
      {/* Soft text-side wash so copy is readable regardless of photo subject.
          Positioned to the TOP-LEFT on bottom cards, full LEFT-column on top card. */}
      {tone !== 'light' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(100deg, rgba(20,14,12,0.62) 0%, rgba(20,14,12,0.35) 40%, rgba(20,14,12,0) 60%)',
          }}
        />
      )}
      <div className={`absolute ${textBoxCls} flex flex-col justify-start z-10`}>
        {panel.eyebrow && (
          <span className={`block ${eyebrowColor} text-[10px] font-bold tracking-[0.3em] uppercase mb-3`}>
            {panel.eyebrow}
          </span>
        )}
        <h3 className={`${titleCls} font-serif ${textColor} tracking-tight`}>
          {panel.title}
          {panel.titleAccent && (
            <>
              {' '}
              <span className="italic">{panel.titleAccent}</span>
            </>
          )}
        </h3>
        {panel.description && (
          <p className={`${descColor} ${descCls} leading-relaxed font-light`}>
            {panel.description}
          </p>
        )}
        {panel.cta && panel.href && (
          <span
            className={`inline-flex items-center gap-2 self-start mt-auto pt-5 text-[11px] font-semibold tracking-[0.25em] uppercase px-5 py-3 ${ctaCls} transition-colors`}
            style={{ marginTop: 'auto' }}
          >
            {panel.cta}
            <svg className="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </span>
        )}
      </div>
    </>
  );

  const cardCls = `relative group overflow-hidden block ${className}`;

  if (panel.href) {
    return (
      <Link href={panel.href} className={cardCls}>
        {inner}
      </Link>
    );
  }
  return <div className={cardCls}>{inner}</div>;
}
