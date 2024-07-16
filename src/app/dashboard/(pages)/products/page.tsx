import React, { Suspense } from "react";
import Link from "next/link";
import { AlignLeft, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import ResultPerPage from "@/components/dashboard/orders/ResultPerPage";
import ProductList from "@/components/dashboard/products/ProductList";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Categories from "@/components/categories";
import { SearchParams } from "@/app/(website)/(pages)/products/(all-products)/page";
import LoadingSpiner from "@/components/Shared/loading/LoadingSpiner";

const ProductsPage = ({
  searchParams: {
    p_category = "",
    c_category = "",
    n_category = "",
    keyword = "",
    page = "1",
    resultPerPage = "10",
  },
}: {
  searchParams: SearchParams;
}) => {
  return (
    <div className="w-full">
      <h1 className="text-xl md:text-2xl mb-5 font-bold">Product List</h1>

      {/* Top */}
      <div className="w-full flex justify-between items-center gap-5  flex-wrap mb-5">
        <div>
          <Link href={`/dashboard/products/add`}>
            <Button>
              <Plus size={18} className="mr-3" /> Add new
            </Button>
          </Link>
        </div>

        {/* Categories */}
        <div className="">
          <Popover>
            <PopoverTrigger className="flex gap-5">
              <AlignLeft />
              <span>Categories</span>
            </PopoverTrigger>
            <PopoverContent className="bg-brand_secondary !sticky ">
              <Suspense>
                <Categories
                  {...{
                    p_category,
                    c_category,
                    n_category,
                    keyword,
                    page,
                    resultPerPage,
                    path: "/dashboard/products",
                  }}
                />
              </Suspense>
            </PopoverContent>
          </Popover>
        </div>

        <ResultPerPage
          basePath={"/dashboard/products"}
          resultPerPage={resultPerPage}
          extraSearchParams={{
            page,
            keyword,
          }}
        />
      </div>

      {/* Order List */}
      <Suspense
        key={(Math.random() * 1000).toString()}
        fallback={<LoadingSpiner />}
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
  );
};

export default ProductsPage;
