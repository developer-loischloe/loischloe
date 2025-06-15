import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import appwriteCategoryService from "@/appwrite/appwriteCategoryService";
import appwriteProductService from "@/appwrite/appwriteProductService";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import { ArrowUpRight } from "lucide-react";

// Metadata
export const metadata: Metadata = {
  title: "Edit Product",
};

const EditProduct = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const categories = await appwriteCategoryService.getCategoryList();
  const products = await appwriteProductService.getProductDetails({
    slug,
    filterPublishProduct: false,
  });

  if (products.total === 0) {
    return (
      <div className="w-full  max-w-7xl mx-auto flex justify-center flex-col items-center gap-5 py-5">
        <h2 className="text-center">No Product Found!</h2>
        <Link href={"/dashboard/products/add"}>
          <Button>Add new product</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full  max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl mb-5 font-bold text-center">
          Edit product
        </h1>

        <Link target="_blank" href={`/products/${slug}`} title="View Product">
          <ArrowUpRight size={25} className="text-blue-500 cursor-pointer hover:scale-110" />
        </Link>
      </div>

      <div className="">
        <AddProductForm
          formType="update"
          categories={categories.documents}
          product={products.documents[0]}
        />
      </div>
    </div>
  );
};

export default EditProduct;
