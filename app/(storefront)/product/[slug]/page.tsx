import type { Metadata } from 'next';
import React from 'react';
import { wooApi } from '@/lib/woocommerce';
import { getStoreSettings } from '@/lib/store-settings';
import { extractArNames } from '@/lib/woo-localize';
import LocalizedText from '@/components/ui/LocalizedText';
import Link from 'next/link';
import EmptyState from '@/components/ui/EmptyState';
import ProductImageGallery from '@/components/ui/ProductImageGallery';
import StickyAddToCart from '@/components/ui/StickyAddToCart';
import ProductVariationPicker from '@/components/ui/ProductVariationPicker';
import PriceDisplay from '@/components/ui/PriceDisplay';
import ProductSlider from '@/components/ui/ProductSlider';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const revalidate = 60;


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

async function getRelated(relatedIds: number[], categoryIds: number[], currentSlug: string) {
  const tryFetch = async (params: Record<string, unknown>): Promise<any[]> => {
    try {
      const { data } = await wooApi.get('/products', { params });
      return (data as any[]).filter((p) => p.slug !== currentSlug);
    } catch {
      return [];
    }
  };

  // Prefer WooCommerce's built-in related_ids
  if (relatedIds?.length) {
    const results = await tryFetch({
      include: relatedIds.join(','), per_page: 20, status: 'publish',
    });
    if (results.length) return results;
  }

  // Fallback 1: same category
  if (categoryIds?.length) {
    const results = await tryFetch({
      category: categoryIds.join(','), per_page: 20, status: 'publish',
    });
    if (results.length) return results;
  }

  // Fallback 2: any latest published products
  return tryFetch({ per_page: 12, status: 'publish', orderby: 'date' });
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
    getRelated(
      product.related_ids || [],
      product.categories?.map((c: any) => c.id) || [],
      params.slug,
    ),
    getStoreSettings(),
  ]);
  const { currency } = settings;
  const similarProducts = related.slice(0, 10);

  const price = parseFloat(product.price || '0');
  const regularPrice = product.regular_price ? parseFloat(product.regular_price) : null;
  const discount = product.on_sale && regularPrice ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;
  const mainImage = product.images?.[0]?.src || '';
  const fragranceNotes = extractFragranceNotes(product.description || '');
  const ar = extractArNames(product);

  return (
    <div className="max-w-7xl mx-auto pb-10 max-md:pb-24">
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
      <nav className="flex items-center gap-2 text-[11px] text-[#999] px-4 max-md:px-3 py-2 max-md:py-2 overflow-x-auto no-scrollbar">
        <Link href="/" className="hover:text-[#191919] transition-colors shrink-0">Home</Link>
        <span className="shrink-0 text-[#ddd]">/</span>
        <Link href="/shop" className="hover:text-[#191919] transition-colors shrink-0">Shop</Link>
        <span className="shrink-0 text-[#ddd]">/</span>
        <span className="text-[#191919] truncate"><LocalizedText en={product.name} ar={ar.nameAr} /></span>
      </nav>

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-md:gap-0 px-4 max-md:px-0 mb-10 max-md:mb-4">
        {/* Left: Image Scroller */}
        <div>
          <ProductImageGallery
            images={product.images || []}
            name={product.name}
            discount={discount}
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col max-md:px-3 max-md:pt-3">
          {/* Categories */}
          {product.categories?.length > 0 && (
            <div className="flex gap-2 mb-3">
              {product.categories.slice(0, 2).map((cat: any) => (
                <span key={cat.id} className="text-[10px] text-[#D4AFB9] font-bold tracking-[0.25em] uppercase">{cat.name}</span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-serif text-[#121212] mb-6 leading-[1.1]">
            <LocalizedText en={product.name} ar={ar.nameAr} />
          </h1>

          {/* Price */}
          <PriceDisplay 
            amount={price} 
            originalAmount={regularPrice} 
            onSale={product.on_sale} 
            size="xl" 
            className="mb-8 pb-8 border-b border-[#E8E4DE]/50" 
          />

          {/* Short description */}
          {product.short_description && (
            <LocalizedText
              en={product.short_description}
              ar={ar.shortDescriptionAr}
              html
              className="text-[#121212]/70 text-sm md:text-base leading-relaxed mb-6 font-light prose"
            />
          )}

          {/* Stock status */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`w-1.5 h-1.5 rounded-full ${product.in_stock !== false ? 'bg-[#D4AFB9]' : 'bg-[#8B0000]'}`} />
            <span className="text-xs text-[#121212]/60 uppercase tracking-widest font-semibold">
              {product.in_stock !== false ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Add to Cart / Variations */}
          <div className="mb-10">
            <ProductVariationPicker
              productId={product.id}
              productName={product.name}
              basePrice={price}
              image={mainImage}
              attributes={product.attributes || []}
              variations={variations}
            />
          </div>

          {/* Details Accordion */}
          <div className="mt-4">
            <Accordion>
              {fragranceNotes && (
                <AccordionItem title="Fragrance Profile" defaultOpen={true}>
                  <div className="flex flex-col gap-6 py-2">
                    {[
                      { label: 'Top Notes', notes: fragranceNotes.top, desc: 'First impression' },
                      { label: 'Heart Notes', notes: fragranceNotes.heart, desc: 'The character' },
                      { label: 'Base Notes', notes: fragranceNotes.base, desc: 'The lasting trail' },
                    ].map((tier) => (
                      tier.notes.length > 0 && (
                        <div key={tier.label}>
                          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#D4AFB9] mb-1">{tier.label}</p>
                          <div className="flex flex-wrap gap-2">
                            {tier.notes.map((note, index) => (
                              <React.Fragment key={note}>
                                <span className="text-sm font-serif text-[#121212] capitalize">{note}</span>
                                {index !== tier.notes.length - 1 && <span className="text-[#121212]/20 px-1">•</span>}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </AccordionItem>
              )}

              {product.description && (
                <AccordionItem title="About This Fragrance">
                  <LocalizedText
                    en={product.description}
                    ar={ar.descriptionAr}
                    html
                    className="prose prose-sm text-[#121212]/70 leading-relaxed font-light py-2"
                  />
                </AccordionItem>
              )}
              
              <AccordionItem title="Shipping & Returns">
                <div className="space-y-3 py-2 text-[#121212]/70 font-light text-sm">
                  <p><strong>Free Delivery:</strong> Available across all emirates in the UAE for orders above {currency} 250.</p>
                  <p><strong>Standard Delivery:</strong> 1-2 business days within Dubai, 2-3 business days for other emirates.</p>
                  <p><strong>Returns:</strong> We accept returns for unopened and sealed full-size bottles within 14 days of delivery. Sample sets and opened fragrances cannot be returned for hygiene reasons.</p>
                </div>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>

      {/* Related Products */}
      {similarProducts.length > 0 && (
        <div className="border-t border-[#121212]/10 pt-8 mt-16 pb-8">
          <ProductSlider
            products={similarProducts}
            title1="You May Also"
            title2="Like"
            viewAllLink="/shop"
            viewAllText="View All"
            currSymbol={currency}
          />
        </div>
      )}

      {/* Mobile Sticky Add to Cart (only for simple products) */}
      {product.type !== 'variable' && (
        <StickyAddToCart productId={product.id} name={product.name} price={price} image={mainImage} />
      )}
    </div>
  );
}
