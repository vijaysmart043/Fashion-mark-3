import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useStore } from '../context/StoreContext.tsx';
import type { StoreProduct } from '../services/api.ts';
import { formatINR } from '../utils/currency.ts';
import { ResilientImage } from './ResilientImage.tsx';

interface ProductCardProps {
  product: StoreProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage();
  const { addToCart, toggleWishlist, wishlistIds } = useStore();
  const isWishlisted = wishlistIds.includes(product.id);
  const displayName = language === 'te' ? product.nameTe : product.name;

  return (
    <article className="group flex flex-col bg-white border border-[#25211F]/10 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(37,33,31,0.06)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2ECE1]">
        <Link to={`/product/${product.slug}`} className="block h-full w-full">
          <ResilientImage
            src={product.image}
            alt={displayName}
            fallbackLabel={displayName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 flex h-10 w-10 items-center justify-center border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#651E32] ${
            isWishlisted
              ? 'border-[#651E32] bg-[#651E32] text-white'
              : 'border-[#25211F]/15 bg-white/90 text-[#25211F] hover:border-[#651E32] hover:text-[#651E32]'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="text-xs font-medium tracking-wider text-[#6E6560] uppercase">
            {product.category} <span aria-hidden="true">·</span> {product.material}
          </p>

          <h3 className="mt-1.5 font-display text-xl leading-snug font-semibold text-[#25211F]">
            <Link
              to={`/product/${product.slug}`}
              className="hover:text-[#651E32] transition-colors focus-visible:outline-2 focus-visible:outline-[#651E32]"
            >
              {displayName}
            </Link>
          </h3>

          <div className="mt-2 flex items-center gap-2 text-xs text-[#6E6560]">
            <span className="inline-flex items-center gap-1 font-medium text-[#25211F] tabular-nums">
              <Star className="h-3.5 w-3.5 fill-[#C5A253] text-[#C5A253]" aria-hidden="true" />
              {product.rating.toFixed(1)}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {product.reviewCount} {t.demoRatingLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span className={product.stock <= 5 ? 'text-[#651E32] font-medium' : ''}>
              {product.stock <= 5
                ? `${t.lowStock} ${product.stock}`
                : `${t.inStock} (${product.stock})`}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#25211F]/8 pt-4">
          <div className="tabular-nums">
            <div className="text-base font-semibold text-[#25211F]">
              {formatINR(product.price)}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-xs">
              <span className="text-[#6E6560] line-through">
                {formatINR(product.originalPrice)}
              </span>
              <span className="font-medium text-[#651E32]">
                {product.discountPercent}% {t.off}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="inline-flex h-10 items-center gap-2 bg-[#651E32] px-4 text-xs font-medium tracking-wide text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#4D1525] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#651E32]"
          >
            <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.addToBag}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
