import { Product } from "@/types/storefront";
import { storefrontConfig } from "@/config/storefront";
import {
  buildTestoBoosterVariants,
  BASE_BOTTLE_PRICE_RUPEES,
  SINGLE_BOTTLE_MRP_RUPEES,
  calculatePackPricing,
} from "@/lib/pricing";

const TESTO_SINGLE_PACK_PRICING = calculatePackPricing(1);

export const MOCK_PRODUCTS: Product[] = [
  // 1. Featured Men's Wellness — Testo Booster Capsules (Launch Product)
  {
    id: "prod-testo-booster",
    slug: "testo-booster-capsules",
    name: "Testo Booster Capsules",
    brand: "Arogya Path",
    subtitle: "30 Veg Capsules",
    packSize: "30 Veg Capsules",
    price: BASE_BOTTLE_PRICE_RUPEES,
    compareAtPrice: SINGLE_BOTTLE_MRP_RUPEES,
    discountPercent: TESTO_SINGLE_PACK_PRICING.overallDiscountPercent,
    rating: 4.8,
    reviewCount: 384,
    categorySlug: "mens-wellness",
    concern: "mens-wellness",
    image: "/images/products/testo-booster-capsules/product-front-ad.png",
    hoverImage: "/images/products/testo-booster-capsules/portrait-promo-1.png",
    badge: "Bestseller",
    inStock: true,
    status: "active",
    shortDescription:
      "Men's Wellness formula in vegetarian capsules by Arogya Path.",
    variants: buildTestoBoosterVariants(),
    isDemo: true,
  },

  // 2. Digestive Wellness — Digest Zen Herbal Churna
  {
    id: "prod-digest-zen",
    slug: "digest-zen-churna",
    name: "Digest Zen Herbal Churna",
    subtitle: "Gentle Gut Detox & Digestive Comfort",
    packSize: "200 g Powder",
    price: 549,
    compareAtPrice: 749,
    discountPercent: 27,
    rating: 4.7,
    reviewCount: 275,
    categorySlug: "digestive-wellness",
    concern: "digestion",
    image: "/prod-churna-jar.jpg",
    badge: "Popular Pick",
    inStock: true,
    status: "draft",
    shortDescription: "Traditional blend of Haritaki, Saunf, and Ajwain for bloating relief and regular digestion.",
    isDemo: true,
  },

  // 3. Immunity Booster — Immuno Plus Tablets
  {
    id: "prod-immuno-plus",
    slug: "arogya-immuno-plus",
    name: "Immuno Plus Tablets",
    subtitle: "Daily Ayurvedic Immune Defense & Vitality",
    packSize: "60 Tablets",
    price: 599,
    compareAtPrice: 799,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 432,
    categorySlug: "immunity",
    concern: "immunity",
    image: "/prod-ashwagandha.jpg",
    badge: "Top Rated",
    inStock: true,
    status: "draft",
    shortDescription: "Formulated with pure Giloy, Ashwagandha, and Amla to build resilient natural immunity.",
    isDemo: true,
  },

  // 4. Hair Care — Kesh Sanjeevani Hair Oil
  {
    id: "prod-kesh-oil",
    slug: "kesh-sanjeevani-hair-oil",
    name: "Kesh Sanjeevani Hair Oil",
    subtitle: "Root Strengthening & Scalp Nourishment",
    packSize: "200 ml Bottle",
    price: 499,
    compareAtPrice: 699,
    discountPercent: 29,
    rating: 4.9,
    reviewCount: 512,
    categorySlug: "hair-care",
    concern: "hair-care",
    image: "/prod-amla-mortar.jpg",
    badge: "Hair Care",
    inStock: true,
    status: "draft",
    shortDescription: "Infused with Bhringraj, Amla, Brahmi, and Methi seed extracts for dense texture and root strength.",
    isDemo: true,
  },

  // 4a. Shikakai Powder
  {
    id: "prod-shikakai-powder",
    slug: "shikakai-powder",
    name: "Shikakai Powder",
    subtitle: "Best Ayurvedic Formulation For Hair",
    packSize: "200 g Pouch",
    price: 700,
    compareAtPrice: 1500,
    discountPercent: 53,
    rating: 4.8,
    reviewCount: 240,
    categorySlug: "hair-care",
    concern: "hair-care",
    image: "/prod-amla-mortar.jpg",
    inStock: true,
    status: "draft",
    shortDescription: "Pure raw Shikakai powder for gentle, non-stripping cleansing and scalp health.",
    isDemo: true,
  },

  // 4b. Amla Powder
  {
    id: "prod-amla-powder",
    slug: "amla-powder",
    name: "Amla Powder",
    subtitle: "Natural Care for Hair & Skin",
    packSize: "200 g Pouch",
    price: 700,
    compareAtPrice: 1500,
    discountPercent: 53,
    rating: 4.9,
    reviewCount: 310,
    categorySlug: "hair-care",
    concern: "hair-care",
    image: "/prod-amla-mortar.jpg",
    inStock: true,
    status: "draft",
    shortDescription: "Sun-dried wild Indian Gooseberry (Amalaki) powder rich in Vitamin C and antioxidants.",
    isDemo: true,
  },

  // 4c. Aritha Powder
  {
    id: "prod-aritha-powder",
    slug: "aritha-powder",
    name: "Aritha Powder",
    subtitle: "Ayurvedic Support For Dense & Soft Hair",
    packSize: "200 g Pouch",
    price: 700,
    compareAtPrice: 1500,
    discountPercent: 53,
    rating: 4.7,
    reviewCount: 185,
    categorySlug: "hair-care",
    concern: "hair-care",
    image: "/prod-churna-jar.jpg",
    inStock: true,
    status: "draft",
    shortDescription: "Natural soapnut powder for chemical-free hair washing and shine.",
    isDemo: true,
  },

  // 4d. Onion Shampoo
  {
    id: "prod-onion-shampoo",
    slug: "onion-shampoo",
    name: "Arogya Onion Shampoo",
    subtitle: "For Strong And Thick Hair",
    packSize: "300 ml Bottle",
    price: 1090,
    compareAtPrice: 1190,
    discountPercent: 8,
    rating: 4.9,
    reviewCount: 420,
    categorySlug: "hair-care",
    concern: "hair-care",
    image: "/prod-shilajit-gold.jpg",
    inStock: true,
    status: "draft",
    shortDescription: "Infused with Red Onion seed oil and Plant Keratin to minimize hair breakage.",
    isDemo: true,
  },

  // 5. Hair Care — Hair Vital Forte Tablets
  {
    id: "prod-hair-vital-tabs",
    slug: "hair-vital-forte-tabs",
    name: "Hair Vital Forte Tablets",
    subtitle: "Internal Follicle Nutrition with Biotin & Bhringraj",
    packSize: "60 Tablets",
    price: 649,
    compareAtPrice: 899,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 319,
    categorySlug: "hair-care",
    concern: "hair-care",
    image: "/prod-ashwagandha.jpg",
    badge: "Bestseller",
    inStock: true,
    status: "draft",
    shortDescription: "Ayurvedic nutrition with Amalaki, Bhringraj, and Shankhpushpi to arrest hair fall from within.",
    isDemo: true,
  },

  // 6. Weight Gain — Ashwagandha Lehyam Weight Gain Formula
  {
    id: "prod-weight-gain-lehyam",
    slug: "ashwagandha-lehyam-weight-gain",
    name: "Ashwagandha Lehyam Paste",
    subtitle: "Natural Muscle Mass & Healthy Weight Gain",
    packSize: "400 g Jar",
    price: 749,
    compareAtPrice: 999,
    discountPercent: 25,
    rating: 4.7,
    reviewCount: 228,
    categorySlug: "weight-gain",
    concern: "weight-gain",
    image: "/prod-triphala.jpg",
    badge: "Weight Gain",
    inStock: true,
    status: "draft",
    shortDescription: "Classical Ayurvedic rasayana paste enriched with Shatavari, Gokshura, and raw honey for healthy weight gain.",
    isDemo: true,
  },

  // 7. Joint Care — Joint Ease Mahanarayan Tablets
  {
    id: "prod-joint-ease",
    slug: "joint-ease-formula",
    name: "Joint Ease Mahanarayan Tabs",
    subtitle: "Active Cartilage Care & Flexibility",
    packSize: "60 Tablets",
    price: 699,
    compareAtPrice: 999,
    discountPercent: 30,
    rating: 4.8,
    reviewCount: 219,
    categorySlug: "joint-care",
    concern: "joint-care",
    image: "/prod-turmeric.jpg",
    badge: "High Relief",
    inStock: true,
    status: "draft",
    shortDescription: "Powered by Shallaki (Boswellia) and Shuddha Guggulu for joint comfort and stiffness relief.",
    isDemo: true,
  },

  // 8. Men's Wellness — Pure Himalayan Shilajit Resin
  {
    id: "prod-shilajit-resin",
    slug: "pure-himalayan-shilajit-resin",
    name: "Pure Himalayan Shilajit Resin",
    subtitle: "Grade-A Fulvic Acid & Trace Minerals",
    packSize: "50 g Jar",
    price: 999,
    compareAtPrice: 1599,
    discountPercent: 37,
    rating: 4.9,
    reviewCount: 640,
    categorySlug: "mens-wellness",
    concern: "mens-wellness",
    image: "/prod-shilajit-gold.jpg",
    badge: "Pure Resin",
    inStock: true,
    status: "draft",
    shortDescription: "Sun-dried high altitude Himalayan Shilajit resin containing >75% fulvic acid for vigor and athletic stamina.",
    isDemo: true,
  },

  // 9. Digestive Wellness — Triphala Rasayana Tablets
  {
    id: "prod-triphala-tabs",
    slug: "triphala-rasayana-tabs",
    name: "Triphala Rasayana Tablets",
    subtitle: "Daily Colon Cleanse & Healthy Digestion",
    packSize: "60 Tablets",
    price: 449,
    compareAtPrice: 599,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 310,
    categorySlug: "digestive-wellness",
    concern: "digestion",
    image: "/prod-triphala.jpg",
    badge: "Daily Detox",
    inStock: true,
    status: "draft",
    shortDescription: "Equal parts Amla, Haritaki, and Bibhitaki for natural digestive regularity and detoxification.",
    isDemo: true,
  },

  // 10. General Wellness — CalmMind Brahmi Vati
  {
    id: "prod-calm-mind",
    slug: "calmmind-brahmi-tabs",
    name: "CalmMind Brahmi Vati",
    subtitle: "Deep Mental Relaxation & Memory Clarity",
    packSize: "60 Tablets",
    price: 649,
    compareAtPrice: 899,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 348,
    categorySlug: "general-wellness",
    concern: "general-wellness",
    image: "/prod-brahmi.jpg",
    badge: "Medhya Herb",
    inStock: true,
    status: "draft",
    shortDescription: "Medhya herbs Brahmi, Shankhpushpi, and Jatamansi to calm anxiety and support memory.",
    isDemo: true,
  },

  // 11. Weight Gain — Weight Gain Vati
  {
    id: "prod-weight-gain-vati",
    slug: "weight-gain-vati",
    name: "Weight Gain Vati Tablets",
    subtitle: "Enhanced Nutrient Absorption & Appetite",
    packSize: "60 Tablets",
    price: 699,
    compareAtPrice: 949,
    discountPercent: 26,
    rating: 4.7,
    reviewCount: 184,
    categorySlug: "weight-gain",
    concern: "weight-gain",
    image: "/prod-triphala.jpg",
    badge: "Appetite Care",
    inStock: true,
    status: "draft",
    shortDescription: "Ayurvedic digestive agni booster to increase nutrient assimilation and natural weight gain.",
    isDemo: true,
  },

  // 12. Immunity Booster — Tulsi Giloy Kadha Drops
  {
    id: "prod-tulsi-giloy-drops",
    slug: "tulsi-giloy-kadha-drops",
    name: "Tulsi Giloy Kadha Drops",
    subtitle: "Concentrated Herbal Extract Drops",
    packSize: "50 ml Drops",
    price: 349,
    compareAtPrice: 449,
    discountPercent: 22,
    rating: 4.8,
    reviewCount: 195,
    categorySlug: "immunity",
    concern: "immunity",
    image: "/prod-turmeric.jpg",
    badge: "Pure Extract",
    inStock: true,
    status: "draft",
    shortDescription: "Cold-extracted wild Tulsi and Guduchi for daily throat comfort and respiratory vitality.",
    isDemo: true,
  },
];

export function isProductAvailable(product: Product): boolean {
  if (product.status !== "active" || !product.inStock) {
    return false;
  }
  if (storefrontConfig.launchMode === "single-product") {
    return product.id === storefrontConfig.featuredProductId;
  }
  return true;
}

export function getAvailableProducts(): Product[] {
  return MOCK_PRODUCTS.filter(isProductAvailable);
}

export function getFeaturedProduct(): Product | undefined {
  const available = getAvailableProducts();
  return (
    available.find((p) => p.id === storefrontConfig.featuredProductId) ??
    available[0]
  );
}

export function getAvailableProductBySlug(slug: string): Product | undefined {
  return getAvailableProducts().find((p) => p.slug === slug);
}
