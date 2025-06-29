"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/utils';
import appwriteProductService from '@/appwrite/appwriteProductService';
import appwriteCategoryService from '@/appwrite/appwriteCategoryService';
import { MessageCircle, X, Send, Sparkles, ShoppingBag, Heart, Star, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  type: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

interface UserPreferences {
  category?: string;
  skinType?: string;
  preferences?: string[];
  budget?: string;
  occasion?: string;
  childCategory?: string;
  nestedChildCategory?: string;
}

interface Product {
  $id: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number;
  images: Array<{ image_url: string; alt: string }>;
  short_description: string;
  avg_rating?: number;
  reviews?: any[];
  tags?: string[];
  parent_category?: string;
  child_category?: string;
  nested_child_category?: string;
}

interface Category {
  $id: string;
  name: string;
  slug: string;
  childCategories?: Category[];
  nestedChildCategories?: Category[];
}

const AiBeautyAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({});
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [conversationStep, setConversationStep] = useState<'greeting' | 'category' | 'skinType' | 'preferences' | 'budget' | 'occasion' | 'recommendations' | 'routine' | 'followup'>('greeting');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [categoryStep, setCategoryStep] = useState<'parent' | 'child' | 'nested' | null>(null);
  const [selectedParent, setSelectedParent] = useState<Category | null>(null);
  const [selectedChild, setSelectedChild] = useState<Category | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadCategories();
      setTimeout(() => {
        addMessage('assistant', "Hi there! 👋 I'm your AI Beauty Assistant. Let's start by choosing what area you're shopping for today:");
        setCategoryStep('parent');
        setConversationStep('category');
      }, 500);
    }
  }, [isOpen]);

  const loadCategories = async () => {
    try {
      const categoryResponse = await appwriteCategoryService.getCategoryList();
      console.log(categoryResponse);
      
      setCategories((categoryResponse.documents || []) as unknown as Category[]);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setUserPreferences({});
    setRecommendedProducts([]);
    setConversationStep('greeting');
    setInputValue('');
  };

  const addMessage = (type: 'assistant' | 'user', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const fetchLLMChatbotResponse = async (userInput?: string) => {
    setIsTyping(true);
    try {
      const response = await fetch('/api/ai-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPreferences,
          conversation: messages.concat(userInput ? [{ id: Date.now().toString(), type: 'user', content: userInput, timestamp: new Date() }] : []),
          products: recommendedProducts,
          question: 'chatbot_followup'
        })
      });
      const data = await response.json();
      if (data.success && data.response) {
        addMessage('assistant', data.response);
      }
    } catch (error) {
      addMessage('assistant', "I'm here if you have more questions or want to explore more products!");
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (conversationStep === 'recommendations' && recommendedProducts.length > 0) {
      fetchLLMChatbotResponse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationStep, recommendedProducts]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
    const userInput = inputValue.trim();
    addMessage('user', userInput);
    setInputValue('');
    setIsTyping(true);
    if (conversationStep === 'followup') {
      try {
        const response = await fetch('/api/ai-recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userPreferences,
            conversation: messages.concat([{ id: Date.now().toString(), type: 'user', content: userInput, timestamp: new Date() }]),
            products: recommendedProducts,
            question: 'chatbot_followup'
          })
        });
        const data = await response.json();
        if (data.success && data.response) {
          addMessage('assistant', data.response);
        } else {
          addMessage('assistant', "I'm not sure about that. Please contact our support team for more help!");
        }
      } catch (error) {
        addMessage('assistant', "I'm not sure about that. Please contact our support team for more help!");
      } finally {
        setIsTyping(false);
      }
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      await processUserInput(userInput);
    } catch (error) {
      console.error('Error processing user input:', error);
      addMessage('assistant', "I'm sorry, I encountered an error. Please try again or contact our support team.");
    } finally {
      setIsTyping(false);
    }
  };

  const processUserInput = async (input: string) => {
    const lowerInput = input.toLowerCase();

    // Handle reset command
    if (lowerInput.includes('reset') || lowerInput.includes('start over') || lowerInput.includes('new conversation')) {
      resetConversation();
      setTimeout(() => {
        addMessage('assistant', "Hi there! 👋 I'm your AI Beauty Assistant. I'm here to help you find the perfect beauty products! What area are you shopping for today? (Lips, Face, Eyes, or Personal Care)");
        setConversationStep('category');
      }, 500);
      return;
    }

    switch (conversationStep) {
      case 'category':
        addMessage('assistant', "Please select a category by clicking one of the options above.");
        break;
      case 'skinType':
        await handleSkinTypeSelection(lowerInput);
        break;
      case 'preferences':
        await handlePreferencesSelection(lowerInput);
        break;
      case 'occasion':
        await handleOccasionSelection(lowerInput);
        break;
      case 'recommendations':
      case 'routine':
      case 'followup':
        await handleFollowUpQuestion(input);
        break;
      default:
        addMessage('assistant', "I'm not sure how to help with that. Could you tell me what area you're shopping for? (Lips, Face, Eyes, or Personal Care)");
    }
  };

  const findCategoryByInput = (input: string): any => {
    const lowerInput = input.toLowerCase();

    // Helper to check if input matches a category name or slug
    const matches = (cat: any) =>
      lowerInput.includes((cat.name || '').toLowerCase()) ||
      lowerInput.includes((cat.slug || '').toLowerCase());

    // 1. Check parent categories
    for (const parent of categories) {
      if (matches(parent)) {
        return { ...parent, matchLevel: 'parent' };
      }
      // 2. Check child categories
      if (parent.childCategories) {
        for (const child of parent.childCategories) {
          if (matches(child)) {
            return { ...child, parentSlug: parent.slug, matchLevel: 'child' };
          }
          // 3. Check nested child categories
          if (child.nestedChildCategories) {
            for (const nested of child.nestedChildCategories) {
              if (matches(nested)) {
                return { ...nested, parentSlug: parent.slug, childSlug: child.slug, matchLevel: 'nested' };
              }
            }
          }
        }
      }
    }
    // Fallback: keyword mapping (for synonyms, etc.)
    const keywordMappings: { [key: string]: string[] } = {
      'lips': ['lip', 'lipstick', 'lip gloss', 'lip liner'],
      'face': ['foundation', 'concealer', 'blush', 'bronzer', 'powder', 'primer'],
      'eyes': ['eye', 'mascara', 'eyeshadow', 'eyeliner', 'eyebrow'],
      'personal-care': ['skincare', 'cleanser', 'moisturizer', 'serum', 'toner', 'sunscreen', 'personal care', 'skin care'],
    };
    for (const [slug, keywords] of Object.entries(keywordMappings)) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        // Try to find the best match in the structure
        for (const parent of categories) {
          if (parent.slug === slug || (parent.childCategories && parent.childCategories.some((c: any) => c.slug === slug))) {
            return { ...parent, matchLevel: 'parent' };
          }
          if (parent.childCategories) {
            for (const child of parent.childCategories) {
              if (child.slug === slug) {
                return { ...child, parentSlug: parent.slug, matchLevel: 'child' };
              }
            }
          }
        }
      }
    }
    return null;
  };

  const handleCategoryClick = (cat: Category, level: 'parent' | 'child' | 'nested') => {
    if (level === 'parent') {
      setSelectedParent(cat);
      addMessage('user', cat.name);
      if (cat.childCategories && cat.childCategories.length > 0) {
        setCategoryStep('child');
        addMessage('assistant', `Great! Now, which type of ${cat.name} products are you interested in?`);
      } else {
        setUserPreferences(prev => ({ ...prev, category: cat.slug }));
        setCategoryStep(null);
        addMessage('assistant', 'Do you have any specific skin concerns? (e.g., oily, dry, acne-prone, sensitive)');
        setConversationStep('skinType');
      }
    } else if (level === 'child') {
      setSelectedChild(cat);
      addMessage('user', getCategoryPath());
      if (cat.nestedChildCategories && cat.nestedChildCategories.length > 0) {
        setCategoryStep('nested');
        addMessage('assistant', `Awesome! Please select a more specific category for ${cat.name}:`);
      } else {
        setUserPreferences(prev => ({ ...prev, category: selectedParent?.slug, childCategory: cat.slug }));
        setCategoryStep(null);
        addMessage('assistant', 'Do you have any specific skin concerns? (e.g., oily, dry, acne-prone, sensitive)');
        setConversationStep('skinType');
      }
    } else if (level === 'nested') {
      setUserPreferences(prev => ({ ...prev, category: selectedParent?.slug, childCategory: selectedChild?.slug, nestedChildCategory: cat.slug }));
      addMessage('user', getCategoryPath());
      setCategoryStep(null);
      addMessage('assistant', 'Do you have any specific skin concerns? (e.g., oily, dry, acne-prone, sensitive)');
      setConversationStep('skinType');
    }
  };

  const getCategoryPath = () => {
    if (selectedParent && selectedChild && userPreferences.nestedChildCategory) {
      const nested = selectedChild.nestedChildCategories?.find(nc => nc.slug === userPreferences.nestedChildCategory);
      return `${selectedParent.name} > ${selectedChild.name} > ${nested?.name || userPreferences.nestedChildCategory}`;
    } else if (selectedParent && selectedChild) {
      return `${selectedParent.name} > ${selectedChild.name}`;
    } else if (selectedParent) {
      return selectedParent.name;
    }
    return '';
  };

  const handleSkinTypeSelection = async (input: string) => {
    let skinType = '';
    if (input.includes('oily')) {
      skinType = 'oily';
    } else if (input.includes('dry')) {
      skinType = 'dry';
    } else if (input.includes('combination') || input.includes('combo')) {
      skinType = 'combination';
    } else if (input.includes('sensitive')) {
      skinType = 'sensitive';
    } else if (input.includes('acne')) {
      skinType = 'acne-prone';
    } else {
      addMessage('assistant', "I didn't quite understand. Could you tell me if you have oily, dry, combination, sensitive, or acne-prone skin?");
      return;
    }
    setUserPreferences(prev => ({ ...prev, skinType }));
    addMessage('user', skinType);
    addMessage('assistant', 'Any product preferences? (e.g., matte, dewy, vegan, fragrance-free, none)');
    setConversationStep('preferences');
  };

  const handlePreferencesSelection = async (input: string) => {
    const preferences: string[] = [];
    if (input.includes('none') || input.includes('no preference')) {
      // No specific preferences
    } else {
      if (input.includes('matte')) preferences.push('matte');
      if (input.includes('dewy') || input.includes('glow')) preferences.push('dewy');
      if (input.includes('vegan')) preferences.push('vegan');
      if (input.includes('cruelty') || input.includes('cruelty-free')) preferences.push('cruelty-free');
      if (input.includes('long') || input.includes('lasting')) preferences.push('long-lasting');
      if (input.includes('natural')) preferences.push('natural');
      if (input.includes('waterproof')) preferences.push('waterproof');
      if (input.includes('organic')) preferences.push('organic');
      if (input.includes('paraben') || input.includes('paraben-free')) preferences.push('paraben-free');
      if (input.includes('fragrance') || input.includes('fragrance-free')) preferences.push('fragrance-free');
    }
    setUserPreferences(prev => ({ ...prev, preferences }));
    addMessage('user', preferences.length ? preferences.join(', ') : 'No specific preferences');
    addMessage('assistant', "Great! Let me find some perfect products for you based on your preferences. Give me a moment to search our collection...");
    setConversationStep('recommendations');
    await fetchRecommendedProducts();
  };

  const handleOccasionSelection = async (input: string) => {
    let occasion = '';
    if (input.includes('everyday') || input.includes('daily') || input.includes('casual')) {
      occasion = 'everyday';
    } else if (input.includes('special') || input.includes('event') || input.includes('formal')) {
      occasion = 'special-events';
    } else if (input.includes('professional') || input.includes('work') || input.includes('office')) {
      occasion = 'professional';
    } else if (input.includes('party') || input.includes('evening') || input.includes('night')) {
      occasion = 'party-evening';
    } else {
      occasion = 'everyday'; // Default
    }

    setUserPreferences(prev => ({ ...prev, occasion }));
    
    addMessage('assistant', "Excellent! Let me find some perfect products for you based on your preferences. Give me a moment to search our collection...");
    
    // Fetch products based on preferences
    await fetchRecommendedProducts();
  };

  const aiProductDecision = (products: Product[], preferences: UserPreferences): Product[] => {
    let scoredProducts = products.map(product => {
      let score = 0;
      
      // Category match
      if (product.parent_category === preferences.category) score += 10;
      if (product.child_category && preferences.category) score += 5;
      
      // Price range scoring
      if (preferences.budget === 'budget-friendly' && product.sale_price < 20) score += 8;
      else if (preferences.budget === 'mid-range' && product.sale_price >= 20 && product.sale_price < 50) score += 8;
      else if (preferences.budget === 'premium' && product.sale_price >= 50) score += 8;
      
      // Rating scoring
      if (product.avg_rating && product.avg_rating >= 4.5) score += 6;
      else if (product.avg_rating && product.avg_rating >= 4.0) score += 4;
      
      // Preference matching
      if (preferences.preferences) {
        const productText = `${product.name} ${product.short_description} ${product.tags?.join(' ') || ''}`.toLowerCase();
        preferences.preferences.forEach(pref => {
          if (productText.includes(pref.toLowerCase())) score += 3;
        });
      }
      
      // Occasion-based scoring
      if (preferences.occasion === 'everyday' && product.name.toLowerCase().includes('natural')) score += 2;
      if (preferences.occasion === 'special-events' && (product.name.toLowerCase().includes('long') || product.name.toLowerCase().includes('lasting'))) score += 2;
      if (preferences.occasion === 'professional' && product.name.toLowerCase().includes('matte')) score += 2;
      if (preferences.occasion === 'party-evening' && (product.name.toLowerCase().includes('glitter') || product.name.toLowerCase().includes('shimmer'))) score += 2;
      
      return { ...product, aiScore: score };
    });
    
    // Sort by AI score and return top products
    return scoredProducts
      .sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0))
      .slice(0, 5)
      .map(({ aiScore, ...product }) => product);
  };

  // Utility to shuffle an array
  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const fetchRecommendedProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPreferences,
          products: [], // let the API fetch products
          question: 'product_recommendations'
        })
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.products)) {
        setRecommendedProducts(data.products.slice(0, 5));
        addMessage('assistant', data.recommendationMessage || 'Here are some products you might like!');
        setConversationStep('routine');
        // Generate and show usage guide
        await fetchRoutineGuide(data.products.slice(0, 3));
      } else {
        addMessage('assistant', "I couldn't find specific products matching your criteria, but here are some of our best sellers:");
        setRecommendedProducts([]);
        setConversationStep('routine');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      addMessage('assistant', "I'm having trouble accessing our product database right now. Please try again or contact our support team.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleFollowUpQuestion = async (input: string) => {
    const lowerInput = input.toLowerCase();

    try {
      let questionType = 'general';
      
      if (lowerInput.includes('routine') || lowerInput.includes('how to use') || lowerInput.includes('application')) {
        questionType = 'product_usage';
      } else if (lowerInput.includes('ingredient') || lowerInput.includes('what\'s in') || lowerInput.includes('contains')) {
        questionType = 'ingredient_explanation';
      } else if (lowerInput.includes('why') || lowerInput.includes('recommend')) {
        questionType = 'explain_recommendations';
      }

      // Use Gemini AI for responses
      const response = await fetch('/api/ai-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPreferences,
          products: recommendedProducts,
          question: questionType
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        addMessage('assistant', data.response);
      } else {
        // Fallback responses if AI is not available
        if (lowerInput.includes('routine') || lowerInput.includes('how to use') || lowerInput.includes('application')) {
          generateRoutine();
        } else if (lowerInput.includes('price') || lowerInput.includes('cost') || input.includes('expensive')) {
          addMessage('assistant', "Our products range from affordable to premium luxury. The prices you see are competitive and reflect the quality of ingredients and formulation. Many customers find our products offer excellent value for money!");
        } else if (lowerInput.includes('ingredient') || lowerInput.includes('what\'s in') || lowerInput.includes('contains')) {
          addMessage('assistant', "Each product has detailed ingredient lists on their individual pages. You can click on any product to see the full ingredient breakdown and learn about what makes each formula special!");
        } else if (lowerInput.includes('shipping') || lowerInput.includes('delivery') || lowerInput.includes('when')) {
          addMessage('assistant', "We offer fast shipping! Standard delivery takes 3-5 business days, and express shipping is available for 1-2 business days. Free shipping on orders over $50!");
        } else if (lowerInput.includes('return') || lowerInput.includes('refund')) {
          addMessage('assistant', "We have a 30-day return policy for unused products in their original packaging. If you're not completely satisfied, we'll be happy to help you with a return or exchange!");
        } else if (lowerInput.includes('more') || lowerInput.includes('other') || lowerInput.includes('different')) {
          addMessage('assistant', "I'd be happy to help you find more products! You can ask me to search for different categories, or you can browse our full collection on the website. What would you like to explore?");
        } else {
          addMessage('assistant', "That's a great question! I'd be happy to help you find more specific information. You can also ask me about product routines, ingredients, shipping, returns, or anything else beauty-related!");
        }
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback to simple response
      addMessage('assistant', "I'm here to help! You can ask me about product routines, ingredients, shipping, returns, or anything else beauty-related!");
    }
  };

  const generateRoutine = () => {
    const { category } = userPreferences;
    let routine = '';

    if (category === 'personal-care') {
      routine = `Here's a simple skincare routine for you:\n\n🌅 Morning:\n• Gentle Cleanser\n• Hydrating Serum\n• Moisturizer with SPF\n\n🌙 Evening:\n• Makeup Remover\n• Gentle Cleanser\n• Toner\n• Night Cream`;
    } else if (category === 'face') {
      routine = `Here's a makeup application routine:\n\n1. Start with a clean, moisturized face\n2. Apply primer for long-lasting wear\n3. Use foundation/concealer for even coverage\n4. Set with powder to prevent shine\n5. Add blush and bronzer for dimension`;
    } else if (category === 'eyes') {
      routine = `Here's an eye makeup routine:\n\n1. Apply eye primer for long-lasting color\n2. Use eyeshadow in your preferred shades\n3. Apply eyeliner for definition\n4. Finish with mascara for volume and length\n5. Use makeup remover specifically for eyes`;
    } else if (category === 'lips') {
      routine = `Here's a lip care and makeup routine:\n\n1. Exfoliate lips gently with a lip scrub\n2. Apply lip balm for hydration\n3. Use lip liner to define shape\n4. Apply lipstick or lip gloss\n5. Reapply throughout the day as needed`;
    } else {
      routine = `Here's a general beauty routine:\n\n🌅 Morning:\n• Cleanse and moisturize\n• Apply sunscreen\n• Light makeup if desired\n\n🌙 Evening:\n• Remove all makeup\n• Cleanse thoroughly\n• Apply night treatments`;
    }

    addMessage('assistant', routine);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Add a function to get the next question from the LLM based on the selected category path
 
  

  // New: fetchRoutineGuide to get a usage guide from the LLM
  const fetchRoutineGuide = async (products: Product[]) => {
    try {
      const response = await fetch('/api/ai-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPreferences,
          products,
          question: 'product_usage_guide'
        })
      });
      const data = await response.json();
      if (data.success && data.response) {
        addMessage('assistant', data.response);
        setConversationStep('followup');
      }
    } catch (error) {
      addMessage('assistant', "I'm here if you have more questions or want to explore more products!");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-brand_primary hover:bg-brand_secondary text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50 group"
        aria-label="Open AI Beauty Assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          <Sparkles className="w-3 h-3" />
        </div>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[600px] flex flex-col">
            {/* Header */}
            <div className="bg-brand_primary text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Beauty Assistant</h3>
                  <p className="text-sm opacity-90">Your personal beauty guide</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetConversation}
                  className="text-white hover:text-gray-200 transition-colors p-1"
                  title="Start new conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-brand_primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Product Recommendations */}
              {recommendedProducts.length > 0 && (
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-800 mb-3">✨ Here are my recommendations:</p>
                    <div className="space-y-3">
                      {recommendedProducts.slice(0, 3).map((product) => (
                        <div key={product.$id} className="bg-white rounded-lg p-3 border">
                          <div className="flex gap-3">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={product.images[0]?.image_url || '/placeholder.svg'}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600">
                                  {product.avg_rating?.toFixed(1) || '4.5'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="font-semibold text-sm text-brand_primary">
                                  {formatCurrency(product.sale_price)}
                                </span>
                                <Link href={`/products/${product.slug}`}>
                                  <Button size="sm" className="h-7 px-3 text-xs">
                                    View
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-800">
                      💡 You can ask me about:
                    </p>
                    <ul className="text-xs text-gray-600 mt-2 space-y-1">
                      <li>• Why I recommended these products</li>
                      <li>• How to use these products</li>
                      <li>• Product ingredients</li>
                      <li>• Shipping information</li>
                      <li>• Price questions</li>
                      <li>• Returns and refunds</li>
                      <li>• Or anything else beauty-related!</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-600">Searching for perfect products...</p>
                  </div>
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {isOpen && conversationStep === 'category' && categoryStep && (
                <div className="p-4">
                  {categoryStep === 'parent' && (
                    <div>
                      <p className="mb-2 text-sm">Please select a category:</p>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <Button key={cat.$id + '-' + cat.slug} onClick={() => handleCategoryClick(cat, 'parent')} variant="outline">
                            {cat.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {categoryStep === 'child' && selectedParent && (
                    <div>
                      <p className="mb-2 text-sm">Select a type of {selectedParent.name}:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedParent.childCategories?.map((cat) => (
                          <Button key={cat.$id + '-' + cat.slug} onClick={() => handleCategoryClick(cat, 'child')} variant="outline">
                            {cat.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {categoryStep === 'nested' && selectedChild && (
                    <div>
                      <p className="mb-2 text-sm">Select a more specific category for {selectedChild.name}:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedChild.nestedChildCategories?.map((cat) => (
                          <Button key={cat.$id + '-' + cat.slug} onClick={() => handleCategoryClick(cat, 'nested')} variant="outline">
                            {cat.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="min-h-[40px] max-h-[100px] resize-none"
                  rows={1}
                  disabled={isTyping || isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping || isLoading}
                  className="px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiBeautyAssistant;