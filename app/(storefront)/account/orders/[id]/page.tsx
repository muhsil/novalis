"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AccountLayout from '@/components/account/AccountLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ReturnRequestForm from '@/components/account/ReturnRequestForm';
import Link from 'next/link';
import { useStoreSettings } from '@/components/providers/StoreSettingsProvider';
import { useAuthStore } from '@/store/useAuthStore';

interface OrderLineItem {
  id: number;
  name: string;
  quantity: number;
  total: string;
  price: number;
  image?: { src: string };
  sku: string;
}

interface OrderMeta {
  key: string;
  value: string;
}

interface OrderData {
  id: number;
  status: string;
  date_created: string;
  date_modified: string;
  total: string;
  subtotal?: string;
  shipping_total: string;
  discount_total: string;
  payment_method_title: string;
  currency: string;
  customer_note: string;
  line_items: OrderLineItem[];
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    country: string;
    phone?: string;
  };
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    state: string;
    country: string;
  };
  meta_data: OrderMeta[];
}

const STATUS_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  pending: { color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200', label: 'Pending Payment' },
  processing: { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', label: 'Processing' },
  'on-hold': { color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200', label: 'On Hold' },
  completed: { color: 'text-green-700', bg: 'bg-green-50 border-green-200', label: 'Completed' },
  cancelled: { color: 'text-red-700', bg: 'bg-red-50 border-red-200', label: 'Cancelled' },
  refunded: { color: 'text-gray-600', bg: 'bg-gray-50 border-gray-200', label: 'Refunded' },
  failed: { color: 'text-red-700', bg: 'bg-red-50 border-red-200', label: 'Failed' },
};

const STATUS_STEPS = ['pending', 'processing', 'completed'];

function StatusTimeline({ current }: { current: string }) {
  const stepLabels: Record<string, string> = {
    pending: 'Order Placed',
    processing: 'Processing',
    completed: 'Delivered',
  };

  const isCancelled = current === 'cancelled' || current === 'failed' || current === 'refunded';
  const currentIdx = STATUS_STEPS.indexOf(current);
  // For statuses not in the steps array (like 'on-hold'), show at least the first step as active
  const effectiveIdx = currentIdx === -1 && !isCancelled ? 0 : currentIdx;

  return (
    <div className="flex items-center gap-1 mt-4">
      {STATUS_STEPS.map((step, idx) => {
        const isActive = !isCancelled && idx <= effectiveIdx;
        const isCurrent = step === current;
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  isActive
                    ? 'bg-[#D4AFB9] border-[#D4AFB9] text-white'
                    : 'bg-white border-gray-200 text-gray-400'
                } ${isCurrent ? 'ring-2 ring-[#D4AFB9]/30' : ''}`}
              >
                {isActive ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : idx + 1}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-[#191919]' : 'text-gray-400'}`}>
                {stepLabels[step]}
              </span>
            </div>
            {idx < STATUS_STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 mt-[-16px] ${!isCancelled && idx < currentIdx ? 'bg-[#D4AFB9]' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { currency } = useStoreSettings();
  const authCustomer = useAuthStore((s) => s.customer);

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const buildOrderUrl = () => {
    const params = new URLSearchParams({ id: String(orderId) });
    if (authCustomer?.id) params.set('customer_id', String(authCustomer.id));
    if (authCustomer?.email) params.set('email', authCustomer.email);
    return `/api/woo-order?${params.toString()}`;
  };

  useEffect(() => {
    async function fetchOrder() {
      if (!authCustomer?.email && !authCustomer?.id) {
        setError('Please sign in to view this order');
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(buildOrderUrl());
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data.order);
      } catch {
        setError('Could not load order details');
      } finally {
        setLoading(false);
      }
    }
    if (orderId) fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, authCustomer?.id, authCustomer?.email]);

  const reloadOrder = async () => {
    try {
      const res = await fetch(buildOrderUrl());
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      }
    } catch {
      /* noop */
    }
  };

  if (loading) {
    return (
      <AccountLayout title="Order Details">
        <div className="flex justify-center py-12"><LoadingSpinner /></div>
      </AccountLayout>
    );
  }

  if (error || !order) {
    return (
      <AccountLayout title="Order Details">
        <div className="text-center py-12">
          <p className="text-[#999] text-sm">{error || 'Order not found'}</p>
          <Link href="/account/orders" className="text-[#D4AFB9] text-sm font-semibold mt-2 inline-block">
            Back to Orders
          </Link>
        </div>
      </AccountLayout>
    );
  }

  const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
  const paymentIntentId = order.meta_data.find((m) => m.key === 'ziina_payment_intent_id')?.value;

  // Tracking meta can be written by several WC plugins; check the common keys.
  const trackingNumber = order.meta_data.find(
    (m) =>
      m.key === '_tracking_number' ||
      m.key === 'tracking_number' ||
      m.key === '_shipment_tracking_tracking_number'
  )?.value;
  const trackingProvider = order.meta_data.find(
    (m) =>
      m.key === '_tracking_provider' ||
      m.key === 'tracking_provider' ||
      m.key === '_shipment_tracking_provider'
  )?.value;
  const trackingUrl = order.meta_data.find(
    (m) =>
      m.key === '_tracking_url' ||
      m.key === 'tracking_url' ||
      m.key === '_shipment_tracking_url'
  )?.value;

  const returnRequested = order.meta_data.some((m) => m.key === 'return_requested');
  const returnable =
    !returnRequested &&
    ['processing', 'on-hold', 'completed'].includes(order.status);

  return (
    <AccountLayout title={`Order #${order.id}`}>
      <div className="space-y-4">
        {/* Back link */}
        <Link href="/account/orders" className="inline-flex items-center gap-1 text-sm text-[#999] hover:text-[#D4AFB9] transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Orders
        </Link>

        {/* Status Card */}
        <div className={`rounded-xl border p-4 ${statusConfig.bg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <div>
                <span className={`text-sm font-bold ${statusConfig.color}`}>{statusConfig.label}</span>
                <p className="text-xs text-[#999] mt-0.5">
                  Placed on {new Date(order.date_created).toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <span className="text-lg font-bold text-[#191919]">{currency} {order.total}</span>
          </div>
          <StatusTimeline current={order.status} />
        </div>

        {/* Tracking */}
        {(trackingNumber || trackingUrl) && (
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="text-sm font-bold text-[#191919] mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#742938]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              Shipment Tracking
            </h3>
            <div className="text-sm text-[#666] space-y-1">
              {trackingProvider && (
                <div className="flex justify-between">
                  <span>Carrier</span>
                  <span className="font-medium text-[#333]">{trackingProvider}</span>
                </div>
              )}
              {trackingNumber && (
                <div className="flex justify-between">
                  <span>Tracking Number</span>
                  <span className="font-mono text-xs text-[#742938] font-semibold">{trackingNumber}</span>
                </div>
              )}
              {trackingUrl && (
                <a
                  href={trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#742938] hover:underline mt-2"
                >
                  Track package
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Line Items */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-bold text-[#191919] mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#D4AFB9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg> Items ({order.line_items.length})
          </h3>
          <div className="divide-y divide-gray-50">
            {order.line_items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="w-14 h-14 rounded-lg bg-[#f5f5f5] overflow-hidden flex-shrink-0">
                  {item.image?.src ? (
                    <img src={item.image.src} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#191919] truncate">{item.name}</p>
                  <p className="text-xs text-[#999]">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold text-[#191919] flex-shrink-0">{currency} {item.total}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-gray-100 mt-3 pt-3 space-y-1.5">
            <div className="flex justify-between text-xs text-[#999]">
              <span>Subtotal</span>
              <span>{currency} {(parseFloat(order.total) - parseFloat(order.shipping_total) + parseFloat(order.discount_total)).toFixed(0)}</span>
            </div>
            {parseFloat(order.shipping_total) > 0 && (
              <div className="flex justify-between text-xs text-[#999]">
                <span>Shipping</span>
                <span>{currency} {order.shipping_total}</span>
              </div>
            )}
            {parseFloat(order.discount_total) > 0 && (
              <div className="flex justify-between text-xs text-green-600">
                <span>Discount</span>
                <span>-{currency} {order.discount_total}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-[#191919] pt-1">
              <span>Total</span>
              <span>{currency} {order.total}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-bold text-[#191919] mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#D4AFB9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Shipping Address
          </h3>
          <div className="text-sm text-[#666] space-y-0.5">
            <p className="font-medium text-[#333]">{order.shipping.first_name} {order.shipping.last_name}</p>
            {order.shipping.address_1 && <p>{order.shipping.address_1}</p>}
            <p>{[order.shipping.city, order.shipping.state, order.shipping.country].filter(Boolean).join(', ')}</p>
            {order.shipping.phone && <p>{order.shipping.phone}</p>}
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-bold text-[#191919] mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#D4AFB9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> Payment
          </h3>
          <div className="text-sm text-[#666] space-y-1">
            <div className="flex justify-between">
              <span>Method</span>
              <span className="font-medium text-[#333]">{order.payment_method_title || 'N/A'}</span>
            </div>
            {paymentIntentId && (
              <div className="flex justify-between">
                <span>Transaction ID</span>
                <span className="font-mono text-xs text-[#999]">{paymentIntentId.slice(0, 16)}...</span>
              </div>
            )}
          </div>
        </div>

        {/* Customer Note */}
        {order.customer_note && (
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="text-sm font-bold text-[#191919] mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#D4AFB9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> Order Notes
            </h3>
            <p className="text-sm text-[#666]">{order.customer_note}</p>
          </div>
        )}

        {/* Return Request */}
        {returnable && (
          <ReturnRequestForm
            orderId={order.id}
            customerId={authCustomer?.id}
            email={order.billing?.email || authCustomer?.email || ''}
            onSubmitted={reloadOrder}
          />
        )}
        {returnRequested && (
          <div className="bg-[#FAF6F0] border border-[#E8E4DE] rounded-xl p-4 text-sm text-[#121212]/70">
            <span className="font-semibold text-[#742938]">Return request submitted.</span>{' '}
            Our team will contact you shortly about the next steps.
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
