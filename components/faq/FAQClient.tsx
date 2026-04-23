"use client";

import { useMemo, useState } from 'react';
import type { FAQCategory } from '@/app/(storefront)/faq/page';

interface FAQItem {
  category: FAQCategory;
  q: string;
  a: string;
}

const CATEGORY_LABELS: { key: FAQCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  {
    key: 'all',
    label: 'All',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    key: 'general',
    label: 'General',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'products',
    label: 'Products',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    key: 'shipping',
    label: 'Shipping',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
  {
    key: 'orders',
    label: 'Orders',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

export default function FAQClient({ items }: { items: FAQItem[] }) {
  const [selected, setSelected] = useState<FAQCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (selected !== 'all' && item.category !== selected) return false;
      if (!q) return true;
      return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
    });
  }, [items, selected, query]);

  return (
    <section className="max-w-5xl mx-auto px-6 py-10 max-md:py-6">
      {/* Search */}
      <div className="relative mb-6 -mt-16 max-md:-mt-10 z-10">
        <div className="bg-white shadow-lg border border-[#E8E4DE] px-5 py-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-[#742938] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a question..."
            className="flex-1 bg-transparent text-sm text-[#121212] placeholder:text-[#999] outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[#999] hover:text-[#742938] text-xs" aria-label="Clear">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 -mx-6 px-6 md:mx-0 md:px-0">
        {CATEGORY_LABELS.map((c) => {
          const isActive = selected === c.key;
          return (
            <button
              key={c.key}
              onClick={() => {
                setSelected(c.key);
                setOpenIdx(null);
              }}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold border transition-all ${
                isActive
                  ? 'bg-[#742938] text-white border-[#742938]'
                  : 'bg-white text-[#121212]/70 border-[#E8E4DE] hover:border-[#742938]/60'
              }`}
            >
              {c.icon}
              {c.label}
            </button>
          );
        })}
      </div>

      {/* FAQ Accordion */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-dashed border-[#E8E4DE] p-10 text-center">
          <p className="text-sm text-[#121212]/60 font-light">
            No questions match <span className="font-medium text-[#742938]">&quot;{query}&quot;</span>.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={`${item.q}-${i}`}
                className={`bg-white border transition-all duration-300 ${
                  isOpen ? 'border-[#742938]/30 shadow-md' : 'border-[#E8E4DE] hover:border-[#742938]/30'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 max-md:px-4 max-md:py-4 text-start"
                >
                  <div className="flex-1 flex items-start gap-3">
                    <span className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold mt-0.5 transition-colors ${
                      isOpen ? 'bg-[#742938] text-white' : 'bg-[#F9F7F2] text-[#742938]'
                    }`}>{i + 1}</span>
                    <h3 className="text-sm md:text-base font-medium text-[#121212] leading-snug">
                      {item.q}
                    </h3>
                  </div>
                  <span className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-full border transition-all ${
                    isOpen ? 'bg-[#742938] text-white border-[#742938] rotate-45' : 'border-[#E8E4DE] text-[#742938]'
                  }`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 max-md:px-4 max-md:pb-4 ps-[3.25rem] max-md:ps-12">
                    <p className="text-sm text-[#121212]/70 leading-relaxed font-light">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
