"use client";
import React, { useState } from "react";
import { Sparkles, AlertCircle, CheckCircle2, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const SKIN_TYPES = ["Normal", "Oily", "Dry", "Combination", "Sensitive"] as const;
type SkinType = (typeof SKIN_TYPES)[number];

const SKIN_CONCERN_MAP: Record<SkinType, { avoid: string[]; good: string[] }> = {
  Normal: {
    good: ["niacinamide", "hyaluronic acid", "vitamin c", "retinol", "peptides"],
    avoid: [],
  },
  Oily: {
    good: ["salicylic acid", "niacinamide", "zinc", "clay", "benzoyl peroxide"],
    avoid: ["mineral oil", "petrolatum", "coconut oil", "shea butter"],
  },
  Dry: {
    good: ["hyaluronic acid", "glycerin", "ceramides", "squalane", "shea butter", "vitamin e"],
    avoid: ["alcohol", "salicylic acid", "sulfates", "retinol"],
  },
  Combination: {
    good: ["niacinamide", "hyaluronic acid", "glycerin", "zinc"],
    avoid: ["heavy oils", "mineral oil"],
  },
  Sensitive: {
    good: ["aloe vera", "centella asiatica", "ceramides", "chamomile", "oat extract"],
    avoid: ["fragrance", "alcohol", "parabens", "sulfates", "retinol", "aha", "bha"],
  },
};

const IngredientChecker = ({ product }: { product: any }) => {
  const [selectedSkin, setSelectedSkin] = useState<SkinType | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [concerns, setConcerns] = useState<{ good: string[]; avoid: string[] } | null>(null);

  const productIngredients = product?.ingredients || product?.description || "";

  const analyzeSkinCompatibility = async (skin: SkinType) => {
    setSelectedSkin(skin);
    setLoading(true);
    setAiAnalysis(null);
    setConcerns(null);

    // Local ingredient scan
    const lower = productIngredients.toLowerCase();
    const map = SKIN_CONCERN_MAP[skin];
    const foundGood = map.good.filter((i) => lower.includes(i.toLowerCase()));
    const foundAvoid = map.avoid.filter((i) => lower.includes(i.toLowerCase()));
    setConcerns({ good: foundGood, avoid: foundAvoid });

    // AI analysis via existing route
    try {
      const res = await fetch("/api/ai-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: "ingredient_compatibility",
          userPreferences: {
            skinType: skin,
            category: product?.parent_category || "",
            categoryPath: `${product?.parent_category} > ${product?.child_category}`,
            productName: product?.name,
            ingredients: productIngredients.slice(0, 500),
          },
          products: [],
          conversation: [],
          instructions: `Analyze if "${product?.name}" is suitable for ${skin} skin based on its description/ingredients. Mention 2-3 key ingredients and their effect on ${skin} skin. Be concise (max 60 words).`,
        }),
      });
      const data = await res.json();
      if (data.success && data.response) {
        setAiAnalysis(data.response);
      }
    } catch (e) {
      // silently fail AI; local scan still shows
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-brand_primary/20 rounded-xl bg-[#fdf8f3] p-5">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-brand_primary" />
          <h3 className="font-semibold text-brand_secondary">
            Ingredient Compatibility Checker
          </h3>
        </div>
        {expanded ? (
          <ChevronUp size={18} className="text-brand_gray" />
        ) : (
          <ChevronDown size={18} className="text-brand_gray" />
        )}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-brand_gray">
            Select your skin type to check if this product is right for you:
          </p>

          {/* Skin Type Pills */}
          <div className="flex flex-wrap gap-2">
            {SKIN_TYPES.map((skin) => (
              <button
                key={skin}
                onClick={() => analyzeSkinCompatibility(skin)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  selectedSkin === skin
                    ? "bg-brand_secondary text-white border-brand_secondary"
                    : "border-gray-300 text-brand_gray hover:border-brand_primary hover:text-brand_secondary"
                }`}
              >
                {skin}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center gap-2 text-brand_gray text-sm">
              <Loader2 size={16} className="animate-spin text-brand_primary" />
              Analyzing ingredients for {selectedSkin} skin...
            </div>
          )}

          {/* Results */}
          {!loading && selectedSkin && (
            <div className="space-y-3">
              {/* Local scan results */}
              {concerns && (
                <div className="space-y-2">
                  {concerns.good.length > 0 && (
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2
                        size={16}
                        className="text-green-600 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <span className="font-medium text-green-700">
                          Beneficial for {selectedSkin} skin:{" "}
                        </span>
                        <span className="text-green-600 capitalize">
                          {concerns.good.join(", ")}
                        </span>
                      </div>
                    </div>
                  )}
                  {concerns.avoid.length > 0 && (
                    <div className="flex items-start gap-2 text-sm">
                      <AlertCircle
                        size={16}
                        className="text-amber-600 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <span className="font-medium text-amber-700">
                          Caution for {selectedSkin} skin:{" "}
                        </span>
                        <span className="text-amber-600 capitalize">
                          {concerns.avoid.join(", ")}
                        </span>
                      </div>
                    </div>
                  )}
                  {concerns.good.length === 0 && concerns.avoid.length === 0 && (
                    <div className="flex items-center gap-2 text-sm text-brand_gray">
                      <CheckCircle2 size={16} className="text-green-600" />
                      No known irritants detected for {selectedSkin} skin.
                    </div>
                  )}
                </div>
              )}

              {/* AI Analysis */}
              {aiAnalysis && (
                <div className="bg-white rounded-lg p-3 border border-brand_primary/20 text-sm text-brand_gray leading-relaxed">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles size={13} className="text-brand_primary" />
                    <span className="text-xs font-semibold text-brand_secondary uppercase tracking-wide">
                      AI Analysis
                    </span>
                  </div>
                  {aiAnalysis}
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-xs text-brand_gray italic">
                * This analysis is for guidance only. Always patch test new
                products. Results may vary.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IngredientChecker;
