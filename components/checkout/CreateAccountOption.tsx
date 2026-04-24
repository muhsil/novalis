"use client";

import React from 'react';

interface CreateAccountOptionProps {
  enabled: boolean;
  onEnabledChange: (v: boolean) => void;
  password: string;
  onPasswordChange: (v: string) => void;
}

/**
 * Optional "create an account" toggle for guest checkout.
 * When enabled, a WooCommerce customer will be created with the email,
 * name, and phone entered above — using this password.
 */
export default function CreateAccountOption({
  enabled,
  onEnabledChange,
  password,
  onPasswordChange,
}: CreateAccountOptionProps) {
  return (
    <div className="border border-[#E8E4DE] bg-white p-4">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onEnabledChange(e.target.checked)}
          className="w-4 h-4 mt-0.5 border-[#E8E4DE] text-[#742938] focus:ring-[#D4AFB9] cursor-pointer"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#121212] font-medium">Create an account for faster checkout next time</p>
          <p className="text-[11px] text-[#121212]/60 font-light mt-0.5">
            We&apos;ll save your details and give you access to order tracking and returns.
          </p>
        </div>
      </label>

      {enabled && (
        <div className="mt-4 pl-7">
          <label className="block text-[10px] font-bold text-[#121212]/60 uppercase tracking-[0.2em] mb-2">
            Password<span className="text-red-400 ml-1">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="form-input"
            placeholder="Min. 6 characters"
            minLength={6}
            autoComplete="new-password"
          />
          <p className="text-[10px] text-[#121212]/50 mt-1.5 font-light">
            Your email will be used as the login.
          </p>
        </div>
      )}
    </div>
  );
}
