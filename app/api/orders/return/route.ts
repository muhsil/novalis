import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

interface ReturnRequestBody {
  orderId: number;
  customerId?: number;
  email: string;
  reason: string;
  details?: string;
}

/**
 * Submit a return request for a WooCommerce order.
 *
 * We do not trust the client to say "this order belongs to me". Before writing
 * anything, we fetch the order from WooCommerce and verify that either:
 *   - the authenticated customer_id on the order matches the submitted customerId, or
 *   - the order's billing email matches the submitted email (case-insensitive).
 *
 * On success we write a customer-visible order note and set a meta flag so the
 * shop owner can filter by "return_requested" in wp-admin.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReturnRequestBody;
    const { orderId, customerId, email, reason, details } = body;

    if (!orderId || !email || !reason) {
      return NextResponse.json(
        { error: 'orderId, email, and reason are required' },
        { status: 400 }
      );
    }

    // Verify the order exists and the requester owns it.
    const orderRes = await wooApi.get(`/orders/${orderId}`);
    const order = orderRes.data as {
      id: number;
      customer_id: number;
      billing?: { email?: string };
      status: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meta_data?: any[];
    };

    const ownsByCustomer = customerId && order.customer_id === Number(customerId);
    const ownsByEmail =
      order.billing?.email?.toLowerCase() === String(email).toLowerCase();

    if (!ownsByCustomer && !ownsByEmail) {
      return NextResponse.json(
        { error: 'This order does not belong to the provided account or email.' },
        { status: 403 }
      );
    }

    const existingMeta = Array.isArray(order.meta_data) ? order.meta_data : [];
    const alreadyRequested = existingMeta.some(
      (m: { key?: string }) => m?.key === 'return_requested'
    );
    if (alreadyRequested) {
      return NextResponse.json(
        { error: 'A return request has already been submitted for this order.' },
        { status: 409 }
      );
    }

    const noteBody = [
      `Return requested by customer.`,
      `Reason: ${reason}`,
      details ? `Details: ${details}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    // Attach a customer-visible note to the order.
    await wooApi.post(`/orders/${orderId}/notes`, {
      note: noteBody,
      customer_note: true,
    });

    // Flag the order so staff can find it in wp-admin.
    await wooApi.put(`/orders/${orderId}`, {
      meta_data: [
        { key: 'return_requested', value: '1' },
        { key: 'return_reason', value: reason },
        { key: 'return_details', value: details || '' },
        { key: 'return_requested_at', value: new Date().toISOString() },
      ],
    });

    return NextResponse.json({
      ok: true,
      message: 'Your return request has been received. Our team will contact you shortly.',
    });
  } catch (error) {
    console.error('Return request error:', error);
    return NextResponse.json(
      { error: 'Could not submit return request. Please try again later.' },
      { status: 500 }
    );
  }
}
