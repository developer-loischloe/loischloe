import React from "react";
import ProductCard from "../ProductCard";
import appwriteProductService from "@/appwrite/appwriteProductService";

const RelatedProducts = async ({ categories }: { categories: string[] }) => {
  const relatedProducts =
    await appwriteProductService.getRelatedProductsByCategory(categories);

  return (
    <div>
      <h3 className="text-2xl mb-5">Related products</h3>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {relatedProducts?.map((product: any) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
