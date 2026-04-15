import axios from 'axios';

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'https://cms.shapehive.in';
const WC_KEY = process.env.WC_CONSUMER_KEY || 'ck_f146e83c1755f6497ad2b94fd6bec39fbeb194b3';
const WC_SECRET = process.env.WC_CONSUMER_SECRET || 'cs_325704e131ea0d5d404a707c44fb3ab7232eb76e';

export const wooApi = axios.create({
  baseURL: `${WP_URL}/wp-json/wc/v3`,
  auth: {
    username: WC_KEY,
    password: WC_SECRET,
  },
});
