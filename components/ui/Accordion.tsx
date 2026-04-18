"use client";

import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#E8E4DE]/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3.5 md:py-5 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-[11px] font-bold text-[#121212] uppercase tracking-[0.2em] group-hover:text-[#742938] transition-colors">{title}</span>
        <svg
          className={`w-4 h-4 text-[#121212] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] pb-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-1 text-sm font-light text-[#121212]/70 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}
