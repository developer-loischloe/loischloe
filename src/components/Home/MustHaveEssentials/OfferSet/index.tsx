import React from "react";
import OfferSetClientWrapper from "./OfferSetClientWrapper";

const OfferSet = ({ products }: { products: any }) => {
  return <OfferSetClientWrapper products={products} />;
};

export default OfferSet;
