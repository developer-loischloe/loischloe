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

const ProductList = async ({
  page,
  resultPerPage,
  keyword,
}: {
  page: string;
  resultPerPage: string;
  keyword: string;
}) => {
  const products = await appwriteProductService.getProductList({
    p_category: "",
    c_category: "",
    n_category: "",
    keyword,
    page,
    resultPerPage,
  });

  if (products.documents.length === 0) {
    return <NotFoundComponent />;
  }

  return (
    <div>
      <ScrollArea className="w-[calc(100vw-57px)]">
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[250px]">Product</TableHead>
              <TableHead className="min-w-[150px] ">Product Id</TableHead>
              <TableHead className="min-w-[100px]  text-center">
                Price
              </TableHead>
              <TableHead className="min-w-[100px] text-center">
                Sale Price
              </TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="min-w-[100px]">Stock</TableHead>
              <TableHead className="min-w-[120px]">Date</TableHead>

              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.documents.map((product: any) => (
              <ProductItem key={product.$id} product={product} />
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
        extraSearchParams={{ keyword }}
      />
    </div>
  );
};

export default ProductList;
