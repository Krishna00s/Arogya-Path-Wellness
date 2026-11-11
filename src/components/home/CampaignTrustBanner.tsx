"use client";

import React from "react";
import Image from "next/image";
import { navigateToConcern } from "@/lib/utils";

export function CampaignTrustBanner() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (navigateToConcern("mens-wellness", "best-solutions")) {
      e.preventDefault();
    }
  };

  return (
    <section aria-label="Trusted Wellness for Men Campaign" className="w-full py-4 sm:py-8 md:py-10 bg-white">
      <div className="w-full max-w-[1720px] mx-auto px-0 sm:px-6 lg:px-8">
        <a
          href="#best-solutions"
          onClick={handleClick}
          className="block relative w-full aspect-[3/4] max-w-full sm:max-w-[540px] md:max-w-[620px] lg:max-w-[680px] mx-auto sm:rounded-2xl overflow-hidden shadow-none sm:shadow-sm cursor-pointer bg-[#F5F2EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4B39] focus-visible:ring-offset-2"
        >
          <Image
            src="/images/products/testo-booster-capsules/trusted-mens-wellness-promo.png"
            alt="Trusted by Lakhs of Indian Men — Arogya Path Testo Booster Capsules For Men Wellness"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 620px, 680px"
            className="object-contain"
          />
        </a>
      </div>
    </section>
  );
}
