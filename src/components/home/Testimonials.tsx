"use client";

import React, { useState } from "react";
import { Star, AlertTriangle } from "lucide-react";
import { MOCK_REVIEWS } from "@/data/mock-reviews";
import { Review } from "@/types/storefront";

export function Testimonials() {
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | Review["language"]>("all");

  const filteredReviews =
    selectedLanguage === "all"
      ? MOCK_REVIEWS
      : MOCK_REVIEWS.filter((r) => r.language === selectedLanguage);

  return (
    <section id="reviews" className="py-8 sm:py-12 bg-[#F3EEE4] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with subtle ornament */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="h-[1px] w-8 bg-[#0B4B39]/30" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#063D2C] font-serif tracking-tight">
              Customer Reviews
            </h2>
            <span className="h-[1px] w-8 bg-[#0B4B39]/30" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Real Experiences from Our Holistic Wellness Community
          </p>
        </div>

        {/* Prominent Demonstration Notice */}
        <div className="max-w-2xl mx-auto mb-6 p-3 sm:p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-950 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-[11px] sm:text-xs leading-relaxed">
            <strong className="font-bold text-amber-950 block mb-0.5">
              Fictional Demonstration Reviews [DEMO CONTENT]
            </strong>
            The testimonials below are demonstration reviews created in English, Hindi (देवनागरी), and Hinglish to illustrate typography and layout responsiveness. They are fictional and not medical claims.
          </div>
        </div>

        {/* Language Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setSelectedLanguage("all")}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
              selectedLanguage === "all"
                ? "bg-[#0B4B39] text-white shadow-2xs"
                : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
            }`}
          >
            All ({MOCK_REVIEWS.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedLanguage("en")}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
              selectedLanguage === "en"
                ? "bg-[#0B4B39] text-white shadow-2xs"
                : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setSelectedLanguage("hi")}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
              selectedLanguage === "hi"
                ? "bg-[#0B4B39] text-white shadow-2xs"
                : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
            }`}
          >
            हिन्दी (Hindi)
          </button>
          <button
            type="button"
            onClick={() => setSelectedLanguage("hinglish")}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
              selectedLanguage === "hinglish"
                ? "bg-[#0B4B39] text-white shadow-2xs"
                : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
            }`}
          >
            Hinglish
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow relative"
            >
              <div>
                {/* Top Row: Green Stars & Demo Pill */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-[#0B4B39] gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#0B4B39] text-[#0B4B39]" />
                    ))}
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-wider bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                    Demo Review
                  </span>
                </div>

                {/* Review Title */}
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">
                  &ldquo;{review.title}&rdquo;
                </h4>

                {/* Comment */}
                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author & Product Info */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-bold text-slate-900 block">
                    {review.author}
                  </span>
                  <span className="text-slate-500">{review.location}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#0B4B39] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {review.productName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
