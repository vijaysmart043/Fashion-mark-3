import { ArrowLeft, Database, Layers } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard.tsx';
import { useStore } from '../context/StoreContext.tsx';

interface MilestoneRoutePageProps {
  title: string;
  milestone: string;
  description: string;
  showCataloguePreview?: boolean;
  filterGroup?: 'Jewellery' | 'Sarees';
}

export function MilestoneRoutePage({
  title,
  milestone,
  description,
  showCataloguePreview = false,
  filterGroup,
}: MilestoneRoutePageProps) {
  const { showcase, health, setIsHealthModalOpen } = useStore();
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const searchQuery = (searchParams.get('q') || '').trim().toLowerCase();

  let previewProducts = showcase?.products ?? [];
  if (filterGroup) {
    previewProducts = previewProducts.filter((p) => p.categoryGroup === filterGroup);
  }
  if (slug) {
    const matched = previewProducts.filter((p) => p.slug === slug);
    if (matched.length > 0) previewProducts = matched;
  }
  if (searchQuery) {
    previewProducts = previewProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery) ||
        p.sku.toLowerCase().includes(searchQuery) ||
        p.material.toLowerCase().includes(searchQuery),
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
      <div className="flex flex-col justify-between gap-6 border border-[#25211F]/10 bg-white p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#651E32] uppercase">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{milestone}</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold text-[#25211F] sm:text-4xl">
            {slug ? previewProducts[0]?.name || title : title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#6E6560]">
            {searchQuery
              ? `Showing Milestone 1 preview results matching "${searchQuery}". Full MongoDB search & filters unlock in Milestone 2.`
              : description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsHealthModalOpen(true)}
            className="inline-flex h-10 items-center gap-2 border border-[#25211F]/20 bg-[#F8F5EF] px-4 text-xs font-medium text-[#25211F] hover:border-[#651E32]"
          >
            <Database className="h-3.5 w-3.5 text-[#651E32]" />
            <span>{health?.database.connected ? 'Atlas Connected' : 'Demo Fallback'}</span>
          </button>
          <Link
            to="/"
            className="inline-flex h-10 items-center gap-2 bg-[#651E32] px-5 text-xs font-semibold text-white hover:bg-[#4D1525]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {showCataloguePreview && (
        <div className="mt-10">
          {previewProducts.length === 0 ? (
            <div className="border border-[#25211F]/10 bg-white p-10 text-center">
              <p className="font-display text-2xl text-[#25211F]">No matching preview items</p>
              <p className="mt-2 text-sm text-[#6E6560]">
                Try searching for "Kanjeevaram", "22K", or "Silver".
              </p>
            </div>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {previewProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
