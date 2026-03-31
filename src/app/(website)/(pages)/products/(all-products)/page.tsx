import React, { Suspense } from "react";
import { AlignLeft } from "lucide-react";

import Categories from "@/components/categories";
import CategoryListLoading from "@/components/Shared/loading/CategoryListLoading";
import ProductList from "@/components/Products/ProductList";
import ProductListLoading from "@/components/Shared/loading/ProductListLoading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Metadata } from "next";

export interface SearchParams {
  p_category: string;
  c_category: string;
  n_category: string;
  keyword: string;
  page: string | number;
  resultPerPage: string | number;
}

// Metadata
export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse all LOIS CHLOE makeup products available in Bangladesh — face palettes, foundations, eyeliners, lipsticks, mascaras, and more. 100% vegan and cruelty-free.",
  alternates: {
    canonical: "/products",
  },
};

const page = ({
  searchParams: {
    p_category = "",
    c_category = "",
    n_category = "",
    keyword = "",
    page = "1",
    resultPerPage = "12",
  },
}: {
  searchParams: SearchParams;
}) => {
  return (
    <section className="p-5 md:py-10">
      {/* Categories For Mobile */}
      <div className="md:hidden mb-5 z-50">
        <Popover>
          <PopoverTrigger className="flex gap-5">
            <AlignLeft />
            <span>Categories</span>
          </PopoverTrigger>
          <PopoverContent className="bg-brand_secondary !sticky ">
            <Suspense fallback={<CategoryListLoading />}>
              <Categories
                {...{
                  p_category,
                  c_category,
                  n_category,
                  keyword,
                  page,
                  resultPerPage,
                }}
              />
            </Suspense>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-10 ">
        {/* Categories For Desktop */}
        <div className="hidden md:flex">
          <Suspense fallback={<CategoryListLoading />}>
            <Categories
              {...{
                p_category,
                c_category,
                n_category,
                keyword,
                page,
                resultPerPage,
              }}
            />
          </Suspense>
        </div>

        {/* ProductList */}
        <Suspense
          key={(Math.random() * 1000).toString()}
          fallback={<ProductListLoading />}
        >
          <ProductList
            {...{
              p_category,
              c_category,
              n_category,
              keyword,
              page,
              resultPerPage,
            }}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
