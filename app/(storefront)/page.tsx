import { wooApi } from '@/lib/woocommerce';
import { getStoreSettings } from '@/lib/store-settings';
import HomeContent from '@/components/home/HomeContent';

export const revalidate = 60;


async function getFeaturedProducts() {
  try {
    const { data } = await wooApi.get('/products', {
      params: { featured: true, per_page: 8, status: 'publish' },
    });
    return data as any[];
  } catch { return []; }
}

async function getCategories() {
  try {
    const { data } = await wooApi.get('/products/categories', {
      params: { per_page: 20, hide_empty: true },
    });
    return data as any[];
  } catch { return []; }
}

async function getAllProducts() {
  try {
    const { data } = await wooApi.get('/products', {
      params: { per_page: 12, status: 'publish', orderby: 'date' },
    });
    return data as any[];
  } catch { return []; }
}

export default async function HomePage() {
  const [featured, categories, allProducts, settings] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getAllProducts(),
    getStoreSettings(),
  ]);
  const { currency } = settings;

  const topCategories = categories.filter((c: any) => c.count > 0).slice(0, 8);
  const withImages = allProducts.filter((p: any) => p.images?.[0]?.src);
  const hasFeatured = featured.length > 0;
  const bestSellers = hasFeatured
    ? featured.filter((p: any) => p.images?.[0]?.src)
    : withImages.slice(0, Math.ceil(withImages.length / 2));
  const bestSellerIds = new Set(bestSellers.map((p: any) => p.id));
  const newArrivals = hasFeatured
    ? withImages.filter((p: any) => !bestSellerIds.has(p.id))
    : withImages.slice(Math.ceil(withImages.length / 2));

  return (
    <HomeContent
      currency={currency}
      topCategories={topCategories}
      bestSellers={bestSellers}
      newArrivals={newArrivals}
    />
  );
}
