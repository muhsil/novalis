"use client";

import React from 'react';
import FormField from '@/components/ui/FormField';
import CountrySelect from '@/components/ui/CountrySelect';
import PhoneInput from '@/components/ui/PhoneInput';

export interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

interface BillingAddressFormProps {
  sameAsShipping: boolean;
  onSameAsShippingChange: (same: boolean) => void;
  billing: BillingInfo;
  onChange: (billing: BillingInfo) => void;
}

export default function BillingAddressForm({
  sameAsShipping,
  onSameAsShippingChange,
  billing,
  onChange,
}: BillingAddressFormProps) {
  const update = (field: keyof BillingInfo, value: string) => {
    onChange({ ...billing, [field]: value });
  };

  const fullName = [billing.firstName, billing.lastName].filter(Boolean).join(' ');
  const updateName = (value: string) => {
    const parts = value.trim().split(/\s+/);
    const first = parts[0] || '';
    const last = parts.length > 1 ? parts.slice(1).join(' ') : '';
    onChange({ ...billing, firstName: first, lastName: last });
  };

  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={sameAsShipping}
          onChange={(e) => onSameAsShippingChange(e.target.checked)}
          className="w-4 h-4 border-[#E8E4DE] text-[#742938] focus:ring-[#D4AFB9] cursor-pointer"
        />
        <span className="text-sm text-[#121212] font-light">Same as shipping address</span>
      </label>

      {!sameAsShipping && (
        <div className="space-y-4 pt-5 mt-5 border-t border-[#E8E4DE]">
          <FormField label="Full Name" value={fullName} onChange={updateName} placeholder="e.g. Sarah Al Maktoum" required />
          <FormField label="Email" type="email" value={billing.email} onChange={(v) => update('email', v)} placeholder="billing@email.com" required />
          <PhoneInput
            countryCode={billing.countryCode}
            phone={billing.phone}
            onCountryCodeChange={(v) => update('countryCode', v)}
            onPhoneChange={(v) => update('phone', v)}
            required
          />
          <FormField label="Address" value={billing.address} onChange={(v) => update('address', v)} placeholder="Street address" required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="City" value={billing.city} onChange={(v) => update('city', v)} placeholder="City" required />
            <FormField label="State / Province" value={billing.state} onChange={(v) => update('state', v)} placeholder="State or province" />
          </div>
          <CountrySelect value={billing.country} onChange={(v) => update('country', v)} required />
        </div>
      )}
    </div>
  );
}
