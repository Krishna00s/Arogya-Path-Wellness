import React from "react";
import Image from "next/image";
import { CheckCircle2, Star } from "lucide-react";
import type { ProductVerifiedReviewsData } from "@/types/storefront";

interface VerifiedRatingSummaryBadgeProps {
  reviewsData: ProductVerifiedReviewsData | null | undefined;
}

/**
 * Compact header rating pill — renders strictly when genuine ratings exist.
 */
export function VerifiedRatingSummaryBadge({
  reviewsData,
}: VerifiedRatingSummaryBadgeProps) {
  if (!reviewsData || reviewsData.totalRatings <= 0) {
    return null;
  }

  const metrics = [
    { label: "Quality", value: reviewsData.subRatings?.quality },
    { label: "Packaging", value: reviewsData.subRatings?.packaging },
    { label: "Value for Money", value: reviewsData.subRatings?.valueForMoney },
  ].filter(
    (entry): entry is { label: string; value: number } =>
      typeof entry.value === "number"
  );

  return (
    <a
      href="#product-reviews"
      className="flex items-center gap-3 flex-wrap pt-0.5 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#355E2B] rounded-md"
    >
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 bg-[#355E2B] text-white font-bold px-2.5 py-0.5 rounded-full text-xs">
          <span>{reviewsData.overallRating.toFixed(1)}</span>
          <Star className="w-3 h-3 fill-current" />
        </span>
        <span className="text-slate-600 font-medium">
          ({reviewsData.totalReviews > 0 ? reviewsData.totalReviews : reviewsData.totalRatings} Reviews)
        </span>
      </span>

      {metrics.map((m) => (
        <span
          key={m.label}
          className="inline-flex flex-col border-l border-slate-200 pl-2.5 leading-tight"
        >
          <span className="text-[10px] text-slate-500">{m.label}</span>
          <span className="font-bold text-slate-800 inline-flex items-center gap-0.5">
            {m.value.toFixed(1)}
            <Star className="w-2.5 h-2.5 fill-[#355E2B] text-[#355E2B]" />
          </span>
        </span>
      ))}
    </a>
  );
}

interface ProductReviewsSectionProps {
  reviewsData: ProductVerifiedReviewsData | null | undefined;
}

/**
 * Data-driven Customer Reviews section.
 * Hidden automatically when zero verified post-launch reviews exist.
 */
export function ProductReviewsSection({
  reviewsData,
}: ProductReviewsSectionProps) {
  if (!reviewsData || reviewsData.totalRatings <= 0) {
    return null;
  }

  const allPhotos = reviewsData.reviews.flatMap((r) => r.photos ?? []);
  const subRatings = [
    { label: "Quality", value: reviewsData.subRatings?.quality },
    { label: "Packaging", value: reviewsData.subRatings?.packaging },
    { label: "Value for Money", value: reviewsData.subRatings?.valueForMoney },
  ].filter(
    (entry): entry is { label: string; value: number } =>
      typeof entry.value === "number"
  );

  return (
    <section
      id="product-reviews"
      className="py-8 sm:py-11 bg-[#FAFBF9] border-b border-slate-100"
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#111827]">
                Ratings &amp; Verified Reviews
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {reviewsData.totalRatings.toLocaleString("en-IN")} Ratings &amp;{" "}
                {reviewsData.totalReviews.toLocaleString("en-IN")} Reviews
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-[#355E2B] text-white px-3 py-1.5 rounded-xl font-bold text-base">
              <span>{reviewsData.overallRating.toFixed(1)}</span>
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>

          {subRatings.length > 0 && (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              {subRatings.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-white p-3 text-center"
                >
                  <p className="text-base sm:text-lg font-bold text-[#111827]">
                    {item.value.toFixed(1)} / 5
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {allPhotos.length > 0 && (
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {allPhotos.slice(0, 8).map((photoUrl, idx) => (
                <div
                  key={`${photoUrl}-${idx}`}
                  className="relative aspect-square rounded-lg overflow-hidden bg-white border border-slate-200"
                >
                  <Image
                    src={photoUrl}
                    alt={`Verified buyer photo ${idx + 1}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 22vw, 160px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {reviewsData.reviews.length > 0 && (
            <div className="space-y-3">
              {reviewsData.reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 bg-[#355E2B] text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                        {review.rating} ★
                      </span>
                      <h3 className="text-sm font-bold text-[#111827]">
                        {review.title}
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {review.comment}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-500 pt-1">
                    <span className="font-semibold text-slate-700">
                      {review.author}
                    </span>
                    {review.location && <span>• {review.location}</span>}
                    {review.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[#355E2B] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Certified Buyer
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
