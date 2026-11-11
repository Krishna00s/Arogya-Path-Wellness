export type ProductStatus = "active" | "draft" | "archived";

export interface ProductVariant {
  id: string;
  label: string;
  shortLabel: string;
  bottles: number;
  capsulesTotal: number;
  packSize: string;
  /** Null when final confirmed price has not yet been provided */
  price: number | null;
  /** Undiscounted regular pack price (bottles * single bottle selling price) */
  basePrice?: number;
  compareAtPrice: number | null;
  verifiedMrp?: number | null;
  discountPercent?: number;
  savingsRupees?: number;
  perBottleRupees?: number;
  exactDecimalRupees?: number;
  isTaxInclusiveVerified?: boolean;
  bundleTag?: string;
  isPriceConfirmed: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  subtitle?: string;
  packSize: string;
  price: number; // in Rupees
  compareAtPrice: number; // in Rupees (MRP)
  discountPercent: number;
  rating?: number;
  reviewCount?: number;
  categorySlug: string;
  concern: "immunity" | "digestion" | "stress-sleep" | "hair-care" | "joint-care" | "mens-wellness" | "weight-gain" | "general-wellness" | "all";
  image: string;
  hoverImage?: string;
  badge?: string;
  inStock: boolean;
  status: ProductStatus;
  shortDescription: string;
  variants?: ProductVariant[];
  isDemo: true;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  iconName?: string;
  description?: string;
  image: string;
  bgColor?: string;
  textColor?: string;
  itemCount?: number;
}

export interface ConcernItem {
  id: string;
  label: string;
  slug: string;
  image: string;
}

export interface ReelItem {
  id: string;
  productId?: string;
  title: string;
  productName: string;
  productPrice: number;
  posterImage?: string;
  videoUrl?: string;
  videoDuration?: string;
  productImage?: string;
  likes?: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  language?: "en" | "hi" | "hinglish";
  verifiedBuyer: boolean;
  productName: string;
  isDemo: true;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variantId?: string;
  variantLabel?: string;
  packSize?: string;
  bottles?: number;
  unitPrice?: number | null;
  baseUnitPrice?: number;
  unitSavings?: number;
  discountPercent?: number;
  isPriceConfirmed?: boolean;
}

export interface ProductSubRatings {
  quality?: number;
  packaging?: number;
  valueForMoney?: number;
}

export interface VerifiedProductReview {
  id: string;
  author: string;
  location?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  photos?: string[];
}

export interface ProductVerifiedReviewsData {
  overallRating: number;
  totalRatings: number;
  totalReviews: number;
  subRatings?: ProductSubRatings;
  reviews: VerifiedProductReview[];
}
