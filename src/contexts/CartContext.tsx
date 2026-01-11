import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: { hex: string; name: string };
}

interface PromoCode {
  code: string;
  type: 'percentage';
  value: number;
  minItems?: number;
  firstPurchaseOnly?: boolean;
}

const promoCodes: PromoCode[] = [
  { code: 'WELCOME5', type: 'percentage', value: 5, firstPurchaseOnly: true },
  { code: 'ARDORI10', type: 'percentage', value: 10, minItems: 2 },
];

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, color: { hex: string; name: string }) => void;
  removeItem: (productId: string, colorHex: string) => void;
  updateQuantity: (productId: string, colorHex: string, quantity: number) => void;
  clearCart: () => void;
  appliedPromo: PromoCode | null;
  promoMessage: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
  isFirstPurchase: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ardori-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoMessage, setPromoMessage] = useState('');
  const [isFirstPurchase] = useState(() => {
    return !localStorage.getItem('ardori-has-purchased');
  });

  useEffect(() => {
    localStorage.setItem('ardori-cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, color: { hex: string; name: string }) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedColor.hex === color.hex
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedColor.hex === color.hex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedColor: color }];
    });
  }, []);

  const removeItem = useCallback((productId: string, colorHex: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor.hex === colorHex)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: string, colorHex: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor.hex === colorHex
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedPromo(null);
    setPromoMessage('');
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const bagCount = items.filter(item => 
    !['Wallet', 'Clutch'].includes(item.product.category)
  ).reduce((sum, item) => sum + item.quantity, 0);

  const applyPromoCode = useCallback((code: string): boolean => {
    const normalizedCode = code.trim().toUpperCase();
    const promo = promoCodes.find((p) => p.code === normalizedCode);

    if (!promo) {
      setPromoMessage('Invalid promo code');
      setAppliedPromo(null);
      return false;
    }

    if (promo.firstPurchaseOnly && !isFirstPurchase) {
      setPromoMessage('WELCOME5 is valid for first purchase only');
      setAppliedPromo(null);
      return false;
    }

    if (promo.minItems && bagCount < promo.minItems) {
      setPromoMessage(`ARDORI10 applies only on ${promo.minItems} or more bags`);
      setAppliedPromo(null);
      return false;
    }

    setAppliedPromo(promo);
    setPromoMessage('Promo applied successfully');
    return true;
  }, [isFirstPurchase, bagCount]);

  const removePromoCode = useCallback(() => {
    setAppliedPromo(null);
    setPromoMessage('');
  }, []);

  const discount = appliedPromo ? (subtotal * appliedPromo.value) / 100 : 0;
  const shipping = subtotal >= 5000 ? 0 : 199;
  const total = subtotal - discount + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        appliedPromo,
        promoMessage,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discount,
        shipping,
        total,
        itemCount,
        isFirstPurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
