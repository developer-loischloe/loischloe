"use client";
import { formatCurrency } from "@/lib/utils";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import dynamic from "next/dynamic";
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
      <div className="bg-brand_primary px-7 max-w-max text-sm pt-1">
        <span className="">
          {product?.stock.split("-").join(" ").toUpperCase()}
        </span>
      </div>
      <div>
        <h1 className="text-3xl">{product?.name}</h1>
        <ReactRating
          style={{ maxWidth: 100 }}
          value={product?.avg_rating || 0}
          itemStyles={myStyles}
          readOnly
        />
      </div>

      <div>
        <p>{product?.short_description}</p>
      </div>

      <hr />

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

      <CartHandler product={product} />
    </div>
  );
};

export default ProductHandler;
