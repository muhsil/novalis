"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';

import PersonalInfoForm, { CustomerInfo } from '@/components/checkout/PersonalInfoForm';
import BillingAddressForm, { BillingInfo } from '@/components/checkout/BillingAddressForm';
import OrderNotes from '@/components/checkout/OrderNotes';
import OrderSummary from '@/components/checkout/OrderSummary';
import OrderSuccess from '@/components/checkout/OrderSuccess';
import EmptyCart from '@/components/checkout/EmptyCart';
import SupportBox from '@/components/checkout/SupportBox';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SectionCard from '@/components/ui/SectionCard';
import { useStoreSettings } from '@/components/providers/StoreSettingsProvider';
import { useAuthStore } from '@/store/useAuthStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';

function CheckoutContent() {
  const { items, clearCart } = useCartStore();
  const { currency } = useStoreSettings();
  const { selectedCurrency, convertPrice, getSymbol } = useCurrencyStore();
  const currSymbol = selectedCurrency !== 'AED' ? getSymbol() : currency;
  const authCustomer = useAuthStore((s) => s.customer);

  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: authCustomer?.firstName || '',
    lastName: authCustomer?.lastName || '',
    email: authCustomer?.email || '',
    phone: authCustomer?.phone || '',
    countryCode: '+971',
    address: '',
    city: 'Dubai',
    state: '',
    country: 'AE',
  });

  useEffect(() => {
    if (authCustomer) {
      setCustomer((prev) => ({
        ...prev,
        firstName: prev.firstName || authCustomer.firstName || '',
        lastName: prev.lastName || authCustomer.lastName || '',
        email: prev.email || authCustomer.email || '',
        phone: prev.phone || authCustomer.phone || '',
      }));
    }
  }, [authCustomer]);

  const [billing, setBilling] = useState<BillingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+971',
    address: '',
    city: '',
    state: '',
    country: 'AE',
  });

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const isFormValid = Boolean(
    customer.firstName && customer.email && customer.phone &&
    customer.address && customer.city && customer.country
  );

  const handleCreateOrder = async () => {
    if (!isFormValid) {
      toast('Please complete all shipping details', 'error');
      return;
    }

    try {
      setIsInitializing(true);

      const billingData = sameAsShipping
        ? {
            first_name: customer.firstName,
            last_name: customer.lastName,
            email: customer.email,
            phone: `${customer.countryCode}${customer.phone}`,
            address_1: customer.address,
            city: customer.city,
            state: customer.state,
            country: customer.country,
          }
        : {
            first_name: billing.firstName,
            last_name: billing.lastName,
            email: billing.email,
            phone: `${billing.countryCode}${billing.phone}`,
            address_1: billing.address,
            city: billing.city,
            state: billing.state,
            country: billing.country,
          };

      const shippingData = {
        first_name: customer.firstName,
        last_name: customer.lastName,
        phone: `${customer.countryCode}${customer.phone}`,
        address_1: customer.address,
        city: customer.city,
        state: customer.state,
        country: customer.country,
      };

      const resWoo = await fetch('/api/woo-create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: 'cod',
          paymentMethodTitle: 'Cash on Delivery',
          isPaid: false,
          status: 'processing',
          items,
          customerNote: orderNotes,
          customerId: authCustomer?.id || 0,
          billing: billingData,
          shipping: shippingData,
        }),
      });

      if (!resWoo.ok) throw new Error('Failed to create order');
      const data = await resWoo.json();

      setOrderId(data.orderId || null);
      setOrderCreated(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      toast('Checkout error: ' + (err as Error).message, 'error');
    } finally {
      setIsInitializing(false);
    }
  };

  if (items.length === 0 && !orderCreated) return <EmptyCart />;
  if (orderCreated) return <OrderSuccess customer={customer} orderId={orderId} />;

  return (
    <div className="min-h-screen bg-[#FCFAF7] py-6 max-md:py-4 max-md:pb-36">
      <div className="max-w-6xl mx-auto px-6 max-md:px-4">
        {/* Header */}
        <div className="mb-6 max-md:mb-4 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <Link
              href="/cart"
              aria-label="Back to cart"
              className="mt-1 w-9 h-9 flex items-center justify-center border border-[#E8E4DE] text-[#121212] hover:bg-[#742938] hover:text-white hover:border-[#742938] transition-colors shrink-0"
            >
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </Link>
            <div className="min-w-0">
              <nav className="flex items-center gap-2 text-[11px] text-[#121212]/50 tracking-widest uppercase">
                <Link href="/" className="hover:text-[#742938]">Home</Link>
                <span>/</span>
                <Link href="/cart" className="hover:text-[#742938]">Cart</Link>
                <span>/</span>
                <span className="text-[#742938]">Checkout</span>
              </nav>
              <h1 className="text-2xl md:text-3xl font-serif text-[#121212] mt-1">
                Secure <span className="italic text-[#742938]">Checkout</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#121212]/50 font-semibold tracking-[0.15em] uppercase shrink-0">
            <svg className="w-4 h-4 text-[#1B4332]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secured
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-md:gap-4 items-start">
          <div className="lg:col-span-8 space-y-4">
            <SectionCard step={1} title="Shipping Information" subtitle="Where should we send your order?">
              <PersonalInfoForm customer={customer} onChange={setCustomer} />
            </SectionCard>

            <SectionCard step={2} title="Billing Address" subtitle="The address linked to your payment method.">
              <BillingAddressForm
                sameAsShipping={sameAsShipping}
                onSameAsShippingChange={setSameAsShipping}
                billing={billing}
                onChange={setBilling}
              />
            </SectionCard>

            <SectionCard step={3} title="Order Notes" subtitle="Anything you'd like us to know? (optional)">
              <OrderNotes value={orderNotes} onChange={setOrderNotes} />
            </SectionCard>

            <SectionCard step={4} title="Payment Method" subtitle="Pay when you receive your order.">
              <div className="flex items-center gap-4 p-4 border-2 border-[#742938] bg-[#FCFAF7]">
                <div className="w-11 h-11 bg-[#742938] text-white flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-serif text-base text-[#121212]">Cash on Delivery</p>
                  <p className="text-xs text-[#121212]/60 font-light mt-0.5">Pay cash when your order is delivered — please have the exact amount ready.</p>
                </div>
                <div className="w-5 h-5 rounded-full bg-[#742938] flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </SectionCard>

            {/* Desktop place order */}
            <div className="max-md:hidden pt-2">
              <button
                onClick={handleCreateOrder}
                disabled={!isFormValid || isInitializing}
                className="w-full bg-[#742938] text-white font-semibold text-xs tracking-[0.25em] uppercase py-5 hover:bg-[#D4AFB9] hover:text-[#742938] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isInitializing ? 'Placing Order…' : 'Place Order · Cash on Delivery'}
              </button>
              <p className="text-[11px] text-[#121212]/40 font-light text-center mt-3">
                By placing your order you agree to our <Link href="/terms" className="underline hover:text-[#742938]">Terms</Link> and <Link href="/privacy" className="underline hover:text-[#742938]">Privacy Policy</Link>.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <OrderSummary items={items} subtotal={subtotal} />
            <SupportBox />
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#E8E4DE] px-4 py-3 z-30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-[#121212]/60 font-semibold tracking-[0.25em] uppercase">Total</span>
          <span className="text-lg font-serif text-[#742938]">
            {currSymbol} {(selectedCurrency !== 'AED' ? convertPrice(subtotal) : subtotal).toFixed(0)}
          </span>
        </div>
        <button
          onClick={handleCreateOrder}
          disabled={!isFormValid || isInitializing}
          className="w-full bg-[#742938] text-white font-semibold text-[11px] tracking-[0.25em] uppercase py-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isInitializing ? 'Placing Order…' : 'Place Order · COD'}
        </button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<LoadingSpinner title="Loading Checkout" subtitle="Please wait..." size="lg" />}>
      <CheckoutContent />
    </Suspense>
  );
}
