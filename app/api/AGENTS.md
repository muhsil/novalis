# `app/api/` — Server Route Handlers

These routes proxy WooCommerce REST (via `wooApi`) on behalf of the browser. They guard the server-side WC credentials and enforce ownership checks — never expose those endpoints as a direct passthrough.

## Security rules (non-negotiable)

### Ownership must be verified by **email**, not by customer/order id alone
WC customer and order ids are sequential integers — trivially guessable. Any route that returns a specific customer's data MUST require an `email` query param and verify it matches the record's billing/account email. `customer_id` is optional and checked as an additional constraint, never as the sole one.

See the canonical pattern in `woo-order/route.ts`:
```ts
if (!email) return 403 { error: 'Email required to view this order' };
const emailMatches = order.billing?.email?.toLowerCase() === email;
const customerMatchesIfSupplied =
  !customerIdParam || Number(customerIdParam) === Number(order.customer_id);
if (!emailMatches || !customerMatchesIfSupplied) return 403;
```

Equivalent checks must exist on:
- `woo-order` (single order by id)
- `woo-orders` (list of orders for a customer)
- `woo-customer` (customer profile)
- `woo-addresses` (GET/PUT billing/shipping)
- `orders/return` (return request creation)

### Duplicate-prevention on mutations
- `POST /api/woo-create-order` — idempotency via client-generated token or retry-safe fields where possible. `wooApi` does NOT retry POST.
- `POST /api/orders/return` — check for existing `return_requested=1` meta before creating; return 409 on duplicate.
- `POST /api/auth/register` — check if WP customer exists by email before creating; avoids duplicate customers if the client retries.

### `wooApi` retry policy (enforced in `lib/woocommerce.ts`)
- Retries **only** GET/HEAD/OPTIONS/PUT/DELETE.
- Never retries POST/PATCH (would cause duplicate resource creation on transient 429/5xx).
- 1 retry max, 300ms + jitter backoff, total worst-case ~12s.

## Auth
WP JWT is attempted first; falls back to PBKDF2 (`balloonsmall_password` meta key — legacy name, stays for DB-compat). See `lib/password.ts`.

## Input validation
Trim and lowercase all emails before comparison. `lastName.trim()` on full-name inputs — NOT `.trimStart()` (trailing whitespace would leak to WC). See PR #23.

## Error responses
- 400: bad request (missing required params)
- 401: unauthenticated (login APIs)
- 403: unauthorized (ownership check failed) — use this, not 404
- 409: conflict (duplicate resource)
- 500: upstream WC error (log, don't leak WC response)

Error bodies are `{ error: string }` — keep strings stable, they're asserted in tests and docs.

## Revalidation
`POST /api/revalidate?path=/shop&secret=$REVALIDATION_SECRET` triggers `revalidatePath`. Secret lives in env, not repo. WC webhooks point at this.
