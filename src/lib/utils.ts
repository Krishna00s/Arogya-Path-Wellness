import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupees(amountInRupees: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountInRupees);
}

/**
 * Dispatches the concern-tab switch event and smoothly scrolls to the target section.
 * Hair Care routes to its dedicated section while still syncing the Ayurvedic Solutions tab.
 */
export function navigateToConcern(slug?: string, overrideSectionId?: string): boolean {
  if (!slug) return false;

  const targetId =
    overrideSectionId || (slug === "hair-care" ? "hair-care" : "ayurvedic-solutions");

  window.dispatchEvent(
    new CustomEvent("switch-concern-tab", { detail: { slug } })
  );

  const el = document.getElementById(targetId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    return true;
  }
  return false;
}
