"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";
import appwriteCategoryService from "@/appwrite/appwriteCategoryService";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Star,
  RotateCcw,
} from "lucide-react";
import {
  Message,
  UserPreferences,
  Product,
  Category,
} from "../types/aiBeautyTypes";
import AddToCartButton from "@/components/Products/AddToCartButton";

const AiBeautyAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({});
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [conversationStep, setConversationStep] = useState<
    | "greeting"
    | "category"
    | "skinType"
    | "preferences"
    | "budget"
    | "occasion"
    | "recommendations"
    | "routine"
    | "followup"
  >("greeting");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [categoryStep, setCategoryStep] = useState<
    "parent" | "child" | "nested" | null
  >(null);
  const [selectedParent, setSelectedParent] = useState<Category | null>(null);
  const [selectedChild, setSelectedChild] = useState<Category | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [hasRecommended, setHasRecommended] = useState(false);
  // const [hasShownRoutine, setHasShownRoutine] = useState(false);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const saved = sessionStorage.getItem("ai-beauty-assistant-messages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "ai-beauty-assistant-messages",
      JSON.stringify(messages)
    );
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadCategories();
      setTimeout(() => {
        addMessage(
          "assistant",
          "Hi there! 👋 I'm your AI Beauty Assistant. Let's start by choosing what area you're shopping for today:"
        );
        setCategoryStep("parent");
        setConversationStep("category");
      }, 500);
    }
  }, [isOpen]);

  const loadCategories = async () => {
    try {
      const categoryResponse = await appwriteCategoryService.getCategoryList();
      console.log(categoryResponse);

      setCategories(
        (categoryResponse.documents || []) as unknown as Category[]
      );
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const resetConversation = () => {
    setMessages([]);
    sessionStorage.removeItem("ai-beauty-assistant-messages");
    setUserPreferences({});
    setRecommendedProducts([]);
    setConversationStep("greeting");
    setInputValue("");
    setQuestionCount(0);
    setHasRecommended(false);
    // setHasShownRoutine(false);
  };

  const addMessage = (
    type: "assistant" | "user" | "recommendation",
    content: string,
    products?: Product[],
    id?: string
  ) => {
    const messageId = id || Date.now().toString();
    setMessages((prev) => {
      if (prev.some((msg) => msg.id === messageId)) return prev; // Prevent duplicate by id
      if (
        type === "assistant" &&
        prev.length > 0 &&
        prev[prev.length - 1].type === "assistant" &&
        prev[prev.length - 1].content === content
      )
        return prev; // Prevent duplicate assistant message
      const newMessage: Message = {
        id: messageId,
        type,
        content,
        timestamp: new Date(),
        ...(products ? { products } : {}),
      };
      const updated = [...prev, newMessage];
      messagesRef.current = updated;
      return updated;
    });
  };

  const fetchLLMChatbotResponse = async (userInput?: string) => {
    setIsTyping(true);
    try {
      const response = await fetch("/api/ai-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPreferences,
          conversation: messagesRef.current.concat(
            userInput
              ? [
                  {
                    id: Date.now().toString(),
                    type: "user",
                    content: userInput,
                    timestamp: new Date(),
                  },
                ]
              : []
          ),
          products: recommendedProducts,
          question: "chatbot_followup",
        }),
      });
      const data = await response.json();
      if (data.success && data.response) {
        const lower = (data.response || "").toLowerCase();
        if (
          lower.length < 10 ||
          lower === "else?" ||
          lower.includes("anything else") ||
          lower.includes("other?")
        ) {
          addMessage("assistant", getCategorySpecificFallback());
        } else {
          addMessage("assistant", data.response);
        }
      }
    } catch (error) {
      addMessage(
        "assistant",
        "I'm here if you have more questions or want to explore more products!"
      );
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (
      conversationStep === "recommendations" &&
      recommendedProducts.length > 0
    ) {
      fetchLLMChatbotResponse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationStep, recommendedProducts]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
    const userInput = inputValue.trim();
    addMessage("user", userInput);
    setInputValue("");
    setIsTyping(true);

    // If still in category selection, use the old logic
    if (conversationStep === "category" && categoryStep) {
      // Do nothing, as category selection is handled by button clicks
      setIsTyping(false);
      return;
    }

    // After category selection, always let the LLM drive the conversation
    try {
      const response = await fetch("/api/ai-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPreferences,
          conversation: messagesRef.current.concat([
            {
              id: Date.now().toString(),
              type: "user",
              content: userInput,
              timestamp: new Date(),
            },
          ]),
          question: "chatbot_followup",
        }),
      });
      const data = await response.json();
      const lower = (data.response || "").toLowerCase();
      if (
        lower.length < 10 ||
        lower === "else?" ||
        lower.includes("anything else") ||
        lower.includes("other?")
      ) {
        addMessage("assistant", getCategorySpecificFallback());
      } else {
        addMessage("assistant", data.response);
      }
    } catch (error) {
      addMessage("assistant", getCategorySpecificFallback());
    } finally {
      setIsTyping(false);
    }

    if (conversationStep !== "category" && !categoryStep) {
      // If not yet recommended and questionCount + 1 >= 2, recommend products instead of calling LLM
      if (!hasRecommended && questionCount + 1 >= 2) {
        setQuestionCount(0);
        setHasRecommended(true);
        await fetchRecommendedProducts();
        return;
      }
      // Otherwise, increment questionCount and call LLM for a question
      setQuestionCount((prev) => prev + 1);
    }

    if (conversationStep === "followup") {
      setIsTyping(true);
      try {
        const response = await fetch("/api/ai-recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userPreferences,
            products: recommendedProducts,
            question: "chatbot_followup",
            conversation: messagesRef.current.concat([
              {
                id: Date.now().toString(),
                type: "user",
                content: userInput,
                timestamp: new Date(),
              },
            ]),
            instructions: `The user has already received product recommendations. Only answer their questions or offer help about the recommended products, usage, or related topics. Do NOT ask for more preferences or repeat pre-recommendation questions.`,
          }),
        });
        const data = await response.json();
        const lower = (data.response || "").toLowerCase();
        if (
          lower.length < 10 ||
          lower === "else?" ||
          lower.includes("anything else") ||
          lower.includes("other?")
        ) {
          addMessage("assistant", getCategorySpecificFallback());
        } else {
          addMessage("assistant", data.response);
        }
      } catch (error) {
        addMessage("assistant", getCategorySpecificFallback());
      } finally {
        setIsTyping(false);
      }
      return;
    }
  };

  const handleCategoryClick = async (
    cat: Category,
    level: "parent" | "child" | "nested"
  ) => {
    let path = "";
    if (level === "parent") {
      setSelectedParent(cat);
      path = cat.name;
      addMessage("user", path, undefined, `cat-path-${cat.slug}`); // Unique id for deduplication
      if (cat.childCategories && cat.childCategories.length > 0) {
        setCategoryStep("child");
        addMessage(
          "assistant",
          `Great! Now, which type of ${cat.name} products are you interested in?`
        );
      } else {
        setUserPreferences((prev) => ({
          ...prev,
          category: cat.slug,
          categoryPath: path,
        }));
        setCategoryStep(null);
        setConversationStep("skinType");
        await fetchNextLLMQuestion();
      }
    } else if (level === "child") {
      setSelectedChild(cat);
      path = `${selectedParent?.name} > ${cat.name}`;
      addMessage(
        "user",
        path,
        undefined,
        `cat-path-${selectedParent?.slug}-${cat.slug}`
      );
      if (cat.nestedChildCategories && cat.nestedChildCategories.length > 0) {
        setCategoryStep("nested");
        addMessage(
          "assistant",
          `Awesome! Please select a more specific category for ${cat.name}:`
        );
      } else {
        setUserPreferences((prev) => ({
          ...prev,
          category: selectedParent?.slug,
          childCategory: cat.slug,
          categoryPath: path,
        }));
        setCategoryStep(null);
        setConversationStep("skinType");
        await fetchNextLLMQuestion();
      }
    } else if (level === "nested") {
      path = `${selectedParent?.name} > ${selectedChild?.name} > ${cat.name}`;
      addMessage(
        "user",
        path,
        undefined,
        `cat-path-${selectedParent?.slug}-${selectedChild?.slug}-${cat.slug}`
      );
      setUserPreferences((prev) => ({
        ...prev,
        category: selectedParent?.slug,
        childCategory: selectedChild?.slug,
        nestedChildCategory: cat.slug,
        categoryPath: path,
      }));
      setCategoryStep(null);
      setConversationStep("skinType");
      await fetchNextLLMQuestion();
    }
  };

  // Utility to get the current category path as a string
  const getCategoryPath = () => {
    if (
      selectedParent &&
      selectedChild &&
      userPreferences.nestedChildCategory
    ) {
      const nested = selectedChild.nestedChildCategories?.find(
        (nc) => nc.slug === userPreferences.nestedChildCategory
      );
      return `${selectedParent.name} > ${selectedChild.name} > ${
        nested?.name || userPreferences.nestedChildCategory
      }`;
    } else if (selectedParent && selectedChild) {
      return `${selectedParent.name} > ${selectedChild.name}`;
    } else if (selectedParent) {
      return selectedParent.name;
    }
    return "";
  };

  // Category-specific fallback question
  function getCategorySpecificFallback() {
    const path = getCategoryPath().toLowerCase();
    if (path.includes("lip")) {
      return "Do you prefer a matte, glossy, or satin finish for your lipstick?";
    }
    if (path.includes("eye")) {
      return "Are you looking for waterproof or long-lasting eye products?";
    }
    if (path.includes("foundation") || path.includes("face")) {
      return "Do you have any specific skin concerns? (e.g., oily, dry, acne-prone, sensitive)";
    }
    return "Is there anything else you'd like to share about your preferences?";
  }

  // Improved fetchNextLLMQuestion
  const fetchNextLLMQuestion = async () => {
    setIsTyping(true);
    try {
      const response = await fetch("/api/ai-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPreferences,
          question: "next_question_for_category",
          categoryPath: getCategoryPath(),
          conversation: messagesRef.current,
          instructions: `
            The user has already selected the category: ${getCategoryPath()}.
            Do NOT ask about category again. 
            Ask only the next relevant question for this category, such as preferences, finish, color, or other details.
            Never repeat the initial greeting or category question.
          `,
        }),
      });
      const data = await response.json();
      if (data.success && data.response) {
        const lower = (data.response || "").toLowerCase();
        if (
          lower.length < 10 ||
          lower === "else?" ||
          lower.includes("anything else") ||
          lower.includes("other?")
        ) {
          addMessage("assistant", getCategorySpecificFallback());
        } else {
          addMessage("assistant", data.response);
        }
      } else {
        addMessage("assistant", getCategorySpecificFallback());
      }
    } catch (error) {
      addMessage("assistant", getCategorySpecificFallback());
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // New: fetchRoutineGuide to get a usage guide from the LLM
  const fetchRoutineGuide = async (products: Product[]) => {
    try {
      const response = await fetch("/api/ai-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPreferences,
          products,
          question: "product_usage_guide",
        }),
      });
      const data = await response.json();
      if (data.success && data.response) {
        addMessage("assistant", data.response);
        // setHasShownRoutine(true);
        setConversationStep("followup");
      }
    } catch (error) {
      addMessage(
        "assistant",
        "I'm here if you have more questions or want to explore more products!"
      );
    }
  };

  const fetchRecommendedProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPreferences,
          products: [], // let the API fetch products
          question: "product_recommendations",
        }),
      });
      const data = await response.json();
      setRecommendedProducts(data.products || []);
      setIsLoading(false);
      if (
        data.success &&
        Array.isArray(data.products) &&
        data.products.length > 0
      ) {
        addMessage(
          "recommendation",
          data.recommendationMessage ||
            "Here are some products you might like!",
          data.products.slice(0, 5)
        );
        // Generate and show usage guide, then set to followup
        await fetchRoutineGuide(data.products.slice(0, 3));
        setConversationStep("followup");
      } else {
        addMessage(
          "assistant",
          "Sorry, I couldn't find any products matching your preferences. Would you like to try a different category or preference?"
        );
        setConversationStep("followup");
      }
    } catch (error) {
      setIsLoading(false);
      setRecommendedProducts([]);
      addMessage(
        "assistant",
        "Sorry, I couldn't find any products matching your preferences. Would you like to try a different category or preference?"
      );
      setConversationStep("followup");
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
                  <p className="text-sm opacity-90">
                    Your personal beauty guide
                  </p>
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
              {messages.map((message) => {
                if (message.type === "recommendation" && message.products) {
                  return (
                    <div key={message.id} className="space-y-3">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-sm text-gray-800 mb-3">
                          {message.content}
                        </p>
                        <div className="space-y-3">
                          {message.products.slice(0, 3).map((product) => (
                            <div
                              key={product.$id}
                              className="bg-white rounded-lg p-3 border"
                            >
                              <div className="flex gap-3">
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    src={
                                      product.images[0]?.image_url ||
                                      "/placeholder.svg"
                                    }
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm line-clamp-2">
                                    {product.name}
                                  </h4>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-gray-600">
                                      {product.avg_rating?.toFixed(1) || "4.5"}
                                    </span>
                                  </div>
                                  <span className="font-semibold text-sm text-brand_primary block mt-2">
                                    {formatCurrency(product.sale_price)}
                                  </span>
                                  <div className="flex gap-2 mt-2">
                                    <Link
                                      href={`/products/${product.slug}`}
                                      className="flex-1"
                                    >
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-9 w-full text-xs"
                                      >
                                        View
                                      </Button>
                                    </Link>
                                    <div className="flex-1">
                                      <AddToCartButton product={product} />
                                    </div>
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
                  );
                }
                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-brand_primary text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-600">
                      Searching for perfect products...
                    </p>
                  </div>
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {isOpen && conversationStep === "category" && categoryStep && (
                <div className="p-4">
                  {categoryStep === "parent" && (
                    <div>
                      <p className="mb-2 text-sm">Please select a category:</p>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <Button
                            key={cat.$id + "-" + cat.slug}
                            onClick={() => handleCategoryClick(cat, "parent")}
                            variant="outline"
                          >
                            {cat.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {categoryStep === "child" && selectedParent && (
                    <div>
                      <p className="mb-2 text-sm">
                        Select a type of {selectedParent.name}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedParent.childCategories?.map((cat) => (
                          <Button
                            key={cat.$id + "-" + cat.slug}
                            onClick={() => handleCategoryClick(cat, "child")}
                            variant="outline"
                          >
                            {cat.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {categoryStep === "nested" && selectedChild && (
                    <div>
                      <p className="mb-2 text-sm">
                        Select a more specific category for {selectedChild.name}
                        :
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedChild.nestedChildCategories?.map((cat) => (
                          <Button
                            key={cat.$id + "-" + cat.slug}
                            onClick={() => handleCategoryClick(cat, "nested")}
                            variant="outline"
                          >
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
