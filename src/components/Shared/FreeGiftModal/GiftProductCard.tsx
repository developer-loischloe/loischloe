import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  calculateDiscountPercentage,
  cn,
  formatCurrency,
  generateParams,
} from "@/lib/utils";
import AddGiftToCartButton from "./AddGiftToCartButton";

const GiftProductCard = ({
  product,
  setOpen,
}: {
  product: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const discount = calculateDiscountPercentage(
    product?.price,
    product?.sale_price
  );

  return (
    <div className="w-[230px] shadow-2xl rounded-sm flex flex-col items-center justify-between group overflow-hidden">
      <div className="w-full overflow-hidden relative">
        {discount > 0 && (
          <div className="absolute top-2 left-5 bg-brand_primary max-w-max px-5 py-1 rounded-sm z-10">
            <span className="text-sm text-brand_secondary">-{discount}%</span>
          </div>
        )}
        <Link href={`/products/${product?.slug}`}>
          <Image
            src={product?.images[0]?.image_url}
            alt="img1"
            width={300}
            height={300}
            className="w-full group-hover:scale-105 transition-all duration-300"
          />
        </Link>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <Link href={`/products/${product?.slug}`}>
            <h3 className="text-lg hover:underline transition-all line-clamp-2">
              {product?.name}
            </h3>
          </Link>
          <div className="text-brand_gray">
            {product?.categories?.map((category: any, index: number) => {
              return (
                <Link
                  href={`/products?${generateParams({
                    category: category?.slug,
                  })}`}
                  key={category?.$id}
                >
                  <span className="text-sm hover:underline">
                    {category?.name}
                  </span>
                  {product?.categories.length > index + 1 && ", "}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 relative">
          <div className="space-y-3">
            <div className="space-x-2">
              <span className=""> {formatCurrency(product?.sale_price)}</span>
              <span
                className={cn(
                  "text-brand_gray line-through",
                  product?.price === product?.sale_price && "hidden"
                )}
              >
                {formatCurrency(product?.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-5">
        <AddGiftToCartButton product={product} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default GiftProductCard;
