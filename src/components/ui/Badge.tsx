import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "discount" | "amber" | "neutral" | "demo" | "sage";
  children: React.ReactNode;
}

export function Badge({
  variant = "success",
  className,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    success: "bg-emerald-100 text-emerald-800 border-emerald-200",
    discount: "bg-emerald-700 text-white font-semibold shadow-xs",
    amber: "bg-amber-100 text-amber-900 border-amber-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    sage: "bg-[#EBF3ED] text-[#166534] border-[#84A98C]/30",
    demo: "bg-amber-500/10 text-amber-800 border-amber-500/30 font-medium tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border border-transparent select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
