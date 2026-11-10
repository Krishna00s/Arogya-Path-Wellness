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
import { storefrontConfig } from "@/config/storefront";

export default function HomePage() {
  const { sections } = storefrontConfig;

  return (
    <div className="flex flex-col w-full overflow-x-clip pb-24 lg:pb-0">
      {/* Promotional Hero Carousel */}
      {sections.hero && <HeroCarousel />}

      {/* Select Your Concern (Hidden in single-product launch mode) */}
      {sections.selectConcern && <SelectConcern />}

      {/* Best Solutions / Featured Product Showcase */}
      {sections.bestSolutions && <BestSolutionsCarousel />}

      {/* Watch & Shop (Hidden in single-product launch mode) */}
      {sections.watchAndShop && <WatchAndShop />}

      {/* Our Most Popular Categories (Hidden in single-product launch mode) */}
      {sections.popularCategories && <PopularCategories />}

      {/* Continuous Moving Trust Strip */}
      {sections.movingTicker && <MovingTicker />}

      {/* Ayurvedic Solution Tabs (Hidden in single-product launch mode) */}
      {sections.ayurvedicSolutions && <AyurvedicSolutionTabs />}

      {/* Trust & Promotional Campaign Banner */}
      {sections.campaignTrustBanner && <CampaignTrustBanner />}

      {/* Hair Care Collection (Hidden in single-product launch mode) */}
      {sections.hairCareCollection && <HairCareCollection />}
    </div>
  );
}
