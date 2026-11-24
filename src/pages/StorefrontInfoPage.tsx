import { ChevronDown } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

type InfoPageKind = 'about' | 'contact' | 'faq' | 'privacy' | 'terms' | 'shipping' | 'returns';

const FAQ_ITEMS = [
  {
    q: 'Is this a real live commerce platform?',
    a: 'No. This application is a structured MERN demonstration prototype built to showcase Indian jewellery and saree workflows, variant inventory, and simulated checkout.',
  },
  {
    q: 'How is jewellery pricing calculated in the demo?',
    a: 'Jewellery supports both Fixed Pricing and Weight-Based Pricing (Admin-managed 24K/22K gold or 925 silver rate × billable metal weight + making charges + additional charges + sample 3% GST).',
  },
  {
    q: 'What is the return policy window?',
    a: 'The prototype models a configurable 7-day return window after delivery, subject to product-specific return eligibility.',
  },
  {
    q: 'How do I connect MongoDB Atlas?',
    a: 'Add your MONGODB_URI connection string to your environment variables (.env) and restart the server. Until then, the storefront runs safely in Demo Fallback Mode.',
  },
];

export function StorefrontInfoPage({ kind }: { kind: InfoPageKind }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContact = (e: FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  if (kind === 'about') {
    return (
      <div className="mx-auto max-w-[960px] px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold tracking-wider text-[#651E32] uppercase">
          About Your Brand · Demonstration Storefront
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-[#25211F] sm:text-5xl">
          Celebrating Handloom Silks &amp; Artisanal Indian Jewellery
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[#25211F]/85">
          Your Brand is an online-only Indian fashion and jewellery demonstration platform curated
          for showcasing Kanjeevaram &amp; Banarasi silk weaves, bridal couture, and hallmarked gold
          and silver jewellery in INR (₹) with English and Telugu bilingual support.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="border border-[#25211F]/10 bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-[#25211F]">Pure Weaves</h2>
            <p className="mt-2 text-sm text-[#6E6560]">
              Silk, cotton, designer, traditional, and bridal saree taxonomies with fabric, zari,
              and blouse metadata.
            </p>
          </div>
          <div className="border border-[#25211F]/10 bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-[#25211F]">Metal Transparency</h2>
            <p className="mt-2 text-sm text-[#6E6560]">
              Weight-based and fixed pricing engines demonstrating purity, gross/net weight, making
              charges, and GST breakdowns.
            </p>
          </div>
          <div className="border border-[#25211F]/10 bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-[#25211F]">India-First UX</h2>
            <p className="mt-2 text-sm text-[#6E6560]">
              Built exclusively for INR (₹) pricing, Indian PIN-code validation previews, and
              bilingual English / Telugu accessibility.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'contact') {
    return (
      <div className="mx-auto max-w-[960px] px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold tracking-wider text-[#651E32] uppercase">
          Concierge &amp; Support
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-[#25211F]">Contact Us</h1>
        <p className="mt-3 text-sm text-[#6E6560]">
          Submit a demonstration inquiry below. No external messages are transmitted in this
          prototype.
        </p>

        <form
          onSubmit={handleContact}
          className="mt-8 space-y-5 border border-[#25211F]/10 bg-white p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#25211F]" htmlFor="contact-name">
                Full Name
              </label>
              <input
                id="contact-name"
                required
                type="text"
                className="mt-1.5 h-11 w-full border border-[#25211F]/20 px-3 text-sm focus:border-[#651E32] focus:outline-none"
                placeholder="Ananya Rao"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#25211F]" htmlFor="contact-email">
                Email Address
              </label>
              <input
                id="contact-email"
                required
                type="email"
                className="mt-1.5 h-11 w-full border border-[#25211F]/20 px-3 text-sm focus:border-[#651E32] focus:outline-none"
                placeholder="customer@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#25211F]" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              className="mt-1.5 w-full border border-[#25211F]/20 p-3 text-sm focus:border-[#651E32] focus:outline-none"
              placeholder="Ask about bridal saree customisation, jewellery weight specs, or order status..."
            />
          </div>
          <button
            type="submit"
            className="h-11 bg-[#651E32] px-6 text-xs font-semibold tracking-wider text-white uppercase hover:bg-[#4D1525]"
          >
            Send Demo Inquiry
          </button>
          {contactSubmitted && (
            <p className="text-xs font-medium text-[#651E32]">
              Demonstration inquiry recorded locally. Thank you for testing the contact flow.
            </p>
          )}
        </form>
      </div>
    );
  }

  if (kind === 'faq') {
    return (
      <div className="mx-auto max-w-[900px] px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold tracking-wider text-[#651E32] uppercase">
          Help Centre
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-[#25211F]">
          Frequently Asked Questions
        </h1>
        <div className="mt-8 divide-y divide-[#25211F]/10 border border-[#25211F]/10 bg-white">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-xl font-semibold text-[#25211F]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#651E32] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-[#6E6560]">{item.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const POLICY_COPY: Record<
    'privacy' | 'terms' | 'shipping' | 'returns',
    { title: string; subtitle: string; points: string[] }
  > = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Demonstration Data Handling Overview',
      points: [
        'This prototype collects only demonstration profile, address, and order fields needed to showcase e-commerce flows.',
        'Real payment card numbers, bank credentials, and live OTP messages are never collected or transmitted.',
        'Passwords in the authentication milestone are hashed on the server using bcrypt.',
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'Demonstration Prototype Usage Terms',
      points: [
        'All product listings, metal rates, discounts, and order confirmations are demonstration simulations.',
        'Prices are displayed in Indian Rupees (INR ₹) with server-verified totals during checkout.',
        'Admin role permissions govern catalogue edits, inventory updates, and financial reporting.',
      ],
    },
    shipping: {
      title: 'Shipping Policy',
      subtitle: 'Simulated India-Wide Delivery Terms',
      points: [
        'Simulated insured shipping applies across valid 6-digit Indian PIN codes.',
        'Orders progress through Pending → Confirmed → Processing → Packed → Shipped → Out for delivery → Delivered.',
        'Customers may cancel orders prior to shipment dispatch.',
      ],
    },
    returns: {
      title: 'Returns Policy',
      subtitle: '7-Day Configurable Return Window',
      points: [
        'Delivered orders support a 7-day return request window for eligible products.',
        'Custom-altered bridal blouses or bespoke engraved items may be marked non-returnable per product eligibility.',
        'Approved returns move orders to Return requested and Refunded statuses in demo operations.',
      ],
    },
  };

  const doc = POLICY_COPY[kind];

  return (
    <div className="mx-auto max-w-[900px] px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold tracking-wider text-[#651E32] uppercase">
        {doc.subtitle}
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-[#25211F]">{doc.title}</h1>
      <div className="mt-8 border border-[#25211F]/10 bg-white p-6 sm:p-8">
        <ul className="space-y-4 text-sm leading-relaxed text-[#25211F]/85">
          {doc.points.map((pt) => (
            <li key={pt} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#651E32]" aria-hidden="true" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 border-t border-[#25211F]/10 pt-5">
          <Link to="/" className="text-xs font-semibold text-[#651E32] hover:underline">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
