import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ConcernSection } from "@/components/home/ConcernSection";
import { PromoSplitBanners } from "@/components/home/PromoSplitBanners";
import { CuratedProducts } from "@/components/home/CuratedProducts";
import { FocusBanner } from "@/components/home/FocusBanner";
import { DealsSection } from "@/components/home/DealsSection";
import { ValueProps } from "@/components/home/ValueProps";
import { PhilosophyBanner } from "@/components/home/PhilosophyBanner";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero Banner with botanical background & authentic care message */}
      <HeroSection />

      {/* 2. Trust Strip (100% Ayurvedic, GMP Certified, Fast Delivery, Easy Returns) */}
      <TrustStrip />

      {/* 3. Top Categories Grid (10 categories with botanical photography & pill badges) */}
      <CategoryGrid />

      {/* 4. Shop by Concern with interactive filter pills (All, Immunity, Digestion, etc.) */}
      <ConcernSection />

      {/* 5. Promotional Split Banners (Immunity & Digestive Care dual feature cards) */}
      <PromoSplitBanners />

      {/* 6. Our Products (Curated bestsellers with ratings, MRP strikethrough & Add to Cart) */}
      <CuratedProducts />

      {/* 7. Special Focus Banner (Men's Wellness for an Active Life) */}
      <FocusBanner />

      {/* 8. Top Discounted Products (20%-30% off deals) */}
      <DealsSection />

      {/* 9. Value Propositions (4 Pillars of Arogya Path Wellness) */}
      <ValueProps />

      {/* 10. Brand Philosophy Banner (Rooted in Ayurveda, Designed for Modern Wellness) */}
      <PhilosophyBanner />

      {/* 11. Customer Reviews (English, Hindi, and Hinglish testimonials with Demo notice) */}
      <Testimonials />
    </div>
  );
}
