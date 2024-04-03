import React from "react";
import ReviewsList from "./ReviewsList";
import { AddReview } from "./AddReview";

const index = ({ product }: any) => {
  return (
    <div className="space-y-5">
      <ReviewsList product={product} />
      <AddReview product={product} />
    </div>
  );
};

export default index;
