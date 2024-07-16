import Image from "next/image";
import React from "react";
import { format as dateFormat } from "date-fns";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import Fancybox from "@/components/Shared/FancyBox";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#727272",
};

const ReviewsList = ({ product }: { product: any }) => {
  return (
    <div>
      {!product?.reviews.length && (
        <h5 className="uppercase">BE THE FIRST TO REVIEW "{product?.name}"</h5>
      )}

      <div className="space-y-7">
        {product?.reviews?.map((review: any) => (
          <div className="flex gap-5" key={review.$id}>
            <div className="w-[60px]">
              <Image
                src={review?.avatar}
                alt={review?.name}
                width={100}
                height={100}
                className="rounded-sm w-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex gap-2">
                <address className="font-bold">{review?.name}</address>
                {review?.$createdAt && (
                  <time className="text-brand_gray">
                    {"-"} {dateFormat(review?.$createdAt, "dd-MM-yyyy")}
                  </time>
                )}
              </div>
              <p className="text-brand_gray">{review.comment}</p>
              <ReactRating
                style={{ maxWidth: 80 }}
                value={review?.rating || 0}
                itemStyles={myStyles}
                readOnly
              />

              <Fancybox
                options={{
                  Carousel: {
                    infinite: false,
                  },
                }}
              >
                <div className="mt-5 flex flex-wrap gap-8">
                  {review?.images?.map((image: { id: string; url: string }) => (
                    <div key={image?.id}>
                      <a
                        key={image?.id}
                        data-fancybox="gallery"
                        href={image?.url}
                      >
                        <Image
                          alt={"review"}
                          src={image?.url}
                          width={200}
                          height={200}
                          className="w-full h-full rounded  hover:scale-105 transition-all duration-300"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </Fancybox>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
