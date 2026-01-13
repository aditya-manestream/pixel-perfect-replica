import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, CartItem, createStorefrontCheckout } from '@/lib/shopify';

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isFirstPurchase: boolean;
  appliedPromoCode: string | null;
  promoMessage: string;
  
  // Actions
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: () => Promise<string | null>;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  
  // Computed getters
  getSubtotal: () => number;
  getDiscount: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getBagCount: () => number;
}

interface PromoCodeConfig {
  type: 'percentage';
  value: number;
  firstPurchaseOnly?: boolean;
  minBags?: number;
}

const PROMO_CODES: Record<string, PromoCodeConfig> = {
  'WELCOME5': { type: 'percentage', value: 5, firstPurchaseOnly: true },
  'ARDORI10': { type: 'percentage', value: 10, minBags: 2 },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isFirstPurchase: true,
      appliedPromoCode: null,
      promoMessage: '',

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null, appliedPromoCode: null, promoMessage: '' });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return null;

        setLoading(true);
        try {
          const checkoutUrl = await createStorefrontCheckout(items);
          setCheckoutUrl(checkoutUrl);
          return checkoutUrl;
        } catch (error) {
          console.error('Failed to create checkout:', error);
          return null;
        } finally {
          setLoading(false);
        }
      },

      applyPromoCode: (code: string) => {
        const normalizedCode = code.trim().toUpperCase();
        const promo = PROMO_CODES[normalizedCode as keyof typeof PROMO_CODES];
        const { isFirstPurchase, getBagCount } = get();

        if (!promo) {
          set({ promoMessage: 'Invalid promo code', appliedPromoCode: null });
          return false;
        }

        if (promo.firstPurchaseOnly && !isFirstPurchase) {
          set({ promoMessage: 'WELCOME5 is valid for first purchase only', appliedPromoCode: null });
          return false;
        }

        if (promo.minBags && getBagCount() < promo.minBags) {
          set({ promoMessage: `ARDORI10 applies only on ${promo.minBags} or more bags`, appliedPromoCode: null });
          return false;
        }

        set({ appliedPromoCode: normalizedCode, promoMessage: 'Promo applied successfully' });
        return true;
      },

      removePromoCode: () => {
        set({ appliedPromoCode: null, promoMessage: '' });
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => 
          sum + (parseFloat(item.price.amount) * item.quantity), 0
        );
      },

      getDiscount: () => {
        const { appliedPromoCode, getSubtotal } = get();
        if (!appliedPromoCode) return 0;
        
        const promo = PROMO_CODES[appliedPromoCode as keyof typeof PROMO_CODES];
        if (!promo) return 0;
        
        return (getSubtotal() * promo.value) / 100;
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 5000 ? 0 : 199;
      },

      getTotal: () => {
        const { getSubtotal, getDiscount, getShipping } = get();
        return getSubtotal() - getDiscount() + getShipping();
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getBagCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'ardori-shopify-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        isFirstPurchase: state.isFirstPurchase,
        appliedPromoCode: state.appliedPromoCode,
      }),
    }
  )
);
