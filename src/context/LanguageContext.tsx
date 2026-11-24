import { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'en' | 'te';

interface TranslationDict {
  brandName: string;
  promoBanner: string;
  navShop: string;
  navJewellery: string;
  navSarees: string;
  navCollections: string;
  navOffers: string;
  searchPlaceholder: string;
  searchButton: string;
  account: string;
  wishlist: string;
  bag: string;
  adminPortal: string;
  shopByCategory: string;
  shopByCategorySub: string;
  curatedShowcase: string;
  curatedShowcaseSub: string;
  featuredJewellery: string;
  featuredSarees: string;
  newArrivals: string;
  bestsellers: string;
  weddingCollection: string;
  specialOffers: string;
  viewAll: string;
  addToBag: string;
  addedToBag: string;
  inStock: string;
  lowStock: string;
  off: string;
  demoRatingLabel: string;
  metalRatesHeading: string;
  metalRatesNotice: string;
  gold24k: string;
  gold22k: string;
  silver925: string;
  gstSample: string;
  testimonialsHeading: string;
  testimonialsBadge: string;
  newsletterHeading: string;
  newsletterSub: string;
  newsletterPlaceholder: string;
  newsletterCta: string;
  footerStory: string;
  customerCare: string;
  policies: string;
  systemStatus: string;
  dbConnected: string;
  dbFallback: string;
  checkHealth: string;
}

const TRANSLATIONS: Record<Language, TranslationDict> = {
  en: {
    brandName: 'Your Brand',
    promoBanner: 'Complimentary insured delivery across India on demonstration orders above ₹15,000',
    navShop: 'Shop',
    navJewellery: 'Jewellery',
    navSarees: 'Sarees',
    navCollections: 'Collections',
    navOffers: 'Offers',
    searchPlaceholder: 'Search Kanjeevaram silk, 22K temple haram, SKU...',
    searchButton: 'Search',
    account: 'Account',
    wishlist: 'Wishlist',
    bag: 'Bag',
    adminPortal: 'Admin Portal',
    shopByCategory: 'Shop by Category',
    shopByCategorySub: 'Heirloom weaves and fine Indian jewellery crafted for celebrations.',
    curatedShowcase: 'Curated Collections',
    curatedShowcaseSub: 'Explore featured jewellery, handloom sarees, bridal edits, and seasonal offers.',
    featuredJewellery: 'Featured Jewellery',
    featuredSarees: 'Featured Sarees',
    newArrivals: 'New Arrivals',
    bestsellers: 'Bestsellers',
    weddingCollection: 'Wedding Collection',
    specialOffers: 'Special Offers',
    viewAll: 'View Catalogue',
    addToBag: 'Add to Bag',
    addedToBag: 'Added',
    inStock: 'In stock',
    lowStock: 'Only',
    off: 'off',
    demoRatingLabel: 'demo reviews',
    metalRatesHeading: 'Daily Gold & Silver Reference Rates',
    metalRatesNotice: 'Demonstration pricing benchmark · Weight-based jewellery breakdown ready',
    gold24k: '24K Gold (999) / g',
    gold22k: '22K Gold (916) / g',
    silver925: '925 Sterling Silver / g',
    gstSample: 'Sample GST',
    testimonialsHeading: 'Patron Impressions',
    testimonialsBadge: 'Demonstration Content — Sample Reviews Only',
    newsletterHeading: 'Receive Atelier Previews & Bridal Lookbooks',
    newsletterSub: 'Join our mailing list for new handloom looms, festive edits, and sample price updates.',
    newsletterPlaceholder: 'Enter your email address',
    newsletterCta: 'Subscribe',
    footerStory:
      'An editorial Indian luxury storefront demonstration uniting Kanjeevaram & Banarasi weaves with hallmarked gold and 925 silver craftsmanship.',
    customerCare: 'Store & Support',
    policies: 'Store Policies',
    systemStatus: 'System & Database',
    dbConnected: 'MongoDB Atlas Connected',
    dbFallback: 'Demo Fallback Mode (Atlas Unconfigured)',
    checkHealth: 'Inspect API Health',
  },
  te: {
    brandName: 'Your Brand',
    promoBanner: '₹15,000 పైన డెమో ఆర్డర్‌లపై భారతదేశం అంతటా ఉచిత బీమా డెలివరీ',
    navShop: 'షాప్',
    navJewellery: 'ఆభరణాలు',
    navSarees: 'చీరలు',
    navCollections: 'కలెక్షన్లు',
    navOffers: 'ఆఫర్లు',
    searchPlaceholder: 'కంజీవరం పట్టు, 22K టెంపుల్ హారం, SKU వెతకండి...',
    searchButton: 'వెతకండి',
    account: 'ఖాతా',
    wishlist: 'విష్‌లిస్ట్',
    bag: 'బ్యాగ్',
    adminPortal: 'అడ్మిన్ పోర్టల్',
    shopByCategory: 'వర్గం వారీగా షాపింగ్',
    shopByCategorySub: 'వేడుకల కోసం ప్రత్యేకంగా రూపొందించిన చేనేత చీరలు మరియు ఆభరణాలు.',
    curatedShowcase: 'ప్రత్యేక సేకరణలు',
    curatedShowcaseSub: 'బంగారు ఆభరణాలు, పట్టు చీరలు, కొత్త రాకలు మరియు వివాహ సేకరణలను చూడండి.',
    featuredJewellery: 'ప్రత్యేక ఆభరణాలు',
    featuredSarees: 'ప్రత్యేక చీరలు',
    newArrivals: 'కొత్తవి',
    bestsellers: 'బెస్ట్ సెల్లర్లు',
    weddingCollection: 'వివాహ సేకరణ',
    specialOffers: 'ప్రత్యేక ఆఫర్లు',
    viewAll: 'పూర్తి కేటలాగ్',
    addToBag: 'బ్యాగ్‌లో చేర్చండి',
    addedToBag: 'చేర్చబడింది',
    inStock: 'స్టాక్ ఉంది',
    lowStock: 'మిగిలినవి',
    off: 'తగ్గింపు',
    demoRatingLabel: 'డెమో సమీక్షలు',
    metalRatesHeading: 'రోజువారీ బంగారం & వెండి నమూనా ధరలు',
    metalRatesNotice: 'డెమో ధరల సూచిక · బరువు ఆధారిత ఆభరణాల ధర లెక్కింపు',
    gold24k: '24K బంగారం (999) / గ్రా',
    gold22k: '22K బంగారం (916) / గ్రా',
    silver925: '925 వెండి / గ్రా',
    gstSample: 'నమూనా GST',
    testimonialsHeading: 'కస్టమర్ అభిప్రాయాలు',
    testimonialsBadge: 'డెమో కంటెంట్ — నమూనా సమీక్షలు మాత్రమే',
    newsletterHeading: 'కొత్త కలెక్షన్లు & బ్రైడల్ లుక్‌బుక్‌లు పొందండి',
    newsletterSub: 'కొత్త చేనేత చీరలు మరియు పండుగ ఆభరణాల వివరాల కోసం సబ్‌స్క్రైబ్ చేయండి.',
    newsletterPlaceholder: 'మీ ఇమెయిల్ చిరునామా నమోదు చేయండి',
    newsletterCta: 'సబ్‌స్క్రైబ్',
    footerStory:
      'కంజీవరం & బనారసి పట్టు చీరలు మరియు స్వచ్ఛమైన బంగారు, వెండి ఆభరణాల కోసం రూపొందించిన డెమో ఆన్‌లైన్ స్టోర్.',
    customerCare: 'స్టోర్ & సహాయం',
    policies: 'విధానాలు',
    systemStatus: 'సిస్టమ్ & డేటాబేస్',
    dbConnected: 'MongoDB Atlas కనెక్ట్ అయింది',
    dbFallback: 'డెమో ఫాల్‌బ్యాక్ మోడ్',
    checkHealth: 'API స్థితిని చూడండి',
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
