import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import appwriteCategoryService from "@/appwrite/appwriteCategoryService";
import appwriteProductService from "@/appwrite/appwriteProductService";
import AddProductForm from "@/components/dashboard/products/AddProductForm";

const EditProduct = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const categories = await appwriteCategoryService.getCategoryList();
  const products = await appwriteProductService.getProductDetails(slug);

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
      <h1 className="text-xl md:text-2xl mb-5 font-bold text-center">
        Edit product
      </h1>

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
