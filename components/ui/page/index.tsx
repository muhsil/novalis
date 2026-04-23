import Link from 'next/link';
import type { ReactNode } from 'react';

/* ---------------------- PageHero ---------------------- */
interface PageHeroProps {
  breadcrumb: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  /** pattern offset — each page can pick a different origin for the dot pattern */
  patternOrigin?: string;
}

export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  subtitle,
  patternOrigin = '20% 30%',
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#742938] via-[#8a3648] to-[#5a1f2b]">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at ${patternOrigin}, #D4AFB9 2px, transparent 2px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 py-20 max-md:py-12 text-center">
        <nav className="flex items-center justify-center gap-2 text-[11px] text-[#F9F7F2]/60 mb-6 tracking-widest uppercase">
          <Link href="/" className="hover:text-[#D4AFB9]">Home</Link>
          <span>/</span>
          <span className="text-[#D4AFB9]">{breadcrumb}</span>
        </nav>
        {eyebrow && (
          <span className="inline-block text-[10px] text-[#D4AFB9] font-semibold tracking-[0.3em] uppercase mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight">{title}</h1>
        {subtitle && (
          <p className="text-[#F9F7F2]/70 text-sm md:text-base max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------------------- SectionHeader ---------------------- */
interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  align?: 'center' | 'start';
  className?: string;
}

export function SectionHeader({ eyebrow, title, align = 'center', className = '' }: SectionHeaderProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-start'} ${className}`}>
      {eyebrow && (
        <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.3em] uppercase">{eyebrow}</span>
      )}
      <h2 className="text-3xl md:text-4xl font-serif text-[#121212] mt-3">{title}</h2>
    </div>
  );
}

/* ---------------------- IconCard ---------------------- */
interface IconCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  accent?: string;
  href?: string;
  target?: string;
  rel?: string;
  eyebrow?: string;
  badge?: string;
}

export function IconCard({
  icon,
  title,
  description,
  children,
  accent = '#742938',
  href,
  target,
  rel,
  eyebrow,
  badge,
}: IconCardProps) {
  const content = (
    <>
      {badge && (
        <div className="absolute top-0 end-0 px-3 py-1 bg-[#F9F7F2] text-[10px] font-semibold text-[#742938] tracking-[0.25em] uppercase">
          {badge}
        </div>
      )}
      <div
        className="w-14 h-14 flex items-center justify-center mb-5 text-white max-md:w-12 max-md:h-12"
        style={{ backgroundColor: accent }}
      >
        {icon}
      </div>
      {eyebrow && (
        <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.25em] uppercase">{eyebrow}</span>
      )}
      <h3 className="text-base md:text-lg font-serif font-semibold text-[#121212] mt-1 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[#121212]/60 leading-relaxed font-light">{description}</p>
      )}
      {children}
    </>
  );

  const cls = 'group relative bg-white border border-[#E8E4DE] p-7 max-md:p-5 hover:border-[#742938]/40 hover:shadow-md transition-all overflow-hidden';

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={cls}>
        {content}
      </a>
    );
  }
  return <div className={cls}>{content}</div>;
}

/* ---------------------- StatGrid ---------------------- */
interface Stat {
  value: string;
  label: string;
}
export function StatGrid({ stats, negativeMargin = true }: { stats: Stat[]; negativeMargin?: boolean }) {
  return (
    <section className={`max-w-6xl mx-auto px-6 ${negativeMargin ? '-mt-10 max-md:-mt-8 relative z-10' : ''}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-md:gap-2">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-[#E8E4DE] p-6 max-md:p-4 text-center shadow-sm">
            <div className="text-3xl max-md:text-2xl font-serif text-[#742938]">{s.value}</div>
            <div className="text-[10px] text-[#121212]/50 mt-2 font-semibold tracking-[0.2em] uppercase">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------- CtaBanner ---------------------- */
interface CtaBannerProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  buttonLabel: string;
  buttonHref: string;
  buttonTarget?: string;
  buttonIcon?: ReactNode;
}

export function CtaBanner({
  eyebrow,
  title,
  subtitle,
  buttonLabel,
  buttonHref,
  buttonTarget,
  buttonIcon,
}: CtaBannerProps) {
  const isExternal = buttonHref.startsWith('http') || buttonHref.startsWith('mailto:') || buttonHref.startsWith('tel:');
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16 max-md:pb-10">
      <div className="relative overflow-hidden bg-[#742938] text-center px-8 py-14 max-md:py-10">
        <div className="absolute -top-20 -end-20 w-64 h-64 bg-[#D4AFB9]/20 rounded-full blur-3xl" />
        <div className="relative">
          {eyebrow && (
            <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.3em] uppercase">{eyebrow}</span>
          )}
          <h2 className="text-3xl md:text-4xl font-serif text-white mt-3 mb-4">{title}</h2>
          {subtitle && (
            <p className="text-sm text-[#F9F7F2]/70 mb-7 font-light max-w-lg mx-auto">{subtitle}</p>
          )}
          {isExternal ? (
            <a
              href={buttonHref}
              target={buttonTarget}
              rel={buttonTarget === '_blank' ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 bg-[#D4AFB9] text-[#742938] font-semibold text-xs px-10 py-4 hover:bg-white transition-colors tracking-[0.25em] uppercase"
            >
              {buttonIcon}
              {buttonLabel}
            </a>
          ) : (
            <Link
              href={buttonHref}
              className="inline-flex items-center gap-2 bg-[#D4AFB9] text-[#742938] font-semibold text-xs px-10 py-4 hover:bg-white transition-colors tracking-[0.25em] uppercase"
            >
              {buttonLabel}
              {buttonIcon ?? (
                <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              )}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------- LegalDocPage ---------------------- */
export interface LegalSection {
  id: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
}

interface LegalDocPageProps {
  hero: Omit<PageHeroProps, 'patternOrigin'> & { patternOrigin?: string };
  sections: LegalSection[];
  lastUpdated?: string;
}

export function LegalDocPage({ hero, sections, lastUpdated = 'January 2025' }: LegalDocPageProps) {
  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <PageHero {...hero} />

      <div className="max-w-5xl mx-auto px-6 py-12 max-md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 max-md:gap-4">
          {/* TOC */}
          <aside className="md:sticky md:top-28 md:self-start">
            <div className="bg-white border border-[#E8E4DE] p-5 max-md:p-4">
              <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.25em] uppercase">Contents</span>
              <ol className="mt-3 space-y-2">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm text-[#121212]/70 hover:text-[#742938] font-light flex gap-2"
                    >
                      <span className="text-[#D4AFB9] font-semibold">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* Sections */}
          <main className="space-y-4">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="bg-white border border-[#E8E4DE] p-7 max-md:p-5 scroll-mt-28">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#F9F7F2] text-[#742938] flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.25em] uppercase">
                      Section {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-lg md:text-xl font-serif font-semibold text-[#121212] mt-1 mb-3">
                      {s.title}
                    </h2>
                    <div className="text-sm text-[#121212]/70 leading-relaxed font-light">
                      {typeof s.content === 'string' ? <p>{s.content}</p> : s.content}
                    </div>
                  </div>
                </div>
              </section>
            ))}

            <p className="text-xs text-[#121212]/40 text-center pt-4">Last updated: {lastUpdated}</p>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- Chip list (for tags/areas) ---------------------- */
export function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FCFAF7] border border-[#E8E4DE] text-xs text-[#121212]/70 font-light"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AFB9]" />
          {item}
        </span>
      ))}
    </div>
  );
}

/* ---------------------- Commonly-reused icon bag ---------------------- */
export const Icons = {
  Doc: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Bolt: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Truck: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  Card: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h.01M11 15h2M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Return: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M19.418 15A8.003 8.003 0 004.582 9m0 0L9 9m-4.418 0L9 4.582M19.418 15L15 15m4.418 0L15 19.418" />
    </svg>
  ),
  Lock: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Shield: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5 7a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Warn: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Mail: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Cookie: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 1010 10 4 4 0 01-4-4 4 4 0 01-4-4 4 4 0 01-2-2z" />
    </svg>
  ),
  Share: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.24 17 6c0-1 0-5 0-5s4.986 8.017 1.657 14.657z" />
    </svg>
  ),
  Tag: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
};
