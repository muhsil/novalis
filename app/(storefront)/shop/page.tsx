import type { Metadata } from 'next';
import { wooApi } from '@/lib/woocommerce';
import { getStoreSettings } from '@/lib/store-settings';
import { extractArNames } from '@/lib/woo-localize';
import ProductCard from '@/components/ui/ProductCard';
import EmptyState from '@/components/ui/EmptyState';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Shop Luxury Perfumes & Fragrances',
  description: 'Browse our full collection of luxury Arabic perfumes, oud oils, dokhun incense, and premium fragrances. Handcrafted scents with delivery across the UAE.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop Luxury Perfumes & Fragrances | Novalis',
    description: 'Browse premium Arabic perfumes and fragrances. Delivery across the UAE.',
  },
};

const CATEGORY_ICONS: Record<string, string> = {
  perfumes: 'perfumes', 'natural-oud': 'dokhun', 'oud-dakhoon': 'dokhun',
  oils: 'oils', dokhun: 'dokhun', 'all-over-spray': 'all-over-spray',
  default: 'all',
};

async function getProducts(search?: string, category?: string) {
  try {
    const params: Record<string, any> = { per_page: 30, status: 'publish' };
    if (search) params.search = search;
    if (category) {
      const { data: cats } = await wooApi.get('/products/categories', { params: { slug: category } });
      if (cats?.[0]?.id) params.category = cats[0].id;
    }
    const { data } = await wooApi.get('/products', { params });
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

export default async function ShopPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ search?: string; category?: string; featured?: string }>;
}) {
  const searchParams = await searchParamsPromise;
  const [products, categories, settings] = await Promise.all([
    getProducts(searchParams.search, searchParams.category),
    getCategories(),
    getStoreSettings(),
  ]);
  const { currency } = settings;

  const isFeatured = searchParams.featured === 'true';
  const displayProducts = isFeatured
    ? products.filter((p: any) => p.featured || p.on_sale)
    : products;

  const topCategories = categories.filter((c: any) => c.count > 0).slice(0, 8);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
      ]} />

      <div className="max-w-7xl mx-auto px-4 max-md:px-3 pb-8 max-md:pb-20 pt-4 max-md:pt-3">
        {/* Results count */}
        <div className="flex items-center justify-between mb-3 mt-1">
          <p className="text-xs text-[#999]">
            {displayProducts.length} {displayProducts.length === 1 ? 'item' : 'items'}
            {isFeatured && <> — Deals &amp; Featured</>}
            {searchParams.search && <> for &quot;{searchParams.search}&quot;</>}
            {searchParams.category && <> in {searchParams.category}</>}
          </p>
        </div>

        {/* Product Grid */}
        {displayProducts.length === 0 ? (
          <EmptyState
            title={isFeatured ? 'No deals right now' : 'No products found'}
            description={isFeatured ? 'Check back soon for new deals.' : 'Try a different search or browse all categories.'}
            actionLabel="Browse All"
            actionHref="/shop"
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-md:gap-2">
            {displayProducts.map((p: any) => {
              const ar = extractArNames(p);
              return (
                <ProductCard
                  key={p.id}
                  slug={p.slug}
                  name={p.name}
                  nameAr={ar.nameAr}
                  price={parseFloat(p.price || '0')}
                  regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                  imageSrc={p.images?.[0]?.src}
                  categoryName={p.categories?.[0]?.name}
                  categoryNameAr={ar.categoryNameAr}
                  onSale={p.on_sale}
                  featured={p.featured}
                  currency={currency}
                  productId={p.id}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
