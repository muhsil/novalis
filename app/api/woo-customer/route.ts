import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

/**
 * Verify the caller knows both the customer id and the account email.
 * Returns the customer record if the match succeeds, or null otherwise.
 */
async function verifyOwnership(
  customerId: number,
  email: string
): Promise<{ id: number; email: string } | null> {
  if (!customerId || !email) return null;
  try {
    const res = await wooApi.get(`/customers/${customerId}`);
    const c = res.data as { id: number; email: string };
    if (String(c.email || '').toLowerCase() !== email.toLowerCase()) return null;
    return c;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = Number(searchParams.get('id') || 0);
    const email = searchParams.get('email')?.toLowerCase().trim() || '';

    const owned = await verifyOwnership(customerId, email);
    if (!owned) {
      return NextResponse.json({ customer: null }, { status: 403 });
    }

    const response = await wooApi.get(`/customers/${customerId}`);
    return NextResponse.json(
      { customer: response.data },
      {
        headers: {
          'Cache-Control': 'private, max-age=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch customer:', error);
    return NextResponse.json({ customer: null }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const customerId = Number(body.customerId || 0);
    const email = String(body.authEmail || '').toLowerCase().trim();

    const owned = await verifyOwnership(customerId, email);
    if (!owned) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    // Strip out fields the client should never set directly.
    const { customerId: _id, authEmail: _e, meta_data: _m, role: _r, ...updateData } = body;
    void _id; void _e; void _m; void _r;

    const response = await wooApi.put(`/customers/${customerId}`, updateData);
    return NextResponse.json({ customer: response.data });
  } catch (error) {
    console.error('Failed to update customer:', error);
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}
