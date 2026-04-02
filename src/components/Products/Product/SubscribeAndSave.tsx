"use client";
import React, { useState } from "react";
import { RefreshCw, Check, ChevronDown } from "lucide-react";

const FREQUENCIES = [
  { label: "Monthly", value: "monthly", discount: 10 },
  { label: "Every 2 Months", value: "bimonthly", discount: 7 },
  { label: "Quarterly", value: "quarterly", discount: 5 },
];

const SubscribeAndSave = ({
  price,
  onSubscriptionChange,
}: {
  price: number;
  onSubscriptionChange?: (data: { active: boolean; frequency: string; discountedPrice: number }) => void;
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [frequency, setFrequency] = useState(FREQUENCIES[0]);
  const [open, setOpen] = useState(false);

  const discountedPrice = price * (1 - frequency.discount / 100);
  const savings = price - discountedPrice;

  const handleToggle = (val: boolean) => {
    setIsSubscribed(val);
    onSubscriptionChange?.({
      active: val,
      frequency: frequency.value,
      discountedPrice: val ? discountedPrice : price,
    });
  };

  const handleFrequency = (f: typeof FREQUENCIES[0]) => {
    setFrequency(f);
    setOpen(false);
    if (isSubscribed) {
      onSubscriptionChange?.({
        active: true,
        frequency: f.value,
        discountedPrice: price * (1 - f.discount / 100),
      });
    }
  };

  return (
    <div className="border border-brand_primary/30 rounded-xl overflow-hidden">
      {/* One-Time Purchase Option */}
      <button
        onClick={() => handleToggle(false)}
        className={`w-full flex items-start gap-3 p-4 transition-all ${
          !isSubscribed ? "bg-brand_primary/10 border-b border-brand_primary/20" : "bg-white border-b"
        }`}
      >
        <div
          className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            !isSubscribed
              ? "border-brand_secondary bg-brand_secondary"
              : "border-gray-300"
          }`}
        >
          {!isSubscribed && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-brand_secondary">
            One-Time Purchase
          </p>
          <p className="text-xs text-brand_gray mt-0.5">
            Buy once, no commitment
          </p>
        </div>
      </button>

      {/* Subscribe & Save Option */}
      <button
        onClick={() => handleToggle(true)}
        className={`w-full flex items-start gap-3 p-4 transition-all ${
          isSubscribed ? "bg-brand_primary/10" : "bg-white"
        }`}
      >
        <div
          className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            isSubscribed
              ? "border-brand_secondary bg-brand_secondary"
              : "border-gray-300"
          }`}
        >
          {isSubscribed && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-brand_secondary">
              Subscribe &amp; Save
            </p>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
              Save {frequency.discount}%
            </span>
          </div>
          <p className="text-xs text-brand_gray mt-0.5 flex items-center gap-1">
            <RefreshCw size={11} />
            Auto-deliver, cancel anytime
          </p>

          {/* Frequency Selector — visible only when subscribed */}
          {isSubscribed && (
            <div className="mt-3 space-y-2" onClick={(e) => e.stopPropagation()}>
              {/* Dropdown */}
              <div className="relative">
                <button
                  className="w-full flex items-center justify-between bg-white border border-brand_primary/40 rounded-lg px-3 py-2 text-sm text-brand_secondary hover:border-brand_primary transition-all"
                  onClick={() => setOpen((v) => !v)}
                >
                  <span>Deliver {frequency.label}</span>
                  <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                    {FREQUENCIES.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => handleFrequency(f)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-brand_primary/10 transition-all ${
                          f.value === frequency.value ? "bg-brand_primary/10 font-medium" : ""
                        }`}
                      >
                        <span>Every {f.label.toLowerCase().replace("every ", "")}</span>
                        <span className="text-green-600 font-medium">{f.discount}% off</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Savings Display */}
              <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
                <Check size={14} className="text-green-600 flex-shrink-0" />
                <p className="text-xs text-green-700">
                  You&apos;ll save{" "}
                  <span className="font-bold">
                    ৳{savings.toFixed(0)}
                  </span>{" "}
                  per delivery
                </p>
              </div>

              <p className="text-xs text-brand_gray">
                ✓ No commitment · ✓ Skip or pause anytime · ✓ Cancel anytime
              </p>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default SubscribeAndSave;
