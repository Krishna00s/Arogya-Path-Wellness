import React from "react";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-6 md:mb-8",
        centered ? "text-center mx-auto max-w-2xl" : "text-left",
        className
      )}
    >
      <div className={cn("inline-flex items-center gap-2", centered && "justify-center")}>
        <Leaf className="w-4 h-4 text-emerald-700/70 -scale-x-100 hidden sm:inline-block" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-emerald-950 font-serif">
          {title}
        </h2>
        <Leaf className="w-4 h-4 text-emerald-700/70 hidden sm:inline-block" />
      </div>
      {subtitle && (
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
