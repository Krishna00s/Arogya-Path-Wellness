import { Category, ConcernItem, ReelItem } from "@/types/storefront";

// 1. Select Your Concern — Circular Image Tiles List (Exact lifestyle images matching AR Ayurveda)
export const CONCERN_CATEGORIES: ConcernItem[] = [
  {
    id: "concern-mens",
    label: "Men's Wellness",
    slug: "mens-wellness",
    image: "/categories/male-wellness.jpg",
  },
  {
    id: "concern-digestive",
    label: "Digestive Wellness",
    slug: "digestive-wellness",
    image: "/categories/digestive-wellness.jpg",
  },
  {
    id: "concern-weight-gain",
    label: "Weight Gain",
    slug: "weight-gain",
    image: "/categories/weight-gain.jpg",
  },
  {
    id: "concern-weight-mgmt",
    label: "Weight Management",
    slug: "weight-management",
    image: "/categories/weight-maintan.jpg",
  },
  {
    id: "concern-women",
    label: "Women's Wellness",
    slug: "women-wellness",
    image: "/categories/women-wellness.jpg",
  },
  {
    id: "concern-diabetic",
    label: "Diabetic Care",
    slug: "diabetic-care",
    image: "/categories/diabetes.jpg",
  },
  {
    id: "concern-immunity",
    label: "Immunity Booster",
    slug: "immunity",
    image: "/categories/immunity-booster.jpg",
  },
  {
    id: "concern-memory",
    label: "Memory & Focus",
    slug: "memory-focus",
    image: "/categories/memory-booster.jpg",
  },
  {
    id: "concern-skin",
    label: "Skin Care",
    slug: "skin-care",
    image: "/categories/skin-care.jpg",
  },
  {
    id: "concern-hair",
    label: "Hair Care",
    slug: "hair-care",
    image: "/categories/hair-care.jpg",
  },
];

// 2. Our Most Popular Categories (Horizontal Carousel)
export const POPULAR_CATEGORIES: Category[] = [
  {
    id: "pop-1",
    slug: "mens-wellness",
    name: "Men's Wellness",
    description: "Strength, stamina & vitality tonics",
    image: "/prod-shilajit-gold.jpg",
    itemCount: 12,
  },
  {
    id: "pop-2",
    slug: "digestive-wellness",
    name: "Digestive Care",
    description: "Churna & detox gut formulations",
    image: "/prod-churna-jar.jpg",
    itemCount: 16,
  },
  {
    id: "pop-3",
    slug: "hair-care",
    name: "Hair & Scalp",
    description: "Bhringraj & amla hair tonics",
    image: "/prod-amla-mortar.jpg",
    itemCount: 14,
  },
  {
    id: "pop-4",
    slug: "immunity",
    name: "Immunity Rasayana",
    description: "Daily Giloy & Chyawanprash defense",
    image: "/prod-ashwagandha.jpg",
    itemCount: 18,
  },
  {
    id: "pop-5",
    slug: "weight-gain",
    name: "Weight Management",
    description: "Natural metabolism & mass balance",
    image: "/prod-triphala.jpg",
    itemCount: 10,
  },
  {
    id: "pop-6",
    slug: "general-wellness",
    name: "Mind & Sleep",
    description: "Medhya herbs for calm & memory",
    image: "/prod-brahmi.jpg",
    itemCount: 8,
  },
];

// 3. Ayurvedic Solution Tabs (Exact tabs per instructions)
export interface SolutionTab {
  id: string;
  label: string;
  concernKey: "digestion" | "weight-gain" | "immunity" | "mens-wellness" | "hair-care";
}

export const AYURVEDIC_SOLUTION_TABS: SolutionTab[] = [
  { id: "tab-digestive", label: "Digestive Wellness", concernKey: "digestion" },
  { id: "tab-weight", label: "Weight Gain", concernKey: "weight-gain" },
  { id: "tab-immunity", label: "Immunity Booster", concernKey: "immunity" },
  { id: "tab-mens", label: "Men's Wellness", concernKey: "mens-wellness" },
  { id: "tab-hair", label: "Hair Care", concernKey: "hair-care" },
];

// Backwards-compatible concern options for legacy sections
export const CONCERN_OPTIONS: Array<{ id: string; label: string; concernKey: import("@/types/storefront").Product["concern"] }> = [
  { id: "tab-all", label: "All Formulations", concernKey: "all" },
  { id: "tab-digestive", label: "Digestive Care", concernKey: "digestion" },
  { id: "tab-weight", label: "Weight Management", concernKey: "weight-gain" },
  { id: "tab-immunity", label: "Immunity", concernKey: "immunity" },
  { id: "tab-mens", label: "Men's Health", concernKey: "mens-wellness" },
  { id: "tab-hair", label: "Hair & Scalp", concernKey: "hair-care" },
];

// 4. Watch & Shop Reels Data (Full catalog mode)
export const WATCH_AND_SHOP_REELS: ReelItem[] = [
  {
    id: "reel-1",
    productId: "prod-testo-booster",
    title: "Testo Booster Capsules Daily Wellness Routine",
    productName: "Testo Booster Capsules",
    productPrice: 859,
    posterImage: "/images/products/testo-booster-capsules/product-front-ad.png",
    videoDuration: "0:45",
  },
  {
    id: "reel-2",
    productId: "prod-digest-zen",
    title: "1-Minute Gut Reset with Churna",
    productName: "Digest Zen Herbal Churna",
    productPrice: 549,
    posterImage: "/prod-churna-jar.jpg",
    videoDuration: "0:52",
  },
  {
    id: "reel-3",
    productId: "prod-kesh-oil",
    title: "Ancient Scalp Massage for Thick Hair",
    productName: "Kesh Sanjeevani Hair Oil",
    productPrice: 499,
    posterImage: "/prod-amla-mortar.jpg",
    videoDuration: "0:38",
  },
  {
    id: "reel-4",
    productId: "prod-immuno-plus",
    title: "Daily Morning Kadha vs Capsules",
    productName: "Immuno Plus Tablets",
    productPrice: 599,
    posterImage: "/prod-ashwagandha.jpg",
    videoDuration: "1:05",
  },
  {
    id: "reel-5",
    productId: "prod-joint-ease",
    title: "Natural Joint Cartilage Flexibility",
    productName: "Joint Ease Mahanarayan Tabs",
    productPrice: 699,
    posterImage: "/prod-turmeric.jpg",
    videoDuration: "0:48",
  },
  {
    id: "reel-6",
    productId: "prod-triphala-tabs",
    title: "Ayurvedic Rasayana for Digestion",
    productName: "Triphala Rasayana Tablets",
    productPrice: 449,
    posterImage: "/prod-triphala.jpg",
    videoDuration: "0:56",
  },
];

// Single-product launch mode Watch & Shop showcase (autoplaying vertical videos)
export const SINGLE_PRODUCT_REELS: ReelItem[] = [
  {
    id: "launch-reel-1",
    productId: "prod-testo-booster",
    title: "Woman presenting wellness product",
    productName: "Testo Booster Capsules",
    productPrice: 859,
    videoUrl: "/videos/woman-presenting-wellness-product.mp4",
    likes: 15,
  },
  {
    id: "launch-reel-2",
    productId: "prod-testo-booster",
    title: "Woman holding supplement product",
    productName: "Testo Booster Capsules",
    productPrice: 859,
    videoUrl: "/videos/woman-holding-supplement-product.mp4",
    likes: 24,
  },
  {
    id: "launch-reel-3",
    productId: "prod-testo-booster",
    title: "Woman presenting supplement capsules",
    productName: "Testo Booster Capsules",
    productPrice: 859,
    videoUrl: "/videos/woman-presenting-supplement-tablet.mp4",
    likes: 19,
  },
  {
    id: "launch-reel-4",
    productId: "prod-testo-booster",
    title: "Woman presents product advertisement",
    productName: "Testo Booster Capsules",
    productPrice: 859,
    videoUrl: "/videos/woman-presents-product-advertise.mp4",
    likes: 31,
  },
  {
    id: "launch-reel-5",
    productId: "prod-testo-booster",
    title: "Woman speaking about stress",
    productName: "Testo Booster Capsules",
    productPrice: 859,
    videoUrl: "/videos/woman-speaking-about-stress.mp4",
    likes: 12,
  },
  {
    id: "launch-reel-6",
    productId: "prod-testo-booster",
    title: "Woman explaining impact on marriage",
    productName: "Testo Booster Capsules",
    productPrice: 859,
    videoUrl: "/videos/woman-explaining-impact-on-marriage.mp4",
    likes: 27,
  },
];

// Backwards-compatible export
export const MOCK_CATEGORIES = POPULAR_CATEGORIES;
