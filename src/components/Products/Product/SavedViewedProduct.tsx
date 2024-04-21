"use client";
import { useEffect } from "react";

const SavedViewedProduct = ({ productId }: { productId: string }) => {
  useEffect(() => {
    const recentlyViewedItems: string[] = JSON.parse(
      sessionStorage.getItem("recentlyViewed") || "[]"
    );

    const itemExist = recentlyViewedItems.find((item) => item === productId);

    if (!itemExist) {
      recentlyViewedItems.push(productId);
      sessionStorage.setItem(
        "recentlyViewed",
        JSON.stringify(recentlyViewedItems)
      );
    }
  }, []);

  return null;
};

export default SavedViewedProduct;
