import type { Metadata } from 'next';
import FAQClient from '@/components/faq/FAQClient';
import { PageHero, CtaBanner } from '@/components/ui/page';
import { WhatsAppIcon } from '@/components/ui/page/icons';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Frequently asked questions about Novalis Perfumes. Learn about our luxury fragrances, shipping, ingredients, and more.',
  alternates: { canonical: '/faq' },
};

export type FAQCategory = 'general' | 'products' | 'shipping' | 'orders';

export const FAQ_ITEMS: { category: FAQCategory; q: string; a: string }[] = [
  { category: 'general', q: 'What is Novalis Perfumes?', a: 'Novalis Perfumes is a luxury fragrance brand from Dubai, UAE, crafting exclusive perfumes with an authentic Emirati soul using premium ingredients like oud, musk, amber, and rare botanicals. Our formulations blend traditional Arabian perfumery art with modern fragrance-making techniques to produce unique scents that reflect the richness of Emirati heritage.' },
  { category: 'general', q: 'What makes Novalis Perfumes different from other brands?', a: 'Novalis stands out by blending traditional Arabian perfumery art with modern innovation. Each perfume is handcrafted in limited quantities using premium natural ingredients, ensuring the uniqueness of every piece. We draw inspiration from the rich Emirati heritage to deliver an unforgettable olfactory experience.' },
  { category: 'general', q: 'Are Novalis perfumes cruelty-free and eco-friendly?', a: 'Yes, Novalis is committed to sustainability and ethical practices. All our products are cruelty-free and not tested on animals. We use recyclable packaging materials and work with suppliers who adhere to environmental sustainability standards.' },
  { category: 'general', q: 'Do you use AI technology in perfume development?', a: 'Yes, Novalis is among the pioneering brands leveraging artificial intelligence and machine learning technologies to analyze customer preferences and develop innovative fragrance compositions. These technologies help us understand market trends and provide personalized recommendations for each customer.' },
  { category: 'products', q: 'What ingredients do you use in Novalis perfumes?', a: 'We use the finest natural ingredients sourced globally, including premium oud from Southeast Asia, authentic Arabian musk, natural Mediterranean amber, Damascene rose, and rare botanical extracts. Each ingredient is carefully selected to ensure the highest quality and longevity of our fragrances.' },
  { category: 'products', q: 'Are Novalis perfumes long-lasting?', a: 'Yes, our perfumes are crafted with high-concentration formulas (Eau de Parfum and Parfum) designed to last 8-12 hours or more on skin. We use premium natural ingredients and carefully calibrated concentration ratios to ensure all-day fragrance performance.' },
  { category: 'products', q: 'Are your perfumes unisex?', a: 'Many of our fragrances are designed to be unisex, embracing the Middle Eastern tradition of shared scent appreciation. Each product page indicates the intended audience to help you choose the perfect fragrance.' },
  { category: 'products', q: 'What are the fragrance layers in Novalis perfumes?', a: 'Novalis perfumes are composed of three harmonious fragrance layers: Top Notes are the first impression lasting 15-30 minutes, featuring citrus and light spices. Heart Notes are the essence of the fragrance appearing after 30 minutes and lasting several hours, including rose, jasmine, and oud. Base Notes are the deepest layer lasting up to 12 hours, featuring musk, amber, and sandalwood.' },
  { category: 'products', q: 'What is the difference between Eau de Parfum and Parfum?', a: 'Eau de Parfum (EDP) contains 15-20% aromatic oil concentration and lasts 6-8 hours, while Parfum contains 20-30% concentration and lasts 8-12 hours or more. Novalis perfumes are available in both concentrations to suit your preferences.' },
  { category: 'products', q: 'How do I choose the right perfume for me?', a: 'We recommend testing the perfume directly on your skin and waiting at least 30 minutes for the heart and base notes to develop. You can also use our smart recommendation tool on our website that suggests fragrances based on your personal preferences. Avoid testing more than 3 fragrances at once to prevent olfactory fatigue.' },
  { category: 'products', q: 'How should I store my perfume to maintain its quality?', a: 'Store your Novalis perfume in a cool, dry place away from direct sunlight and extreme temperatures. Avoid keeping perfume in the bathroom where temperature and humidity fluctuate. We recommend keeping the fragrance in its original box to preserve quality for as long as possible.' },
  { category: 'shipping', q: 'Do you ship internationally?', a: 'Yes, we ship across all GCC countries including UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman, as well as select international destinations. We offer express shipping within 2-4 business days inside the UAE and international delivery within 5-10 business days.' },
  { category: 'shipping', q: 'Do you offer gift wrapping?', a: 'Yes, all Novalis perfumes come in beautifully designed luxury packaging. We also offer premium gift wrapping and personalized gift messages for special occasions such as holidays, weddings, and birthdays.' },
  { category: 'orders', q: 'What is your return and exchange policy?', a: 'We offer a complete satisfaction guarantee. Unopened products can be returned within 14 days of delivery for a full refund or exchange. In case of a product defect, we provide immediate free replacement.' },
  { category: 'orders', q: 'Can I order a custom perfume?', a: 'Yes, we offer bespoke perfume creation services for select clients. Our master perfumers can craft a unique fragrance tailored to your preferences. Contact us via WhatsApp or email for more details about our custom fragrance service.' },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <PageHero
        breadcrumb="FAQ"
        eyebrow="How can we help"
        title={<>Frequently Asked <span className="italic text-[#D4AFB9]">Questions</span></>}
        subtitle="Everything you need to know about Novalis Perfumes — from fragrance notes and longevity to shipping and returns."
      />

      <FAQClient items={FAQ_ITEMS} />

      <CtaBanner
        eyebrow="Still curious?"
        title={<>Still Have <span className="italic text-[#D4AFB9]">Questions?</span></>}
        subtitle="We're happy to help. Reach out anytime and our team will get back to you within 24 hours."
        buttonLabel="WhatsApp Us"
        buttonHref="https://wa.me/971563554303"
        buttonTarget="_blank"
        buttonIcon={WhatsAppIcon}
      />
    </div>
  );
}
