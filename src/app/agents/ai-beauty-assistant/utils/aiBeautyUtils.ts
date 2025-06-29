import { Category } from "../types/aiBeautyTypes";

/**
 * Utility to shuffle an array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Find category by user input text
 */
export const findCategoryByInput = (
  input: string,
  categories: Category[]
): any => {
  const lowerInput = input.toLowerCase();

  // Helper to check if input matches a category name or slug
  const matches = (cat: any) =>
    lowerInput.includes((cat.name || "").toLowerCase()) ||
    lowerInput.includes((cat.slug || "").toLowerCase());

  // 1. Check parent categories
  for (const parent of categories) {
    if (matches(parent)) {
      return { ...parent, matchLevel: "parent" };
    }
    // 2. Check child categories
    if (parent.childCategories) {
      for (const child of parent.childCategories) {
        if (matches(child)) {
          return { ...child, parentSlug: parent.slug, matchLevel: "child" };
        }
        // 3. Check nested child categories
        if (child.nestedChildCategories) {
          for (const nested of child.nestedChildCategories) {
            if (matches(nested)) {
              return {
                ...nested,
                parentSlug: parent.slug,
                childSlug: child.slug,
                matchLevel: "nested",
              };
            }
          }
        }
      }
    }
  }

  // Fallback: keyword mapping (for synonyms, etc.)
  const keywordMappings: { [key: string]: string[] } = {
    lips: ["lip", "lipstick", "lip gloss", "lip liner"],
    face: ["foundation", "concealer", "blush", "bronzer", "powder", "primer"],
    eyes: ["eye", "mascara", "eyeshadow", "eyeliner", "eyebrow"],
    "personal-care": [
      "skincare",
      "cleanser",
      "moisturizer",
      "serum",
      "toner",
      "sunscreen",
      "personal care",
      "skin care",
    ],
  };

  for (const [slug, keywords] of Object.entries(keywordMappings)) {
    if (keywords.some((keyword) => lowerInput.includes(keyword))) {
      // Try to find the best match in the structure
      for (const parent of categories) {
        if (
          parent.slug === slug ||
          (parent.childCategories &&
            parent.childCategories.some((c: any) => c.slug === slug))
        ) {
          return { ...parent, matchLevel: "parent" };
        }
        if (parent.childCategories) {
          for (const child of parent.childCategories) {
            if (child.slug === slug) {
              return {
                ...child,
                parentSlug: parent.slug,
                matchLevel: "child",
              };
            }
          }
        }
      }
    }
  }
  return null;
};

/**
 * AI product decision logic for scoring and ranking products
 */
export const aiProductDecision = (products: any[], preferences: any): any[] => {
  let scoredProducts = products.map((product) => {
    let score = 0;

    // Category match
    if (product.parent_category === preferences.category) score += 10;
    if (product.child_category && preferences.category) score += 5;

    // Price range scoring
    if (preferences.budget === "budget-friendly" && product.sale_price < 20)
      score += 8;
    else if (
      preferences.budget === "mid-range" &&
      product.sale_price >= 20 &&
      product.sale_price < 50
    )
      score += 8;
    else if (preferences.budget === "premium" && product.sale_price >= 50)
      score += 8;

    // Rating scoring
    if (product.avg_rating && product.avg_rating >= 4.5) score += 6;
    else if (product.avg_rating && product.avg_rating >= 4.0) score += 4;

    // Preference matching
    if (preferences.preferences) {
      const productText = `${product.name} ${product.short_description} ${
        product.tags?.join(" ") || ""
      }`.toLowerCase();
      preferences.preferences.forEach((pref: string) => {
        if (productText.includes(pref.toLowerCase())) score += 3;
      });
    }

    // Occasion-based scoring
    if (
      preferences.occasion === "everyday" &&
      product.name.toLowerCase().includes("natural")
    )
      score += 2;
    if (
      preferences.occasion === "special-events" &&
      (product.name.toLowerCase().includes("long") ||
        product.name.toLowerCase().includes("lasting"))
    )
      score += 2;
    if (
      preferences.occasion === "professional" &&
      product.name.toLowerCase().includes("matte")
    )
      score += 2;
    if (
      preferences.occasion === "party-evening" &&
      (product.name.toLowerCase().includes("glitter") ||
        product.name.toLowerCase().includes("shimmer"))
    )
      score += 2;

    return { ...product, aiScore: score };
  });

  // Sort by AI score and return top products
  return scoredProducts
    .sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0))
    .slice(0, 5)
    .map(({ aiScore, ...product }) => product);
};

/**
 * Generate routine based on category
 */
// export const generateRoutine = (category?: string): string => {
//   if (category === "personal-care") {
//     return `Here's a simple skincare routine for you:\n\n🌅 Morning:\n• Gentle Cleanser\n• Hydrating Serum\n• Moisturizer with SPF\n\n🌙 Evening:\n• Makeup Remover\n• Gentle Cleanser\n• Toner\n• Night Cream`;
//   } else if (category === "face") {
//     return `Here's a makeup application routine:\n\n1. Start with a clean, moisturized face\n2. Apply primer for long-lasting wear\n3. Use foundation/concealer for even coverage\n4. Set with powder to prevent shine\n5. Add blush and bronzer for dimension`;
//   } else if (category === "eyes") {
//     return `Here's an eye makeup routine:\n\n1. Apply eye primer for long-lasting color\n2. Use eyeshadow in your preferred shades\n3. Apply eyeliner for definition\n4. Finish with mascara for volume and length\n5. Use makeup remover specifically for eyes`;
//   } else if (category === "lips") {
//     return `Here's a lip care and makeup routine:\n\n1. Exfoliate lips gently with a lip scrub\n2. Apply lip balm for hydration\n3. Use lip liner to define shape\n4. Apply lipstick or lip gloss\n5. Reapply throughout the day as needed`;
//   } else {
//     return `Here's a general beauty routine:\n\n🌅 Morning:\n• Cleanse and moisturize\n• Apply sunscreen\n• Light makeup if desired\n\n🌙 Evening:\n• Remove all makeup\n• Cleanse thoroughly\n• Apply night treatments`;
//   }
// };
