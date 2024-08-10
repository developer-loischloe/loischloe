import React from "react";
import { Metadata } from "next";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import appwriteCategoryService from "@/appwrite/appwriteCategoryService";

// Metadata
export const metadata: Metadata = {
  title: "Add Product",
};

const AddProductPage = async () => {
  const categories = await appwriteCategoryService.getCategoryList();

  return (
    <div className="w-full  max-w-7xl mx-auto">
      <h1 className="text-xl md:text-2xl mb-5 font-bold text-center">
        Add a new product
      </h1>

      <div className="">
        <AddProductForm formType="create" categories={categories.documents} />
      </div>
    </div>
  );
};

export default AddProductPage;
