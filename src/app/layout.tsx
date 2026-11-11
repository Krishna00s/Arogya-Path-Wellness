import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { Footer } from "@/components/layout/Footer";
import { RouteScrollManager } from "@/components/layout/RouteScrollManager";

export const metadata: Metadata = {
  title: "Arogya Path Wellness — Authentic Ayurvedic Care",
  description:
    "Natural Solutions for a Healthier, Balanced Life. Herbal, time-tested and expert-formulated Ayurvedic wellness supplements.",
  keywords: [
    "Ayurveda",
    "Arogya Path Wellness",
    "Herbal supplements",
    "Churna",
    "Immunity booster",
    "Natural wellness India",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#063D2C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
        <CartProvider>
          {/* Top Announcement Bar */}
          <AnnouncementBar />

          {/* Sticky Storefront Header */}
          <Header />

          {/* Mobile Nav Slide-over Drawer */}
          <MobileNavDrawer />

          {/* Main Content Area */}
          <main className="flex-1 w-full">{children}</main>

          {/* Full Multi-Column Storefront Footer */}
          <Footer />

          {/* Mobile-Only Bottom Thumb Navigation (<= 768px) */}
          <MobileBottomNav />

          {/* Ensure route transitions land cleanly at the very top of the page */}
          <RouteScrollManager />
        </CartProvider>
      </body>
    </html>
  );
}
