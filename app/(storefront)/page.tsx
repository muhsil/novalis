import Link from 'next/link';
import { wooApi } from '@/lib/woocommerce';
import { getStoreSettings } from '@/lib/store-settings';
import ProductCard from '@/components/ui/ProductCard';
import TrustBanner from '@/components/ui/TrustBanner';
import CategorySlider from '@/components/ui/CategorySlider';

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
  const bestSellers = (featured.length > 0 ? featured : allProducts).filter(
    (p: any) => p.images?.[0]?.src
  );
  const newArrivals = allProducts.filter((p: any) => p.images?.[0]?.src);

  return (
    <>
      <TrustBanner currency={currency} />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#1A1A2E]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#1A1A2E] to-[#2A2A4E]" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#C9A96E] blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#C9A96E] blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 max-md:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[420px] max-md:min-h-[320px]">
            {/* Text */}
            <div className="py-12 max-md:py-8">
              <span className="inline-block text-[#C9A96E] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                The Essence of Modern Luxury
              </span>
              <h1 className="text-4xl max-md:text-2xl font-light text-white mb-4 leading-tight">
                Luxury Fragrances with an{' '}
                <span className="font-semibold text-[#C9A96E]">Emirati Signature</span>
              </h1>
              <p className="text-white/60 text-base max-md:text-sm mb-8 leading-relaxed max-w-lg font-light">
                Luxury perfumes in the UAE crafted for men and women who appreciate refined fragrance experiences.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center bg-[#C9A96E] text-white font-semibold text-sm px-8 py-3 rounded-none hover:bg-[#B8985D] transition-colors tracking-wide uppercase"
                >
                  Shop Collection
                </Link>
                <Link
                  href="/shop?category=oud-collection"
                  className="hidden md:inline-flex items-center border border-white/30 text-white font-semibold text-sm px-8 py-3 rounded-none hover:bg-white/10 transition-colors tracking-wide uppercase"
                >
                  Oud Collection
                </Link>
              </div>
            </div>

            {/* Image grid - desktop */}
            <div className="hidden md:grid grid-cols-2 gap-3 p-6">
              {bestSellers.slice(0, 4).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="relative overflow-hidden aspect-square bg-white/5 border border-white/10">
                    <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-xs font-medium line-clamp-1">{p.name}</p>
                      <p className="text-[#C9A96E] text-xs font-semibold">{currency} {parseFloat(p.price || '0').toFixed(0)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Image strip - mobile */}
            <div className="md:hidden flex gap-2 pb-6 overflow-x-auto no-scrollbar">
              {bestSellers.slice(0, 4).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="shrink-0 w-[80px]">
                  <div className="w-[80px] h-[80px] overflow-hidden bg-white/5 border border-white/10">
                    <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[#C9A96E] text-[9px] font-medium mt-1 text-center line-clamp-1">{currency} {parseFloat(p.price || '0').toFixed(0)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {topCategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-8">
          <CategorySlider categories={topCategories} />
        </section>
      )}

      {/* Best Selling Fragrances */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl max-md:text-lg font-light text-[#191919] tracking-wide">Best Selling <span className="font-semibold">Fragrances</span></h2>
            <p className="text-sm text-[#999] mt-1 font-light">Discover the most loved fragrances chosen by our customers.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-md:gap-2">
            {bestSellers.slice(0, 8).map((p: any) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                price={parseFloat(p.price || '0')}
                regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                imageSrc={p.images?.[0]?.src}
                categoryName={p.categories?.[0]?.name}
                onSale={p.on_sale}
                featured={p.featured}
                currency={currency}
              />
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/shop" className="inline-flex items-center text-[#C9A96E] font-semibold text-sm hover:underline tracking-wide uppercase">
              View All Fragrances &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Oud Collection Feature */}
      <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-10">
        <div className="relative overflow-hidden bg-[#1A1A2E] rounded-lg">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#C9A96E] blur-3xl" />
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 max-md:p-5">
              <span className="text-[#C9A96E] text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">Oud Collection</span>
              <h2 className="text-2xl max-md:text-xl font-light text-white mb-3">
                Luxury <span className="font-semibold text-[#C9A96E]">Oud Collection</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6 font-light max-w-md">
                Discover the Oud Collection by Novalis, featuring luxury Arabic oud fragrances designed for depth, sophistication, and lasting impression in the UAE.
              </p>
              <Link
                href="/shop?category=oud-collection"
                className="inline-flex items-center bg-[#C9A96E] text-white font-semibold text-sm px-6 py-2.5 rounded-none hover:bg-[#B8985D] transition-colors tracking-wide uppercase"
              >
                Shop Oud Collection
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center p-8">
              {bestSellers.filter((p: any) => p.categories?.some((c: any) => c.slug === 'oud-collection')).slice(0, 1).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="w-64 h-64 overflow-hidden border border-white/10">
                    <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl max-md:text-lg font-light text-[#191919] tracking-wide">Discover <span className="font-semibold">New Arrivals</span></h2>
            <p className="text-sm text-[#999] mt-1 font-light">Discover our latest fragrances, crafted for modern elegance.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-md:gap-2">
            {newArrivals.slice(0, 8).map((p: any) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                price={parseFloat(p.price || '0')}
                regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                imageSrc={p.images?.[0]?.src}
                categoryName={p.categories?.[0]?.name}
                onSale={p.on_sale}
                featured={p.featured}
                currency={currency}
              />
            ))}
          </div>
        </section>
      )}

      {/* Brand Story */}
      <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-10">
        <div className="bg-[#FAF6F0] rounded-lg p-8 max-md:p-5 text-center">
          <span className="text-[#C9A96E] text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">Luxury Fragrance House</span>
          <h2 className="text-2xl max-md:text-xl font-light text-[#191919] mb-3">
            Luxury Perfumes Crafted with an <span className="font-semibold">Emirati Soul</span>
          </h2>
          <p className="text-[#666] text-sm leading-relaxed max-w-2xl mx-auto font-light mb-6">
            Discover luxury perfumes by Novalis, blending premium ingredients with refined craftsmanship. Inspired by Emirati heritage and designed for modern elegance in the UAE.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center bg-[#C9A96E] text-white font-semibold text-sm px-8 py-3 rounded-none hover:bg-[#B8985D] transition-colors tracking-wide uppercase"
          >
            View More
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-10 pb-10 max-md:pb-20">
        <div className="text-center mb-6">
          <h2 className="text-2xl max-md:text-lg font-light text-[#191919] tracking-wide">Frequently Asked <span className="font-semibold">Questions</span></h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-2">
          {[
            { q: 'What is Novalis Perfumes?', a: 'Novalis Perfumes is a luxury fragrance brand from Dubai, UAE, crafting exclusive perfumes with an authentic Emirati soul using premium ingredients like oud, musk, amber, and rare botanicals.' },
            { q: 'Do you ship internationally?', a: 'Yes, we ship across all GCC countries including UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman, as well as select international destinations.' },
            { q: 'Are Novalis perfumes long-lasting?', a: 'Yes, our perfumes are crafted with high-concentration formulas (Eau de Parfum and Parfum) designed to last 8-12 hours or more on skin.' },
            { q: 'What makes Novalis different from other brands?', a: 'Novalis stands out by blending traditional Arabian perfumery art with modern innovation. Each perfume is handcrafted in limited quantities using premium natural ingredients.' },
          ].map((item) => (
            <details key={item.q} className="bg-white rounded-lg border border-[#f0f0f0] group">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-[#191919] hover:bg-[#fafafa] transition-colors">
                {item.q}
                <svg className="w-4 h-4 text-[#C9A96E] shrink-0 ml-2 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 pb-4 text-sm text-[#666] leading-relaxed font-light">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/faq" className="text-[#C9A96E] font-semibold text-sm hover:underline tracking-wide uppercase">
            View All FAQs &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
