"use client";

import React, { useEffect, useState } from 'react';
import AccountLayout from '@/components/account/AccountLayout';
import FormField from '@/components/ui/FormField';
import PhoneInput from '@/components/ui/PhoneInput';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SectionCard from '@/components/ui/SectionCard';
import { toast } from '@/components/ui/Toast';
import { useAuthStore } from '@/store/useAuthStore';

interface AccountDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
}

export default function AccountDetailsPage() {
  const [details, setDetails] = useState<AccountDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+971',
  });
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const authCustomer = useAuthStore((s) => s.customer);
  const updateAuthCustomer = useAuthStore((s) => s.updateCustomer);

  useEffect(() => {
    async function fetchDetails() {
      if (!authCustomer?.id || !authCustomer?.email) {
        setLoading(false);
        return;
      }
      try {
        const url = `/api/woo-customer?id=${authCustomer.id}&email=${encodeURIComponent(authCustomer.email)}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          const c = json.customer;
          if (c) {
            const first = c.first_name || '';
            const last = c.last_name || '';
            setDetails({
              firstName: first,
              lastName: last,
              email: c.email || '',
              phone: c.billing?.phone || '',
              countryCode: '+971',
            });
            setFullName([first, last].filter(Boolean).join(' '));
          }
        }
      } catch (err) {
        console.error('Failed to fetch account details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [authCustomer?.id, authCustomer?.email]);

  const update = (field: keyof AccountDetails, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/woo-customer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: authCustomer?.id,
          authEmail: authCustomer?.email,
          first_name: details.firstName,
          last_name: details.lastName,
          email: details.email,
          billing: { phone: `${details.countryCode}${details.phone}` },
        }),
      });
      if (res.ok) {
        updateAuthCustomer({ firstName: details.firstName, lastName: details.lastName, email: details.email });
        toast('Account details updated!');
      } else {
        toast('Failed to update. Please try again.');
      }
    } catch {
      toast('Failed to update. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AccountLayout title="Account Details">
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout title="Account Details">
      <SectionCard title="Personal Information">
        <div className="space-y-4">
          <FormField
            label="Full Name"
            value={fullName}
            onChange={(v) => {
              const stripped = v.replace(/^\s+/, '');
              setFullName(stripped);
              const spaceIdx = stripped.indexOf(' ');
              if (spaceIdx === -1) {
                setDetails((prev) => ({ ...prev, firstName: stripped, lastName: '' }));
              } else {
                setDetails((prev) => ({
                  ...prev,
                  firstName: stripped.slice(0, spaceIdx),
                  lastName: stripped.slice(spaceIdx + 1).trimStart(),
                }));
              }
            }}
            placeholder="Sarah Al Maktoum"
            required
          />

          <FormField
            label="Email Address"
            type="email"
            value={details.email}
            onChange={(v) => update('email', v)}
            placeholder="your@email.com"
            required
          />

          <PhoneInput
            countryCode={details.countryCode}
            phone={details.phone}
            onCountryCodeChange={(v) => update('countryCode', v)}
            onPhoneChange={(v) => update('phone', v)}
          />

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary px-6 py-2.5 text-sm font-semibold disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </SectionCard>
    </AccountLayout>
  );
}
