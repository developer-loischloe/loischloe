import React from "react";
import appwriteProductService from "@/appwrite/appwriteProductService";
import OfferSetClientWrapper from "./OfferSetClientWrapper";

const OfferSet = async () => {
  const products = await appwriteProductService.getProductsByIds([
    "66275729770e9b297af5",
    "66092ea953c9650c164c",
    "66092620ce4ec1fe55b1",
    "66092bd0d811bde9b0d1",
    "660946a0a8b365fd47ee",
  ]);

  return (
    <div>
      <OfferSetClientWrapper products={products} />
    </div>
  );
};

export default OfferSet;
