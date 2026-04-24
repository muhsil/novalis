import { wooApi } from './woocommerce';

/**
 * Verify a client-side caller actually owns a given WooCommerce customer id
 * by also knowing the email registered on that account.
 *
 * The storefront uses a client-only Zustand auth store without a server-backed
 * session, so every sensitive API route must re-check ownership instead of
 * trusting a supplied `customer_id` in isolation. Returns true only if both
 * parameters are present and match the customer record in WooCommerce.
 */
export async function verifyCustomerOwnership(
  customerId: number | string | null | undefined,
  email: string | null | undefined
): Promise<boolean> {
  const id = Number(customerId || 0);
  const e = String(email || '').toLowerCase().trim();
  if (!id || !e) return false;
  try {
    const res = await wooApi.get(`/customers/${id}`);
    const accountEmail = String(res.data?.email || '').toLowerCase();
    return accountEmail === e;
  } catch {
    return false;
  }
}
