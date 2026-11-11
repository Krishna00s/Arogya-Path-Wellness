"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { storefrontConfig } from "@/config/storefront";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems, setIsMobileNavOpen } = useCart();
  const isHomeActive = pathname === "/";
  const isCartActive = pathname === "/cart";

  return (
    <nav
      aria-label="Mobile bottom navigation dock"
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl px-3 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          onClick={() => setIsMobileNavOpen(false)}
          className={`flex flex-col items-center justify-center w-16 h-14 transition-colors active:scale-95 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39] rounded-xl ${
            isHomeActive ? "text-[#0B4B39]" : "text-slate-600 hover:text-[#0B4B39]"
          }`}
        >
          <Home className="w-6 h-6 stroke-[2.2]" />
          <span className="text-[11px] font-extrabold mt-0.5 tracking-tight">
            Home
          </span>
        </Link>

        {/* Menu / Categories */}
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(true)}
          className="flex flex-col items-center justify-center w-16 h-14 text-slate-600 hover:text-[#0B4B39] transition-colors active:scale-95 cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39] rounded-xl"
        >
          <LayoutGrid className="w-6 h-6 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5 tracking-tight">
            {storefrontConfig.launchMode === "single-product" ? "Menu" : "Categories"}
          </span>
        </button>

        {/* Cart with Badge */}
        <Link
          href="/cart"
          onClick={() => setIsMobileNavOpen(false)}
          aria-label={`Open cart page, ${totalItems} items`}
          className={`relative flex flex-col items-center justify-center w-16 h-14 transition-colors active:scale-95 cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39] rounded-xl ${
            isCartActive ? "text-[#0B4B39]" : "text-slate-600 hover:text-[#0B4B39]"
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6 stroke-[2]" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#DC2626] text-white text-[10px] font-extrabold rounded-full h-4.5 min-w-[18px] px-1 flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold mt-0.5 tracking-tight">
            Cart
          </span>
        </Link>

        {/* Account */}
        <button
          type="button"
          onClick={() =>
            alert(
              "[DEMO ACTION] Customer Account & Phone OTP login will be integrated in Milestone 3."
            )
          }
          className="flex flex-col items-center justify-center w-16 h-14 text-slate-500 hover:text-[#0B4B39] transition-colors active:scale-95 cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39] rounded-xl"
        >
          <User className="w-6 h-6 stroke-[2]" />
          <span className="text-[11px] font-bold mt-0.5 tracking-tight">
            Account
          </span>
        </button>
      </div>
    </nav>
  );
}
