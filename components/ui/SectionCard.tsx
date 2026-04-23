"use client";

import React from 'react';

interface SectionCardProps {
  icon?: string;
  title: string;
  subtitle?: string;
  step?: number;
  children: React.ReactNode;
  className?: string;
}

export default function SectionCard({ icon, title, subtitle, step, children, className = '' }: SectionCardProps) {
  return (
    <div className={`bg-white border border-[#E8E4DE] ${className}`}>
      <div className="flex items-start gap-3 px-6 py-4 max-md:px-4 max-md:py-3 border-b border-[#E8E4DE]">
        {step !== undefined ? (
          <div className="w-8 h-8 bg-[#742938] text-white rounded-full flex items-center justify-center text-xs font-semibold shrink-0">
            {String(step).padStart(2, '0')}
          </div>
        ) : icon ? (
          <div className="w-8 h-8 bg-[#F9F7F2] text-[#742938] rounded-full flex items-center justify-center text-sm shrink-0">
            {icon}
          </div>
        ) : null}
        <div className="flex-1">
          <h3 className="text-base font-serif text-[#121212]">{title}</h3>
          {subtitle && <p className="text-[11px] text-[#121212]/50 font-light mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="px-6 py-5 max-md:px-4 max-md:py-4">{children}</div>
    </div>
  );
}
