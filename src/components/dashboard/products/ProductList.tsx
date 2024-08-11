import React from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { PaginationComponent } from "@/components/Shared/Pagination/PaginationComponent";
import NotFoundComponent from "@/components/Shared/NotFoundComponent";
import appwriteProductService from "@/appwrite/appwriteProductService";
import ProductItem from "./ProductItem";
import { SearchParams } from "@/app/(website)/(pages)/products/(all-products)/page";

const ProductList = async ({
  p_category,
  c_category,
  n_category,
  keyword,
  page,
  resultPerPage,
}: SearchParams) => {
  const products = await appwriteProductService.getProductList({
    p_category,
    c_category,
    n_category,
    keyword,
    page,
    resultPerPage,
    sort: "DESC",
    filterPublishProduct: false,
  });

  if (products.documents.length === 0) {
    return <NotFoundComponent />;
  }

  return (
    <div>
      <ScrollArea>
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[100px]">Image</TableHead>
              <TableHead className="min-w-[150px] ">Product Nane</TableHead>
              <TableHead className="min-w-[100px]  text-center">
                Price
              </TableHead>
              <TableHead className="min-w-[100px] text-center">
                Sale Price
              </TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="min-w-[100px]">Stock</TableHead>
              <TableHead className="min-w-[120px]">CreatedAt</TableHead>
              <TableHead className="min-w-[120px]">UpdatedAt</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.documents?.map((product: any) => (
              <ProductItem key={product?.$id} product={product} />
            ))}
          </TableBody>
        </Table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <br />
      {/* Pagination */}
      <PaginationComponent
        currentPageNumber={Number(page)}
        resultPerPage={Number(resultPerPage)}
        totalItems={products.total}
        basePath={"/dashboard/products"}
        extraSearchParams={{ keyword, p_category, c_category, n_category }}
      />
    </div>
  );
};

export default ProductList;
