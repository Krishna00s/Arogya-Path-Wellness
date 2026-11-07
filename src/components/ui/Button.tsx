import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2";

    const variantStyles = {
      primary:
        "bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm hover:shadow",
      secondary:
        "bg-emerald-100 text-emerald-900 hover:bg-emerald-200",
      outline:
        "border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-50",
      ghost:
        "text-emerald-900 hover:bg-emerald-50",
      gold:
        "bg-amber-600 text-white hover:bg-amber-700 shadow-sm hover:shadow",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 min-h-[36px]",
      md: "text-sm px-5 py-2.5 min-h-[44px]",
      lg: "text-base px-7 py-3 min-h-[48px]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
