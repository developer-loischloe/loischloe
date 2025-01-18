"use client";

import { formatCurrency } from "@/lib/utils";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import dynamic from "next/dynamic";
import PreOrderButton from "../PreOrderButton";
import { Button } from "@/components/ui/button";
const CartHandler = dynamic(() => import("./CartHandler/CartHandler"));

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#727272",
};

const ProductHandler = ({ product }: any) => {
  // console.log(product);

  return (
    <div className="flex-1 space-y-5">
      {/* Badge */}
      <div className="bg-brand_primary px-5 py-1 max-w-max text-sm">
        {product?.pre_order ? (
          <span>Coming Soon – Pre-Order Now!</span>
        ) : (
          <span className="">
            {product?.stock.split("-").join(" ").toUpperCase()}
          </span>
        )}
      </div>

      {/* Title & Rating */}
      <div>
        <h1 className="text-3xl">{product?.name}</h1>
        <ReactRating
          style={{ maxWidth: 100 }}
          value={product?.avg_rating || 0}
          itemStyles={myStyles}
          readOnly
        />
      </div>

      {/* Description */}
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: product?.short_description }}
          className="product_description_container"
        />
      </div>

      <hr />

      {/* Price */}
      <div className="space-x-5 ">
        <ins className="text-2xl no-underline">
          <span className="">{formatCurrency(product?.sale_price)}</span>
        </ins>
        {product?.price > product?.sale_price && (
          <del className="text-lg text-brand_gray">
            {formatCurrency(product?.price)}
          </del>
        )}
      </div>

      {/* Action Handler */}
      <div>
        {product?.pre_order ? (
          <PreOrderButton product={product} className="!max-w-max px-10" />
        ) : product?.stock === "in-stock" ? (
          <CartHandler product={product} />
        ) : (
          <Button disabled className="!max-w-max px-10">
            Out Of Stock
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductHandler;
