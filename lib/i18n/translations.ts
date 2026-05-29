export type Locale = 'en' | 'ar';

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navbar & Header
    'nav.search_placeholder': 'Search perfumes, fragrances, oud...',
    'nav.wishlist': 'Wishlist',
    'nav.account': 'Account',
    'nav.cart': 'Cart',
    'nav.shop_now': 'Shop Now',
    'nav.categories': 'Categories',
    'nav.quick_access': 'Quick Access',
    'nav.sign_in': 'Sign In',
    'nav.my_account': 'My Account',
    'nav.all': 'All',
    'nav.perfumes': 'Perfumes',
    'nav.luxury_fragrances': 'Luxury Fragrances',
    'nav.oud_collection': 'Oud Collection',
    'nav.oils': 'Oils',
    'nav.dokhun': 'Dokhun',
    'nav.natural_oud': 'Natural Oud',
    'nav.oud_dakhoon': 'Oud & Dakhoon',
    'nav.all_over_spray': 'All Over Spray',
    'nav.dubai_uae': 'Dubai, UAE',
    'nav.special_offers': 'Special offers',

    // Announcement bar
    'announcement.free_delivery': 'Free Delivery Across UAE',
    'announcement.tagline': 'Luxury Fragrances with an Emirati Signature',

    // Hero
    'hero.subtitle': 'The Art of Perfumery',
    'hero.title_1': 'Luxury Fragrances with an',
    'hero.title_highlight': 'Emirati Signature',
    'hero.description': 'Luxury perfumes in the UAE crafted for men and women who appreciate refined fragrance experiences.',
    'hero.shop_collection': 'Shop Collection',
    'hero.oud_collection': 'Oud Collection',

    // Categories
    'categories.title': 'Shop by Category',
    'categories.title_1': 'Shop by',
    'categories.title_2': 'Category',
    'categories.view_all': 'View All',
    'categories.all_products': 'All Products',

    // Best Sellers
    'bestsellers.title_1': 'Best Selling',
    'bestsellers.title_2': 'Fragrances',
    'bestsellers.subtitle': 'Discover the most loved fragrances chosen by our customers.',
    'bestsellers.view_all': 'View All Fragrances',

    // Oud Collection Feature
    'oud.label': 'Exclusive Collection',
    'oud.title_1': 'Luxury',
    'oud.title_2': 'Oud Collection',
    'oud.description': 'Discover the Oud Collection by Novalis, featuring luxury Arabic oud fragrances designed for depth, sophistication, and lasting impression in the UAE.',
    'oud.cta': 'Shop Oud Collection',

    // New Arrivals
    'arrivals.title_1': 'Discover',
    'arrivals.title_2': 'New Arrivals',
    'arrivals.subtitle': 'Discover our latest fragrances, crafted for modern elegance.',

    // Brand Story
    'brand.label': 'The House of Novalis',
    'brand.title_1': 'Luxury Perfumes Crafted with an',
    'brand.title_2': 'Emirati Soul',
    'brand.description': 'Discover luxury perfumes by Novalis, blending premium ingredients with refined craftsmanship. Inspired by Emirati heritage and designed for modern elegance in the UAE.',
    'brand.cta': 'View More',

    // FAQ
    'faq.title_1': 'Frequently Asked',
    'faq.title_2': 'Questions',
    'faq.view_all': 'View All FAQs',
    'faq.q1': 'What is Novalis Perfumes?',
    'faq.a1': 'Novalis Perfumes is a luxury fragrance brand from Dubai, UAE, crafting exclusive perfumes with an authentic Emirati soul using premium ingredients like oud, musk, amber, and rare botanicals.',
    'faq.q2': 'Do you ship internationally?',
    'faq.a2': 'Yes, we ship across all GCC countries including UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman, as well as select international destinations.',
    'faq.q3': 'Are Novalis perfumes long-lasting?',
    'faq.a3': 'Yes, our perfumes are crafted with high-concentration formulas (Eau de Parfum and Parfum) designed to last 8-12 hours or more on skin.',
    'faq.q4': 'What makes Novalis different from other brands?',
    'faq.a4': 'Novalis stands out by blending traditional Arabian perfumery art with modern innovation. Each perfume is handcrafted in limited quantities using premium natural ingredients.',

    // Trust Banner
    'trust.free_delivery': 'Free UAE Delivery',
    'trust.free_delivery_sub': 'On orders over {currency} {threshold}',
    'trust.gcc_shipping': 'GCC Shipping',
    'trust.gcc_shipping_sub': '2-10 business days',
    'trust.returns': '14-Day Returns',
    'trust.returns_sub': 'Satisfaction guaranteed',
    'trust.quality': 'Premium Quality',
    'trust.quality_sub': 'Handcrafted perfumes',

    // Footer
    'footer.brand_description': 'Luxury Arabic fragrances crafted in the UAE. Premium Emirati-inspired scents with refined craftsmanship.',
    'footer.shop': 'Shop',
    'footer.all_fragrances': 'All Fragrances',
    'footer.company': 'Company',
    'footer.about_us': 'About Us',
    'footer.contact': 'Contact',
    'footer.faq': 'FAQ',
    'footer.shipping': 'Shipping & Delivery',
    'footer.terms': 'Terms & Conditions',
    'footer.privacy': 'Privacy Policy',
    'footer.contact_us': 'Contact Us',
    'footer.copyright': '© {year} Novalis Perfumes. All rights reserved.',
    'footer.tagline': 'Luxury Arabic Fragrances | Dubai, UAE',
    'footer.newsletter_title': 'Join our elite circle',
    'footer.newsletter_subtitle': 'Be the first to know about sales and new arrivals!',
    'arrivals.label': 'Freshly Crafted',

    // Mobile Bottom Nav
    'mobile.home': 'Home',
    'mobile.shop': 'Shop',
    'mobile.cart': 'Cart',
    'mobile.wishlist': 'Wishlist',
    'mobile.account': 'Account',
    'mobile.menu': 'Menu',

    // Currency
    'currency.label': 'Currency',

    // Language
    'lang.en': 'English',
    'lang.ar': 'العربية',
    'lang.switch': 'Language',

    // Product Card
    'product.sold': 'sold',
    'product.hot': 'HOT',
    'product.hit': 'HIT',
    'product.new': 'NEW',

    // Feature Grid
    'feature.legacy_eyebrow': 'Our Craft',
    'feature.legacy_title': 'The art behind',
    'feature.legacy_title_accent': 'the scent.',
    'feature.legacy_desc': 'At Novalis, perfumery is legacy. Each fragrance is crafted from rare treasures — agarwood from Assam, damask rose from the Emirates, saffron from Kashmir, musk and amber — forming the soul of our blends. We preserve age-old formulations while embracing modern elegance, creating scents that distill emotion rather than follow trends.',
    'feature.legacy_cta': 'Experience The Journey',
    'feature.bespoke_eyebrow': 'Made For You',
    'feature.bespoke_title': 'Bespoke experience',
    'feature.bespoke_title_accent': 'for the senses.',
    'feature.bespoke_desc': 'Indulge in a fragrant journey crafted exclusively for you.',
    'feature.bespoke_cta': 'Shop Now',
    'feature.gift_eyebrow': 'Gifting',
    'feature.gift_title': 'A gift as unforgettable',
    'feature.gift_title_accent': 'as the moment.',
    'feature.gift_desc': 'Celebrate life\u2019s special occasions with fragrances that speak from the heart.',
    'feature.gift_cta': 'Shop Gifts',
  },
  ar: {
    // Navbar & Header
    'nav.search_placeholder': 'ابحث عن العطور والعود...',
    'nav.wishlist': 'المفضلة',
    'nav.account': 'الحساب',
    'nav.cart': 'السلة',
    'nav.shop_now': 'تسوق الآن',
    'nav.categories': 'الفئات',
    'nav.quick_access': 'وصول سريع',
    'nav.sign_in': 'تسجيل الدخول',
    'nav.my_account': 'حسابي',
    'nav.all': 'الكل',
    'nav.perfumes': 'العطور',
    'nav.luxury_fragrances': 'عطور فاخرة',
    'nav.oud_collection': 'مجموعة العود',
    'nav.oils': 'الزيوت',
    'nav.dokhun': 'الدخون',
    'nav.natural_oud': 'العود الطبيعي',
    'nav.oud_dakhoon': 'العود والدخون',
    'nav.all_over_spray': 'بخاخ الجسم',
    'nav.dubai_uae': 'دبي، الإمارات',
    'nav.special_offers': 'عروض خاصة',

    // Announcement bar
    'announcement.free_delivery': 'توصيل مجاني في الإمارات',
    'announcement.tagline': 'عطور فاخرة بطابع إماراتي أصيل',

    // Hero
    'hero.subtitle': 'فن صناعة العطور',
    'hero.title_1': 'عطور فاخرة بـ',
    'hero.title_highlight': 'طابع إماراتي',
    'hero.description': 'عطور فاخرة في الإمارات صُنعت للرجال والنساء الذين يقدّرون تجارب العطور الراقية.',
    'hero.shop_collection': 'تسوق المجموعة',
    'hero.oud_collection': 'مجموعة العود',

    // Categories
    'categories.title': 'تسوق حسب الفئة',
    'categories.title_1': 'تسوق حسب',
    'categories.title_2': 'الفئة',
    'categories.view_all': 'عرض الكل',
    'categories.all_products': 'جميع المنتجات',

    // Best Sellers
    'bestsellers.title_1': 'الأكثر',
    'bestsellers.title_2': 'مبيعاً',
    'bestsellers.subtitle': 'اكتشف العطور الأكثر شهرة والتي اختارها عملاؤنا.',
    'bestsellers.view_all': 'عرض جميع العطور',

    // Oud Collection Feature
    'oud.label': 'مجموعة حصرية',
    'oud.title_1': 'مجموعة',
    'oud.title_2': 'العود الفاخرة',
    'oud.description': 'اكتشف مجموعة العود من نوفاليس، التي تضم عطور عود عربية فاخرة مصممة للعمق والأناقة والانطباع الدائم في الإمارات.',
    'oud.cta': 'تسوق مجموعة العود',

    // New Arrivals
    'arrivals.title_1': 'اكتشف',
    'arrivals.title_2': 'الجديد',
    'arrivals.subtitle': 'اكتشف أحدث عطورنا المصنوعة للأناقة العصرية.',

    // Brand Story
    'brand.label': 'دار نوفاليس',
    'brand.title_1': 'عطور فاخرة صُنعت بـ',
    'brand.title_2': 'روح إماراتية',
    'brand.description': 'اكتشف عطور نوفاليس الفاخرة، التي تمزج المكونات الممتازة مع الحرفية الراقية. مستوحاة من التراث الإماراتي ومصممة للأناقة العصرية في الإمارات.',
    'brand.cta': 'عرض المزيد',

    // FAQ
    'faq.title_1': 'الأسئلة',
    'faq.title_2': 'الشائعة',
    'faq.view_all': 'عرض جميع الأسئلة',
    'faq.q1': 'ما هي نوفاليس للعطور؟',
    'faq.a1': 'نوفاليس للعطور هي علامة عطور فاخرة من دبي، الإمارات، تصنع عطوراً حصرية بروح إماراتية أصيلة باستخدام مكونات متميزة مثل العود والمسك والعنبر والنباتات النادرة.',
    'faq.q2': 'هل تشحنون دولياً؟',
    'faq.a2': 'نعم، نشحن إلى جميع دول مجلس التعاون الخليجي بما في ذلك الإمارات والسعودية والكويت وقطر والبحرين وعُمان، بالإضافة إلى وجهات دولية مختارة.',
    'faq.q3': 'هل عطور نوفاليس تدوم طويلاً؟',
    'faq.a3': 'نعم، عطورنا مصنوعة بتركيبات عالية التركيز (أو دو بارفان وبارفان) مصممة لتدوم من 8 إلى 12 ساعة أو أكثر على البشرة.',
    'faq.q4': 'ما الذي يميز نوفاليس عن العلامات الأخرى؟',
    'faq.a4': 'تتميز نوفاليس بمزج فن صناعة العطور العربية التقليدية مع الابتكار الحديث. كل عطر مصنوع يدوياً بكميات محدودة باستخدام مكونات طبيعية ممتازة.',

    // Trust Banner
    'trust.free_delivery': 'توصيل مجاني في الإمارات',
    'trust.free_delivery_sub': 'للطلبات فوق {currency} {threshold}',
    'trust.gcc_shipping': 'شحن الخليج',
    'trust.gcc_shipping_sub': '2-10 أيام عمل',
    'trust.returns': 'إرجاع خلال 14 يوم',
    'trust.returns_sub': 'ضمان الرضا',
    'trust.quality': 'جودة ممتازة',
    'trust.quality_sub': 'عطور مصنوعة يدوياً',

    // Footer
    'footer.brand_description': 'عطور عربية فاخرة صُنعت في الإمارات. روائح إماراتية متميزة بحرفية راقية.',
    'footer.shop': 'تسوق',
    'footer.all_fragrances': 'جميع العطور',
    'footer.company': 'الشركة',
    'footer.about_us': 'من نحن',
    'footer.contact': 'اتصل بنا',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.shipping': 'الشحن والتوصيل',
    'footer.terms': 'الشروط والأحكام',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.contact_us': 'تواصل معنا',
    'footer.copyright': '© {year} نوفاليس للعطور. جميع الحقوق محفوظة.',
    'footer.tagline': 'عطور عربية فاخرة | دبي، الإمارات',
    'footer.newsletter_title': 'انضم إلى دائرتنا النخبوية',
    'footer.newsletter_subtitle': 'كن أول من يعرف عن التخفيضات والوصولات الجديدة!',
    'arrivals.label': 'صُنعت حديثاً',

    // Mobile Bottom Nav
    'mobile.home': 'الرئيسية',
    'mobile.shop': 'تسوق',
    'mobile.cart': 'السلة',
    'mobile.wishlist': 'المفضلة',
    'mobile.account': 'الحساب',
    'mobile.menu': 'القائمة',

    // Currency
    'currency.label': 'العملة',

    // Language
    'lang.en': 'English',
    'lang.ar': 'العربية',
    'lang.switch': 'اللغة',

    // Product Card
    'product.sold': 'مباع',
    'product.hot': 'رائج',
    'product.hit': 'عرض',
    'product.new': 'جديد',

    // Feature Grid
    'feature.legacy_eyebrow': 'حرفتنا',
    'feature.legacy_title': 'الفن وراء',
    'feature.legacy_title_accent': 'العطر.',
    'feature.legacy_desc': 'في نوفاليس، صناعة العطور إرث. كل عطر مصنوع من كنوز نادرة — العود من آسام، ورد الإمارات الدمشقي، زعفران كشمير، المسك والعنبر — تُشكّل روح مزيجنا. نحافظ على التركيبات العريقة مع احتضان الأناقة الحديثة لنصنع عطوراً تبث المشاعر بدلاً من مجاراة الصيحات.',
    'feature.legacy_cta': 'ابدأ رحلة العطر',
    'feature.bespoke_eyebrow': 'مُصمَّم لك',
    'feature.bespoke_title': 'تجربة حصرية',
    'feature.bespoke_title_accent': 'للحواس.',
    'feature.bespoke_desc': 'انغمس في رحلة عطرية مصنوعة خصيصاً لك.',
    'feature.bespoke_cta': 'تسوق الآن',
    'feature.gift_eyebrow': 'هدايا',
    'feature.gift_title': 'هدية لا تُنسى',
    'feature.gift_title_accent': 'كاللحظة نفسها.',
    'feature.gift_desc': 'احتفل بمناسباتك الخاصة بعطور تتحدث من القلب.',
    'feature.gift_cta': 'تسوق الهدايا',
  },
};

export function t(locale: Locale, key: string, params?: Record<string, string>): string {
  let text = translations[locale]?.[key] || translations.en[key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}
