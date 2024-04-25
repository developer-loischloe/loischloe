import appwriteProductService from "@/appwrite/appwriteProductService";
import { formatCurrency } from "@/lib/utils";
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

  // Debounce callback
  const debounced = useDebouncedCallback((keyword) => {
    if (keyword) {
      appwriteProductService
        .getProductList({
          p_category: "",
          c_category: "",
          n_category: "",
          keyword,
          page: "1",
          productPerPage: 6,
        })
        .then((products) => {
          setSearchProducts(products.documents);
        });
    } else {
      setSearchProducts(null);
    }
  }, 100);

  useEffect(() => {
    debounced(searchTearm);
  }, [searchTearm]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-10">
      <div className="">
        <p className="font-bold mb-5">Trending Searches</p>
        <ul>
          {trendingSearchSuggestion.map((suggestion) => (
            <li
              className="hover:underline hover:font-bold mb-3"
              key={suggestion.keyword}
            >
              <Link href={suggestion.link}>{suggestion.keyword}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Search Products */}
      <div className="flex-1">
        <p className="font-bold mb-5">Products</p>
        {searchProducts ? (
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
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default SearchSuggestion;
