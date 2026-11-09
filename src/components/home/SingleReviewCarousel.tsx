"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle } from "lucide-react";
import { MOCK_REVIEWS } from "@/data/mock-reviews";

export function SingleReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const reviews = MOCK_REVIEWS;
  const currentReview = reviews[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  // 6-second auto-advance timer
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setTimeout(() => {
      handleNext();
    }, 6000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused, handleNext]);

  return (
    <section
      id="reviews"
      className="py-10 sm:py-16 bg-[#F8F7F2]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black font-serif text-[#063D2C] tracking-tight">
            Customer Experiences
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-1.5">
            Real feedback from our holistic wellness community
          </p>
        </div>

        {/* Single Review Card Container (STRICTLY ONE REVIEW VISIBLE) */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm transition-all duration-300">
          {/* Top Bar: Stars + Demo Label */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < currentReview.rating
                      ? "fill-[#0B4B39] text-[#0B4B39]"
                      : "text-slate-200"
                  }`}
                />
              ))}
              <span className="text-sm font-bold text-[#0B4B39] ml-2">
                {currentReview.rating}.0
              </span>
            </div>

            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
              DEMO REVIEW
            </span>
          </div>

          {/* Review Title */}
          {currentReview.title && (
            <h3 className="font-bold text-base sm:text-xl text-slate-900 mb-3 leading-snug">
              &ldquo;{currentReview.title}&rdquo;
            </h3>
          )}

          {/* Review Quote Body */}
          <div className="relative text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed mb-6 italic">
            <Quote className="w-6 h-6 text-emerald-800/20 absolute -top-1 -left-2 -z-10" />
            <p className="relative z-10">&ldquo;{currentReview.comment}&rdquo;</p>
          </div>

          {/* Author Details and Product Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 border-t border-slate-100 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B4B39]/10 text-[#0B4B39] font-bold flex items-center justify-center text-sm">
                {currentReview.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-900 leading-tight">
                  {currentReview.author}
                </p>
                <p className="text-xs text-slate-500">{currentReview.location}</p>
              </div>
            </div>

            {currentReview.productName && (
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified: {currentReview.productName}</span>
              </div>
            )}
          </div>

          {/* Navigation Controls & Pagination Indicator */}
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-slate-300 bg-slate-50 hover:bg-[#0B4B39] hover:text-white flex items-center justify-center text-slate-700 transition-colors touch-target-44 shadow-2xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots / Counter */}
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-7 bg-[#0B4B39]"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-slate-300 bg-slate-50 hover:bg-[#0B4B39] hover:text-white flex items-center justify-center text-slate-700 transition-colors touch-target-44 shadow-2xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Demo Disclaimer notice */}
        <p className="text-xs text-slate-400 text-center mt-4 leading-tight">
          Reviews are simulated user experiences for design and demonstration purposes. No individual medical outcome is promised.
        </p>
      </div>
    </section>
  );
}
