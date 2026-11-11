import type { ProductVerifiedReviewsData } from "@/types/storefront";

export interface ProductGallerySlide {
  id: string;
  title: string;
  alt: string;
  imageSrc: string;
  tempImageSrc?: string;
}

export interface ProductIconHighlight {
  id: string;
  icon: "package" | "leaf" | "shield" | "truck" | "zap" | "flask";
  title: string;
  subtitle?: string;
}

export interface ProductServicePillar {
  id: string;
  icon: "truck" | "shield" | "package" | "leaf";
  line1: string;
  line2: string;
}

export interface ProductVisualShowcaseItem {
  id: string;
  title: string;
  caption: string;
  imageSrc: string;
  alt: string;
  aspect: "square" | "portrait";
}

export interface ProductIngredientItem {
  id: string;
  name: string;
  botanicalName?: string;
  amountLabel?: string;
  description: string;
  imageSrc: string;
}

export interface ProductDirectionStep {
  id: string;
  stepNumber: number;
  title: string;
  caption: string;
  imageSrc?: string;
}

export interface ProductVideoItem {
  id: string;
  title: string;
  caption?: string;
  label?: string;
  videoUrl: string;
}

export interface ProductFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProductDetailContent {
  productId: string;
  productSlug: string;
  categoryLabel: string;
  shortTagline: string;
  gallerySlides: ProductGallerySlide[];
  servicePillars: ProductServicePillar[];
  iconHighlights: ProductIconHighlight[];
  visualShowcases: ProductVisualShowcaseItem[];
  keyIngredients: ProductIngredientItem[];
  ingredientsFootnote: string;
  directionSteps: ProductDirectionStep[];
  promotionalVideos: ProductVideoItem[];
  verifiedReviews: ProductVerifiedReviewsData | null;
  faqs: ProductFaqItem[];
  bottomBanner: {
    heading: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  };
}

export const TESTO_BOOSTER_DETAIL_CONTENT: ProductDetailContent = {
  productId: "prod-testo-booster",
  productSlug: "testo-booster-capsules",
  categoryLabel: "Men's Wellness",
  shortTagline: "Support Overall Health and Vitality for Men.",
  gallerySlides: [
    {
      id: "gallery-1",
      title: "Testo Booster Capsules — 30 Veg Capsules Bottle",
      alt: "Arogya Path Testo Booster Capsules 30 Veg Capsules bottle presentation",
      imageSrc: "/images/products/testo-booster-capsules/product-front-ad.png",
    },
    {
      id: "gallery-2",
      title: "Testo Booster Capsules — Ayurvedic Ingredients Breakdown",
      alt: "Arogya Path Testo Booster Capsules listed Ayurvedic ingredients infographic",
      imageSrc:
        "/images/products/testo-booster-capsules/ingredients-infographic.png",
    },
    {
      id: "gallery-3",
      title: "Testo Booster Capsules — Bottle Front View",
      alt: "Model holding Arogya Path Testo Booster Capsules 30 Veg Capsules bottle",
      imageSrc: "/images/products/testo-booster-capsules/portrait-promo-1.png",
    },
    {
      id: "gallery-4",
      title: "Men's Natural Support Campaign Poster",
      alt: "Arogya Path Testo Booster Capsules Men's Natural Support pack poster",
      imageSrc:
        "/images/products/testo-booster-capsules/couple-wellness-poster-2.png",
    },
    {
      id: "gallery-5",
      title: "Testo Booster — Daily Wellness Visual",
      alt: "Arogya Path Testo Booster Capsules dark campaign visual",
      imageSrc: "/images/products/testo-booster-capsules/ayurvedic-elevates-ad.png",
    },
    {
      id: "gallery-6",
      title: "Testo Booster Capsules — Benefits Highlight Poster",
      alt: "Arogya Path Testo Booster Capsules lifestyle highlights poster",
      imageSrc:
        "/images/products/testo-booster-capsules/natural-support-poster-3.png",
    },
    {
      id: "gallery-7",
      title: "For Men Wellness Lifestyle Visual",
      alt: "Arogya Path Testo Booster Capsules lifestyle bottle visual",
      imageSrc:
        "/images/products/testo-booster-capsules/trusted-mens-wellness-promo.png",
    },
  ],
  servicePillars: [
    {
      id: "sp-shipping",
      icon: "truck",
      line1: "Free Shipping",
      line2: "Above ₹499",
    },
    {
      id: "sp-cod",
      icon: "package",
      line1: "Cash on Delivery",
      line2: "Available",
    },
    {
      id: "sp-caps",
      icon: "shield",
      line1: "30 Veg Capsules",
      line2: "Per Bottle",
    },
    {
      id: "sp-formula",
      icon: "leaf",
      line1: "Authentic",
      line2: "Ayurvedic Herbs",
    },
  ],
  iconHighlights: [
    {
      id: "hl-1",
      icon: "leaf",
      title: "100% Vegetarian Capsules",
      subtitle: "30 Veg Caps / Bottle",
    },
    {
      id: "hl-2",
      icon: "flask",
      title: "10 Listed Botanicals",
      subtitle: "Gokhuru, Ashwagandha & more",
    },
    {
      id: "hl-3",
      icon: "zap",
      title: "Pack Savings Up to 10%",
      subtitle: "Save ₹86 / ₹258 on packs",
    },
    {
      id: "hl-4",
      icon: "shield",
      title: "Men's Daily Wellness",
      subtitle: "Support Health & Vitality",
    },
    {
      id: "hl-5",
      icon: "package",
      title: "1, 2 or 3 Bottle Packs",
      subtitle: "30, 60 or 90 Capsules",
    },
    {
      id: "hl-6",
      icon: "truck",
      title: "Free Shipping ₹499+",
      subtitle: "COD Option Available",
    },
  ],
  visualShowcases: [
    {
      id: "showcase-1",
      title: "Ayurvedic Blend Profile",
      caption:
        "Complete formulation infographic showing listed herbs around the 30 Veg Capsules bottle.",
      imageSrc:
        "/images/products/testo-booster-capsules/ingredients-infographic.png",
      alt: "Testo Booster Capsules ingredient wheel infographic",
      aspect: "square",
    },
    {
      id: "showcase-2",
      title: "Authentic Bottle Packaging",
      caption:
        "Protective dark bottle with ribbed cap — Arogya Path Testo Booster Capsules (30 Veg Capsules).",
      imageSrc: "/images/products/testo-booster-capsules/ayurvedic-elevates-ad.png",
      alt: "Arogya Path Testo Booster Capsules dark promotional showcase",
      aspect: "square",
    },
    {
      id: "showcase-3",
      title: "Men's Natural Support",
      caption: "Available in Pack of 1 (30 Caps), Pack of 2 (60 Caps), and Pack of 3 (90 Caps).",
      imageSrc:
        "/images/products/testo-booster-capsules/couple-wellness-poster-2.png",
      alt: "Testo Booster Capsules couple wellness poster",
      aspect: "portrait",
    },
    {
      id: "showcase-4",
      title: "Lifestyle Wellness Poster",
      caption: "Compact 30-capsule bottle designed for consistent daily routines.",
      imageSrc:
        "/images/products/testo-booster-capsules/natural-support-poster-3.png",
      alt: "Testo Booster Capsules red lifestyle poster",
      aspect: "portrait",
    },
  ],
  keyIngredients: [
    {
      id: "ing-ashwagandha",
      name: "Ashwagandha",
      botanicalName: "Withania somnifera",
      amountLabel: "100 mg",
      description:
        "Reduces stress, supports healthy testosterone levels, and improves stamina & strength.",
      imageSrc: "/images/ingredients/ashwagandha.png",
    },
    {
      id: "ing-shilajit",
      name: "Shilajit",
      botanicalName: "Purified mineral resin",
      description:
        "Boosts daily energy, stamina, and overall male vitality.",
      imageSrc: "/images/ingredients/shilajit.png",
    },
    {
      id: "ing-gokhuru",
      name: "Gokhuru",
      botanicalName: "Tribulus terrestris",
      amountLabel: "100 mg",
      description:
        "Supports natural testosterone levels, endurance, and stamina.",
      imageSrc: "/images/ingredients/gokhuru.png",
    },
    {
      id: "ing-konch",
      name: "Konch",
      botanicalName: "Mucuna pruriens",
      description:
        "Supports positive mood, vigor, and natural male performance.",
      imageSrc: "/images/ingredients/konch.png",
    },
    {
      id: "ing-safed-musli",
      name: "Safed Musli",
      botanicalName: "Chlorophytum borivilianum",
      amountLabel: "50 mg",
      description:
        "Helps support physical strength, stamina, and reproductive health.",
      imageSrc: "/images/ingredients/safed-musli.png",
    },
    {
      id: "ing-sea-buckthorn",
      name: "Sea Buckthorn",
      botanicalName: "Hippophae rhamnoides",
      amountLabel: "50 mg",
      description:
        "Rich in antioxidants to help support hormone balance and overall vitality.",
      imageSrc: "/images/ingredients/sea-buckthorn.png",
    },
    {
      id: "ing-fenugreek",
      name: "Fenugreek",
      botanicalName: "Trigonella foenum-graecum",
      amountLabel: "30 mg",
      description:
        "Supports healthy testosterone balance and active daily male vitality.",
      imageSrc: "/images/ingredients/fenugreek.png",
    },
    {
      id: "ing-saffron",
      name: "Saffron",
      botanicalName: "Crocus sativus",
      amountLabel: "15 mg",
      description:
        "Enhances natural vigor, positive mood, and overall performance.",
      imageSrc: "/images/ingredients/saffron.png",
    },
    {
      id: "ing-talmakhana",
      name: "Talmakhana",
      botanicalName: "Hygrophila spinosa",
      description:
        "Traditionally formulated to support reproductive health and vitality.",
      imageSrc: "/images/ingredients/talmakhana.png",
    },
    {
      id: "ing-ginger",
      name: "Ginger",
      botanicalName: "Zingiber officinale",
      description:
        "Supports healthy circulation, natural energy, and daily stamina.",
      imageSrc: "/images/ingredients/ginger.png",
    },
  ],
  ingredientsFootnote:
    "Ingredient list and herb quantities reflect the supplied Testo Booster Capsules ingredient infographic.",
  // Populated automatically when printed bottle dosage steps are verified
  directionSteps: [],
  // Connect only usable promo clips without obsolete bottle packaging conflicts
  promotionalVideos: [
    {
      id: "promo-stress",
      title: "Wellness & Daily Routine Discussion",
      caption: "Promotional brand video — not a customer testimonial.",
      label: "Brand Video",
      videoUrl: "/videos/woman-speaking-about-stress.mp4",
    },
    {
      id: "promo-relationship",
      title: "Men's Wellness Lifestyle Clip",
      caption: "Promotional brand video — not a customer testimonial.",
      label: "Brand Video",
      videoUrl: "/videos/woman-explaining-impact-on-marriage.mp4",
    },
  ],
  // Remains null until genuine post-launch customer ratings and reviews exist
  verifiedReviews: null,
  faqs: [
    {
      id: "faq-packs",
      question: "What pack options and bundle savings are available?",
      answer:
        "You can choose Pack of 1 (1 bottle, 30 Veg Capsules at ₹859), Pack of 2 (2 bottles, 60 Veg Capsules at ₹1,632 with a 5% pack discount saving ₹86), or Pack of 3 (3 bottles, 90 Veg Capsules at ₹2,319 with a 10% pack discount saving ₹258).",
    },
    {
      id: "faq-ingredients",
      question: "Which herbs are listed in Testo Booster Capsules?",
      answer:
        "Per the supplied ingredient artwork, the formulation includes Gokhuru (100 mg), Ashwagandha (100 mg), Safed Musli (50 mg), Sea Buckthorn (50 mg), Fenugreek (30 mg), and Saffron (15 mg), alongside Shilajit, Konch, Talmakhana, and Ginger in vegetarian capsules.",
    },
    {
      id: "faq-usage",
      question: "How should the capsules be stored?",
      answer:
        "Keep the bottle tightly closed in a cool, dry place away from direct sunlight. Follow the dosage guidance printed on the bottle label or consult a healthcare practitioner if you have an existing condition.",
    },
    {
      id: "faq-delivery",
      question: "Are Free Delivery and Cash on Delivery (COD) available?",
      answer:
        "All orders above ₹499 qualify for Free Delivery across India (all Testo Booster Capsules packs qualify), and Cash on Delivery is available at checkout.",
    },
  ],
  bottomBanner: {
    heading: "Pure. Botanical. Trusted.",
    description:
      "Arogya Path Testo Booster Capsules — 30 Veg Capsules formulated to support overall health and vitality for men.",
    imageSrc: "/images/products/testo-booster-capsules/product-front-ad.png",
    imageAlt: "Arogya Path Testo Booster Capsules 30 Veg Capsules bottle",
  },
};

export function getProductDetailContentBySlug(
  slug: string
): ProductDetailContent | null {
  if (slug === TESTO_BOOSTER_DETAIL_CONTENT.productSlug) {
    return TESTO_BOOSTER_DETAIL_CONTENT;
  }
  return null;
}
