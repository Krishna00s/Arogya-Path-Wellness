import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "xs" | "sm" | "md";
  className?: string;
  color?: "green" | "amber";
}

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  className,
  color = "green",
}: RatingStarsProps) {
  const iconSize =
    size === "xs" ? "w-3 h-3" : size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  const starColor =
    color === "green"
      ? "fill-[#0B4B39] text-[#0B4B39]"
      : "fill-amber-400 text-amber-500";

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <Star
            key={starIndex}
            className={cn(
              iconSize,
              starIndex <= Math.round(rating)
                ? starColor
                : "text-slate-200 fill-slate-200"
            )}
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-[11px] font-semibold text-slate-500 ml-0.5">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
