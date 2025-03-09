"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import {
  addToCart,
  resetCart,
  setShowCartSidebar,
} from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";

const OfferProductsContainer = ({
  products,
  activeProduct,
  setActiveProduct,
}: {
  products: any[];
  activeProduct: string;
  setActiveProduct: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useDispatch();

  return (
    <div className="space-y-10">
      <div className="space-y-0">
        {products
          ?.filter((product) => product.$id !== "66275729770e9b297af5")
          ?.map((product) => (
            <div key={product?.$id} className="group">
              <div className="relative flex gap-5 py-5">
                {/* overlay */}
                <div
                  className={cn(
                    "absolute top-0 left-0 bottom-0 right-0 bg-gray-50/50   transition-[visibility] delay-0 invisible",
                    activeProduct &&
                      activeProduct !== product?.$id &&
                      "visible blur-md"
                  )}
                />
                <div>
                  <Image
                    src={product?.images[0].image_url}
                    alt={product?.name}
                    width={120}
                    height={120}
                  />
                </div>
                <div className="w-full space-y-3">
                  <Link
                    href={`/products/${product?.slug}`}
                    className="hover:underline"
                  >
                    <h5 className="text-lg">{product?.name}</h5>
                  </Link>
                  <div className="flex justify-end">
                    <span className="text-brand_primary">
                      {formatCurrency(product?.sale_price)}
                    </span>
                  </div>
                </div>
              </div>
              <hr className="!text-brand_secondary" />
            </div>
          ))}
      </div>
      <Button
        className="w-full text-xl"
        size={"lg"}
        onClick={() => {
          dispatch(resetCart());

          products?.map((product) => {
            dispatch(
              addToCart({ product, price: product?.price, quantity: 1 })
            );
          });

          dispatch(setShowCartSidebar({ show: true }));
        }}
      >
        ADD SET TO CART
      </Button>
    </div>
  );
};

export default OfferProductsContainer;
