import React from "react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { SelectConcern } from "@/components/home/SelectConcern";
import { BestSolutionsCarousel } from "@/components/home/BestSolutionsCarousel";
import { WatchAndShop } from "@/components/home/WatchAndShop";
import { PopularCategories } from "@/components/home/PopularCategories";
import { MovingTicker } from "@/components/home/MovingTicker";
import { AyurvedicSolutionTabs } from "@/components/home/AyurvedicSolutionTabs";
import { CampaignTrustBanner } from "@/components/home/CampaignTrustBanner";
import { HairCareCollection } from "@/components/home/HairCareCollection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden pb-24 lg:pb-0">
      {/* B. Promotional Hero Carousel (Touch swipe, ~5s auto-advance, dots) */}
      <HeroCarousel />

      {/* C. Select Your Concern (Circular image tiles, horizontal scroll) */}
      <SelectConcern />

      {/* D. I'm Looking for the Best Solution (~2 visible cards mobile, Testo Booster Tablets first) */}
      <BestSolutionsCarousel />

      {/* E. Watch & Shop (2 portrait 9:16 reels side-by-side, video modal) */}
      <WatchAndShop />

      {/* F. Our Most Popular Categories (Horizontal carousel with subtitle & prev/next arrows) */}
      <PopularCategories />

      {/* G. Continuous Moving Strip (Marquee ticker with key value props) */}
      <MovingTicker />

      {/* H. Ayurvedic Solution (Text tabs with active underline, 2-column mobile product grid) */}
      <AyurvedicSolutionTabs />

      {/* I. Trust & Promotional Campaign Banner ("Wellness Rooted in Ayurveda") */}
      <CampaignTrustBanner />

      {/* J. Hair Care Collection (Horizontal scrollable collection) */}
      <HairCareCollection />
    </div>
  );
}
