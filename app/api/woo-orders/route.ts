import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

/**
 * List orders for a customer.
 *
 * This endpoint is exposed over plain HTTPS to a client-side "auth store" that
 * has no server-verified session. To prevent enumeration of other customers'
 * orders, we require both `customer_id` and `email` and verify they match.
 * If only an `email` is provided, we look up the customer by email and filter
 * by that id. A request with no identifying parameters returns an empty list.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerIdParam = searchParams.get('customer_id');
    const email = searchParams.get('email')?.toLowerCase().trim() || '';

    let customerId = customerIdParam ? Number(customerIdParam) : 0;

    if (customerId) {
      // Verify the caller actually knows this customer's email before exposing orders.
      try {
        const custRes = await wooApi.get(`/customers/${customerId}`);
        const custEmail = String(custRes.data?.email || '').toLowerCase();
        if (!email || custEmail !== email) {
          return NextResponse.json({ orders: [] }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ orders: [] }, { status: 404 });
      }
    } else if (email) {
      // No customer id supplied — look it up by email so we filter correctly.
      const lookup = await wooApi.get('/customers', {
        params: { search: email, per_page: 10 },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const match = (lookup.data as any[]).find(
        (c) => c.email?.toLowerCase() === email
      );
      if (!match) return NextResponse.json({ orders: [] });
      customerId = match.id;
    } else {
      // No identifying parameters at all — refuse to list anything.
      return NextResponse.json({ orders: [] }, { status: 400 });
    }

    const response = await wooApi.get('/orders', {
      params: {
        per_page: 20,
        orderby: 'date',
        order: 'desc',
        customer: customerId,
      },
    });
    return NextResponse.json(
      { orders: response.data },
      {
        headers: {
          'Cache-Control': 'private, max-age=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ orders: [] }, { status: 500 });
  }
}
