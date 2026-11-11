"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Mail, MapPin, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MOCK_CATEGORIES } from "@/data/mock-categories";
import { storefrontConfig } from "@/config/storefront";
import { navigateToConcern } from "@/lib/utils";

export function MobileNavDrawer() {
  const { isMobileNavOpen, setIsMobileNavOpen } = useCart();
  const panelRef = useRef<HTMLElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const [topOffset, setTopOffset] = useState<number>(115);

  // Measure header bottom edge dynamically so the menu always opens right below Header & AnnouncementBar
  useEffect(() => {
    const syncHeaderOffset = () => {
      const headerEl = document.getElementById("store-main-header");
      if (!headerEl) return;
      const rect = headerEl.getBoundingClientRect();
      const nextTop = Math.max(56, Math.round(rect.bottom));
      setTopOffset(nextTop);
    };

    syncHeaderOffset();
    if (!isMobileNavOpen) return;

    const rafId = window.requestAnimationFrame(syncHeaderOffset);
    window.addEventListener("resize", syncHeaderOffset);
    window.addEventListener("scroll", syncHeaderOffset, { passive: true });
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", syncHeaderOffset);
      window.removeEventListener("scroll", syncHeaderOffset);
    };
  }, [isMobileNavOpen]);

  // Body scroll lock, Escape/Tab focus management & return-focus restoration
  useEffect(() => {
    if (!isMobileNavOpen) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        const trigger =
          previousFocusRef.current ||
          (document.querySelector('[data-mobile-nav-trigger="true"]') as HTMLElement | null);
        trigger?.focus({ preventScroll: true });
        previousFocusRef.current = null;
      }
      return;
    }

    wasOpenRef.current = true;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      firstLinkRef.current?.focus({ preventScroll: true });
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileNavOpen(false);
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileNavOpen, setIsMobileNavOpen]);

  const handleCategoryNav = (slug: string) => {
    setIsMobileNavOpen(false);
    navigateToConcern(slug);
  };

  const { sections, launchMode } = storefrontConfig;
  const showCategoryBrowse =
    launchMode === "full" && (sections.selectConcern || sections.ayurvedicSolutions);

  return (
    <div
      id="mobile-nav-drawer"
      role="dialog"
      aria-modal={isMobileNavOpen}
      aria-hidden={!isMobileNavOpen}
      aria-label="Mobile navigation menu"
      style={{ top: `${topOffset}px` }}
      className={`fixed inset-x-0 bottom-0 z-[35] lg:hidden overflow-hidden ${
        isMobileNavOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      } transition-[visibility] duration-300 motion-reduce:transition-none`}
    >
      {/* Dimmed Backdrop Below Header */}
      <div
        onClick={() => setIsMobileNavOpen(false)}
        aria-hidden="true"
        className={`absolute inset-0 bg-slate-900/55 backdrop-blur-[1px] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          isMobileNavOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Left-to-Right Sliding Panel Opening Directly Below Header */}
      <aside
        ref={panelRef}
        className={`relative z-10 w-[85vw] max-w-xs h-full bg-white shadow-2xl border-r border-slate-200 flex flex-col pl-[env(safe-area-inset-left)] transform transition-transform duration-300 ease-out motion-reduce:transition-none ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Scrollable Menu Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-2">
              Browse Store
            </h4>
            <div className="space-y-1">
              <Link
                ref={firstLinkRef}
                href="/"
                tabIndex={isMobileNavOpen ? 0 : -1}
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-[13px] font-bold text-[#0B4B39] bg-emerald-50 hover:bg-emerald-100/80 transition-colors min-h-[44px]"
              >
                <span>Store Homepage</span>
                <ChevronRight className="w-4 h-4 text-[#0B4B39]" />
              </Link>

              <Link
                href="/products/testo-booster-capsules"
                tabIndex={isMobileNavOpen ? 0 : -1}
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-[13px] font-bold text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
              >
                <span className="inline-flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#355E2B]" />
                  <span>Testo Booster Capsules</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

              {sections.selectConcern && (
                <Link
                  href="/#concern"
                  tabIndex={isMobileNavOpen ? 0 : -1}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-[13px] font-semibold text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
                >
                  <span>Select Your Concern</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              )}

              {sections.bestSolutions && (
                <Link
                  href="/#best-solutions"
                  tabIndex={isMobileNavOpen ? 0 : -1}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-[13px] font-semibold text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
                >
                  <span>
                    {launchMode === "single-product" ? "Featured Product" : "Best Solutions"}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              )}

              {sections.watchAndShop && (
                <Link
                  href="/#watch-and-shop"
                  tabIndex={isMobileNavOpen ? 0 : -1}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-[13px] font-semibold text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
                >
                  <span>Watch &amp; Shop</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              )}

              {sections.popularCategories && (
                <Link
                  href="/#popular-categories"
                  tabIndex={isMobileNavOpen ? 0 : -1}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-[13px] font-semibold text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
                >
                  <span>Popular Categories</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              )}

              {sections.ayurvedicSolutions && (
                <Link
                  href="/#ayurvedic-solutions"
                  tabIndex={isMobileNavOpen ? 0 : -1}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-[13px] font-semibold text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
                >
                  <span>Ayurvedic Solutions</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              )}

              {sections.hairCareCollection && (
                <Link
                  href="/#hair-care"
                  tabIndex={isMobileNavOpen ? 0 : -1}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-[13px] font-semibold text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
                >
                  <span>Hair Care Collection</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              )}

              <a
                href="#footer"
                tabIndex={isMobileNavOpen ? 0 : -1}
                onClick={() => setIsMobileNavOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-[13px] font-semibold text-slate-800 hover:bg-slate-50 transition-colors min-h-[44px]"
              >
                <span>About &amp; Contact</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>
          </div>

          {showCategoryBrowse && (
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                Shop By Concern
              </h4>
              <div className="space-y-1">
                {MOCK_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    tabIndex={isMobileNavOpen ? 0 : -1}
                    onClick={() => handleCategoryNav(cat.slug)}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-xl text-[13px] text-slate-800 hover:bg-emerald-50 hover:text-[#0B4B39] transition-colors text-left cursor-pointer"
                  >
                    <span className="font-semibold">{cat.name}</span>
                    <span className="text-xs font-medium text-slate-600">
                      {cat.itemCount} items
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Help & Contact */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-2">
              Customer Support
            </h4>
            <div className="space-y-2 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0B4B39] shrink-0" />
                <a
                  href="mailto:arogyapathemail@gmail.com"
                  tabIndex={isMobileNavOpen ? 0 : -1}
                  className="hover:text-[#0B4B39] font-semibold"
                >
                  arogyapathemail@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0B4B39] shrink-0 mt-0.5" />
                <span>Ward No. 16, Ashok Nagar, Barwa Toli, Lohardaga, Jharkhand - 835302</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with safe-area bottom inset */}
        <div className="p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] border-t border-slate-200 bg-slate-50 text-[11px] text-slate-700 text-center font-semibold">
          © 2026 Arogya Path Marketing • All Rights Reserved
        </div>
      </aside>
    </div>
  );
}
