# AI Beauty Assistant

A comprehensive AI-powered beauty assistant for the LOISCHLOE makeup e-commerce website that helps users find the perfect beauty products through conversational interactions.

## Features

### 🎯 Core Functionality
- **Warm Greeting**: Welcomes users with a friendly message when they open the chat
- **Step-by-Step Questions**: Guides users through a structured conversation to understand their needs
- **Product Recommendations**: Fetches and displays relevant products from the backend API
- **Conversational Interface**: Natural, friendly tone throughout the interaction

### 🛍️ Shopping Assistance
- **Category Selection**: Helps users choose between Lips, Face, Eyes, or Personal Care
- **Skin Type Analysis**: Identifies skin type (oily, dry, combination, sensitive)
- **Preference Collection**: Gathers product preferences (matte, dewy, vegan, cruelty-free, etc.)
- **Smart Product Filtering**: Uses collected preferences to find the best matches

### 💬 Interactive Features
- **Follow-up Questions**: Users can ask about routines, ingredients, shipping, pricing, etc.
- **Product Usage Guides**: Generates personalized beauty routines based on selected categories
- **Product Display**: Shows product images, names, ratings, prices, and direct links
- **Conversation Reset**: Users can start a new conversation anytime

### 🎨 User Experience
- **Floating Chat Button**: Always accessible from any page
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Typing Indicators**: Shows when the assistant is processing responses
- **Loading States**: Clear feedback during product searches
- **Keyboard Support**: Enter key to send messages, Shift+Enter for new lines

## How It Works

### 1. Initial Interaction
- User clicks the floating chat button (bottom-right corner)
- Assistant greets user and asks about shopping area
- Conversation follows a structured flow

### 2. Information Gathering
1. **Category**: Lips, Face, Eyes, or Personal Care
2. **Skin Type**: Oily, Dry, Combination, or Sensitive
3. **Preferences**: Matte, Dewy, Vegan, Cruelty-free, Long-lasting, etc.

### 3. Product Recommendations
- Fetches products from backend using Appwrite service
- Filters based on user preferences
- Displays top 3 recommendations with images and details
- Provides direct links to product pages

### 4. Follow-up Support
Users can ask about:
- Product usage routines
- Ingredients information
- Shipping and delivery
- Pricing questions
- Returns and refunds
- General beauty advice

## Technical Implementation

### Dependencies
- React with TypeScript
- Next.js Image component
- Appwrite for backend integration
- Lucide React for icons
- Tailwind CSS for styling

### Key Components
- **Message Interface**: Handles chat messages with timestamps
- **User Preferences**: Stores category, skin type, and product preferences
- **Product Interface**: Defines product structure for recommendations
- **Conversation Flow**: Manages different conversation states

### API Integration
- Uses `appwriteProductService.getProductList()` for product fetching
- Supports category-based filtering
- Handles product images, pricing, and ratings
- Fallback to featured products if no matches found

## Usage

The component is automatically included in the main website layout and appears on all pages as a floating chat button. Users can:

1. Click the chat button to start a conversation
2. Follow the assistant's questions to find products
3. Ask follow-up questions about products or general beauty topics
4. Click "View" buttons to go directly to product pages
5. Use the reset button to start a new conversation

## Customization

### Styling
- Uses brand colors (`brand_primary`, `brand_secondary`)
- Responsive design with Tailwind CSS
- Custom animations and transitions

### Content
- All messages and responses are easily customizable
- Product filtering logic can be extended
- Additional conversation flows can be added

### Integration
- Seamlessly integrates with existing product system
- Uses existing UI components (Button, Textarea, etc.)
- Follows project's design patterns and conventions

## Error Handling

- Graceful fallback when products aren't found
- Error messages for API failures
- Loading states for better UX
- Input validation for user responses

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast design
- Responsive touch targets

The AI Beauty Assistant provides a modern, engaging way for customers to discover products while maintaining the friendly, helpful tone that builds trust and encourages purchases. 