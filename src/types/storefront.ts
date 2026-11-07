export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  packSize: string;
  price: number; // in Rupees
  compareAtPrice: number; // in Rupees (MRP)
  discountPercent: number;
  rating: number;
  reviewCount: number;
  categorySlug: string;
  concern: "immunity" | "digestion" | "stress-sleep" | "hair-skin" | "joint-care" | "mens-wellness" | "all";
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
  iconName: string;
  description: string;
  image: string;
  bgColor: string;
  textColor: string;
  itemCount: number;
}

export interface ConcernOption {
  id: string;
  label: string;
  concernKey: Product["concern"];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  language: "en" | "hi" | "hinglish";
  verifiedBuyer: boolean;
  productName: string;
  isDemo: true;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
