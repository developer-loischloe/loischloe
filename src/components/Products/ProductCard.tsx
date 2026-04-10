"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import { motion } from "framer-motion";
import {
  calculateDiscountPercentage,
  cn,
  formatCurrency,
  generateParams,
} from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";
import { Button } from "../ui/button";
import PreOrderButton from "./PreOrderButton";

// Declare it outside your component so it doesn't get re-created
const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#727272",
};

const ProductCard = React.memo(({ product }: { product: any }) => {
  const discount = calculateDiscountPercentage(
    product?.price,
    product?.sale_price
  );

  return (
    <div className="shadow-2xl rounded-sm flex flex-col items-center justify-between group h-full">
      <div className="w-full overflow-hidden relative aspect-square">
        {discount > 0 && (
          <div className="absolute top-2 left-5 bg-brand_primary max-w-max px-5 py-1 rounded-sm z-20">
            <span className="text-sm text-brand_secondary">-{discount}%</span>
          </div>
        )}
        <Link
          href={`/products/${product?.slug}`}
          className="block w-full h-full"
        >
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative w-full h-full"
          >
            <motion.div
              variants={{
                rest: { x: 0 },
                hover: { x: "-100%" },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={product?.images[0]?.image_url || "/placeholder.svg"}
                alt={product?.name}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover"
              />
            </motion.div>
            {product?.images[1] && (
              <motion.div
                variants={{
                  rest: { x: "100%", opacity: 0 },
                  hover: { x: 0, opacity: 1 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={product?.images[1]?.image_url || "/placeholder.svg"}
                  alt={`${product?.name} - alternate view`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover"
                />
              </motion.div>
            )}
          </motion.div>
        </Link>
      </div>
      <div className="space-y-3 p-5 w-full">
        <div>
          <Link href={`/products/${product?.slug}`}>
            <h3 className="text-xl hover:underline transition-all line-clamp-1">
              {product?.name}
            </h3>
          </Link>
          <div className="text-brand_gray">
            {product?.categories?.map((category: any, index: number) => (
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
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 relative">
          <div className="space-y-3">
            <div className="flex items-center gap-5">
              <ReactRating
                style={{ maxWidth: 100 }}
                value={product?.avg_rating}
                itemStyles={myStyles}
                readOnly
              />
              {product?.reviews.length > 0 && (
                <span className="text-sm">
                  {product?.reviews.length} Reviews
                </span>
              )}
            </div>

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
      <div className="w-full mt-auto">
        {product?.pre_order ? (
          <PreOrderButton product={product} />
        ) : product?.stock === "in-stock" ? (
          <AddToCartButton product={product} />
        ) : (
          <Button disabled className="w-full">
            Out Of Stock
          </Button>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
