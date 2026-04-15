function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Novalis',
    url: 'https://shapehive.in',
    logo: 'https://shapehive.in/hero-balloons.png',
    description: 'Luxury Arabic perfumes, oud collections, and premium fragrances in Dubai, UAE.',
    email: 'hello@shapehive.in',
    telephone: '+971563554303',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    sameAs: ['https://wa.me/971563554303'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971563554303',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
      areaServed: 'AE',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Novalis',
    url: 'https://shapehive.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://shapehive.in/shop?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

export function LocalBusinessJsonLd({ currency = 'AED' }: { currency?: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://shapehive.in/#business',
    name: 'Novalis',
    image: 'https://shapehive.in/hero-balloons.png',
    url: 'https://shapehive.in',
    telephone: '+971563554303',
    email: 'hello@shapehive.in',
    description: 'Luxury Arabic perfumes, oud collections, and premium fragrances in Dubai. Handcrafted scents inspired by Emirati heritage.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2048,
      longitude: 55.2708,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '21:00',
    },
    priceRange: `${currency} 45 - ${currency} 599`,
    currenciesAccepted: currency,
    paymentAccepted: 'Credit Card, Debit Card',
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://shapehive.in${item.href}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  price: number;
  slug: string;
  inStock: boolean;
  category?: string;
  currency?: string;
}

export function ProductJsonLd({ name, description, image, price, slug, inStock, category, currency = 'AED' }: ProductJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: description.replace(/<[^>]*>/g, '').slice(0, 500),
    image,
    url: `https://shapehive.in/product/${slug}`,
    brand: {
      '@type': 'Brand',
      name: 'Novalis',
    },
    category: category || 'Perfumes & Fragrances',
    offers: {
      '@type': 'Offer',
      url: `https://shapehive.in/product/${slug}`,
      priceCurrency: currency,
      price: price.toFixed(2),
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Novalis',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: currency,
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AE',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
        },
      },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

export function FAQPageJsonLd({ questions }: { questions: { q: string; a: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
