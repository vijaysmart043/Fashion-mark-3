import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useStore } from '../context/StoreContext.tsx';

export function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const { cartCount, wishlistIds, setIsBagOpen } = useStore();
  const [promoVisible, setPromoVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    setSearchOpen(false);
    setMobileMenuOpen(false);
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop');
  };

  const navItems = [
    { label: t.navShop, to: '/shop' },
    { label: t.navJewellery, to: '/jewellery' },
    { label: t.navSarees, to: '/sarees' },
    { label: t.navCollections, to: '/collections' },
    { label: t.navOffers, to: '/offers' },
  ];

  return (
    <>
      {promoVisible && (
        <div className="bg-[#651E32] text-white">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-2 text-xs tracking-wide sm:px-6">
            <p className="truncate font-medium">{t.promoBanner}</p>
            <button
              type="button"
              onClick={() => setPromoVisible(false)}
              aria-label="Dismiss announcement"
              className="shrink-0 p-1 text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-[#25211F]/10 bg-[#F8F5EF]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-4 sm:px-6">
          {/* Zone 1: Single-line Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="flex h-10 w-10 items-center justify-center text-[#25211F] lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link
              to="/"
              className="font-display text-2xl font-semibold tracking-tight text-[#25211F] whitespace-nowrap shrink-0 hover:text-[#651E32] transition-colors"
            >
              {t.brandName}
            </Link>
          </div>

          {/* Zone 2: 5 concise single-line text nav links */}
          <nav
            aria-label="Main storefront navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#25211F]/80"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#651E32] ${
                    isActive
                      ? 'text-[#651E32] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[1.5px] after:bg-[#651E32]'
                      : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Action & utility cluster */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label={t.searchButton}
              className="flex h-10 w-10 items-center justify-center text-[#25211F] hover:text-[#651E32] transition-colors focus-visible:outline-2 focus-visible:outline-[#651E32]"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Switch language between English and Telugu"
              className="h-9 border border-[#25211F]/15 bg-white px-3 text-xs font-medium text-[#25211F] whitespace-nowrap shrink-0 hover:border-[#651E32] hover:text-[#651E32] transition-colors focus-visible:outline-2 focus-visible:outline-[#651E32]"
            >
              {language === 'en' ? 'EN · తెలుగు' : 'తెలుగు · EN'}
            </button>

            <Link
              to="/wishlist"
              aria-label={t.wishlist}
              className="hidden sm:flex h-10 items-center gap-1.5 px-2 text-xs font-medium text-[#25211F] hover:text-[#651E32] whitespace-nowrap shrink-0 transition-colors"
            >
              <Heart className="h-4 w-4" />
              {wishlistIds.length > 0 && (
                <span className="tabular-nums text-[#651E32]">({wishlistIds.length})</span>
              )}
            </Link>

            <Link
              to="/account"
              aria-label={t.account}
              className="hidden sm:flex h-10 w-10 items-center justify-center text-[#25211F] hover:text-[#651E32] transition-colors"
            >
              <User className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setIsBagOpen(true)}
              aria-label={t.bag}
              className="inline-flex h-10 items-center gap-2 bg-[#651E32] px-4 text-xs font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#4D1525] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#651E32]"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              <span>{t.bag}</span>
              <span className="tabular-nums">({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="border-t border-[#25211F]/10 bg-white">
            <form
              onSubmit={handleSearchSubmit}
              className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-3 sm:px-6"
            >
              <Search className="h-4 w-4 text-[#6E6560] shrink-0" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                autoFocus
                className="w-full bg-transparent text-sm text-[#25211F] placeholder:text-[#6E6560] focus:outline-none"
              />
              <button
                type="submit"
                className="h-9 bg-[#651E32] px-4 text-xs font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#4D1525]"
              >
                {t.searchButton}
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="p-2 text-[#6E6560] hover:text-[#25211F]"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[#25211F]/10 bg-[#F8F5EF] px-4 py-4 lg:hidden">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 items-center border-b border-[#25211F]/8 text-sm font-medium text-[#25211F] hover:text-[#651E32]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center gap-4 pt-1 text-sm">
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 items-center gap-2 text-[#25211F]"
                >
                  <Heart className="h-4 w-4" />
                  <span>
                    {t.wishlist} ({wishlistIds.length})
                  </span>
                </Link>
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 items-center gap-2 text-[#25211F]"
                >
                  <User className="h-4 w-4" />
                  <span>{t.account}</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
