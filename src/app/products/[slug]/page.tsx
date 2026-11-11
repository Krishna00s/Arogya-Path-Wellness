import React from "react";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  getAvailableProductBySlug,
  getAvailableProducts,
} from "@/data/mock-products";
import { getProductDetailContentBySlug } from "@/data/product-detail-content";
import { ProductDetailView } from "@/components/product/ProductDetailView";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  "testo-natural-power-plus": "/products/testo-booster-capsules",
};

export async function generateStaticParams() {
  return getAvailableProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getAvailableProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found — Arogya Path Wellness",
    };
  }

  return {
    title: `${product.brand ?? "Arogya Path"} — ${product.name} (${product.packSize})`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  if (LEGACY_SLUG_REDIRECTS[slug]) {
    permanentRedirect(LEGACY_SLUG_REDIRECTS[slug]);
  }

  const product = getAvailableProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const content = getProductDetailContentBySlug(product.slug);
  if (!content) {
    notFound();
  }

  return <ProductDetailView product={product} content={content} />;
}
