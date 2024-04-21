import React from "react";
import ProductCard from "../ProductCard";
import appwriteProductService from "@/appwrite/appwriteProductService";

const RelatedProducts = async ({
  child_category,
}: {
  child_category: string;
}) => {
  const relatedProducts =
    await appwriteProductService.getRelatedProductsByCategory(child_category);

  if (!relatedProducts) return null;

  return (
    <div>
      <h3 className="text-2xl mb-5 text-center">Related products</h3>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {relatedProducts.documents?.map((product: any) => (
          <ProductCard product={product} key={product.$id} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
