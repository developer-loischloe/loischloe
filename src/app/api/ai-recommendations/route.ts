import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import appwriteProductService from "@/appwrite/appwriteProductService";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Define maximum retries and timeouts
const MAX_RETRIES = 2;
const TIMEOUTS = {
  recommendations: 30000, // 30s for product recommendations
  chatbot: 20000, // 20s for chat responses
  usage: 25000, // 25s for usage guides
  default: 35000, // 35s default
};

/**
 * Helper function to retry an async operation with exponential backoff.
 * @param callback The async function to execute.
 * @param retries The number of retry attempts.
 * @param operationType The type of operation for timeout selection.
 * @returns The result of the callback if successful.
 * @throws The original error if all retries fail.
 */
async function retryWithBackoff<T>(
  callback: () => Promise<T>,
  retries: number = MAX_RETRIES,
  operationType: keyof typeof TIMEOUTS = "default"
): Promise<T> {
  const timeout = TIMEOUTS[operationType];
  for (let i = 0; i < retries; i++) {
    try {
      return await Promise.race([
        callback(),
        new Promise<T>((_, reject) =>
          setTimeout(
            () => reject(new Error(`timeout_${operationType}`)),
            timeout
          )
        ),
      ]);
    } catch (error: any) {
      if (error.message?.startsWith("timeout_")) {
        const operation = error.message.split("_")[1];
        throw {
          status: 504,
          message: `The ${operation} request timed out. Please try a simpler query or try again later.`,
        };
      }
      // Check if it's a Gemini API specific error
      if (error.status === 400) {
        throw {
          status: 400,
          message: "Please try rephrasing your question more simply.",
        };
      }
      if (error.status === 429 && i < retries - 1) {
        const delay = Math.pow(2, i) * 1000 + Math.random() * 500;
        console.warn(
          `Rate limit hit (429). Retrying in ${delay}ms... (Attempt ${
            i + 1
          }/${retries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw {
        status: error.status || 500,
        message: error.message || "An unexpected error occurred",
      };
    }
  }
  throw {
    status: 500,
    message: "Maximum retries exceeded - please try again with a simpler query",
  };
}

function stripPreamble(text: string): string {
  // Remove common preambles and clean up response
  return (
    text
      .replace(
        /^(Sure!|Of course!|Here is|Let me help|I'd be happy to help).*?(?=\w+\?|[A-Z])/i,
        ""
      )
      .trim() || text.trim()
  );
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  console.log(
    "[AI Assistant] Request received at",
    new Date(startTime).toISOString()
  );

  try {
    const { userPreferences, products, question, conversation, instructions } =
      await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        success: false,
        error: "Gemini API key not configured",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
      // Safety settings are now handled automatically by the Flash model
    });

    let prompt = "";
    let response = "";

    // Add performance tracking with more detailed logging
    const trackLLMCall = async (
      name: string,
      fn: () => Promise<any>,
      operationType: keyof typeof TIMEOUTS = "default"
    ) => {
      const callStartTime = Date.now();
      console.log(
        `[AI Assistant] Starting ${name} (${operationType}) at ${
          callStartTime - startTime
        }ms`
      );
      const result = await fn();
      const duration = Date.now() - callStartTime;
      console.log(`[AI Assistant] ${name} completed in ${duration}ms`);
      return result;
    };

    switch (question) {
      case "explain_recommendations":
        // Ultra-optimized prompt
        prompt = `${userPreferences.category}:
${userPreferences.skinType || ""}
${userPreferences.budget || ""}
${userPreferences.preferences?.join(",") || ""}
Products:${products.map((p: any) => `${p.name}:$${p.sale_price}`).join(";")}
Match(<100w)`;

        const result = await trackLLMCall(
          "explain_recommendations",
          () =>
            retryWithBackoff(
              () => model.generateContent(prompt),
              MAX_RETRIES,
              "recommendations"
            ),
          "recommendations"
        );
        response = stripPreamble(result.response.text());
        break;

      case "product_usage": {
        // Fast response templates based on category and skin type
        const usageTemplates: Record<string, Record<string, string>> = {
          "Makeup > Face": {
            oily: "1. Start with clean, moisturized skin\n2. Apply primer focusing on T-zone\n3. Use light layers, building coverage as needed\n4. Set with powder, especially in oily areas\n5. Touch up with blotting papers during day",
            dry: "1. Hydrate skin well before makeup\n2. Use creamy or liquid formulas\n3. Apply with gentle patting motions\n4. Avoid over-powdering\n5. Carry a hydrating mist for touch-ups",
            combination:
              "1. Use mattifying primer on T-zone\n2. Apply hydrating products on dry areas\n3. Layer product gradually\n4. Set oily areas with powder\n5. Keep blotting papers handy",
            sensitive:
              "1. Start with gentle skin prep\n2. Test product on small area first\n3. Use minimal layers\n4. Apply with clean brushes/tools\n5. Remove thoroughly at day's end",
            default:
              "1. Start with clean, prepped skin\n2. Apply product in thin layers\n3. Blend well using preferred tool\n4. Set with light powder if needed\n5. Touch up as necessary",
          },
          "Makeup > Eyes": {
            default:
              "1. Apply eye primer\n2. Start with lighter shades\n3. Build intensity gradually\n4. Define crease if desired\n5. Finish with mascara",
            sensitive:
              "1. Use gentle primer\n2. Choose hypoallergenic products\n3. Avoid inner rim\n4. Use clean brushes\n5. Remove gently",
          },
          "Makeup > Lips": {
            default:
              "1. Exfoliate gently if needed\n2. Apply lip balm\n3. Line lips if desired\n4. Apply color from center outward\n5. Blot and reapply for longevity",
          },
          default: {
            default:
              "1. Start with clean skin\n2. Apply products thin to thick\n3. Layer gradually\n4. Blend well\n5. Set if needed",
          },
        };

        // Get the appropriate template
        const categoryPath = userPreferences?.categoryPath || "default";
        const skinType = userPreferences?.skinType?.toLowerCase() || "default";

        // Try to get category-specific template for skin type, fall back to category default, then global default
        const template =
          usageTemplates[categoryPath]?.[skinType] ||
          usageTemplates[categoryPath]?.["default"] ||
          usageTemplates["default"]["default"];

        // Always return the template immediately (for instant response)
        if (!products?.length) {
          response = template;
          break;
        }

        // Use only the first product for LLM customization
        const firstProduct = products[0];
        if (!firstProduct) {
          response = template;
          break;
        }

        // Minimal prompt for LLM
        prompt = `How to use ${firstProduct.name} for ${skinType} skin.\nBase steps:\n${template}\nMake it product-specific, <60w.`;

        // Add detailed logging for diagnostics
        console.log("[AI Assistant][product_usage] Prompt:", prompt);
        const llmStart = Date.now();
        try {
          const usageResult = await trackLLMCall(
            "product_usage",
            () =>
              retryWithBackoff(
                () => model.generateContent(prompt),
                MAX_RETRIES,
                "usage"
              ),
            "usage"
          );
          const llmDuration = Date.now() - llmStart;
          console.log(
            `[AI Assistant][product_usage] LLM call completed in ${llmDuration}ms`
          );
          response = stripPreamble(usageResult.response.text());
        } catch (error: any) {
          const llmDuration = Date.now() - llmStart;
          console.error(
            `[AI Assistant][product_usage] LLM call failed after ${llmDuration}ms`,
            error
          );
          // On error, fall back to the template with product name inserted
          response = `How to use ${firstProduct.name}:\n\n${template}`;
        }
        break;
      }

      case "ingredient_explanation":
        prompt = `${userPreferences.category} key ingredients list.<50w`;

        const ingredientResult = await trackLLMCall(
          "ingredient_explanation",
          () =>
            retryWithBackoff(
              () => model.generateContent(prompt),
              MAX_RETRIES,
              "usage"
            ),
          "usage"
        );
        response = stripPreamble(ingredientResult.response.text());
        break;

      case "next_question_for_category": {
        // If no context is provided, use a fast fallback question based on category
        if (!conversation?.length || !userPreferences?.categoryPath) {
          const fallbackQuestions: Record<string, string[]> = {
            "Makeup > Face": [
              "What's your preferred coverage level?",
              "Do you prefer matte or dewy finish?",
              "Any specific skin concerns to address?",
            ],
            "Makeup > Eyes": [
              "Do you prefer natural or bold looks?",
              "Any specific eye color to enhance?",
              "Interested in waterproof options?",
            ],
            "Makeup > Lips": [
              "Prefer matte or glossy finish?",
              "Looking for long-wear formulas?",
              "Any specific shade family?",
            ],
            default: [
              "What's your skin type?",
              "Any specific concerns to address?",
              "Prefer natural or bold looks?",
            ],
          };

          const categoryPath = userPreferences?.categoryPath || "";
          const questions =
            fallbackQuestions[categoryPath] || fallbackQuestions.default;
          response = questions[Math.floor(Math.random() * questions.length)];
          break;
        }

        // If we have context, use the optimized prompt
        const lastMessages = (conversation || []).slice(-2);
        const conversationText = lastMessages
          .map((msg: any) => `${msg.type[0]}:${msg.content}`)
          .join(";");

        prompt = `Cat:${userPreferences.categoryPath}
${conversationText ? `Chat:${conversationText};` : ""}
1 specific Q about finish/color/skin.<20w`;

        try {
          const nextQuestionResult = await trackLLMCall(
            "next_question",
            () =>
              retryWithBackoff(
                () => model.generateContent(prompt),
                MAX_RETRIES,
                "chatbot"
              ),
            "chatbot"
          );
          response = stripPreamble(nextQuestionResult.response.text());
        } catch (error: any) {
          // If LLM call fails, fall back to category-based question
          const fallbackQuestions: Record<string, string[]> = {
            "Makeup > Face": [
              "What's your preferred coverage level?",
              "Do you prefer matte or dewy finish?",
              "Any specific skin concerns to address?",
            ],
            "Makeup > Eyes": [
              "Do you prefer natural or bold looks?",
              "Any specific eye color to enhance?",
              "Interested in waterproof options?",
            ],
            "Makeup > Lips": [
              "Prefer matte or glossy finish?",
              "Looking for long-wear formulas?",
              "Any specific shade family?",
            ],
            default: [
              "What's your skin type?",
              "Any specific concerns to address?",
              "Prefer natural or bold looks?",
            ],
          };

          const categoryPath = userPreferences?.categoryPath || "";
          const questions =
            fallbackQuestions[categoryPath] || fallbackQuestions.default;
          response = questions[Math.floor(Math.random() * questions.length)];
        }
        break;
      }

      case "product_recommendations": {
        // Fetch products from backend based on userPreferences
        let queryParams: any = {
          page: "1",
          resultPerPage: "20",
          filterPublishProduct: true,
          p_category: "",
          c_category: "",
          n_category: "",
        };
        if (userPreferences.category)
          queryParams.p_category = userPreferences.category;
        if (userPreferences.childCategory)
          queryParams.c_category = userPreferences.childCategory;
        if (userPreferences.nestedChildCategory)
          queryParams.n_category = userPreferences.nestedChildCategory;
        console.log(
          "[AI Assistant] Before product fetch",
          Date.now() - startTime,
          "ms"
        );
        const response = await appwriteProductService.getProductList(
          queryParams
        );
        console.log(
          "[AI Assistant] After product fetch",
          Date.now() - startTime,
          "ms"
        );
        let products = response.documents || [];

        // If no products found with specific criteria, fetch best sellers
        if (products.length === 0) {
          console.log("No specific products found, fetching best sellers...");
          const bestSellersResponse =
            await appwriteProductService.getProductList({
              p_category: "",
              c_category: "",
              n_category: "",
              keyword: "",
              page: "1",
              resultPerPage: "20",
              filterPublishProduct: true,
              sort: "DESC",
            });
          products = bestSellersResponse.documents || [];
        }

        // AI scoring (reuse aiProductDecision logic from client, or inline here)
        products = products.map((product) => {
          let score = 0;
          if (product.parent_category === userPreferences.category) score += 10;
          if (
            product.child_category &&
            userPreferences.childCategory &&
            product.child_category === userPreferences.childCategory
          )
            score += 5;
          if (userPreferences.preferences) {
            const productText = `${product.name} ${
              product.short_description
            } ${(product.tags || []).join(" ")}`.toLowerCase();
            (userPreferences.preferences as string[]).forEach(
              (pref: string) => {
                if (productText.includes(pref.toLowerCase())) score += 3;
              }
            );
          }
          if (product.avg_rating && product.avg_rating >= 4.5) score += 6;
          else if (product.avg_rating && product.avg_rating >= 4.0) score += 4;
          return { ...product, aiScore: score };
        });
        // Sort by score, shuffle, and pick top 5
        products = products.sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));
        // Shuffle for variety
        for (let i = products.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [products[i], products[j]] = [products[j], products[i]];
        }
        const topProducts = products.slice(0, 5).map(({ aiScore, ...p }) => p);
        // Generate a recommendation message
        let recommendationMessage = `Here are some products I think you'll love based on your preferences!`;
        if (topProducts.length > 0) {
          if (products.length === 0 && !userPreferences.category) {
            // This means we're showing best sellers because no specific products were found
            recommendationMessage = `I couldn't find specific products matching your exact criteria, but here are some of our best sellers that customers love!`;
          } else {
            recommendationMessage = `My top pick for you is ${topProducts[0].name}. Let me know if you want more details or have other preferences!`;
          }
        } else {
          recommendationMessage = `I couldn't find any products right now. Please try adjusting your preferences or contact our support team for assistance!`;
        }
        console.log(
          "[AI Assistant] Before sending product recommendations",
          Date.now() - startTime,
          "ms"
        );
        return NextResponse.json({
          success: true,
          products: topProducts,
          recommendationMessage,
        });
      }

      case "chatbot_followup": {
        // Check if products exist to determine if we're post-recommendations
        const isPostRecommendations = products && products.length > 0;

        // Compose a prompt with conversation history, preferences, and products
        const lastMessages = (conversation || []).slice(-3);
        const conversationText = lastMessages
          .map(
            (msg: any) =>
              `${msg.type === "user" ? "User" : "Assistant"}: ${msg.content}`
          )
          .join("\n");
        const productList = (products || [])
          .map(
            (p: any, i: number) =>
              `${i + 1}. ${p.name} - ${p.short_description}`
          )
          .join("\n");

        prompt = `You are an AI Beauty Assistant for a makeup e-commerce website. Here is the conversation so far:\n${conversationText}\n\n${
          isPostRecommendations
            ? `You have already recommended these products:\n${productList}\n\nOnly provide information about these specific products, their usage, features, or help with choosing between them. DO NOT ask about skin type, concerns, or preferences since we already have recommendations.`
            : `User Preferences: ${JSON.stringify(userPreferences)}`
        }\n\nBased on the above, generate the next assistant message. Be friendly and helpful. Keep it under 60 words.`;

        console.log(
          "[AI Assistant] Before LLM call (chatbot_followup)",
          Date.now() - startTime,
          "ms"
        );
        const chatResult = await retryWithBackoff(
          () => model.generateContent(prompt),
          MAX_RETRIES,
          "chatbot"
        );
        console.log(
          "[AI Assistant] After LLM call (chatbot_followup)",
          Date.now() - startTime,
          "ms"
        );
        response = stripPreamble(chatResult.response.text());

        // If response still contains preference questions after recommendations, provide a fallback
        if (
          isPostRecommendations &&
          (response.toLowerCase().includes("skin concern") ||
            response.toLowerCase().includes("preferences") ||
            response.toLowerCase().includes("skin type"))
        ) {
          response =
            "Would you like me to explain more about these products' features, how to use them, or help you choose the best shade for you?";
        }
        break;
      }

      case "product_usage_guide": {
        const productList = (products || [])
          .map(
            (p: any, i: number) =>
              `${i + 1}. ${p.name} - ${p.short_description}`
          )
          .join("\n");
        prompt = `You are an AI Beauty Assistant. The user has been recommended these products:\n${productList}\n\nUser Preferences: Category: ${
          userPreferences.category
        }, Skin Type: ${userPreferences.skinType}, Preferences: ${
          userPreferences.preferences?.join(", ") || "None"
        }\n\nPlease provide a personalized usage guide/routine for these products. Consider the user's skin type and preferences. Make it practical, step-by-step, and easy to follow. Include morning and evening routines if applicable. Keep it under 200 words and make it engaging.`;
        console.log(
          "[AI Assistant] Before LLM call (product_usage_guide)",
          Date.now() - startTime,
          "ms"
        );
        const routineResult = await retryWithBackoff(() =>
          model.generateContent(prompt)
        );
        console.log(
          "[AI Assistant] After LLM call (product_usage_guide)",
          Date.now() - startTime,
          "ms"
        );
        response = stripPreamble(routineResult.response.text());
        break;
      }

      default:
        prompt = `You are an AI Beauty Assistant for a makeup e-commerce website. 
                
                User Preferences: ${JSON.stringify(userPreferences)}
                Products: ${JSON.stringify(products)}
                Question: ${question}
                
                Please provide a helpful, friendly response to the user's question about beauty products. 
                Keep it conversational and under 150 words.`;
        console.log(
          "[AI Assistant] Before LLM call (default)",
          Date.now() - startTime,
          "ms"
        );
        const defaultResult = await retryWithBackoff(() =>
          model.generateContent(prompt)
        );
        console.log(
          "[AI Assistant] After LLM call (default)",
          Date.now() - startTime,
          "ms"
        );
        response = defaultResult.response.text();
    }

    if (response) {
      console.log(
        "[AI Assistant] Before sending response",
        Date.now() - startTime,
        "ms"
      );
      return NextResponse.json({
        success: true,
        response: response,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to generate AI response",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    // Type the error as 'any' for easier property access
    console.error("Error in AI recommendations API:", error);
    if (error.status === 429) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The AI assistant is temporarily unavailable due to usage limits. Please try again later.",
        },
        { status: 429 }
      );
    }
    if (error.status === 504 || error.message === "timeout") {
      return NextResponse.json(
        {
          success: false,
          error:
            "The AI assistant is taking too long to respond. Please try again or ask a different question!",
        },
        { status: 504 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate AI response",
      },
      { status: 500 }
    );
  }
}
