import { Database, RefreshCw } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useStore } from '../context/StoreContext.tsx';
import { subscribeNewsletter } from '../services/api.ts';

export function Footer() {
  const { t } = useLanguage();
  const { health, healthLoading, setIsHealthModalOpen } = useStore();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setFeedback(null);
    try {
      const res = await subscribeNewsletter(email.trim());
      setFeedback({ ok: true, text: res.message });
      setEmail('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Subscription failed';
      setFeedback({ ok: false, text: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-[#25211F]/12 bg-[#25211F] text-[#F8F5EF]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <Link to="/" className="font-display text-2xl font-semibold text-white">
              {t.brandName}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[#F8F5EF]/75">{t.footerStory}</p>
            <p className="mt-4 text-xs text-[#C5A253]">
              Demonstration MERN E-Commerce Prototype · INR (₹) · India Storefront
            </p>
          </div>

          {/* Storefront & Customer Care */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white">{t.customerCare}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#F8F5EF]/75">
              <li>
                <Link to="/shop" className="hover:text-[#C5A253] transition-colors">
                  {t.navShop}
                </Link>
              </li>
              <li>
                <Link to="/jewellery" className="hover:text-[#C5A253] transition-colors">
                  {t.navJewellery}
                </Link>
              </li>
              <li>
                <Link to="/sarees" className="hover:text-[#C5A253] transition-colors">
                  {t.navSarees}
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-[#C5A253] transition-colors">
                  My Orders &amp; Track Order
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C5A253] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C5A253] transition-colors">
                  Contact Us &amp; FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Admin */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white">{t.policies}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#F8F5EF]/75">
              <li>
                <Link to="/shipping-policy" className="hover:text-[#C5A253] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns-policy" className="hover:text-[#C5A253] transition-colors">
                  Returns Policy (7-Day Window)
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#C5A253] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#C5A253] transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin-panel/"
                  className="text-xs font-medium tracking-wide text-[#C5A253] hover:underline"
                >
                  {t.adminPortal} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Live DB Status */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white">
              {t.newsletterHeading}
            </h3>
            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletterPlaceholder}
                aria-label={t.newsletterPlaceholder}
                className="h-10 border border-white/20 bg-white/5 px-3 text-sm text-white placeholder:text-white/50 focus:border-[#C5A253] focus:outline-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="h-10 bg-[#C5A253] px-4 text-xs font-semibold tracking-wide text-[#25211F] hover:bg-[#d4b366] transition-colors disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : t.newsletterCta}
              </button>
              {feedback && (
                <p
                  className={`text-xs ${
                    feedback.ok ? 'text-[#E5D6B3]' : 'text-red-300'
                  }`}
                >
                  {feedback.text}
                </p>
              )}
            </form>

            <div className="mt-6 border-t border-white/15 pt-4">
              <p className="text-xs font-medium text-[#F8F5EF]/60">{t.systemStatus}</p>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-xs text-[#E5D6B3]">
                  <Database className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {healthLoading ? (
                    <span>Checking API...</span>
                  ) : health?.database.connected ? (
                    <span>{t.dbConnected}</span>
                  ) : (
                    <span>{t.dbFallback}</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => setIsHealthModalOpen(true)}
                  className="inline-flex items-center gap-1 text-xs text-[#C5A253] hover:underline whitespace-nowrap shrink-0"
                >
                  <RefreshCw className="h-3 w-3" aria-hidden="true" />
                  <span>{t.checkHealth}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#F8F5EF]/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Your Brand. Demonstration e-commerce application.</p>
          <p>Milestone 1 Foundation · React + Express + Mongoose</p>
        </div>
      </div>
    </footer>
  );
}
