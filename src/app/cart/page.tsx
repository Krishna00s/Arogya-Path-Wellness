import type { Metadata } from "next";
import { CartPageView } from "@/components/cart/CartPageView";

export const metadata: Metadata = {
  title: "Your Cart — Arogya Path Wellness",
  description:
    "Review your Arogya Path Wellness cart items, multi-bottle pack discounts, and checkout options.",
};

export default function CartPage() {
  return <CartPageView />;
}
