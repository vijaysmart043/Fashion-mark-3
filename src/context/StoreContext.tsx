import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  fetchHealthStatus,
  fetchHomeShowcase,
  type HealthResponse,
  type HomeShowcaseResponse,
  type StoreProduct,
} from '../services/api.ts';

export interface CartPreviewItem {
  product: StoreProduct;
  quantity: number;
}

interface StoreContextValue {
  health: HealthResponse | null;
  healthLoading: boolean;
  healthError: string | null;
  refreshHealth: () => Promise<void>;
  showcase: HomeShowcaseResponse | null;
  showcaseLoading: boolean;
  showcaseError: string | null;
  cart: CartPreviewItem[];
  cartCount: number;
  cartSubtotal: number;
  wishlistIds: string[];
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  isHealthModalOpen: boolean;
  setIsHealthModalOpen: (open: boolean) => void;
  addToCart: (product: StoreProduct) => void;
  updateCartQty: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState(true);
  const [healthError, setHealthError] = useState<string | null>(null);

  const [showcase, setShowcase] = useState<HomeShowcaseResponse | null>(null);
  const [showcaseLoading, setShowcaseLoading] = useState(true);
  const [showcaseError, setShowcaseError] = useState<string | null>(null);

  const [cart, setCart] = useState<CartPreviewItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);

  const refreshHealth = useCallback(async () => {
    setHealthLoading(true);
    setHealthError(null);
    try {
      const data = await fetchHealthStatus();
      setHealth(data);
    } catch (err) {
      setHealthError(err instanceof Error ? err.message : 'Unable to reach /api/health');
    } finally {
      setHealthLoading(false);
    }
  }, []);

  const loadShowcase = useCallback(async () => {
    setShowcaseLoading(true);
    setShowcaseError(null);
    try {
      const data = await fetchHomeShowcase();
      setShowcase(data);
    } catch (err) {
      setShowcaseError(err instanceof Error ? err.message : 'Unable to load storefront showcase');
    } finally {
      setShowcaseLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshHealth();
    void loadShowcase();
  }, [refreshHealth, loadShowcase]);

  const addToCart = (product: StoreProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsBagOpen(true);
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        health,
        healthLoading,
        healthError,
        refreshHealth,
        showcase,
        showcaseLoading,
        showcaseError,
        cart,
        cartCount,
        cartSubtotal,
        wishlistIds,
        isBagOpen,
        setIsBagOpen,
        isHealthModalOpen,
        setIsHealthModalOpen,
        addToCart,
        updateCartQty,
        removeFromCart,
        toggleWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
}
