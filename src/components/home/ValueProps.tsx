import React from "react";
import { CheckCircle2, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export function ValueProps() {
  const pillars = [
    {
      icon: CheckCircle2,
      title: "Authentic & Safe Formulations",
      description:
        "Every batch is crafted according to recognized Ayurvedic scriptures, using sustainably harvested herbs without harsh adulterants.",
    },
    {
      icon: ShieldCheck,
      title: "GMP Certified Manufacturing",
      description:
        "Processed in certified facilities following rigorous Good Manufacturing Practices, heavy metal screening, and batch testing.",
    },
    {
      icon: Truck,
      title: "Fast & Reliable Delivery",
      description:
        "Prompt fulfillment across major Indian pincodes with tamper-proof packaging, live SMS updates, and Cash on Delivery support.",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns & Support",
      description:
        "Dedicated customer care team to guide your wellness journey with transparent, hassle-free replacement policies.",
    },
  ];

  return (
    <section id="about" className="py-8 sm:py-12 bg-[#F6F6F0] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="h-[1px] w-8 bg-[#0B4B39]/30" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#063D2C] font-serif tracking-tight">
              Why Choose Arogya Path Wellness?
            </h2>
            <span className="h-[1px] w-8 bg-[#0B4B39]/30" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Our uncompromised commitment to herbal purity, traditional integrity, and customer trust
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col items-center text-center"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#0B4B39] flex items-center justify-center mb-3 border border-emerald-100">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
