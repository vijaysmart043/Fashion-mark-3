import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { StoreProvider } from './context/StoreContext.tsx';
import { AdminLayout } from './layouts/AdminLayout.tsx';
import { StorefrontLayout } from './layouts/StorefrontLayout.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { MilestoneRoutePage } from './pages/MilestoneRoutePage.tsx';
import { StorefrontInfoPage } from './pages/StorefrontInfoPage.tsx';

export default function App() {
  return (
    <LanguageProvider>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<StorefrontLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/shop"
                element={
                  <MilestoneRoutePage
                    title="All Collections"
                    milestone="Milestone 2 Catalogue Target"
                    description="Browse Milestone 1 sample pieces below. Full multi-facet filtering, sorting, and MongoDB text search arrive in Milestone 2."
                    showCataloguePreview
                  />
                }
              />
              <Route
                path="/jewellery"
                element={
                  <MilestoneRoutePage
                    title="Gold, Silver & Temple Jewellery"
                    milestone="Milestone 2 Jewellery Engine Target"
                    description="Preview our demonstration jewellery pieces below. Weight-based metal pricing calculators and purity specs arrive in Milestone 2."
                    showCataloguePreview
                    filterGroup="Jewellery"
                  />
                }
              />
              <Route
                path="/sarees"
                element={
                  <MilestoneRoutePage
                    title="Kanjeevaram, Silk & Designer Sarees"
                    milestone="Milestone 2 Saree Catalogue Target"
                    description="Preview our demonstration saree weaves below. Fabric, blouse, pattern filters, and variant SKUs arrive in Milestone 2."
                    showCataloguePreview
                    filterGroup="Sarees"
                  />
                }
              />
              <Route
                path="/collections"
                element={
                  <MilestoneRoutePage
                    title="Bridal & Heritage Collections"
                    milestone="Milestone 2 Collections Target"
                    description="Curated wedding and festive edits across sarees and heirloom jewellery."
                    showCataloguePreview
                  />
                }
              />
              <Route
                path="/offers"
                element={
                  <MilestoneRoutePage
                    title="Seasonal Offers & Coupon Showcase"
                    milestone="Milestone 4 Promotions Target"
                    description="Preview discounted demonstration pieces below. Coupon validation and cart discounts arrive in Milestone 4."
                    showCataloguePreview
                  />
                }
              />
              <Route
                path="/product/:slug"
                element={
                  <MilestoneRoutePage
                    title="Product Detail Preview"
                    milestone="Milestone 2 PDP & Variant Engine Target"
                    description="Full gallery zoom, variant SKU selection, jewellery rate breakdown, and simulated PIN-code checker arrive in Milestone 2."
                    showCataloguePreview
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <MilestoneRoutePage
                    title="Shopping Bag"
                    milestone="Milestone 4 Cart & Coupons Target"
                    description="Full cart page with coupon codes, GST calculations, and shipping rules arrives in Milestone 4. Use the Bag drawer in the header for Milestone 1 preview."
                  />
                }
              />
              <Route
                path="/checkout"
                element={
                  <MilestoneRoutePage
                    title="Checkout & Simulated Payments"
                    milestone="Milestone 4 Checkout Target"
                    description="Customer details, address selection, simulated UPI/Card/NetBanking/Wallet/COD payments, and atomic stock reservation arrive in Milestones 4–5."
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <MilestoneRoutePage
                    title="Customer Sign In"
                    milestone="Milestone 3 Authentication Target"
                    description="JWT authentication, bcrypt password login, and development-only OTP verification (123456) arrive in Milestone 3."
                  />
                }
              />
              <Route
                path="/register"
                element={
                  <MilestoneRoutePage
                    title="Customer Registration"
                    milestone="Milestone 3 Authentication Target"
                    description="Customer registration with name, email, mobile, and hashed password arrives in Milestone 3."
                  />
                }
              />
              <Route
                path="/wishlist"
                element={
                  <MilestoneRoutePage
                    title="Saved Wishlist"
                    milestone="Milestone 4 Wishlist Target"
                    description="Persistent customer wishlists arrive in Milestone 4. Items saved on the homepage can be previewed across this session."
                    showCataloguePreview
                  />
                }
              />
              <Route
                path="/account"
                element={
                  <MilestoneRoutePage
                    title="My Account"
                    milestone="Milestone 3 Profile & Addresses Target"
                    description="Customer profile management and multiple saved Indian delivery addresses arrive in Milestone 3."
                  />
                }
              />
              <Route
                path="/orders"
                element={
                  <MilestoneRoutePage
                    title="My Orders"
                    milestone="Milestone 4–5 Order Management Target"
                    description="Order history, PDF invoice downloads, pre-shipment cancellation, and 7-day return requests arrive in Milestones 4–5."
                  />
                }
              />
              <Route
                path="/track-order"
                element={
                  <MilestoneRoutePage
                    title="Track Order"
                    milestone="Milestone 5 Shipment Tracking Target"
                    description="Live order status timeline and simulated courier tracking arrive in Milestone 5."
                  />
                }
              />
              <Route path="/about" element={<StorefrontInfoPage kind="about" />} />
              <Route path="/contact" element={<StorefrontInfoPage kind="contact" />} />
              <Route path="/faq" element={<StorefrontInfoPage kind="faq" />} />
              <Route path="/privacy-policy" element={<StorefrontInfoPage kind="privacy" />} />
              <Route path="/terms" element={<StorefrontInfoPage kind="terms" />} />
              <Route path="/shipping-policy" element={<StorefrontInfoPage kind="shipping" />} />
              <Route path="/returns-policy" element={<StorefrontInfoPage kind="returns" />} />
            </Route>

            <Route path="/admin-panel" element={<AdminLayout />}>
              <Route
                index
                element={
                  <MilestoneRoutePage
                    title="Admin Portal Foundation"
                    milestone="Milestone 3 & Milestone 6 Admin Target"
                    description="Role-based admin authentication (Super Admin, Product Manager, Order Manager, Inventory Manager, Customer Support, Delivery Manager) arrives in Milestone 3, followed by the full analytics dashboard, catalogue CRUD, metal rate controls, and reports in Milestone 6."
                  />
                }
              />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </LanguageProvider>
  );
}
