"use client";

import React from "react";
import Link from "next/link";
import { Leaf, Mail, ShieldCheck, Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#063D2C] text-slate-300 pt-10 pb-24 md:pb-10 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-emerald-900/60">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#0B4B39] flex items-center justify-center text-emerald-300 shadow-2xs">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white font-serif leading-none">
                  Arogya<span className="text-emerald-400">Path</span>
                </span>
                <span className="text-[8px] font-bold tracking-[0.2em] text-emerald-300 uppercase mt-0.5">
                  THE AYURVEDA PEOPLE
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-100/70 leading-relaxed max-w-sm">
              Rooted in centuries-old Ayurvedic wisdom, crafted for modern lifestyle needs. We formulate authentic, pure herbal supplements with verified botanicals and transparent manufacturing.
            </p>

            <div className="flex items-center gap-2.5 pt-1 text-xs text-emerald-300">
              <div className="flex items-center gap-1.5 bg-emerald-900/50 px-2.5 py-1 rounded-full border border-emerald-800 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>GMP Assured</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-900/50 px-2.5 py-1 rounded-full border border-emerald-800 text-[11px] font-semibold">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>100% Ayurvedic</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-900/50 px-2.5 py-1 rounded-full border border-emerald-800 text-[11px] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ayush Compliant</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Top Categories
                </a>
              </li>
              <li>
                <a href="#concern" className="hover:text-white transition-colors">
                  Shop by Concern
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="hover:text-white transition-colors">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Policies
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  className="hover:text-white cursor-pointer transition-colors text-left"
                  onClick={() =>
                    alert(
                      "[DEMO POLICY] Shipping & Delivery: Free delivery across India for orders above ₹499."
                    )
                  }
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-white cursor-pointer transition-colors text-left"
                  onClick={() =>
                    alert(
                      "[DEMO POLICY] Return & Refund: Hassle-free 7-day verified returns on sealed products."
                    )
                  }
                >
                  Return & Refund
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-white cursor-pointer transition-colors text-left"
                  onClick={() =>
                    alert(
                      "[DEMO POLICY] Privacy Policy: We safeguard all customer personal data in compliance with Indian IT rules."
                    )
                  }
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-white cursor-pointer transition-colors text-left"
                  onClick={() =>
                    alert(
                      "[DEMO POLICY] Terms & Conditions: Governed under the commercial laws of India. Operated by Arogya Path Marketing."
                    )
                  }
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Customer Support
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>support@arogyapathwellness.com</span>
              </div>
              <div className="text-[11px] text-emerald-200/70 pt-1 leading-relaxed">
                Operating Entity: <strong className="text-white">Arogya Path Marketing</strong><br />
                Hours: Mon – Sat, 9:00 AM – 6:00 PM IST
              </div>
            </div>
          </div>
        </div>

        {/* Statutory Health Disclaimer */}
        <div className="py-5 border-b border-emerald-900/40 text-[10.5px] text-emerald-200/60 leading-relaxed">
          <strong className="text-emerald-200/90 font-semibold">Statutory AYUSH & Health Disclaimer:</strong> All formulations on Arogya Path Wellness are classical and proprietary herbal dietary supplements prepared under compliant GMP conditions. These products are not intended to diagnose, treat, cure, or prevent any acute disease. Please consult a qualified Ayurvedic physician before beginning any new health regimen. Content on this website is for educational and demo storefront presentation only.
        </div>

        {/* Copyright & Operating Entity */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-200/60 gap-2 text-center sm:text-left">
          <div>
            © 2026 Arogya Path Wellness. Operated by Arogya Path Marketing. All Rights Reserved.
          </div>
          <div className="text-amber-300/80 font-bold text-[10px] uppercase tracking-wider">
            Milestone 1 Frontend Demonstration
          </div>
        </div>
      </div>
    </footer>
  );
}
