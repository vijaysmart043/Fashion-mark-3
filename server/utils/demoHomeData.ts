export interface DemoCategory {
  id: string;
  name: string;
  nameTe: string;
  slug: string;
  group: 'Jewellery' | 'Sarees' | 'Fashion';
  tagline: string;
  taglineTe: string;
  itemCount: number;
  image: string;
  route: string;
}

export interface DemoProduct {
  id: string;
  sku: string;
  name: string;
  nameTe: string;
  slug: string;
  category: string;
  categoryGroup: 'Jewellery' | 'Sarees' | 'Fashion';
  material: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  stock: number;
  tag: 'Featured Jewellery' | 'Featured Saree' | 'New Arrival' | 'Bestseller' | 'Wedding Edit' | 'Special Offer';
  sections: Array<'featured-jewellery' | 'featured-sarees' | 'new-arrivals' | 'bestsellers' | 'wedding' | 'offers'>;
  image: string;
  shortDescription: string;
}

export interface DemoTestimonial {
  id: string;
  name: string;
  city: string;
  itemPurchased: string;
  quote: string;
  isDemoContent: true;
}

export const DEMO_HERO_SLIDES = [
  {
    id: 'slide-1',
    kicker: 'Bridal Heritage Edit · Sample Collection',
    kickerTe: 'వధువు వారసత్వ కలెక్షన్ · నమూనా సేకరణ',
    headline: 'Handwoven Kanjeevaram Silks & Temple Gold',
    headlineTe: 'చేనేత కంజీవరం పట్టు చీరలు & టెంపుల్ బంగారు ఆభరణాలు',
    description:
      'Pure mulberry zari weaves and hallmarked 22K nakshi craftsmanship curated for South Indian weddings and heirloom celebrations.',
    descriptionTe:
      'దక్షిణ భారత వివాహాలు మరియు ప్రత్యేక వేడుకల కోసం స్వచ్ఛమైన మల్బరీ జరీ చీరలు మరియు 22K నక్షి ఆభరణాలు.',
    ctaLabel: 'Explore Bridal Edit',
    ctaLabelTe: 'వధువు కలెక్షన్ చూడండి',
    ctaTo: '/collections',
    image: '/src/assets/images/hero_kanjeevaram_saree_1795497745323.jpg',
    alt: 'Model draped in a deep maroon and antique gold Kanjeevaram silk saree in a sunlit sandstone courtyard',
  },
  {
    id: 'slide-2',
    kicker: '22K Temple Craftsmanship · Demo Pricing Active',
    kickerTe: '22K టెంపుల్ నైపుణ్యం · డెమో ధరలు',
    headline: 'Sculpted Kemp Rubies & Antique Gold Haram',
    headlineTe: 'కెంపు రాళ్లు & పురాతన బంగారు హారం సేకరణ',
    description:
      'Transparent weight-based and fixed pricing previews with BIS purity indicators and artisanal making charge breakdowns.',
    descriptionTe:
      'పారదర్శక బరువు ఆధారిత మరియు స్థిర ధరల వివరాలతో స్వచ్ఛమైన బంగారు మరియు వెండి ఆభరణాలు.',
    ctaLabel: 'Browse Jewellery',
    ctaLabelTe: 'ఆభరణాలు చూడండి',
    ctaTo: '/jewellery',
    image: '/src/assets/images/hero_temple_jewellery_1795497745945.jpg',
    alt: '22K antique gold Indian temple bridal necklace and jhumka earrings with ruby accents on travertine',
  },
];

export const DEMO_CATEGORIES: DemoCategory[] = [
  {
    id: 'cat-gold',
    name: 'Gold Jewellery',
    nameTe: 'బంగారు ఆభరణాలు',
    slug: 'gold-jewellery',
    group: 'Jewellery',
    tagline: '22K Temple, Nakshi & Bridal Harams',
    taglineTe: '22K టెంపుల్, నక్షి & వధువు హారాలు',
    itemCount: 18,
    image: '/src/assets/images/cat_gold_jewellery_1795497747301.jpg',
    route: '/jewellery?category=gold-jewellery',
  },
  {
    id: 'cat-silver',
    name: 'Silver Jewellery',
    nameTe: 'వెండి ఆభరణాలు',
    slug: 'silver-jewellery',
    group: 'Jewellery',
    tagline: '925 Sterling Chokers, Payals & Filigree',
    taglineTe: '925 స్టెర్లింగ్ వెండి చోకర్లు & పట్టీలు',
    itemCount: 14,
    image: '/src/assets/images/cat_silver_jewellery_1795497747302.jpg',
    route: '/jewellery?category=silver-jewellery',
  },
  {
    id: 'cat-silk',
    name: 'Silk Sarees',
    nameTe: 'పట్టు చీరలు',
    slug: 'silk-sarees',
    group: 'Sarees',
    tagline: 'Kanjeevaram, Gadwal & Banarasi Zari',
    taglineTe: 'కంజీవరం, గద్వాల్ & బనారసి జరీ',
    itemCount: 24,
    image: '/src/assets/images/cat_silk_sarees_1795497746442.jpg',
    route: '/sarees?category=silk-sarees',
  },
  {
    id: 'cat-designer',
    name: 'Designer & Wedding Sarees',
    nameTe: 'డిజైనర్ & పెళ్లి చీరలు',
    slug: 'designer-sarees',
    group: 'Sarees',
    tagline: 'Organza Zardosi, Tissue & Couture Drapes',
    taglineTe: 'ఆర్గంజా జర్దోసీ & కౌచర్ చీరలు',
    itemCount: 16,
    image: '/src/assets/images/cat_designer_sarees_1795497747151.jpg',
    route: '/sarees?category=designer-sarees',
  },
];

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: 'prod-1',
    sku: 'YB-GLD-1001',
    name: 'Padmavati 22K Kemp Temple Necklace Set',
    nameTe: 'పద్మావతి 22K కెంపు టెంపుల్ హారం సెట్',
    slug: 'padmavati-22k-kemp-temple-necklace',
    category: 'Gold Jewellery',
    categoryGroup: 'Jewellery',
    material: '22K Gold · Kemp Rubies',
    price: 184500,
    originalPrice: 198000,
    discountPercent: 7,
    rating: 4.9,
    reviewCount: 24,
    stock: 4,
    tag: 'Featured Jewellery',
    sections: ['featured-jewellery', 'wedding', 'bestsellers'],
    image: '/src/assets/images/hero_temple_jewellery_1795497745945.jpg',
    shortDescription: 'Handcrafted antique temple necklace with matching pearl-drop jhumkas.',
  },
  {
    id: 'prod-2',
    sku: 'YB-GLD-1002',
    name: 'Nakshatra Carved Gold Kada & Jhumkas',
    nameTe: 'నక్షత్ర చెక్కిన బంగారు కడా & ఝుమ్కాలు',
    slug: 'nakshatra-carved-gold-kada-jhumkas',
    category: 'Gold Jewellery',
    categoryGroup: 'Jewellery',
    material: '22K Hallmark Gold · Uncut Polki',
    price: 96400,
    originalPrice: 104000,
    discountPercent: 7,
    rating: 4.8,
    reviewCount: 18,
    stock: 7,
    tag: 'Bestseller',
    sections: ['featured-jewellery', 'bestsellers', 'new-arrivals'],
    image: '/src/assets/images/cat_gold_jewellery_1795497747301.jpg',
    shortDescription: 'Floral relief-engraved gold kada paired with bridal pearl jhumkas.',
  },
  {
    id: 'prod-3',
    sku: 'YB-SLV-2001',
    name: 'Udaipur 925 Oxidized Silver Hasli Choker',
    nameTe: 'ఉదయ్‌పూర్ 925 ఆక్సిడైజ్డ్ వెండి చోకర్',
    slug: 'udaipur-925-silver-hasli-choker',
    category: 'Silver Jewellery',
    categoryGroup: 'Jewellery',
    material: '925 Sterling Silver · Spinel',
    price: 14800,
    originalPrice: 17500,
    discountPercent: 15,
    rating: 4.7,
    reviewCount: 31,
    stock: 12,
    tag: 'Special Offer',
    sections: ['featured-jewellery', 'offers', 'new-arrivals'],
    image: '/src/assets/images/cat_silver_jewellery_1795497747302.jpg',
    shortDescription: 'Artisanal oxidized silver collar necklace with matching engraved bangles.',
  },
  {
    id: 'prod-4',
    sku: 'YB-SAR-3001',
    name: 'Rani Padma Maroon Pure Kanjeevaram Saree',
    nameTe: 'రాణి పద్మ మెరూన్ స్వచ్ఛమైన కంజీవరం చీర',
    slug: 'rani-padma-maroon-kanjeevaram-saree',
    category: 'Wedding Sarees',
    categoryGroup: 'Sarees',
    material: 'Mulberry Silk · 2G Zari',
    price: 38500,
    originalPrice: 44000,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 42,
    stock: 5,
    tag: 'Wedding Edit',
    sections: ['featured-sarees', 'wedding', 'bestsellers'],
    image: '/src/assets/images/hero_kanjeevaram_saree_1795497745323.jpg',
    shortDescription: 'Deep maroon korvai border silk saree with rich temple-motif zari pallu.',
  },
  {
    id: 'prod-5',
    sku: 'YB-SAR-3002',
    name: 'Varanasi Ivory & Antique Gold Zari Silk',
    nameTe: 'వారణాసి ఐవరీ & బంగారు జరీ పట్టు చీర',
    slug: 'varanasi-ivory-gold-zari-silk',
    category: 'Silk Sarees',
    categoryGroup: 'Sarees',
    material: 'Katan Silk · Handloom Zari',
    price: 26900,
    originalPrice: 31500,
    discountPercent: 15,
    rating: 4.8,
    reviewCount: 29,
    stock: 9,
    tag: 'Featured Saree',
    sections: ['featured-sarees', 'new-arrivals', 'offers'],
    image: '/src/assets/images/cat_silk_sarees_1795497746442.jpg',
    shortDescription: 'Luminous ivory and maroon kadhua floral brocade woven over 18 days.',
  },
  {
    id: 'prod-6',
    sku: 'YB-SAR-3003',
    name: 'Chandni Champagne Tissue Organza Saree',
    nameTe: 'చాందిని షాంపైన్ టిష్యూ ఆర్గంజా చీర',
    slug: 'chandni-champagne-tissue-organza-saree',
    category: 'Designer Sarees',
    categoryGroup: 'Sarees',
    material: 'Silk Organza · Zardosi Border',
    price: 21400,
    originalPrice: 24900,
    discountPercent: 14,
    rating: 4.7,
    reviewCount: 16,
    stock: 6,
    tag: 'New Arrival',
    sections: ['featured-sarees', 'new-arrivals', 'wedding'],
    image: '/src/assets/images/cat_designer_sarees_1795497747151.jpg',
    shortDescription: 'Featherlight tissue organza embellished with delicate hand-worked zardosi.',
  },
];

export const DEMO_METAL_RATES = {
  isDemonstrationRate: true,
  updatedAt: '2026-11-23T09:00:00.000Z',
  gold24kPerGram: 7850,
  gold22kPerGram: 7195,
  silver925PerGram: 98,
  sampleGstPercent: 3,
};

export const DEMO_TESTIMONIALS: DemoTestimonial[] = [
  {
    id: 'demo-rev-1',
    name: 'Ananya Rao',
    city: 'Hyderabad',
    itemPurchased: 'Rani Padma Maroon Pure Kanjeevaram Saree',
    quote:
      'Sample demonstration review: The zari weight and korvai border finish showcased how bridal weaves are presented with clear provenance and pricing.',
    isDemoContent: true,
  },
  {
    id: 'demo-rev-2',
    name: 'Meenakshi Sundaram',
    city: 'Chennai',
    itemPurchased: 'Padmavati 22K Kemp Temple Necklace Set',
    quote:
      'Sample demonstration review: Clear metal rate, weight, and making charge transparency makes evaluating heirloom jewellery effortless.',
    isDemoContent: true,
  },
  {
    id: 'demo-rev-3',
    name: 'Priyanka Reddy',
    city: 'Vijayawada',
    itemPurchased: 'Udaipur 925 Oxidized Silver Hasli Choker',
    quote:
      'Sample demonstration review: Bilingual English and Telugu navigation makes festive family shopping seamless across generations.',
    isDemoContent: true,
  },
];
