"use client";

import React from 'react';
import Link from 'next/link';
import { CustomerInfo } from './PersonalInfoForm';

interface OrderSuccessProps {
  customer: CustomerInfo;
  orderId?: number | null;
}

export default function OrderSuccess({ customer, orderId }: OrderSuccessProps) {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 max-md:p-4 bg-[#FCFAF7]">
      <div className="max-w-xl w-full bg-white border border-[#E8E4DE] overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-[#742938] via-[#D4AFB9] to-[#742938]" />

        <div className="p-10 max-md:p-6 text-center">
          <div className="w-20 h-20 max-md:w-16 max-md:h-16 bg-[#742938] text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 max-md:w-8 max-md:h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.3em] uppercase">Thank you</span>
          <h1 className="text-3xl max-md:text-2xl font-serif text-[#121212] mt-2 mb-3">
            Order <span className="italic text-[#742938]">Confirmed</span>
          </h1>
          {orderId && (
            <p className="text-sm text-[#121212]/60 font-light mb-6">
              Order reference <span className="font-semibold text-[#121212]">#{orderId}</span>
            </p>
          )}
          <p className="text-[#121212]/70 font-light leading-relaxed mb-8 max-md:mb-6">
            Your order has been received and is being prepared with care. We&apos;ll contact you within 24 hours to confirm delivery details.
          </p>

          <div className="bg-[#FCFAF7] border border-[#E8E4DE] p-5 text-start mb-8 max-md:mb-6">
            <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.25em] uppercase">Delivering to</span>
            <p className="font-serif text-base text-[#121212] mt-1">
              {customer.firstName} {customer.lastName}
            </p>
            <p className="text-sm text-[#121212]/70 font-light">
              {customer.address}, {customer.city}
            </p>
            <p className="text-sm text-[#121212]/70 font-light">
              {customer.countryCode} {customer.phone}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/shop"
              className="flex-1 bg-[#742938] text-white text-xs font-semibold tracking-[0.25em] uppercase py-4 hover:bg-[#D4AFB9] hover:text-[#742938] transition-colors text-center"
            >
              Continue Shopping
            </Link>
            <a
              href="https://wa.me/971563554303"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white border border-[#742938] text-[#742938] text-xs font-semibold tracking-[0.25em] uppercase py-4 hover:bg-[#742938] hover:text-white transition-colors text-center"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
