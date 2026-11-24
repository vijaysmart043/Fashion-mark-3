# Your Brand — MERN Indian Jewellery, Saree & Fashion E-Commerce Demo

A full-stack MERN demonstration prototype for an online Indian luxury jewellery, saree, and bridal couture store featuring INR (`₹`) pricing, English & Telugu bilingual UI, an Express + Mongoose backend, and a clearly labelled Demo Fallback Mode when MongoDB Atlas is not yet configured.

> **Prototype Notice:** This is a demonstration application, not a production commerce platform. Sample products, metal rates, testimonials, and upcoming simulated payments/OTPs are strictly for evaluation and demonstration.

---

## Current Milestone: Milestone 1 — Project Foundation

Implemented in Milestone 1:
- React + TypeScript + Vite frontend with React Router, bilingual `EN / తెలుగు` context, INR formatting, and responsive luxury editorial storefront homepage.
- Express.js backend (`server.ts` + modular `server/` layers) with security headers (`helmet`), CORS restrictions, API rate limiting (`express-rate-limit`), and centralized error handling.
- MongoDB Atlas connection manager (`server/config/db.ts`) using `MONGODB_URI` with automatic graceful fallback to clearly labelled **Demo Fallback Mode** when `MONGODB_URI` is unset.
- Health-check endpoint (`GET /api/health`) and storefront showcase endpoints (`GET /api/storefront/home`, `POST /api/storefront/newsletter`) wired directly to the frontend UI.

---

## Directory Structure

Adapted to the Google AI Studio / Vite full-stack runtime while preserving strict client-server separation:

```text
/
├── server.ts                       # Express entry point (mounts Vite middleware in dev, dist/ in prod)
├── server/
│   ├── config/
│   │   ├── env.ts                  # Server-only environment variables & ephemeral JWT fallback
│   │   └── db.ts                   # Mongoose MongoDB Atlas connector + demo-fallback status
│   ├── controllers/
│   │   ├── healthController.ts     # GET /api/health handler
│   │   └── storefrontController.ts # GET /api/storefront/home & POST /api/storefront/newsletter
│   ├── middleware/
│   │   ├── errorHandler.ts         # Centralized API 404 & error handling
│   │   └── rateLimiter.ts          # API rate limiting
│   ├── routes/
│   │   ├── healthRoutes.ts
│   │   └── storefrontRoutes.ts
│   └── utils/
│       └── demoHomeData.ts         # Milestone 1 bilingual demo showcase & sample rates
├── src/
│   ├── assets/images/              # Generated luxury saree & jewellery photography
│   ├── components/                 # Reusable UI (Header, Footer, ProductCard, BagDrawer, HealthStatusModal, ResilientImage)
│   ├── context/                    # LanguageContext (EN/TE), StoreContext (Health, Bag, Wishlist)
│   ├── layouts/                    # StorefrontLayout, AdminLayout
│   ├── pages/                      # HomePage, StorefrontInfoPage, MilestoneRoutePage
│   ├── services/                   # Typed Axios API client (src/services/api.ts)
│   ├── utils/                      # INR currency formatter (src/utils/currency.ts)
│   ├── App.tsx                     # React Router route map
│   ├── index.css                   # Tailwind CSS v4 + luxury ivory/maroon/gold theme tokens
│   └── main.tsx
├── .env.example
├── index.html
├── metadata.json
├── package.json
└── README.md
```

---

## Environment Configuration

1. Copy `.env.example` to `.env` (never commit `.env`):
   ```bash
   cp .env.example .env
   ```
2. Configure variables in `.env`:
   - `PORT=3000` (port `3000` is required by AI Studio; locally you may use `3000` or `5000`)
   - `NODE_ENV=development`
   - `MONGODB_URI=` (leave empty for Demo Fallback Mode, or paste your MongoDB Atlas SRV URI)
   - `JWT_SECRET=` (optional in Milestone 1; set a strong random string before Milestone 3)
   - `CLIENT_URL=http://localhost:3000`
   - `CLOUDINARY_*` (optional; local generated sample assets work without Cloudinary keys)

---

## MongoDB Atlas Connection Instructions

1. Sign in to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free M0 cluster.
2. Under **Database Access**, create a database user with Read/Write permissions.
3. Under **Network Access**, add your IP address (or `0.0.0.0/0` for temporary evaluation).
4. Click **Connect → Drivers**, copy the Node.js SRV connection string, and paste it into `MONGODB_URI` in `.env` (with your database name, e.g. `mongodb+srv://user:pass@cluster.mongodb.net/your_brand_demo?retryWrites=true&w=majority`).
5. Restart the server and click **Inspect API Health** in the storefront footer to confirm `MongoDB Atlas Connected`.

---

## Local Run Instructions (Windows PowerShell)

```powershell
# 1. Install dependencies
npm install

# 2. Create environment file
Copy-Item .env.example .env

# 3. Start full-stack dev server (Express + Vite on http://localhost:3000)
npm run dev

# 4. Type-check & production build verification
npm run lint
npm run build
```

---

## Milestone Roadmap

- **Milestone 1 (Complete):** Project foundation, Express + Vite integration, MongoDB Atlas connector with demo fallback, `/api/health`, shared layouts, bilingual EN/TE luxury homepage.
- **Milestone 2 (Next):** Mongoose schemas (`Category`, `Product`, `ProductVariant`, `MetalRate`), seeded 23+ products (8+ jewellery, 10+ sarees, 5+ fashion), PDP with image zoom, variant SKU selection, jewellery weight-based pricing engine, search & multi-facet filtering, simulated PIN-code checker.
- **Milestone 3:** Customer & Admin JWT authentication, bcrypt hashing, demo OTP (`123456`), saved addresses, RBAC.
- **Milestone 4:** Cart, wishlist, coupons, checkout, simulated payments, order placement.
- **Milestone 5:** Stock reservations, inventory movements, shipment tracking, PDF invoices, 7-day return requests.
- **Milestone 6:** Admin analytics dashboard, Recharts charts, product/variant/inventory/rate/coupon/staff management.
- **Milestone 7:** End-to-end verification, responsive polish, and final demo readiness.
