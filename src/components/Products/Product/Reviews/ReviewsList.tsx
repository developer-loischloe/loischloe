import Image from "next/image";
import React from "react";
import { format as dateFormat } from "date-fns";

const ReviewsList = ({ product }: { product: any }) => {
  console.log(product);

  return (
    <div>
      {!product?.reviews.length && (
        <h5 className="uppercase">BE THE FIRST TO REVIEW "{product?.name}"</h5>
      )}

      <div className="space-y-7">
        {product?.reviews?.map((review: any) => (
          <div className="flex gap-5">
            <Image
              src={review?.avatar}
              alt={review?.name}
              width={60}
              height={60}
              className="rounded-sm"
            />
            <div>
              <div className="flex gap-2">
                <address className="font-bold">{review?.name}</address>
                {review?.reviewedAt && (
                  <time className="text-brand_gray">
                    {"-"} {dateFormat(review?.reviewedAt, "MM-dd-yyyy")}
                  </time>
                )}
              </div>
              <p className="text-brand_gray">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
