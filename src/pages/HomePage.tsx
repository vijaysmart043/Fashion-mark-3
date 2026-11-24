import { ArrowRight, ChevronLeft, ChevronRight, Database, Sparkles } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard.tsx';
import { ResilientImage } from '../components/ResilientImage.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useStore } from '../context/StoreContext.tsx';
import { subscribeNewsletter } from '../services/api.ts';
import { formatINR } from '../utils/currency.ts';

type ShowcaseTab =
  | 'featured-jewellery'
  | 'featured-sarees'
  | 'new-arrivals'
  | 'bestsellers'
  | 'wedding'
  | 'offers';

export function HomePage() {
  const { language, t } = useLanguage();
  const {
    showcase,
    showcaseLoading,
    showcaseError,
    health,
    setIsHealthModalOpen,
  } = useStore();

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('featured-jewellery');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterBusy, setNewsletterBusy] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  const slides = showcase?.heroSlides ?? [];
  const categories = showcase?.categories ?? [];
  const products = showcase?.products ?? [];
  const testimonials = showcase?.testimonials ?? [];
  const metalRates = showcase?.metalRates;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const tabDefinitions: Array<{ id: ShowcaseTab; label: string }> = [
    { id: 'featured-jewellery', label: t.featuredJewellery },
    { id: 'featured-sarees', label: t.featuredSarees },
    { id: 'new-arrivals', label: t.newArrivals },
    { id: 'bestsellers', label: t.bestsellers },
    { id: 'wedding', label: t.weddingCollection },
    { id: 'offers', label: t.specialOffers },
  ];

  const filteredProducts = products.filter((p) => p.sections.includes(activeTab));

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterBusy(true);
    setNewsletterMessage(null);
    try {
      const res = await subscribeNewsletter(newsletterEmail.trim());
      setNewsletterMessage({ ok: true, text: res.message });
      setNewsletterEmail('');
    } catch (err) {
      setNewsletterMessage({
        ok: false,
        text: err instanceof Error ? err.message : 'Unable to subscribe right now.',
      });
    } finally {
      setNewsletterBusy(false);
    }
  };

  if (showcaseLoading) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6">
        <div className="aspect-[16/9] w-full animate-pulse bg-[#EAE2D3]" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="aspect-[4/3] animate-pulse bg-[#EAE2D3]" />
          ))}
        </div>
      </div>
    );
  }

  if (showcaseError || !showcase) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-[#25211F]">
          Storefront API Unavailable
        </h1>
        <p className="mt-3 text-sm text-[#6E6560]">
          {showcaseError || 'Could not load storefront showcase from /api/storefront/home.'}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 h-11 bg-[#651E32] px-6 text-xs font-semibold tracking-wide text-white hover:bg-[#4D1525]"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const currentSlide = slides[activeSlide] || slides[0];

  return (
    <div>
      {/* 1. Editorial Hero Slider */}
      <section aria-label="Featured seasonal campaigns" className="relative bg-[#25211F]">
        {currentSlide && (
          <div className="relative mx-auto max-w-[1440px]">
            <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:max-h-[640px]">
              <ResilientImage
                src={currentSlide.image}
                alt={currentSlide.alt}
                className="h-full w-full object-cover object-center transition-opacity duration-500"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/45 sm:to-transparent"
              />

              <div className="absolute inset-0 flex items-end sm:items-center">
                <div className="mx-auto w-full max-w-[1280px] px-5 pb-10 sm:px-8 sm:pb-0">
                  <div className="max-w-xl text-white">
                    <p className="text-xs font-medium tracking-[0.14em] text-[#E5D6B3] uppercase">
                      {language === 'te' ? currentSlide.kickerTe : currentSlide.kicker}
                    </p>
                    <h1 className="mt-3 font-display text-3xl leading-[1.1] font-semibold text-white text-balance sm:text-5xl lg:text-[3.5rem]">
                      {language === 'te' ? currentSlide.headlineTe : currentSlide.headline}
                    </h1>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#F8F5EF]/85 sm:text-base">
                      {language === 'te' ? currentSlide.descriptionTe : currentSlide.description}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <Link
                        to={currentSlide.ctaTo}
                        className="inline-flex h-11 items-center gap-2.5 bg-[#651E32] px-6 text-xs font-semibold tracking-wider text-white uppercase whitespace-nowrap hover:bg-[#4D1525] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <span>
                          {language === 'te' ? currentSlide.ctaLabelTe : currentSlide.ctaLabel}
                        </span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsHealthModalOpen(true)}
                        className="inline-flex h-11 items-center gap-2 border border-white/35 bg-black/25 px-4 text-xs font-medium text-[#F8F5EF] backdrop-blur-xs hover:border-[#C5A253] hover:text-[#E5D6B3] transition-colors"
                      >
                        <Database className="h-3.5 w-3.5 text-[#C5A253]" aria-hidden="true" />
                        <span>
                          {health?.database.connected ? t.dbConnected : 'Demo Fallback Active'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              {slides.length > 1 && (
                <div className="absolute right-5 bottom-5 flex items-center gap-2 sm:right-8 sm:bottom-8">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
                    }
                    aria-label="Previous campaign slide"
                    className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/40 text-white hover:bg-[#651E32] transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-2 text-xs font-medium text-white tabular-nums">
                    {activeSlide + 1} / {slides.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
                    aria-label="Next campaign slide"
                    className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/40 text-white hover:bg-[#651E32] transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 2. Shop by Category */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-col justify-between gap-4 border-b border-[#25211F]/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-semibold text-[#25211F] sm:text-4xl">
              {t.shopByCategory}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[#6E6560]">{t.shopByCategorySub}</p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#651E32] uppercase hover:underline whitespace-nowrap shrink-0"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.route}
              className="group flex flex-col border border-[#25211F]/10 bg-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(37,33,31,0.06)]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2ECE1]">
                <ResilientImage
                  src={cat.image}
                  alt={language === 'te' ? cat.nameTe : cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <p className="text-xs font-medium tracking-wider text-[#6E6560] uppercase">
                    {cat.group} <span aria-hidden="true">·</span>{' '}
                    <span className="tabular-nums">{cat.itemCount} styles</span>
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-[#25211F] group-hover:text-[#651E32] transition-colors">
                    {language === 'te' ? cat.nameTe : cat.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#6E6560]">
                    {language === 'te' ? cat.taglineTe : cat.tagline}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#651E32]">
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Curated Collections (Featured Jewellery, Sarees, New Arrivals, Bestsellers, Wedding, Offers) */}
      <section className="border-y border-[#25211F]/10 bg-white/70">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="font-display text-3xl font-semibold text-[#25211F] sm:text-4xl">
                {t.curatedShowcase}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[#6E6560]">{t.curatedShowcaseSub}</p>
            </div>

            <div
              role="tablist"
              aria-label="Curated storefront collections"
              className="flex flex-wrap gap-1.5 border border-[#25211F]/10 bg-[#F8F5EF] p-1"
            >
              {tabDefinitions.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`h-9 px-3.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#651E32] text-white'
                        : 'text-[#25211F]/75 hover:text-[#651E32]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Gold & Silver Reference Rates + Craftsmanship Story */}
      {metalRates && (
        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid items-stretch gap-8 border border-[#25211F]/10 bg-white lg:grid-cols-12">
            <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-7">
              <div>
                <p className="text-xs font-medium tracking-wider text-[#651E32] uppercase">
                  {t.metalRatesNotice}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-[#25211F]">
                  {t.metalRatesHeading}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6E6560]">
                  Weight-based jewellery items calculate final INR value directly from admin-managed
                  gram rates, billable net weight, making charges, and sample GST.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="border border-[#25211F]/10 bg-[#F8F5EF] p-4">
                  <p className="text-xs text-[#6E6560]">{t.gold24k}</p>
                  <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-[#25211F]">
                    {formatINR(metalRates.gold24kPerGram)}
                  </p>
                </div>
                <div className="border border-[#25211F]/10 bg-[#F8F5EF] p-4">
                  <p className="text-xs text-[#6E6560]">{t.gold22k}</p>
                  <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-[#651E32]">
                    {formatINR(metalRates.gold22kPerGram)}
                  </p>
                </div>
                <div className="border border-[#25211F]/10 bg-[#F8F5EF] p-4">
                  <p className="text-xs text-[#6E6560]">{t.silver925}</p>
                  <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-[#25211F]">
                    {formatINR(metalRates.silver925PerGram)}
                  </p>
                </div>
                <div className="border border-[#25211F]/10 bg-[#F8F5EF] p-4">
                  <p className="text-xs text-[#6E6560]">{t.gstSample}</p>
                  <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-[#25211F]">
                    {metalRates.sampleGstPercent}%
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between bg-[#651E32] p-7 text-white sm:p-10 lg:col-span-5">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium tracking-wider text-[#E5D6B3] uppercase">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Heritage Atelier Standard</span>
                </div>
                <h3 className="mt-3 font-display text-3xl font-semibold text-white">
                  From Kanchipuram Looms to Temple Gold Guilds
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#F8F5EF]/80">
                  Every saree and jewellery silhouette in this demonstration showcase represents
                  distinct Indian textile and goldsmithing traditions—paired with variant-level SKU
                  tracking and transparent pricing.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex h-10 items-center bg-[#C5A253] px-5 text-xs font-semibold text-[#25211F] hover:bg-[#d4b366] transition-colors"
                >
                  Our Craft Story
                </Link>
                <Link
                  to="/admin-panel/"
                  className="inline-flex h-10 items-center border border-white/30 px-5 text-xs font-medium text-white hover:border-white transition-colors"
                >
                  {t.adminPortal}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Customer Testimonials (Clearly Marked Demo Content) */}
      <section className="border-t border-[#25211F]/10 bg-white/70">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#651E32] uppercase">
                {t.testimonialsBadge}
              </p>
              <h2 className="mt-1.5 font-display text-3xl font-semibold text-[#25211F]">
                {t.testimonialsHeading}
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((rev) => (
              <blockquote
                key={rev.id}
                className="flex flex-col justify-between border border-[#25211F]/10 bg-white p-6"
              >
                <p className="text-sm leading-relaxed text-[#25211F]/90">“{rev.quote}”</p>
                <footer className="mt-6 border-t border-[#25211F]/8 pt-4 text-xs">
                  <p className="font-semibold text-[#25211F]">
                    {rev.name} <span aria-hidden="true">·</span>{' '}
                    <span className="font-normal text-[#6E6560]">{rev.city}</span>
                  </p>
                  <p className="mt-0.5 text-[#6E6560]">{rev.itemPurchased}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Editorial Newsletter Section */}
      <section className="border-t border-[#25211F]/10 bg-[#EFE9DD]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold text-[#25211F]">
              {t.newsletterHeading}
            </h2>
            <p className="mt-2 text-sm text-[#6E6560]">{t.newsletterSub}</p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={t.newsletterPlaceholder}
              aria-label={t.newsletterPlaceholder}
              className="h-11 flex-1 border border-[#25211F]/20 bg-white px-4 text-sm text-[#25211F] placeholder:text-[#6E6560] focus:border-[#651E32] focus:outline-none"
            />
            <button
              type="submit"
              disabled={newsletterBusy}
              className="h-11 bg-[#651E32] px-6 text-xs font-semibold tracking-wider text-white uppercase whitespace-nowrap shrink-0 hover:bg-[#4D1525] transition-colors disabled:opacity-60"
            >
              {newsletterBusy ? 'Sending...' : t.newsletterCta}
            </button>
          </form>
        </div>
        {newsletterMessage && (
          <div className="mx-auto max-w-[1280px] px-4 pb-8 sm:px-6">
            <p
              className={`text-xs font-medium ${
                newsletterMessage.ok ? 'text-[#651E32]' : 'text-red-700'
              }`}
            >
              {newsletterMessage.text}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
