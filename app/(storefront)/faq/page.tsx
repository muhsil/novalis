import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Novalis Perfumes. Learn about our luxury fragrances, shipping, ingredients, and more.',
  alternates: { canonical: '/faq' },
};

const FAQ_ITEMS = [
  { q: 'What is Novalis Perfumes?', a: 'Novalis Perfumes is a luxury fragrance brand from Dubai, UAE, crafting exclusive perfumes with an authentic Emirati soul using premium ingredients like oud, musk, amber, and rare botanicals. Our formulations blend traditional Arabian perfumery art with modern fragrance-making techniques to produce unique scents that reflect the richness of Emirati heritage.' },
  { q: 'Do you ship internationally?', a: 'Yes, we ship across all GCC countries including UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman, as well as select international destinations. We offer express shipping within 2-4 business days inside the UAE and international delivery within 5-10 business days.' },
  { q: 'What ingredients do you use in Novalis perfumes?', a: 'We use the finest natural ingredients sourced globally, including premium oud from Southeast Asia, authentic Arabian musk, natural Mediterranean amber, Damascene rose, and rare botanical extracts. Each ingredient is carefully selected to ensure the highest quality and longevity of our fragrances.' },
  { q: 'Are Novalis perfumes long-lasting?', a: 'Yes, our perfumes are crafted with high-concentration formulas (Eau de Parfum and Parfum) designed to last 8-12 hours or more on skin. We use premium natural ingredients and carefully calibrated concentration ratios to ensure all-day fragrance performance.' },
  { q: 'Do you offer gift wrapping?', a: 'Yes, all Novalis perfumes come in beautifully designed luxury packaging. We also offer premium gift wrapping and personalized gift messages for special occasions such as holidays, weddings, and birthdays.' },
  { q: 'What is your return and exchange policy?', a: 'We offer a complete satisfaction guarantee. Unopened products can be returned within 14 days of delivery for a full refund or exchange. In case of a product defect, we provide immediate free replacement.' },
  { q: 'Are your perfumes unisex?', a: 'Many of our fragrances are designed to be unisex, embracing the Middle Eastern tradition of shared scent appreciation. Each product page indicates the intended audience to help you choose the perfect fragrance.' },
  { q: 'How should I store my perfume to maintain its quality?', a: 'Store your Novalis perfume in a cool, dry place away from direct sunlight and extreme temperatures. Avoid keeping perfume in the bathroom where temperature and humidity fluctuate. We recommend keeping the fragrance in its original box to preserve quality for as long as possible.' },
  { q: 'What makes Novalis Perfumes different from other brands?', a: 'Novalis stands out by blending traditional Arabian perfumery art with modern innovation. Each perfume is handcrafted in limited quantities using premium natural ingredients, ensuring the uniqueness of every piece. We draw inspiration from the rich Emirati heritage to deliver an unforgettable olfactory experience.' },
  { q: 'Do you use AI technology in perfume development?', a: 'Yes, Novalis is among the pioneering brands leveraging artificial intelligence and machine learning technologies to analyze customer preferences and develop innovative fragrance compositions. These technologies help us understand market trends and provide personalized recommendations for each customer.' },
  { q: 'What are the fragrance layers in Novalis perfumes?', a: 'Novalis perfumes are composed of three harmonious fragrance layers: Top Notes are the first impression lasting 15-30 minutes, featuring citrus and light spices. Heart Notes are the essence of the fragrance appearing after 30 minutes and lasting several hours, including rose, jasmine, and oud. Base Notes are the deepest layer lasting up to 12 hours, featuring musk, amber, and sandalwood.' },
  { q: 'What is the difference between Eau de Parfum and Parfum?', a: 'Eau de Parfum (EDP) contains 15-20% aromatic oil concentration and lasts 6-8 hours, while Parfum contains 20-30% concentration and lasts 8-12 hours or more. Novalis perfumes are available in both concentrations to suit your preferences.' },
  { q: 'How do I choose the right perfume for me?', a: 'We recommend testing the perfume directly on your skin and waiting at least 30 minutes for the heart and base notes to develop. You can also use our smart recommendation tool on our website that suggests fragrances based on your personal preferences. Avoid testing more than 3 fragrances at once to prevent olfactory fatigue.' },
  { q: 'Are Novalis perfumes cruelty-free and eco-friendly?', a: 'Yes, Novalis is committed to sustainability and ethical practices. All our products are cruelty-free and not tested on animals. We use recyclable packaging materials and work with suppliers who adhere to environmental sustainability standards.' },
  { q: 'Can I order a custom perfume?', a: 'Yes, we offer bespoke perfume creation services for select clients. Our master perfumers can craft a unique fragrance tailored to your preferences. Contact us via WhatsApp or email for more details about our custom fragrance service.' },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 max-md:px-3 py-8 max-md:py-5 max-md:pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#999] mb-6">
        <Link href="/" className="hover:text-[#C9A96E]">Home</Link>
        <span>&gt;</span>
        <span className="text-[#191919] font-medium">FAQ</span>
      </nav>

      <div className="text-center mb-8">
        <h1 className="text-2xl max-md:text-xl font-light text-[#191919] tracking-wide">Frequently Asked <span className="font-semibold">Questions</span></h1>
        <p className="text-sm text-[#999] mt-2 font-light">Everything you need to know about Novalis Perfumes.</p>
      </div>

      <div className="space-y-2">
        {FAQ_ITEMS.map((item) => (
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

      {/* CTA */}
      <div className="bg-[#FAF6F0] rounded-lg p-6 max-md:p-4 text-center mt-8">
        <h2 className="text-lg font-light text-[#191919] mb-2">Still Have <span className="font-semibold">Questions?</span></h2>
        <p className="text-sm text-[#666] mb-4 font-light">We&apos;re happy to help. Reach out anytime.</p>
        <div className="flex justify-center gap-3">
          <a href="https://wa.me/971563554303" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-[#C9A96E] text-white font-semibold text-sm px-6 py-2.5 rounded-none hover:bg-[#B8985D] transition-colors tracking-wide uppercase">
            WhatsApp Us
          </a>
          <a href="mailto:info@novalis.ae" className="inline-flex items-center border border-[#C9A96E] text-[#C9A96E] font-semibold text-sm px-6 py-2.5 rounded-none hover:bg-[#FAF6F0] transition-colors tracking-wide uppercase">
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
