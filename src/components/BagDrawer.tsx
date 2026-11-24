import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useStore } from '../context/StoreContext.tsx';
import { formatINR } from '../utils/currency.ts';
import { ResilientImage } from './ResilientImage.tsx';

export function BagDrawer() {
  const { language } = useLanguage();
  const {
    cart,
    cartCount,
    cartSubtotal,
    isBagOpen,
    setIsBagOpen,
    updateCartQty,
    removeFromCart,
  } = useStore();

  if (!isBagOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#25211F]/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
    >
      <div className="flex h-full w-full max-w-md flex-col bg-[#F8F5EF] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#25211F]/10 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#651E32]" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold text-[#25211F]">
              Shopping Bag ({cartCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsBagOpen(false)}
            aria-label="Close bag"
            className="flex h-10 w-10 items-center justify-center text-[#25211F] hover:text-[#651E32]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-10 w-10 text-[#6E6560]/60" aria-hidden="true" />
              <p className="mt-3 font-display text-xl text-[#25211F]">Your bag is empty</p>
              <p className="mt-1 text-sm text-[#6E6560]">
                Add silk sarees or handcrafted jewellery from the showcase to preview your order.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map(({ product, quantity }) => {
                const name = language === 'te' ? product.nameTe : product.name;
                return (
                  <li
                    key={product.id}
                    className="flex gap-4 border border-[#25211F]/10 bg-white p-3.5"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden bg-[#F2ECE1]">
                      <ResilientImage
                        src={product.image}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs text-[#6E6560]">{product.sku}</p>
                          <p className="font-display text-base font-semibold text-[#25211F]">
                            {name}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          aria-label={`Remove ${name}`}
                          className="p-1 text-[#6E6560] hover:text-[#651E32]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center border border-[#25211F]/15">
                          <button
                            type="button"
                            onClick={() => updateCartQty(product.id, -1)}
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center hover:bg-[#F8F5EF]"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2.5 text-xs font-medium tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(product.id, 1)}
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center hover:bg-[#F8F5EF]"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold tabular-nums text-[#25211F]">
                          {formatINR(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-[#25211F]/10 bg-white px-6 py-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6E6560]">Demo Subtotal</span>
            <span className="text-lg font-semibold tabular-nums text-[#25211F]">
              {formatINR(cartSubtotal)}
            </span>
          </div>
          <p className="mt-1 text-xs text-[#6E6560]">
            Full coupon, GST &amp; stock reservation checkout unlocks in Milestone 4.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              to="/cart"
              onClick={() => setIsBagOpen(false)}
              className="flex h-11 items-center justify-center border border-[#25211F]/20 text-xs font-semibold text-[#25211F] hover:border-[#651E32] hover:text-[#651E32]"
            >
              View Bag
            </Link>
            <Link
              to="/checkout"
              onClick={() => setIsBagOpen(false)}
              className="flex h-11 items-center justify-center bg-[#651E32] text-xs font-semibold text-white hover:bg-[#4D1525]"
            >
              Checkout Preview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
