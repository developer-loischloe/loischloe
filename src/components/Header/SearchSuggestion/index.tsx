"use client";
import appwriteProductService from "@/appwrite/appwriteProductService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";
import { sendGTMEvent } from "@next/third-parties/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Sparkles, TrendingUp, Droplets, Sun, Leaf } from "lucide-react";

const trendingSearchSuggestion = [
  { keyword: "Lipstick", link: "/products?keyword=lipstick" },
  { keyword: "Foundation", link: "/products?keyword=foundation" },
  { keyword: "Concealer", link: "/products?keyword=concealer" },
  { keyword: "Highlighter", link: "/products?keyword=highlighter" },
  { keyword: "Brush", link: "/products?keyword=brush" },
  { keyword: "Sunscreen Cream", link: "/products?keyword=sunscreen+cream" },
];

const SKIN_CONCERNS = [
  { label: "Dry Skin", icon: Droplets, keyword: "dry skin moisturizing", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Oily Skin", icon: Sun, keyword: "oil control matte", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { label: "Sensitive Skin", icon: Leaf, keyword: "gentle vegan cruelty free", color: "bg-green-50 text-green-700 border-green-200" },
  { label: "Anti-Aging", icon: Sparkles, keyword: "anti aging vitamin", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { label: "Brightening", icon: Sun, keyword: "brightening glow", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { label: "Acne-Prone", icon: Leaf, keyword: "acne prone salicylic", color: "bg-pink-50 text-pink-700 border-pink-200" },
];

const SearchSuggestion = ({ searchTearm }: { searchTearm: string }) => {
  const [searchProducts, setSearchProducts] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeConcern, setActiveConcern] = useState<string | null>(null);

  const fetchProducts = async (keyword: string) => {
    if (!keyword) return;
    setSearchProducts(null);
    setIsLoading(true);
    try {
      const response = await appwriteProductService.getProductList({
        p_category: "",
        c_category: "",
        n_category: "",
        keyword,
        page: "1",
        resultPerPage: "6",
      });
      setSearchProducts(response.documents);
      sendGTMEvent({ event: "Search", search_string: keyword });
    } catch (error) {
      setSearchProducts(null);
    } finally {
      setIsLoading(false);
    }
  };

  const debounced = useDebouncedCallback(fetchProducts, 500);

  useEffect(() => {
    if (searchTearm) {
      setActiveConcern(null);
      debounced(searchTearm);
    } else if (!activeConcern) {
      setSearchProducts(null);
      setIsLoading(false);
    }
  }, [searchTearm]);

  const handleConcernClick = (concern: typeof SKIN_CONCERNS[0]) => {
    if (activeConcern === concern.label) {
      setActiveConcern(null);
      setSearchProducts(null);
      return;
    }
    setActiveConcern(concern.label);
    fetchProducts(concern.keyword);
  };

  const showSkinConcerns = !searchTearm && !activeConcern;
  const showResults = searchTearm || activeConcern;

  return (
    <div className="relativew-full flex flex-col gap-8 text-black">
      {/* Skin Concern Filter Pills */}
      {!searchTearm && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-brand_primary" />
            <p className="uppercase font-bold text-xs tracking-wider text-brand_secondary">
              Shop by Skin Concern
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {SKIN_CONCERNS.map((concern) => {
              const Icon = concern.icon;
              return (
                <button
                  key={concern.label}
                  onClick={() => handleConcernClick(concern)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    activeConcern === concern.label
                      ? "bg-brand_secondary text-white border-brand_secondary"
                      : concern.color + " hover:scale-105"
                  }`}
                >
                  <Icon size={11} />
                  {concern.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="mx-auto py-10 flex-1 flex justify-center">
          <div className="flex items-center gap-2 text-brand_gray text-sm">
            <div className="w-4 h-4 border-2 border-brand_primary border-t-transparent rounded-full animate-spin" />
            Searching...
          </div>
        </div>
      )}

      {!isLoading && (
        <>
          {showResults ? (
            <>
              {searchProducts?.length ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={14} className="text-brand_primary" />
                      <p className="font-bold text-sm">
                        {activeConcern
                          ? `${activeConcern} Products`
                          : "Products"}
                      </p>
                    </div>
                    <Link
                      href={`/products?keyword=${searchTearm || SKIN_CONCERNS.find(c => c.label === activeConcern)?.keyword}`}
                      className="text-xs underline text-brand_secondary hover:text-brand_primary"
                    >
                      View All
                    </Link>
                  </div>
                  <ScrollArea className="h-[calc(100vh-18rem)] w-full">
                    <div className="flex flex-col gap-4">
                      {searchProducts.map((product) => (
                        <Link href={`/products/${product?.slug}`} key={product.$id}>
                          <div className="flex gap-4 group hover:bg-[#fdf8f3] p-2 rounded-lg transition-all">
                            <div className="flex-shrink-0">
                              <Image
                                src={product?.images?.[0]?.image_url || "/placeholder.svg"}
                                alt={product?.name}
                                width={80}
                                height={80}
                                className="w-[80px] h-[80px] object-cover border rounded-md"
                              />
                            </div>
                            <div className="flex flex-col gap-1 justify-center">
                              <h6 className="group-hover:text-brand_primary font-medium md:text-sm line-clamp-2 transition-colors">
                                {product?.name}
                              </h6>
                              <p className="text-sm space-x-2">
                                <span className="font-semibold text-brand_secondary">
                                  {formatCurrency(product?.sale_price)}
                                </span>
                                {product?.price > product?.sale_price && (
                                  <span className="line-through text-gray-400 text-xs">
                                    {formatCurrency(product?.price)}
                                  </span>
                                )}
                              </p>
                              {/* Category Tag */}
                              {product?.child_category && (
                                <span className="text-xs text-brand_gray bg-gray-100 px-2 py-0.5 rounded-full max-w-max capitalize">
                                  {product.child_category}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ) : (
                <div className="py-10 flex-1 flex flex-col items-center gap-2">
                  <p className="text-brand_gray text-sm">No products found.</p>
                  <Link
                    href="/products"
                    className="text-xs text-brand_primary underline"
                  >
                    Browse all products
                  </Link>
                </div>
              )}
            </>
          ) : (
            // Trending Searches
            <div className="w-full">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-brand_primary" />
                <p className="uppercase font-bold text-xs tracking-wider text-brand_secondary">
                  Trending Searches
                </p>
              </div>
              <ul className="space-y-2">
                {trendingSearchSuggestion.map((suggestion) => (
                  <li key={suggestion.keyword}>
                    <Link
                      href={suggestion.link}
                      className="flex items-center gap-2 text-sm hover:text-brand_primary hover:font-semibold transition-all py-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-brand_primary flex-shrink-0" />
                      {suggestion.keyword}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchSuggestion;
