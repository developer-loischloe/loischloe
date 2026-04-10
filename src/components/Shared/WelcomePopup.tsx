"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { X, Gift } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "lc_welcome_popup_seen";
const DISCOUNT_CODE = "WELCOME10";
const EXIT_INTENT_DELAY = 5000; // Wait 5s before enabling exit-intent
const MOBILE_TIMER = 15000; // 15s for mobile fallback

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    let triggered = false;
    let exitIntentEnabled = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setOpen(true);
      // Small delay for entrance animation
      requestAnimationFrame(() => {
        setTimeout(() => setVisible(true), 10);
      });
      localStorage.setItem(STORAGE_KEY, "1");
      cleanup();
    };

    // Desktop: exit-intent (mouse leaves top of viewport)
    // Only activate after user has been on page for a few seconds
    const onMouseOut = (e: MouseEvent) => {
      if (!exitIntentEnabled) return;
      if (e.clientY <= 0 && e.relatedTarget === null) trigger();
    };

    // Enable exit-intent after delay (prevents false triggers on page load)
    const exitIntentTimer = window.setTimeout(() => {
      exitIntentEnabled = true;
    }, EXIT_INTENT_DELAY);

    // Mobile / fallback: timer
    const mobileTimer = window.setTimeout(trigger, MOBILE_TIMER);

    const cleanup = () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.clearTimeout(exitIntentTimer);
      window.clearTimeout(mobileTimer);
    };

    document.addEventListener("mouseout", onMouseOut);

    return cleanup;
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => setOpen(false), 200);
  }, []);

  const handleCopy = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(DISCOUNT_CODE);
      toast.success("Code copied! Use it at checkout.");
    }
    handleClose();
    router.push("/products");
  }, [handleClose, router]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300 ${
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-brand_secondary transition-colors"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-brand_primary/30 to-[#fdf8f3] px-6 py-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand_secondary text-brand_primary mb-3">
            <Gift size={28} />
          </div>
          <h2 className="text-2xl font-semibold text-brand_secondary">
            Welcome to LOIS CHLOE
          </h2>
          <p className="text-sm text-brand_secondary/80 mt-1">
            Bangladesh&apos;s only vegan luxury beauty brand
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 text-center space-y-4">
          <p className="text-base text-[#2D3436]">
            Get <span className="font-bold text-brand_secondary text-lg">10% OFF</span>{" "}
            your first order
          </p>

          <div className="border-2 border-dashed border-brand_primary rounded-lg py-3 px-4 bg-[#fdf8f3]">
            <p className="text-xs text-brand_gray uppercase tracking-wide">
              Use code at checkout
            </p>
            <p className="text-2xl font-bold text-brand_secondary tracking-widest mt-1">
              {DISCOUNT_CODE}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="w-full bg-brand_secondary hover:bg-brand_secondary/90 text-white font-medium py-3 rounded-lg transition-all active:scale-[0.98]"
          >
            Copy Code & Shop Now
          </button>

          <button
            onClick={handleClose}
            className="text-xs text-brand_gray hover:text-brand_secondary hover:underline transition-colors"
          >
            No thanks, I&apos;ll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
