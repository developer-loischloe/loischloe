"use client";

import React, { useState } from "react";
import OfferProductImageSlider from "./OfferProductImageSlider";
import OfferProductsContainer from "./OfferProductsContainer";

const OfferSetClientWrapper = ({ products }: { products: any[] }) => {
  const [activeProduct, setActiveProduct] = useState("");

  return (
    <div className="flex flex-col sm:flex-row  gap-10">
      <div className="flex-1 overflow-hidden">
        <OfferProductImageSlider
          products={products}
          activeProduct={activeProduct}
          setActiveProduct={setActiveProduct}
        />
      </div>
      <div className="flex-1">
        <OfferProductsContainer
          products={products}
          activeProduct={activeProduct}
          setActiveProduct={setActiveProduct}
        />
      </div>
    </div>
  );
};

export default OfferSetClientWrapper;
