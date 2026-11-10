export type LaunchMode = "single-product" | "full";

export interface StorefrontConfig {
  launchMode: LaunchMode;
  featuredProductId: string;
  sections: {
    hero: boolean;
    selectConcern: boolean;
    bestSolutions: boolean;
    watchAndShop: boolean;
    popularCategories: boolean;
    movingTicker: boolean;
    ayurvedicSolutions: boolean;
    campaignTrustBanner: boolean;
    hairCareCollection: boolean;
    reviews: boolean;
  };
}

export const storefrontConfig: StorefrontConfig = {
  launchMode: "single-product",
  featuredProductId: "prod-testo-booster",
  sections: {
    hero: true,
    selectConcern: false,
    bestSolutions: true,
    watchAndShop: true,
    popularCategories: false,
    movingTicker: true,
    ayurvedicSolutions: false,
    campaignTrustBanner: true,
    hairCareCollection: false,
    reviews: false,
  },
};
