import Link from 'next/link';
import React from 'react';

interface PageHeaderProps {
  backHref?: string;
  backLabel?: string;
  title: string;
  highlight?: string;
  badge?: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

export default function PageHeader({
  backHref,
  backLabel = 'Back',
  title,
  highlight,
  badge,
  subtitle,
  rightContent,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-md:gap-4 mb-12 max-md:mb-8 pt-4">
      <div>
        {backHref && (
          <Link
            href={backHref}
            className="text-xs uppercase tracking-widest font-semibold text-[#888888] hover:text-[#D4AFB9] transition-colors flex items-center gap-3 mb-6"
          >
            <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {backLabel}
          </Link>
        )}
        {badge && <div className="inline-block bg-[#F9F7F2] border border-[#E8E4DE] text-[#D4AFB9] text-[10px] uppercase tracking-widest font-bold px-3 py-1 mb-4">{badge}</div>}
        <h1 className="text-4xl md:text-5xl font-serif text-[#121212] mb-3">
          {title} {highlight && <span className="text-[#D4AFB9] italic">{highlight}</span>}
        </h1>
        {subtitle && (
          <p className="text-[#888888] font-light md:text-lg mt-2">{subtitle}</p>
        )}
      </div>
      {rightContent && <div>{rightContent}</div>}
    </div>
  );
}
