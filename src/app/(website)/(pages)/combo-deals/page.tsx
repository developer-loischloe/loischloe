import React, { Suspense } from "react";
import { Metadata } from "next";
import appwriteProductService from "@/appwrite/appwriteProductService";
import { unstable_noStore as noStore } from "next/cache";
import ProductCard from "@/components/Products/ProductCard";
import ProductListLoading from "@/components/Shared/loading/ProductListLoading";

// Metadata
export const metadata: Metadata = {
  title: "Makeup Combo Deals & Bundle Offers",
  description:
    "Shop LOIS CHLOE makeup combo deals and bundle offers in Bangladesh. Save up to 43% on curated beauty sets — cruelty-free, vegan, and clinically proven.",
  alternates: {
    canonical: "/combo-deals",
  },
};

const page = () => {
  return (
    <section>
      <Suspense
        fallback={<ProductListLoading />}
        key={Math.random() * 1000 + 50}
      >
        <OfferProducts />
      </Suspense>
    </section>
  );
};

export default page;

const OfferProducts = async () => {
  noStore();
  const products = await appwriteProductService.getOfferProducts();

  if (products.total === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-semibold text-[#2D3436]">
            At this moment, we do not have any ongoing deals.
          </h1>
          <p className="text-[#636e72] mt-3">
            Stay tuned — exciting offers are coming soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {products.documents?.map((product: any) => (
          <ProductCard product={product} key={product.$id} />
        ))}
      </div>
    </div>
  );
};
