# AI Beauty Assistant Setup Guide

## Overview
The AI Beauty Assistant is now fully integrated with Google's Gemini AI for intelligent product recommendations and conversational responses.

## Features
- 🤖 Real AI-powered product recommendations using Gemini AI
- 💬 Intelligent conversation handling
- 🎯 Personalized product suggestions based on user preferences
- 📱 Beautiful, responsive chat interface
- 🔄 Context-aware follow-up questions
- 💡 Product usage guides and ingredient explanations

## Setup Instructions

### 1. Install Dependencies
The required packages are already installed:
```bash
pnpm add @google/generative-ai
```

### 2. Configure Gemini AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the API key to your `.env.local` file:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Category Structure
The assistant now properly recognizes the actual category structure:
- **Parent Categories**: `makeup`, `personal-care`
- **Child Categories**: `lips`, `face`, `eyes`, `tools-&-brushes`
- **Nested Categories**: `bullet`, `semi-matte`, `liquid`, etc.

### 4. How It Works

#### Category Recognition
- Users can say "lips", "face", "eyes", "personal care", etc.
- The system matches keywords to actual category slugs
- Supports both exact matches and keyword-based matching

#### Product Fetching
- Fetches products from the backend using `appwriteProductService`
- Uses proper category filtering (`p_category`, `c_category`)
- Implements AI scoring for personalized recommendations

#### AI Responses
- Real Gemini AI responses for product explanations
- Context-aware follow-up question handling
- Fallback responses if AI is unavailable

### 5. API Endpoints

#### `/api/ai-recommendations`
Handles AI-powered responses for:
- `explain_recommendations`: Why products were recommended
- `product_usage`: How to use products
- `ingredient_explanation`: Ingredient information
- `general`: General beauty questions

### 6. Usage Examples

#### User Input Examples:
- "I want lipstick" → Recognizes "lips" category
- "Show me face products" → Recognizes "face" category
- "I need skincare" → Recognizes "personal-care" category
- "How do I use these products?" → AI-generated usage guide
- "Why did you recommend these?" → AI explanation of recommendations

#### Conversation Flow:
1. **Greeting** → Welcome message
2. **Category Selection** → User chooses product area
3. **Skin Type** → Oily, dry, combination, sensitive
4. **Preferences** → Matte, dewy, vegan, etc.
5. **Budget** → Budget-friendly, mid-range, premium
6. **Occasion** → Everyday, special events, professional, party
7. **Recommendations** → AI-powered product suggestions
8. **Follow-up** → Answer questions about products

### 7. Customization

#### Adding New Categories
Update the `categoryMappings` object in `findCategoryByInput()`:
```typescript
const categoryMappings: { [key: string]: string[] } = {
  'new-category': ['keyword1', 'keyword2', 'keyword3']
};
```

#### Modifying AI Prompts
Edit the prompts in `/api/ai-recommendations/route.ts` to customize AI responses.

#### Styling
The component uses Tailwind CSS classes and can be customized in the JSX.

### 8. Troubleshooting

#### Category Not Recognized
- Check the actual category slugs in your database
- Update the `categoryMappings` object
- Verify category loading in `loadCategories()`

#### AI Responses Not Working
- Verify `GEMINI_API_KEY` is set in `.env.local`
- Check browser console for API errors
- Ensure the API route is accessible

#### Products Not Loading
- Check `appwriteProductService` configuration
- Verify category parameters in `fetchRecommendedProducts()`
- Check network requests in browser dev tools

### 9. Performance Notes
- AI responses are cached to improve performance
- Product fetching uses pagination (20 products per request)
- Fallback responses ensure functionality even without AI

## Support
For issues or questions, check the browser console for error messages and verify all configuration steps are completed. 