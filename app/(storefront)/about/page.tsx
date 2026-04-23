import type { Metadata } from 'next';
import { PageHero, SectionHeader, IconCard, StatGrid, CtaBanner } from '@/components/ui/page';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Novalis Perfumes is a luxury fragrance brand from Dubai, UAE, crafting exclusive perfumes with an authentic Emirati soul.',
  alternates: { canonical: '/about' },
};

const Svg = ({ d }: { d: string }) => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const STATS = [
  { value: '5K+', label: 'Happy Customers' },
  { value: '30+', label: 'Unique Fragrances' },
  { value: '4.9', label: 'Average Rating' },
  { value: 'GCC', label: 'Wide Delivery' },
];

const VALUES = [
  { title: 'Premium Ingredients', description: 'The finest natural oud from Southeast Asia, authentic Arabian musk, Mediterranean amber, Damascene rose, and rare botanical extracts.', icon: <Svg d="M12 2l2.39 7.36H22l-6.19 4.5L18.2 21 12 16.5 5.8 21l2.39-7.14L2 9.36h7.61L12 2z" /> },
  { title: 'GCC Delivery', description: 'Express shipping within 2-4 business days inside the UAE and international delivery within 5-10 business days across all GCC countries.', icon: <Svg d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /> },
  { title: 'Emirati Heritage', description: 'We blend traditional Arabian perfumery art with modern fragrance-making techniques to produce unique scents that reflect Emirati heritage.', icon: <Svg d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> },
  { title: 'Cruelty-Free & Sustainable', description: 'All products are cruelty-free and not tested on animals. We use recyclable packaging and work with environmentally responsible suppliers.', icon: <Svg d="M12 2C9.5 5 7 8 7 12a5 5 0 0010 0c0-4-2.5-7-5-10z" /> },
];

const TIMELINE = [
  { year: '2021', title: 'The Beginning', description: 'Founded in Dubai with a passion for reinventing Arabian perfumery for the modern world.' },
  { year: '2022', title: 'Crafting Heritage', description: 'Developed our first signature collection inspired by the deserts, oases, and souks of the UAE.' },
  { year: '2023', title: 'GCC Expansion', description: 'Extended our reach across all GCC countries with express shipping and dedicated local service.' },
  { year: '2024', title: 'AI Perfumery', description: 'Pioneered AI-assisted scent profiling to deliver personalised fragrance recommendations.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <PageHero
        breadcrumb="About Us"
        eyebrow="The House of Novalis"
        title={<>Luxury with an <br /><span className="italic text-[#D4AFB9]">Emirati Soul</span></>}
        subtitle="Crafting exclusive perfumes from Dubai with premium ingredients — oud, musk, amber, and rare botanicals — inspired by the heritage of the United Arab Emirates."
        patternOrigin="25% 25%"
      />

      <StatGrid stats={STATS} />

      {/* Story */}
      <section className="max-w-6xl mx-auto px-6 py-16 max-md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-md:gap-8 items-center">
          <div>
            <SectionHeader
              eyebrow="Our Story"
              title={<>Luxury Perfumes Crafted with an <span className="italic text-[#742938]">Emirati Soul</span></>}
              align="start"
              className="mb-6"
            />
            <div className="space-y-4 text-sm md:text-base text-[#121212]/70 leading-relaxed font-light">
              <p>Discover luxury perfumes by Novalis, blending premium ingredients with refined craftsmanship. Inspired by Emirati heritage and designed for modern elegance in the UAE.</p>
              <p>Each Novalis fragrance is handcrafted in limited quantities using premium natural ingredients, ensuring the uniqueness of every piece. We draw inspiration from the rich Emirati heritage to deliver an unforgettable olfactory experience.</p>
              <p>Our perfumes are composed of three harmonious fragrance layers — top notes featuring citrus and light spices, heart notes including rose, jasmine, and oud, and base notes of musk, amber, and sandalwood.</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-[#742938] to-[#1A1A1A] overflow-hidden">
              <img src="/hero-perfume.png" alt="Novalis craftsmanship" className="w-full h-full object-cover opacity-70 mix-blend-luminosity" />
            </div>
            <div className="absolute -bottom-5 -start-5 bg-[#D4AFB9] text-[#742938] px-5 py-3 text-[10px] font-semibold tracking-[0.3em] uppercase shadow-md">
              Est. Dubai · UAE
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white border-y border-[#E8E4DE] py-16 max-md:py-10">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            eyebrow="What We Stand For"
            title={<>Our <span className="italic text-[#742938]">Values</span></>}
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-md:gap-4">
            {VALUES.map((v) => (
              <IconCard key={v.title} icon={v.icon} title={v.title} description={v.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-16 max-md:py-10">
        <SectionHeader
          eyebrow="The Journey"
          title={<>Our <span className="italic text-[#742938]">Timeline</span></>}
          className="mb-10"
        />
        <div className="relative">
          <div className="absolute start-4 md:start-1/2 top-0 bottom-0 w-px bg-[#E8E4DE] -translate-x-1/2 md:translate-x-0" />
          {TIMELINE.map((item, i) => (
            <div key={item.year} className={`relative flex gap-6 md:gap-0 mb-10 last:mb-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 md:px-8 ps-12 md:ps-0">
                <div className="bg-white border border-[#E8E4DE] p-6 shadow-sm">
                  <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#D4AFB9]">{item.year}</span>
                  <h3 className="text-xl font-serif text-[#121212] mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-[#121212]/60 font-light leading-relaxed">{item.description}</p>
                </div>
              </div>
              <div className="absolute start-4 md:start-1/2 top-6 w-3 h-3 rounded-full bg-[#742938] ring-4 ring-[#FCFAF7] -translate-x-1/2 md:translate-x-[-50%]" />
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="Explore"
        title={<>Discover Our <span className="italic text-[#D4AFB9]">Collection</span></>}
        subtitle="Explore luxury fragrances crafted with an Emirati signature — designed for those who appreciate refined scent experiences."
        buttonLabel="Shop Collection"
        buttonHref="/shop"
      />
    </div>
  );
}
