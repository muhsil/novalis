"use client";

import React from 'react';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-[#FCFAF7]">
      <div className="w-20 h-20 rounded-full bg-[#F9F7F2] flex items-center justify-center text-[#D4AFB9] mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.3em] uppercase mb-2">Your Cart</span>
      <h1 className="text-3xl font-serif text-[#121212] mb-3">
        It&apos;s <span className="italic text-[#742938]">Empty</span>
      </h1>
      <p className="text-sm text-[#121212]/60 font-light max-w-sm mb-8">
        Discover our luxury fragrances and find the scent that speaks to you.
      </p>
      <Link
        href="/shop"
        className="bg-[#742938] text-white text-xs font-semibold tracking-[0.25em] uppercase px-10 py-4 hover:bg-[#D4AFB9] hover:text-[#742938] transition-colors"
      >
        Shop the Collection
      </Link>
    </div>
  );
}
