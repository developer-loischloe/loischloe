# Gemini AI Integration for AI Beauty Assistant

This document explains how to integrate Google's Gemini AI with the AI Beauty Assistant for enhanced product recommendations and explanations.

## Current Implementation

The AI Beauty Assistant currently uses a simple scoring system to recommend products based on:
- Category matching
- Price range alignment
- User preferences
- Product ratings
- Skin type compatibility

## Enhanced AI Integration with Gemini

### 1. Install Gemini AI SDK

```bash
npm install @google/generative-ai
```

### 2. Set up Environment Variables

Add to your `.env.local`:

```env
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Enhanced API Route

Update `src/app/api/ai-recommendations/route.ts`:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userPreferences, products, question } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let prompt = '';
    
    if (question === 'explain_recommendations') {
      prompt = generateExplanationPrompt(userPreferences, products);
    } else if (question === 'product_suggestion') {
      prompt = generateSuggestionPrompt(userPreferences, products);
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      success: true, 
      response: text,
      aiPowered: true 
    });
  } catch (error) {
    console.error('Gemini AI error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process AI recommendation' 
    }, { status: 500 });
  }
}

function generateExplanationPrompt(userPreferences: any, products: any[]) {
  return `You are an AI Beauty Assistant helping a customer understand product recommendations.

Customer Profile:
- Category: ${userPreferences.category}
- Skin Type: ${userPreferences.skinType}
- Budget: ${userPreferences.budget}
- Occasion: ${userPreferences.occasion}
- Preferences: ${userPreferences.preferences?.join(', ') || 'None specified'}

Recommended Products:
${products.map((p, i) => `${i + 1}. ${p.name} - $${p.sale_price} (Rating: ${p.avg_rating || 'N/A'})`).join('\n')}

Please explain in a friendly, conversational tone why these specific products were recommended for this customer. Focus on:
1. How each product matches their skin type
2. Why the price range is appropriate for their budget
3. How the products suit their intended occasion
4. Any specific features that match their preferences

Keep the explanation warm, helpful, and under 200 words.`;
}

function generateSuggestionPrompt(userPreferences: any, products: any[]) {
  return `You are an AI Beauty Assistant providing personalized product suggestions.

Customer Profile:
- Category: ${userPreferences.category}
- Skin Type: ${userPreferences.skinType}
- Budget: ${userPreferences.budget}
- Occasion: ${userPreferences.occasion}

Available Products:
${products.map((p, i) => `${i + 1}. ${p.name} - $${p.sale_price} (Rating: ${p.avg_rating || 'N/A'})`).join('\n')}

Please provide a personalized recommendation explaining:
1. Why these products are perfect for their skin type
2. How they fit their budget and occasion
3. Any special features or benefits
4. How to use these products together

Make it conversational, friendly, and helpful. Keep it under 150 words.`;
}
```

### 4. Benefits of Gemini Integration

#### Enhanced Product Explanations
- **Contextual Understanding**: Gemini can understand complex beauty terminology and skin concerns
- **Personalized Reasoning**: Explains why specific products match individual needs
- **Usage Guidance**: Provides tips on how to use recommended products together

#### Better Product Matching
- **Semantic Understanding**: Can understand product descriptions and match them to user needs
- **Ingredient Analysis**: Can explain why certain ingredients work for specific skin types
- **Trend Awareness**: Can incorporate current beauty trends and recommendations

#### Improved User Experience
- **Natural Conversations**: More human-like responses and explanations
- **Educational Content**: Teaches users about beauty products and routines
- **Confidence Building**: Helps users feel confident in their product choices

### 5. Example Gemini Responses

#### Product Explanation
```
"I recommended the Matte Lipstick Collection for you because it's perfect for your combination skin and budget-friendly price range. These lipsticks are formulated with hydrating ingredients that won't dry out your lips, which is important for combination skin types. The matte finish is ideal for professional settings, and the long-lasting formula means you won't need frequent touch-ups during your workday. Plus, at $15-25 per lipstick, they fit perfectly within your mid-range budget while still offering premium quality."
```

#### Usage Guidance
```
"For your everyday professional look, I suggest starting with the hydrating primer to create a smooth base, then apply the medium-coverage foundation that works well with your oily T-zone. Set with the translucent powder to control shine, and finish with the natural blush for a healthy glow. This routine will last through your workday and keep your skin looking fresh!"
```

### 6. Implementation Steps

1. **Get Gemini API Key**: Sign up for Google AI Studio and get your API key
2. **Install SDK**: Add the Gemini AI package to your project
3. **Update Environment**: Add your API key to environment variables
4. **Enhance API Route**: Replace the current placeholder with Gemini integration
5. **Test Integration**: Verify that the AI responses are working correctly
6. **Monitor Usage**: Track API usage and costs

### 7. Cost Considerations

- Gemini Pro: $0.0005 / 1K characters (input) + $0.0015 / 1K characters (output)
- Typical beauty recommendation: ~500 characters = ~$0.001 per interaction
- Monitor usage to optimize costs

### 8. Fallback Strategy

The current implementation includes fallback responses in case the Gemini API is unavailable:
- Local explanation generation
- Simple product matching
- Basic recommendation logic

This ensures the assistant continues to work even if the AI service is down.

## Next Steps

1. Implement the Gemini integration as described above
2. Test with real user interactions
3. Monitor response quality and user satisfaction
4. Optimize prompts based on user feedback
5. Consider adding more sophisticated features like ingredient analysis and trend recommendations 