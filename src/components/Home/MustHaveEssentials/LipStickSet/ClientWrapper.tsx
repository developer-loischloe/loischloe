"use client";
import React, { useState } from "react";
import ImageContainer from "./ImageContainer";
import ProductsContainer from "./ProductsContainer";

const ClientWrapper = ({ products }: { products: any[] }) => {
  const [hoveredProduct, setHoveredProduct] = useState("");

  return (
    <div className="flex flex-col sm:flex-row sm:items-center md:flex-row-reverse gap-10">
      <div className="flex-1 overflow-hidden">
        <ImageContainer
          products={products}
          hoveredProduct={hoveredProduct}
          setHoveredProduct={setHoveredProduct}
        />
      </div>
      <div className="flex-1">
        <ProductsContainer
          products={products}
          hoveredProduct={hoveredProduct}
          setHoveredProduct={setHoveredProduct}
        />
      </div>
    </div>
  );
};

export default ClientWrapper;
