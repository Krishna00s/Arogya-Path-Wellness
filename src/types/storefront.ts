export interface Product {
  id: string;
  slug: string;
  name: string;
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
  badge?: string;
  inStock: boolean;
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
  title: string;
  productName: string;
  productPrice: number;
  posterImage: string;
  videoDuration?: string;
  productImage?: string;
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
