"use client";

import React, { useState, useEffect } from 'react';
import FormField from '@/components/ui/FormField';
import PhoneInput from '@/components/ui/PhoneInput';
import CountrySelect from '@/components/ui/CountrySelect';

export interface CustomerInfo {
  /** Full name. First word is sent as first_name to WooCommerce; remainder as last_name. */
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

  // Local state so the user can type spaces (incl. trailing) in a controlled input.
  // The parent still sees split firstName / lastName.
  const [fullName, setFullName] = useState(
    [customer.firstName, customer.lastName].filter(Boolean).join(' ')
  );

  useEffect(() => {
    const incoming = [customer.firstName, customer.lastName].filter(Boolean).join(' ');
    if (incoming !== fullName.trim()) setFullName(incoming);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer.firstName, customer.lastName]);

  const updateName = (value: string) => {
    const v = value.replace(/^\s+/, '');
    setFullName(v);
    const spaceIdx = v.indexOf(' ');
    if (spaceIdx === -1) {
      onChange({ ...customer, firstName: v, lastName: '' });
    } else {
      onChange({
        ...customer,
        firstName: v.slice(0, spaceIdx),
        lastName: v.slice(spaceIdx + 1).trimStart(),
      });
    }
  };

  return (
    <div className="space-y-4">
      <FormField label="Full Name" value={fullName} onChange={updateName} placeholder="e.g. Sarah Al Maktoum" required />
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
