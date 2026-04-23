"use client";

import React from 'react';
import FormField from '@/components/ui/FormField';
import PhoneInput from '@/components/ui/PhoneInput';
import CountrySelect from '@/components/ui/CountrySelect';

export interface CustomerInfo {
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

interface PersonalInfoFormProps {
  customer: CustomerInfo;
  onChange: (customer: CustomerInfo) => void;
}

export default function PersonalInfoForm({ customer, onChange }: PersonalInfoFormProps) {
  const update = (field: keyof CustomerInfo, value: string) => {
    onChange({ ...customer, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="First Name" value={customer.firstName} onChange={(v) => update('firstName', v)} placeholder="e.g. Sarah" required />
        <FormField label="Last Name" value={customer.lastName} onChange={(v) => update('lastName', v)} placeholder="e.g. Al Maktoum" />
      </div>
      <FormField label="Email Address" type="email" value={customer.email} onChange={(v) => update('email', v)} placeholder="your@email.com" required />
      <PhoneInput
        countryCode={customer.countryCode}
        phone={customer.phone}
        onCountryCodeChange={(v) => update('countryCode', v)}
        onPhoneChange={(v) => update('phone', v)}
        required
      />
      <FormField label="Street Address" value={customer.address} onChange={(v) => update('address', v)} placeholder="Building/Villa No, Street, Community" required />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="City" value={customer.city} onChange={(v) => update('city', v)} placeholder="e.g. Dubai" required />
        <FormField label="State / Province" value={customer.state} onChange={(v) => update('state', v)} placeholder="e.g. Dubai" />
      </div>
      <CountrySelect value={customer.country} onChange={(v) => update('country', v)} required />
    </div>
  );
}
