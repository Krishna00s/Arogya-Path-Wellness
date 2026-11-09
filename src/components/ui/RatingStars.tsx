import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "xs" | "sm" | "md";
  className?: string;
  color?: "green" | "amber";
  showScore?: boolean;
}

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  className,
  color = "green",
  showScore = true,
}: RatingStarsProps) {
  const iconSize =
    size === "xs" ? "w-3 h-3" : size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  // Match AR Ayurveda Judge.me dark forest green
  const starFill =
    color === "green"
      ? "fill-[#355E2B] text-[#355E2B]"
      : "fill-amber-400 text-amber-500";

  const roundedScore = Math.floor(rating);

  return (
    <div className={cn("inline-flex items-center gap-1.5 flex-wrap", className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = starIndex <= roundedScore;
          return (
            <Star
              key={starIndex}
              className={cn(
                iconSize,
                isFilled
                  ? starFill
                  : "text-[#355E2B] fill-transparent stroke-[1.5]"
              )}
            />
          );
        })}
      </div>
      {(showScore || reviewCount !== undefined) && (
        <span className="text-xs sm:text-sm text-[#222222] font-normal">
          {showScore ? `${rating.toFixed(1)} ` : ""}
          {reviewCount !== undefined && `(${reviewCount} reviews)`}
        </span>
      )}
    </div>
  );
}
