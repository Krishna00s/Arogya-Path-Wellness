"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Leaf, Clock, Heart } from "lucide-react";

interface HeroSlide {
  id: string;
  badge: string;
  headline: string;
  headlineHighlight: string;
  subtitle: string;
  benefits: { icon: typeof Zap; label: string }[];
  image: string;
  imageAlt: string;
  ctaText: string;
  ctaTargetId: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    badge: "⚡ Natural Vitality Ka Dose ⚡",
    headline: "Wellness",
    headlineHighlight: "Har Roj !",
    subtitle: "Secret of Authentic Ayurvedic Care",
    benefits: [
      { icon: Zap, label: "More Vitality" },
      { icon: Clock, label: "Daily Stamina" },
      { icon: Leaf, label: "Pure Herbs" },
    ],
    image: "/hero-ayurveda-botanicals.jpg",
    imageAlt: "Authentic Arogya Path Ayurvedic formulation bottles, mortar, pestle, turmeric, and herbs",
    ctaText: "Buy Now",
    ctaTargetId: "concern",
  },
  {
    id: "slide-2",
    badge: "🌿 100% Pure & Potent Herbs 🌿",
    headline: "Immunity",
    headlineHighlight: "Ki Shakti !",
    subtitle: "Daily Botanical Defense with Giloy & Tulsi",
    benefits: [
      { icon: ShieldCheck, label: "Natural Shield" },
      { icon: Sparkles, label: "Zero Toxins" },
      { icon: Heart, label: "Whole Body Care" },
    ],
    image: "/hero-ayurveda-botanicals.jpg",
    imageAlt: "Authentic Arogya Path Ayurvedic formulation bottles and herbs",
    ctaText: "Explore Range",
    ctaTargetId: "bestsellers",
  },
  {
    id: "slide-3",
    badge: "✨ Classical Ayurvedic Formulas ✨",
    headline: "Balanced",
    headlineHighlight: "Every Day !",
    subtitle: "Formulated for Mind, Body & Gut Harmony",
    benefits: [
      { icon: Leaf, label: "GMP Certified" },
      { icon: Zap, label: "Proven Herbs" },
      { icon: ShieldCheck, label: "Lab Tested" },
    ],
    image: "/hero-ayurveda-botanicals.jpg",
    imageAlt: "Authentic Arogya Path Ayurvedic formulation bottles on pedestal",
    ctaText: "Shop All",
    ctaTargetId: "categories",
  },
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance slideshow smoothly every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[activeSlide];

  const handleCtaClick = () => {
    const el = document.getElementById(slide.ctaTargetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-[#F5EFEB] overflow-hidden select-none">
      {/* Campaign Banner Frame (390x492px mobile, 534px desktop) */}
      <div className="relative w-full min-h-[492px] lg:h-[534px] bg-gradient-to-b from-[#FDEEE4] via-[#F6F5ED] to-[#E8EFE0] flex flex-col justify-between pt-5 pb-4 px-4 sm:px-6 lg:px-8">
        
        {/* Top Promotional Text Hierarchy */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto z-10">
          {/* Top Pill Chip */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/90 text-amber-950 font-extrabold text-[11px] sm:text-xs shadow-2xs uppercase tracking-wider mb-2">
            <span>{slide.badge}</span>
          </div>

          {/* Bold Primary Campaign Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] font-serif tracking-tight leading-none">
            {slide.headline}{" "}
            <span className="text-[#991B1B] drop-shadow-2xs">
              {slide.headlineHighlight}
            </span>
          </h1>

          {/* Subtitle Box */}
          <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-700 tracking-wide">
            {slide.subtitle}
          </p>

          {/* 3 Circular Benefit Chips */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3">
            {slide.benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-emerald-900/10 shadow-2xs text-[10px] sm:text-xs font-bold text-[#063D2C]"
                >
                  <Icon className="w-3.5 h-3.5 text-[#0B4B39]" />
                  <span>{benefit.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Botanical & Product Showcase Composition */}
        <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto h-48 sm:h-56 lg:h-64 my-2 flex items-center justify-center">
          {/* Pedestal Shadow / Halo */}
          <div className="absolute bottom-2 w-4/5 h-10 bg-emerald-950/15 rounded-full blur-md" />

          {/* Botanical Image */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 bg-white/40">
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 60vw, 50vw"
              className="object-cover object-center transition-all duration-700"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            <div className="absolute top-2 left-2 flex gap-1.5">
              <span className="text-[9px] font-bold bg-[#0B4B39] text-white px-2 py-0.5 rounded-full shadow-xs">
                Arogya Path
              </span>
              <span className="text-[9px] font-bold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full shadow-xs">
                Pure Formulation
              </span>
            </div>
          </div>

          {/* Pedestal Buy Now CTA Pill Button */}
          <div className="absolute -bottom-3 z-20">
            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 bg-[#0B4B39] hover:bg-[#063D2C] text-white font-extrabold text-xs sm:text-sm px-7 py-2.5 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all uppercase tracking-wide border-2 border-white"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Partner Trust Strip (matches AR Ayurveda banner footer) */}
        <div className="w-full max-w-4xl mx-auto mt-4 z-10">
          <div className="flex flex-col sm:flex-row items-center justify-center rounded-xl overflow-hidden border border-slate-300/80 bg-white shadow-2xs text-[10px] sm:text-xs font-bold">
            {/* Red Accent Badge */}
            <div className="w-full sm:w-auto bg-[#DC2626] text-white px-3 py-1.5 sm:py-2 text-center uppercase tracking-wider shrink-0">
              OUR TRUSTED WELLNESS PARTNER
            </div>
            {/* Trust Badges Strip */}
            <div className="flex flex-wrap items-center justify-around sm:justify-center gap-3 sm:gap-6 py-1.5 sm:py-2 px-3 text-slate-700 w-full">
              <span>GMP CERTIFIED</span>
              <span className="text-slate-300">•</span>
              <span>AYUSH COMPLIANT</span>
              <span className="text-slate-300">•</span>
              <span>100% VEG</span>
              <span className="text-slate-300">•</span>
              <span>LAB TESTED</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Carousel Pagination Dots Bar (35px high matching verified reference) */}
      <div className="flex items-center justify-center gap-2 py-2.5 bg-white border-b border-slate-200">
        {[0, 1, 2, 3, 4].map((dotIndex) => {
          const isActive = dotIndex === activeSlide % 3;
          return (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setActiveSlide(dotIndex % HERO_SLIDES.length)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "w-6 h-2 bg-[#0B4B39]"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
