"use client";

import { useEffect, useState } from "react";
import { X, Gift } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "lc_welcome_popup_seen";
const DISCOUNT_CODE = "WELCOME10";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setOpen(true);
      localStorage.setItem(STORAGE_KEY, "1");
      cleanup();
    };

    // Desktop: exit-intent (mouse leaves top of viewport)
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    // Mobile / fallback: 25-second timer
    const timer = window.setTimeout(trigger, 25000);

    const cleanup = () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.clearTimeout(timer);
    };

    document.addEventListener("mouseout", onMouseOut);

    return cleanup;
  }, []);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(DISCOUNT_CODE);
      toast.success("Code copied! Use it at checkout.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 p-1 rounded-full bg-white/80 hover:bg-white text-brand_secondary"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="bg-gradient-to-br from-brand_primary/30 to-[#fdf8f3] px-6 py-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand_secondary text-brand_primary mb-3">
            <Gift size={28} />
          </div>
          <h2 className="text-2xl font-semibold text-brand_secondary">
            Welcome to LOIS CHLOE
          </h2>
          <p className="text-sm text-brand_secondary/80 mt-1">
            Bangladesh&apos;s only vegan cosmetic brand
          </p>
        </div>

        <div className="px-6 py-6 text-center space-y-4">
          <p className="text-base text-[#2D3436]">
            Get <span className="font-bold text-brand_secondary">10% OFF</span>{" "}
            your first order
          </p>

          <div className="border-2 border-dashed border-brand_primary rounded-lg py-3 px-4 bg-[#fdf8f3]">
            <p className="text-xs text-brand_gray uppercase tracking-wide">
              Use code at checkout
            </p>
            <p className="text-2xl font-bold text-brand_secondary tracking-wider">
              {DISCOUNT_CODE}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="w-full bg-brand_secondary hover:bg-brand_secondary/90 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Copy Code & Shop Now
          </button>

          <button
            onClick={() => setOpen(false)}
            className="text-xs text-brand_gray hover:underline"
          >
            No thanks, I&apos;ll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
