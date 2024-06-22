import React, { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import Loader from "@/components/Shared/loading/Loader";
import ResultPerPage from "@/components/dashboard/orders/ResultPerPage";
import ProductList from "@/components/dashboard/products/ProductList";
import { Button } from "@/components/ui/button";

const ProductsPage = ({
  searchParams: { page = "1", resultPerPage = "10", keyword = "" },
}: {
  searchParams: { page: string; resultPerPage: string; keyword: string };
}) => {
  return (
    <div className="w-full">
      <h1 className="text-xl md:text-2xl mb-5 font-bold">Product List</h1>

      {/* Top */}
      <div className="w-full flex justify-between items-end gap-5  flex-wrap mb-5">
        <div>
          <Link href={`/dashboard/products/add`}>
            <Button>
              <Plus size={18} className="mr-3" /> Add new
            </Button>
          </Link>
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
      <Suspense key={(Math.random() * 1000).toString()} fallback={<Loader />}>
        <ProductList
          page={page}
          resultPerPage={resultPerPage}
          keyword={keyword}
        />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
