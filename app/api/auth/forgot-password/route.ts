import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Look up the customer to confirm they exist, but don't reveal whether an
    // account is present (standard practice for password-reset endpoints).
    // Use 'search' since axios URL-encodes '@' which WooCommerce's email filter
    // does not decode.
    await wooApi.get('/customers', {
      params: { search: email, per_page: 10 },
    }).catch(() => null);

    // Ask WordPress core to send its password-reset email. Endpoint lives on
    // the WP site itself at /wp-login.php?action=lostpassword and accepts a
    // standard form POST — this triggers the native WP password reset flow.
    const wpUrl = process.env.NEXT_PUBLIC_WP_URL;
    if (wpUrl) {
      try {
        const form = new URLSearchParams();
        form.set('user_login', email);
        form.set('wp-submit', 'Get New Password');
        form.set('redirect_to', '');
        await fetch(`${wpUrl}/wp-login.php?action=lostpassword`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: form.toString(),
        });
      } catch {
        /* swallow — we still return a generic success response */
      }
    }

    return NextResponse.json({
      ok: true,
      message: 'If an account exists for this email, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Could not process your request. Please try again later.' },
      { status: 500 }
    );
  }
}
