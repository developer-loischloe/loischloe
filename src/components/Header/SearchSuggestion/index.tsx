import Loading from "@/app/dashboard/loading";
import appwriteProductService from "@/appwrite/appwriteProductService";
import { formatCurrency } from "@/lib/utils";
import { sendGTMEvent } from "@next/third-parties/google";
import { X } from "lucide-react";
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
const SearchSuggestion = ({
  searchTearm,
  setShowPopOver,
}: {
  searchTearm: string;
  setShowPopOver: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
      <div className="absolute top-5 right-5">
        <X
          onClick={() => setShowPopOver(false)}
          className="cursor-pointer"
          size={18}
        />
      </div>

      {/* =>>>>>>>>>>>>>>> */}
      {isLoading ? (
        <div className="mx-auto">
          <Loading />
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
                    <div className="flex-1 flex justify-evenly">
                      <div></div>
                      <div>
                        <Link href={`/products?keyword=${searchTearm}`}>
                          All Products
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
                    {searchProducts.map((product) => (
                      <Link href={`/products/${product?.slug}`}>
                        <div className="space-y-5 group">
                          <div className="flex justify-center">
                            <Image
                              src={product?.images[0]?.image_url}
                              alt=""
                              width={100}
                              height={100}
                            />
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <h5 className="text-center group-hover:underline font-[500] md:text-lg line-clamp-2">
                              {product?.name}
                            </h5>
                            <p>{formatCurrency(product?.sale_price)}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-20 flex-1 flex justify-center">
                  <h5>Opps! No product found.</h5>
                </div>
              )}
            </>
          ) : (
            <div className="">
              <p className="font-bold mb-5">Trending Searches</p>
              <ul>
                {trendingSearchSuggestion.map((suggestion) => (
                  <li
                    key={suggestion.keyword}
                    className="hover:underline hover:font-bold mb-3"
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
