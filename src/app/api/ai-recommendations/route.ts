import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import appwriteProductService from "@/appwrite/appwriteProductService";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Define maximum retries for API calls
const MAX_RETRIES = 3; // You can adjust this value

/**
 * Helper function to retry an async operation with exponential backoff.
 * @param callback The async function to execute.
 * @param retries The number of retry attempts.
 * @returns The result of the callback if successful.
 * @throws The original error if all retries fail.
 */
async function retryWithBackoff<T>(
  callback: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> {
  const timeout = 30000; // 10 seconds
  for (let i = 0; i < retries; i++) {
    try {
      return await Promise.race([
        callback(),
        new Promise<T>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), timeout)
        ),
      ]);
    } catch (error: any) {
      if (error.message === "timeout") {
        throw { status: 504, message: "LLM timeout" };
      }
      // Check if it's a 429 error and if we have retries left
      if (error.status === 429 && i < retries - 1) {
        const delay = Math.pow(2, i) * 1000 + Math.random() * 500; // Exponential backoff with jitter
        console.warn(
          `Rate limit hit (429). Retrying in ${delay}ms... (Attempt ${
            i + 1
          }/${retries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        // Re-throw if not a 429 error or no retries left
        throw error;
      }
    }
  }
  throw new Error("Max retries exceeded without successful response.");
}

function stripPreamble(text: string): string {
  // Remove common preambles like 'Of course! Here is ...' or 'Sure! Here is ...' or similar
  return text.replace(/^.*?(?=\w+\?)/, "").trim() || text.trim();
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

    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-pro" });

    let prompt = "";
    let response = "";

    switch (question) {
      case "explain_recommendations":
        prompt = `You are an AI Beauty Assistant for a makeup e-commerce website. 
                
                User Preferences:
                - Category: ${userPreferences.category}
                - Skin Type: ${userPreferences.skinType}
                - Budget: ${userPreferences.budget}
                - Occasion: ${userPreferences.occasion}
                - Preferences: ${
                  userPreferences.preferences?.join(", ") || "None specified"
                }

                Products Recommended:
                ${products
                  .map(
                    (product: any, index: number) =>
                      `${index + 1}. ${product.name} - ${
                        product.short_description
                      } - Price: $${product.sale_price}`
                  )
                  .join("\n")}

                Please explain why these products are perfect for this user in a friendly, conversational tone. 
                Focus on how each product matches their specific needs and preferences. 
                Keep the response under 200 words and make it engaging and helpful.`;
        console.log(
          "[AI Assistant] Before LLM call (explain_recommendations)",
          Date.now() - startTime,
          "ms"
        );
        const result = await retryWithBackoff(() =>
          model.generateContent(prompt)
        );
        console.log(
          "[AI Assistant] After LLM call (explain_recommendations)",
          Date.now() - startTime,
          "ms"
        );
        response = result.response.text();
        break;

      case "product_usage":
        prompt = `You are an AI Beauty Assistant. The user is asking about how to use beauty products in the ${userPreferences.category} category.
                
                Please provide a simple, step-by-step guide for using ${userPreferences.category} products, considering their ${userPreferences.skinType} skin type.
                Make it practical and easy to follow. Keep it under 150 words.`;
        console.log(
          "[AI Assistant] Before LLM call (product_usage)",
          Date.now() - startTime,
          "ms"
        );
        const usageResult = await retryWithBackoff(() =>
          model.generateContent(prompt)
        );
        console.log(
          "[AI Assistant] After LLM call (product_usage)",
          Date.now() - startTime,
          "ms"
        );
        response = usageResult.response.text();
        break;

      case "ingredient_explanation":
        prompt = `You are an AI Beauty Assistant. The user is asking about ingredients in beauty products.
                
                Please explain common beauty product ingredients in simple terms, focusing on what they do for the skin.
                Make it educational but easy to understand. Keep it under 150 words.`;
        console.log(
          "[AI Assistant] Before LLM call (ingredient_explanation)",
          Date.now() - startTime,
          "ms"
        );
        const ingredientResult = await retryWithBackoff(() =>
          model.generateContent(prompt)
        );
        console.log(
          "[AI Assistant] After LLM call (ingredient_explanation)",
          Date.now() - startTime,
          "ms"
        );
        response = ingredientResult.response.text();
        break;

      case "next_question_for_category":
        const lastMessages = (conversation || []).slice(-3);
        const conversationText = lastMessages
          .map(
            (msg: any) =>
              `${msg.type === "user" ? "User" : "Assistant"}: ${msg.content}`
          )
          .join("\n");
        prompt = `You are an AI Beauty Assistant for a makeup e-commerce website.\n\nThe user has ALREADY selected the following category path: ${userPreferences.categoryPath}.\nDO NOT ask about category, area, or section again.\nNEVER repeat any question about category, area, or section.\nNEVER reply with generic questions like 'else?', 'anything else?', or 'other?'.\nAsk ONLY the next relevant, specific, and helpful question for this category path (e.g., finish, color, skin type, etc.).\nHere is the recent conversation:\n${conversationText}\nKeep your question under 30 words. Be friendly and specific.\nIf you understand, reply ONLY with a specific, helpful question for this category.`;
        console.log(
          "[AI Assistant] Before LLM call (next_question_for_category)",
          Date.now() - startTime,
          "ms"
        );
        const nextQResult = await retryWithBackoff(() =>
          model.generateContent(prompt)
        );
        console.log(
          "[AI Assistant] After LLM call (next_question_for_category)",
          Date.now() - startTime,
          "ms"
        );
        response = stripPreamble(nextQResult.response.text());
        break;

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
        let followupInstructions = "";
        if (
          instructions &&
          instructions.includes(
            "user has already received product recommendations"
          )
        ) {
          followupInstructions =
            "Do NOT ask for more preferences or repeat pre-recommendation questions. Only answer questions or offer help about the recommended products, usage, or related topics.";
        }
        prompt = `You are an AI Beauty Assistant for a makeup e-commerce website. Here is the conversation so far:\n${conversationText}\n\nUser Preferences: ${JSON.stringify(
          userPreferences
        )}\nRecommended Products: ${productList}\n${followupInstructions}\nBased on the above, generate the next assistant message to keep the user engaged. Be friendly, helpful, and conversational. If the user asks a question, answer it. If not, offer more help. Keep it under 60 words.`;
        console.log(
          "[AI Assistant] Before LLM call (chatbot_followup)",
          Date.now() - startTime,
          "ms"
        );
        const chatResult = await retryWithBackoff(() =>
          model.generateContent(prompt)
        );
        console.log(
          "[AI Assistant] After LLM call (chatbot_followup)",
          Date.now() - startTime,
          "ms"
        );
        response = stripPreamble(chatResult.response.text());
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
