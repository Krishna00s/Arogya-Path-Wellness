"use client";

import React from "react";
import Image from "next/image";

export function CampaignTrustBanner() {
  const handleClick = () => {
    // Switch to Men's Wellness tab and scroll smoothly to featured products
    window.dispatchEvent(
      new CustomEvent("switch-concern-tab", { detail: { slug: "mens-wellness" } })
    );
    const el = document.getElementById("best-solutions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section aria-label="Trusted Wellness for Men Campaign" className="w-full py-4 sm:py-8 md:py-10 bg-white">
      <div className="w-full max-w-[1720px] mx-auto px-0 sm:px-6 lg:px-8">
        <div
          onClick={handleClick}
          className="relative w-full aspect-square max-w-full sm:max-w-[620px] md:max-w-[720px] lg:max-w-[780px] mx-auto sm:rounded-2xl overflow-hidden shadow-none sm:shadow-sm cursor-pointer group bg-[#F5F2EC]"
        >
          <Image
            src="/trusted-wellness-for-men.png"
            alt="Trusted Wellness for Men - Arogya Path Testo Natural Power+ Trusted by Lakhs of Indian Men"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 720px, 780px"
            className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
            priority
          />
        </div>
      </div>
    </section>
  );
}
