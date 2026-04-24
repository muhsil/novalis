import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';
import { hashPassword } from '@/lib/password';

/** Split a full name into first + last for WooCommerce's split-name schema. */
function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length <= 1) return { first: parts[0] || '', last: '' };
  return { first: parts[0], last: parts.slice(1).join(' ') };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Accept either { name } (new, single-field flow) or { firstName, lastName } (legacy).
    const rawName: string = body.name
      ? String(body.name)
      : [body.firstName, body.lastName].filter(Boolean).join(' ');
    const email: string = body.email;
    const password: string = body.password;
    const phone: string = body.phone || '';

    if (!email || !password || !rawName.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const { first: firstName, last: lastName } = splitName(rawName);

    // Check if customer already exists
    // Note: use 'search' param instead of 'email' because axios URL-encodes '@' to '%40'
    // which WooCommerce's email filter doesn't decode, returning 0 results.
    const existingRes = await wooApi.get('/customers', {
      params: { search: email, per_page: 10 },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = (existingRes.data as any[]).filter(
      (c) => c.email?.toLowerCase() === email.toLowerCase()
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please log in.' },
        { status: 409 }
      );
    }

    const response = await wooApi.post('/customers', {
      email,
      first_name: firstName,
      last_name: lastName,
      billing: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
      },
      meta_data: [
        { key: 'novalis_password', value: hashPassword(password) },
      ],
    });

    const customer = response.data;

    return NextResponse.json({
      customer: {
        id: customer.id,
        firstName: customer.first_name || '',
        lastName: customer.last_name || '',
        email: customer.email,
        phone: customer.billing?.phone || '',
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
