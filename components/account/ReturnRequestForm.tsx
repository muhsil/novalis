"use client";

import React, { useState } from 'react';
import { toast } from '@/components/ui/Toast';

interface ReturnRequestFormProps {
  orderId: number;
  customerId?: number;
  email: string;
  /** Called after a successful submission so the parent can refresh. */
  onSubmitted?: () => void;
  disabled?: boolean;
}

const REASONS = [
  'Wrong item received',
  'Damaged or defective',
  'Not as described',
  'Changed my mind',
  'Arrived too late',
  'Other',
];

export default function ReturnRequestForm({
  orderId,
  customerId,
  email,
  onSubmitted,
  disabled,
}: ReturnRequestFormProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      toast('Please select a reason for the return', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders/return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, customerId, email, reason, details }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.error || 'Could not submit return request', 'error');
        return;
      }
      toast(data.message || 'Return request submitted');
      setOpen(false);
      setReason('');
      setDetails('');
      onSubmitted?.();
    } catch {
      toast('Network error — please try again', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#191919] flex items-center gap-2">
          <svg className="w-4 h-4 text-[#742938]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6-6m-6 6l6 6" />
          </svg>
          Need to return this order?
        </h3>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            disabled={disabled}
            className="text-xs font-semibold text-[#742938] hover:underline disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline"
          >
            {disabled ? 'Request Submitted' : 'Request Return'}
          </button>
        )}
      </div>

      {open && (
        <form onSubmit={submit} className="mt-4 space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-[#121212]/60 uppercase tracking-[0.2em] mb-2">
              Reason<span className="text-red-400 ml-1">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select a reason…</option>
              {REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[#121212]/60 uppercase tracking-[0.2em] mb-2">
              Additional details (optional)
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              maxLength={500}
              className="form-input"
              placeholder="Anything our team should know?"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary px-4 py-2 text-xs font-semibold disabled:opacity-50"
            >
              {submitting ? 'Submitting…' : 'Submit Request'}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setReason('');
                setDetails('');
              }}
              className="text-xs text-[#121212]/60 hover:text-[#742938] px-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
