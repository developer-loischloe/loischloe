import React from "react";

const Description = ({ product }: any) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: product?.description }}
      className="product_description_container"
    />
  );
};

export default Description;
