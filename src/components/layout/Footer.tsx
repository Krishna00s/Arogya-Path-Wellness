"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#ecf4e9] text-[#333333] pt-12 pb-24 md:pb-8 border-t border-[#dce8d8] relative">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10">
          {/* Column 1: Brand Info & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group focus:outline-none mb-1">
              <Image
                src="/logo.png"
                alt="Arogya Path - The Path to Wellness"
                width={150}
                height={75}
                className="h-[60px] sm:h-[66px] w-auto object-contain transition-transform group-hover:scale-102"
              />
            </Link>

            <p className="text-xs sm:text-[13px] text-[#444444] leading-relaxed max-w-sm">
              Discover natural healing with Ayurveda—herbal remedies, wellness tips, and holistic care for a balanced and healthy lifestyle.
            </p>

            <div className="space-y-1 text-xs sm:text-[13px] font-medium text-[#222222] pt-1">
              <div>
                <a href="tel:+919099857272" className="hover:text-[#0B4B39] transition-colors">
                  +91 9099857272
                </a>
              </div>
              <div>
                <a href="mailto:info@arogyapathwellness.com" className="hover:text-[#0B4B39] transition-colors">
                  info@arogyapathwellness.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: SERVICES */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#2e3d28]">
              SERVICES
            </h3>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#444444]">
              <li>
                <Link href="/" className="hover:text-[#0B4B39] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#best-solutions" className="hover:text-[#0B4B39] transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#0B4B39] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#0B4B39] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#blogs" className="hover:text-[#0B4B39] transition-colors">
                  Blogs
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-[#0B4B39] transition-colors cursor-pointer"
                  onClick={() => alert("[APP] Arogya Path mobile app coming soon to Google Play & Apple App Store!")}
                >
                  Get App
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: TERMS */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#2e3d28]">
              TERMS
            </h3>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#444444]">
              <li>
                <button
                  type="button"
                  className="hover:text-[#0B4B39] cursor-pointer transition-colors text-left"
                  onClick={() => alert("[DEMO POLICY] Shipping Policy: Free dispatch across India for orders above ₹499.")}
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-[#0B4B39] cursor-pointer transition-colors text-left"
                  onClick={() => alert("[DEMO POLICY] Privacy Policy: Customer data is confidential and protected under Indian IT rules.")}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-[#0B4B39] cursor-pointer transition-colors text-left"
                  onClick={() => alert("[DEMO POLICY] Return & Refund: 7-day verified return process on sealed Ayurvedic products.")}
                >
                  Return and Refund Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-[#0B4B39] cursor-pointer transition-colors text-left"
                  onClick={() => alert("[DEMO POLICY] Terms & Conditions: Governed under the laws of India. Operated by Arogya Path Marketing.")}
                >
                  Terms and conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-[#0B4B39] cursor-pointer transition-colors text-left"
                  onClick={() => alert("[CONTACT] Customer Care: Mon – Sat, 9am – 6pm. Call: +91 9099857272")}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: ADDRESS */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#2e3d28]">
              ADDRESS
            </h3>
            <div className="space-y-2 text-xs sm:text-[13px] text-[#444444] leading-relaxed">
              <div className="font-bold text-[#222222]">
                Arogya Path Marketing
              </div>
              <div>
                15 1st Floor, Ujala Avenue, Opp Vishala Hotel, Sarkhej Road, Juhapura, Ahmedabad Gujarat ( INDIA ) - 380055
              </div>
              <div className="pt-1 font-medium text-[#222222]">
                +91 9099857272
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Marketplace Links */}
        <div className="pt-6 border-t border-[#dce8d8] flex flex-col md:flex-row items-center justify-between text-xs text-[#555555] gap-4">
          <div className="text-center md:text-left">
            Copyright ©2026 Arogya Path Marketing All Rights Reserved
          </div>

          {/* Also Available On Marketplace Badges */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-xs text-[#666666] font-medium">Also available on:</span>
            
            {/* Flipkart */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-md border border-[#dce8d8] shadow-2xs text-[11px] font-bold text-[#2874F0]">
              <span className="italic font-extrabold">Flipkart</span>
              <span className="text-amber-500 font-bold">★</span>
            </div>

            {/* Amazon */}
            <div className="inline-flex items-center px-2.5 py-1 bg-white rounded-md border border-[#dce8d8] shadow-2xs text-[11px] font-bold text-slate-900">
              <span>amazon</span>
              <span className="text-amber-500 text-[9px] ml-0.5 font-black">◡</span>
            </div>

            {/* Myntra */}
            <div className="inline-flex items-center px-2.5 py-1 bg-white rounded-md border border-[#dce8d8] shadow-2xs text-[11px] font-black text-[#FF3F6C]">
              <span>Myntra</span>
            </div>

            {/* JioMart */}
            <div className="inline-flex items-center px-2.5 py-1 bg-white rounded-md border border-[#dce8d8] shadow-2xs text-[11px] font-black text-[#0078AD]">
              <span>JioMart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#204617] text-white flex items-center justify-center shadow-lg hover:bg-[#15320e] active:scale-95 transition-all cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </footer>
  );
}
