import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'https://cms.shapehive.in';
const WC_KEY = process.env.WC_CONSUMER_KEY || 'ck_f146e83c1755f6497ad2b94fd6bec39fbeb194b3';
const WC_SECRET = process.env.WC_CONSUMER_SECRET || 'cs_325704e131ea0d5d404a707c44fb3ab7232eb76e';

export const wooApi = axios.create({
  baseURL: `${WP_URL}/wp-json/wc/v3`,
  auth: {
    username: WC_KEY,
    password: WC_SECRET,
  },
  // Fail fast instead of letting a slow/stuck WC request hang SSR forever.
  timeout: 6000,
});

/** Public WP REST client for custom (non-WC) endpoints on the same CMS host. */
export const wpApi = axios.create({
  baseURL: `${WP_URL}/wp-json`,
  timeout: 6000,
});

// Retry transient failures (429 / 5xx / ECONNABORTED) once per configured attempt
// with jittered exponential backoff. Keeps total worst-case latency bounded.
//
// Only safe/idempotent methods are retried. POST/PATCH are excluded because a
// server-side success that surfaces to the client as a timeout/5xx would
// otherwise cause duplicate resource creation (e.g. duplicate customers from
// /api/auth/register, duplicate order notes from /api/orders/return).
type RetryConfig = AxiosRequestConfig & { _retryCount?: number };
const MAX_RETRIES = 1;
const RETRY_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);
const IDEMPOTENT_METHODS = new Set(['get', 'head', 'options', 'put', 'delete']);

function addRetryInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(undefined, async (error: AxiosError) => {
    const config = error.config as RetryConfig | undefined;
    if (!config) throw error;

    const method = (config.method ?? 'get').toLowerCase();
    if (!IDEMPOTENT_METHODS.has(method)) throw error;

    const status = error.response?.status;
    const isTimeout = error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT';
    const retriable = isTimeout || (status !== undefined && RETRY_STATUSES.has(status));
    if (!retriable) throw error;

    config._retryCount = (config._retryCount ?? 0) + 1;
    if (config._retryCount > MAX_RETRIES) throw error;

    const base = 300 * Math.pow(2, config._retryCount - 1);
    const jitter = Math.floor(Math.random() * 200);
    await new Promise((r) => setTimeout(r, base + jitter));
    return client.request(config);
  });
}

addRetryInterceptor(wooApi);
addRetryInterceptor(wpApi);
