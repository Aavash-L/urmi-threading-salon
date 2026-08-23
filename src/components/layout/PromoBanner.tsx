"use client";

import { Sparkles } from "lucide-react";

export default function PromoBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-10 bg-brand-gradient text-white flex items-center justify-center px-4 shadow-md">
      <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-center">
        <Sparkles size={14} className="shrink-0" />
        <span>15% OFF for all new customers</span>
        <Sparkles size={14} className="shrink-0" />
      </p>
    </div>
  );
}
