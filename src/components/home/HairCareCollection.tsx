import React from "react";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { ProductCard } from "@/components/ui/ProductCard";

export function HairCareCollection() {
  // Authentic Hair Care formulations matching AR Ayurveda reference sequence
  const collectionProducts = [
    MOCK_PRODUCTS.find((p) => p.id === "prod-shikakai-powder"),
    MOCK_PRODUCTS.find((p) => p.id === "prod-amla-powder"),
    MOCK_PRODUCTS.find((p) => p.id === "prod-aritha-powder"),
    MOCK_PRODUCTS.find((p) => p.id === "prod-onion-shampoo"),
  ].filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section id="hair-care" className="py-8 sm:py-12 bg-white w-full">
      {/* Centered Heading */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col text-center lg:text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#111827] tracking-tight">
            Hair Care
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Formulated with Bhringraj, Amla & cold-pressed botanical oils
          </p>
        </div>
      </div>

      {/* Horizontal Carousel on Mobile, 4-Column Grid on Larger Screens: full width edge-to-edge */}
      <div className="w-full lg:max-w-[1720px] lg:mx-auto">
        <div
          className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto lg:overflow-visible no-scrollbar overscroll-x-contain snap-x snap-mandatory px-0 lg:px-12 pb-3 lg:pb-0"
        >
          {collectionProducts.map((product, idx) => (
            <div
              key={product.id}
              className={`w-[270px] sm:w-[300px] md:w-[330px] lg:w-full shrink-0 lg:shrink snap-start box-content lg:box-border ${
                idx === 0 ? "pl-4 sm:pl-6 md:pl-8 lg:pl-0" : ""
              } ${
                idx === collectionProducts.length - 1 ? "pr-4 sm:pr-6 md:pr-8 lg:pr-0" : ""
              }`}
            >
              <ProductCard product={product} showRating={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
