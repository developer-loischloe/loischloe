import appwriteProductService from "@/appwrite/appwriteProductService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";
import { sendGTMEvent } from "@next/third-parties/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const trendingSearchSuggestion = [
  {
    keyword: "lipstick",
    link: "/products?keyword=lipstick",
  },
  {
    keyword: "Foundation",
    link: "/products?keyword=foundation",
  },
  {
    keyword: "Concealer",
    link: "/products?keyword=concealer",
  },
  {
    keyword: "Highlighter",
    link: "/products?keyword=highlighter",
  },
  {
    keyword: "Brush ",
    link: "/products?keyword=brush ",
  },
  {
    keyword: "Sunscreen Cream",
    link: "/products?keyword=sunscree+cream",
  },
];
const SearchSuggestion = ({ searchTearm }: { searchTearm: string }) => {
  const [searchProducts, setSearchProducts] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce callback
  const debounced = useDebouncedCallback(async (keyword) => {
    if (keyword) {
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

        // Send GTM Event
        sendGTMEvent({ event: "Search", search_string: keyword });
      } catch (error) {
        console.log(error);
        setSearchProducts(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, 500);

  // =>>>>>> handle searchterm
  useEffect(() => {
    if (searchTearm) {
      debounced(searchTearm);
    } else {
      setSearchProducts(null);
      setIsLoading(false);
    }
  }, [searchTearm]);

  return (
    <div className=" relativew-full flex flex-col md:flex-row gap-10 text-black ">
      {/* =>>>>>>>>>>>>>>> */}
      {isLoading ? (
        <div className="mx-auto py-20 flex-1 flex justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {searchTearm ? (
            <>
              {searchProducts?.length ? (
                <div>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold mb-5">Products</p>
                    </div>

                    <div>
                      <Link
                        href={`/products?keyword=${searchTearm}`}
                        className="text-sm underline"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(100vh-12rem)] w-full">
                    <div className="flex flex-col gap-5">
                      {searchProducts.map((product) => (
                        <Link href={`/products/${product?.slug}`}>
                          <div className="space-y-5 group flex gap-5">
                            <div className="flex justify-center">
                              <Image
                                src={product?.images[0]?.image_url}
                                alt=""
                                width={100}
                                height={100}
                                className="w-[100px] h-[100px] border rounded-md"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <h6 className="group-hover:underline font-[500] md:text-sm line-clamp-2">
                                {product?.name}
                              </h6>
                              <p className="text-sm space-x-2">
                                <span>
                                  {formatCurrency(product?.sale_price)}
                                </span>
                                <span className="line-through text-gray-500">
                                  {formatCurrency(product?.price)}
                                </span>
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ) : (
                <div className="py-20 flex-1 flex justify-center">
                  <h5>Opps! No product found.</h5>
                </div>
              )}
            </>
          ) : (
            <div className="w-full">
              <p className="uppercase font-bold mb-3">Trending Searches</p>
              <ul>
                {trendingSearchSuggestion.map((suggestion) => (
                  <li
                    key={suggestion.keyword}
                    className="hover:underline hover:font-semibold mb-3"
                  >
                    <Link href={suggestion.link}>{suggestion.keyword}</Link>
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
