import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

/**
 * Fetch a single order.
 *
 * Requires `email` or `customer_id` that matches the order, to prevent
 * simple id-enumeration of other customers' orders over the proxied
 * WooCommerce REST credentials.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('id');
    const email = searchParams.get('email')?.toLowerCase().trim() || '';
    const customerIdParam = searchParams.get('customer_id');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }

    const response = await wooApi.get(`/orders/${orderId}`);
    const order = response.data as {
      id: number;
      customer_id?: number;
      billing?: { email?: string };
    };

    const emailMatches =
      email && String(order.billing?.email || '').toLowerCase() === email;
    const customerMatches =
      customerIdParam &&
      Number(customerIdParam) > 0 &&
      Number(customerIdParam) === Number(order.customer_id);

    if (!emailMatches && !customerMatches) {
      return NextResponse.json(
        { error: 'Not authorized to view this order' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { order },
      {
        headers: {
          'Cache-Control': 'private, max-age=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch order:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}
