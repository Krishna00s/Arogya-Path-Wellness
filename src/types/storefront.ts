export type ProductStatus = "active" | "draft" | "archived";

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
  product: Product;
  quantity: number;
}
