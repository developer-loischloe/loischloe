"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import appwriteProductService from "@/appwrite/appwriteProductService";

import ProductListLoading from "@/components/Shared/loading/ProductListLoading";

const RecentlyViewed = ({ currentProductId }: { currentProductId: string }) => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<
    null | any[]
  >(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const recentlyViewedItems: string[] = JSON.parse(
      sessionStorage.getItem("recentlyViewed") || "[]"
    );

    const filteredItems = recentlyViewedItems
      .filter((item) => item !== currentProductId)
      .slice(0, 10);

    if (filteredItems.length) {
      setLoading(true);

      appwriteProductService
        .getProductsByIds(filteredItems)
        .then((products) => {
          setRecentlyViewedProducts(products);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) return <ProductListLoading />;

  if (!recentlyViewedProducts) return null;

  return (
    <div>
      <h3 className="text-2xl mb-5 text-center">Recently Viewed</h3>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {recentlyViewedProducts?.map((product: any) => (
          <ProductCard product={product} key={product.$id} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
