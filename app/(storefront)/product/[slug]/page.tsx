import type { Metadata } from 'next';
import React from 'react';
import { wooApi } from '@/lib/woocommerce';
import { getStoreSettings } from '@/lib/store-settings';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import EmptyState from '@/components/ui/EmptyState';
import ProductImageGallery from '@/components/ui/ProductImageGallery';
import StickyAddToCart from '@/components/ui/StickyAddToCart';
import ProductVariationPicker from '@/components/ui/ProductVariationPicker';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const revalidate = 60;

const SERVICE_FEATURES = [
  { icon: '🚚', title: 'Free UAE Delivery', description: 'Complimentary shipping on orders over AED 100' },
  { icon: '⚡', title: 'Same-Day Delivery', description: 'Order before 2 PM for same-day' },
  { icon: '🎁', title: 'Gift Wrapping', description: 'Complimentary luxury packaging' },
  { icon: '↩️', title: '14-Day Returns', description: 'Full refund on unopened items' },
];

async function getProduct(slug: string) {
  try {
    const { data } = await wooApi.get('/products', { params: { slug } });
    return data?.[0] as any;
  } catch { return null; }
}

async function getVariations(productId: number) {
  try {
    const { data } = await wooApi.get(`/products/${productId}/variations`, {
      params: { per_page: 50 }
    });
    return data as any[];
  } catch { return []; }
}

async function getRelated(categoryIds: number[]) {
  try {
    if (!categoryIds?.length) return [];
    const { data } = await wooApi.get('/products', {
      params: { category: categoryIds[0], per_page: 6, status: 'publish' }
    });
    return data as any[];
  } catch { return []; }
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await paramsPromise;
  try {
    const { data } = await wooApi.get('/products', { params: { slug: params.slug } });
    const product = data?.[0] as any;
    if (!product) return { title: 'Product Not Found' };
    const desc = (product.short_description || product.description || '').replace(/<[^>]*>/g, '').slice(0, 160);
    return {
      title: product.name,
      description: desc || `Buy ${product.name} from Novalis. Luxury Arabic perfumes delivered across the UAE.`,
      alternates: { canonical: `/product/${params.slug}` },
      openGraph: {
        title: `${product.name} | Novalis Dubai`,
        description: desc || `Buy ${product.name} from Novalis Dubai.`,
        type: 'website',
        images: product.images?.[0]?.src ? [{ url: product.images[0].src, width: 800, height: 800 }] : [],
      },
    };
  } catch {
    return { title: 'Product' };
  }
}

function extractFragranceNotes(description: string): { top: string[]; heart: string[]; base: string[] } | null {
  const text = description.replace(/<[^>]*>/g, ' ').toLowerCase();
  const notes: { top: string[]; heart: string[]; base: string[] } = { top: [], heart: [], base: [] };

  const topMatch = text.match(/top\s*(?:notes?)?[:\s-]+([\s\S]*?)(?=heart|middle|base|$)/i);
  const heartMatch = text.match(/(?:heart|middle)\s*(?:notes?)?[:\s-]+([\s\S]*?)(?=base|$)/i);
  const baseMatch = text.match(/base\s*(?:notes?)?[:\s-]+([\s\S]*?)(?:\.|$)/i);

  if (topMatch) notes.top = topMatch[1].split(/[,&]/).map(n => n.trim()).filter(Boolean).slice(0, 4);
  if (heartMatch) notes.heart = heartMatch[1].split(/[,&]/).map(n => n.trim()).filter(Boolean).slice(0, 4);
  if (baseMatch) notes.base = baseMatch[1].split(/[,&]/).map(n => n.trim()).filter(Boolean).slice(0, 4);

  if (notes.top.length || notes.heart.length || notes.base.length) return notes;
  return null;
}

export default async function ProductPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = await paramsPromise;
  const product = await getProduct(params.slug);

  if (!product) {
    return (
      <EmptyState
        title="Product Not Found"
        description="This product may no longer be available. Browse our full collection."
        actionLabel="Browse All Fragrances"
        actionHref="/shop"
      />
    );
  }

  const [variations, related, settings] = await Promise.all([
    product.type === 'variable' ? getVariations(product.id) : Promise.resolve([]),
    getRelated(product.categories?.map((c: any) => c.id)),
    getStoreSettings(),
  ]);
  const { currency } = settings;
  const similarProducts = related.filter((p: any) => p.slug !== params.slug).slice(0, 4);

  const price = parseFloat(product.price || '0');
  const regularPrice = product.regular_price ? parseFloat(product.regular_price) : null;
  const discount = product.on_sale && regularPrice ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;
  const mainImage = product.images?.[0]?.src || '';
  const fragranceNotes = extractFragranceNotes(product.description || '');

  return (
    <div className="max-w-7xl mx-auto pb-16 max-md:pb-24">
      <ProductJsonLd
        name={product.name}
        description={product.short_description || product.description || ''}
        image={mainImage}
        price={price}
        slug={params.slug}
        inStock={product.in_stock !== false}
        category={product.categories?.[0]?.name}
        currency={currency}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: product.name, href: `/product/${params.slug}` },
      ]} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#999] px-6 py-4 max-md:px-4 overflow-x-auto no-scrollbar">
        <Link href="/" className="hover:text-[#C9A96E] transition-colors shrink-0">Home</Link>
        <span className="shrink-0">/</span>
        <Link href="/shop" className="hover:text-[#C9A96E] transition-colors shrink-0">Shop</Link>
        <span className="shrink-0">/</span>
        <span className="text-[#191919] font-medium truncate">{product.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-md:gap-0 px-6 max-md:px-0 mb-16 max-md:mb-8">
        {/* Left: Image Gallery */}
        <ProductImageGallery
          images={product.images || []}
          name={product.name}
          discount={discount}
        />

        {/* Right: Info */}
        <div className="flex flex-col max-md:px-4 max-md:pt-5">
          {/* Categories */}
          {product.categories?.length > 0 && (
            <div className="flex gap-2 mb-3">
              {product.categories.slice(0, 2).map((cat: any) => (
                <span key={cat.id} className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#C9A96E]">{cat.name}</span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#191919] mb-4 leading-tight">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#f0f0f0]">
            <span className="text-2xl font-light text-[#191919]">{currency} {price.toFixed(0)}</span>
            {product.on_sale && regularPrice && (
              <>
                <span className="text-base text-[#bbb] line-through">{currency} {regularPrice.toFixed(0)}</span>
                <span className="text-xs font-semibold text-[#C9A96E] tracking-wide uppercase">Save {discount}%</span>
              </>
            )}
          </div>

          {/* Short description */}
          {product.short_description && (
            <div className="text-[#666] text-sm leading-relaxed mb-6 font-light prose"
              dangerouslySetInnerHTML={{ __html: product.short_description }} />
          )}

          {/* Stock status */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-1.5 h-1.5 rounded-full ${product.in_stock !== false ? 'bg-[#00B578]' : 'bg-red-400'}`} />
            <span className="text-xs tracking-wide uppercase text-[#999]">
              {product.in_stock !== false ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Variations / Add to Cart */}
          <ProductVariationPicker
            productId={product.id}
            productName={product.name}
            basePrice={price}
            image={mainImage}
            attributes={product.attributes || []}
            variations={variations}
          />

          {/* Service features */}
          <div className="grid grid-cols-2 gap-3 mt-8 pt-8 border-t border-[#f0f0f0]">
            {SERVICE_FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-2.5">
                <span className="text-base mt-0.5">{f.icon}</span>
                <div>
                  <span className="text-xs font-semibold text-[#191919] block">{f.title}</span>
                  <p className="text-[10px] text-[#999] mt-0.5 leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fragrance Notes Pyramid */}
      {fragranceNotes && (
        <div className="mx-6 max-md:mx-4 mb-16 max-md:mb-10">
          <div className="text-center mb-8">
            <h2 className="font-serif text-xl font-medium text-[#191919] mb-1">Fragrance Profile</h2>
            <p className="text-xs text-[#999] tracking-wide uppercase">Scent Composition</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: 'Top Notes', notes: fragranceNotes.top, desc: 'First impression' },
              { label: 'Heart Notes', notes: fragranceNotes.heart, desc: 'The character' },
              { label: 'Base Notes', notes: fragranceNotes.base, desc: 'The lasting trail' },
            ].map((tier) => (
              tier.notes.length > 0 && (
                <div key={tier.label} className="text-center p-6 bg-[#FAF6F0] border border-[#f0ebe0]">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C9A96E] mb-1">{tier.label}</p>
                  <p className="text-[9px] text-[#bbb] mb-4 tracking-wide uppercase">{tier.desc}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {tier.notes.map((note) => (
                      <span key={note} className="text-xs text-[#666] font-light capitalize">{note}</span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Product Description */}
      {product.description && (
        <div className="mx-6 max-md:mx-4 mb-16 max-md:mb-10">
          <h3 className="font-serif text-xl font-medium text-[#191919] mb-4">About This Fragrance</h3>
          <div className="prose text-[#666] text-sm leading-relaxed font-light max-w-3xl" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      )}

      {/* Related Products */}
      {similarProducts.length > 0 && (
        <div className="mx-6 max-md:mx-4 mb-16 max-md:mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-medium text-[#191919]">You May Also Like</h2>
            <Link href="/shop" className="text-xs text-[#C9A96E] font-semibold hover:underline tracking-wide uppercase">View All</Link>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-4 gap-4">
            {similarProducts.map((p: any) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                price={parseFloat(p.price || '0')}
                regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                imageSrc={p.images?.[0]?.src}
                variant="compact"
                currency={currency}
                productId={p.id}
              />
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="md:hidden flex overflow-x-auto no-scrollbar gap-3">
            {similarProducts.map((p: any) => (
              <div key={p.id} className="w-[42vw] min-w-[160px] shrink-0">
                <ProductCard
                  slug={p.slug}
                  name={p.name}
                  price={parseFloat(p.price || '0')}
                  regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                  imageSrc={p.images?.[0]?.src}
                  variant="compact"
                  currency={currency}
                  productId={p.id}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Add to Cart (only for simple products) */}
      {product.type !== 'variable' && (
        <StickyAddToCart productId={product.id} name={product.name} price={price} image={mainImage} />
      )}
    </div>
  );
}
