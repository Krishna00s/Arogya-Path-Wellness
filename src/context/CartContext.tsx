"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { Product, ProductVariant, CartItem } from "@/types/storefront";
import { getAvailableProducts, isProductAvailable } from "@/data/mock-products";
import {
  allocateTieredCartLines,
  AllocatedCartLinePricing,
  PAISE_PER_RUPEE,
} from "@/lib/pricing";

interface CartContextType {
  cartItems: CartItem[];
  linePricingMap: Record<string, AllocatedCartLinePricing>;
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  totalItems: number;
  totalBottles: number;
  subtotal: number;
  totalSavings: number;
  hasUnpricedItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function buildCartItem(
  product: Product,
  quantity: number,
  variant?: ProductVariant
): CartItem {
  const chosenVariant = variant ?? product.variants?.[0];
  const variantId = chosenVariant?.id;
  const id = variantId ? `${product.id}::${variantId}` : product.id;

  return {
    id,
    product,
    quantity,
    variantId,
    variantLabel: chosenVariant
      ? `${chosenVariant.label} (${chosenVariant.packSize})`
      : product.packSize,
    packSize: chosenVariant ? chosenVariant.packSize : product.packSize,
    bottles: chosenVariant?.bottles ?? 1,
    unitPrice: chosenVariant ? chosenVariant.price : product.price,
    baseUnitPrice: chosenVariant?.basePrice ?? product.price,
    unitSavings: chosenVariant?.savingsRupees ?? 0,
    discountPercent: chosenVariant?.discountPercent ?? 0,
    isPriceConfirmed: chosenVariant ? chosenVariant.isPriceConfirmed : false,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Initialize with 1 active featured product (default Pack of 1) for storefront demonstration
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const availableProducts = getAvailableProducts();
    return availableProducts.length > 0
      ? [buildCartItem(availableProducts[0], 1)]
      : [];
  });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const addToCart = useCallback(
    (product: Product, quantity = 1, variant?: ProductVariant) => {
      if (!isProductAvailable(product)) {
        return;
      }
      const nextItem = buildCartItem(product, quantity, variant);
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === nextItem.id);
        if (existing) {
          return prev.map((item) =>
            item.id === nextItem.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, nextItem];
      });
    },
    []
  );

  const removeFromCart = useCallback((cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  }, []);

  const totalItems = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  // Dynamically apply product bottle-tier discounts (2 bottles -> 5%, 3+ bottles -> 10%)
  const linePricingMap = useMemo(() => {
    const result: Record<string, AllocatedCartLinePricing> = {};
    const groupedByProduct = new Map<string, CartItem[]>();

    for (const item of cartItems) {
      const arr = groupedByProduct.get(item.product.id) ?? [];
      arr.push(item);
      groupedByProduct.set(item.product.id, arr);
    }

    for (const items of groupedByProduct.values()) {
      const sampleProduct = items[0].product;
      const supportsBottleTiers = Boolean(
        sampleProduct.variants?.some((v) => (v.discountPercent ?? 0) > 0)
      );

      if (supportsBottleTiers) {
        const lines = items.map((item) => ({
          id: item.id,
          bottles: (item.bottles ?? 1) * item.quantity,
        }));
        const allocated = allocateTieredCartLines(
          lines,
          sampleProduct.price * PAISE_PER_RUPEE
        );
        Object.assign(result, allocated);
      } else {
        for (const item of items) {
          const lineFinal =
            (item.unitPrice !== undefined
              ? item.unitPrice ?? 0
              : item.product.price) * item.quantity;
          const lineBase =
            (item.baseUnitPrice ?? item.unitPrice ?? item.product.price) *
            item.quantity;
          result[item.id] = {
            lineFinalRupees: lineFinal,
            lineBaseRupees: lineBase,
            lineSavingsRupees: Math.max(0, lineBase - lineFinal),
            effectiveDiscountPercent: item.discountPercent ?? 0,
            totalProductBottles: (item.bottles ?? 1) * item.quantity,
          };
        }
      }
    }

    return result;
  }, [cartItems]);

  const totalBottles = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + (item.bottles ?? 1) * item.quantity,
        0
      ),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + (linePricingMap[item.id]?.lineFinalRupees ?? 0),
        0
      ),
    [cartItems, linePricingMap]
  );

  const totalSavings = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + (linePricingMap[item.id]?.lineSavingsRupees ?? 0),
        0
      ),
    [cartItems, linePricingMap]
  );

  const hasUnpricedItems = useMemo(
    () => cartItems.some((item) => item.unitPrice === null),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      linePricingMap,
      addToCart,
      removeFromCart,
      updateQuantity,
      isMobileNavOpen,
      setIsMobileNavOpen,
      isSearchOpen,
      setIsSearchOpen,
      totalItems,
      totalBottles,
      subtotal,
      totalSavings,
      hasUnpricedItems,
    }),
    [
      cartItems,
      linePricingMap,
      addToCart,
      removeFromCart,
      updateQuantity,
      isMobileNavOpen,
      isSearchOpen,
      totalItems,
      totalBottles,
      subtotal,
      totalSavings,
      hasUnpricedItems,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
