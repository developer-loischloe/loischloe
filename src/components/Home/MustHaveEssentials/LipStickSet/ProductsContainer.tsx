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
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";

const ProductsContainer = ({
  products,
  hoveredProduct,
  setHoveredProduct,
}: {
  products: any[];
  hoveredProduct: string;
  setHoveredProduct: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useDispatch();

  return (
    <div className="space-y-10">
      <div className="space-y-0">
        {products?.map((product) => (
          <div key={product?.$id} className="group">
            <div className="relative flex gap-5 py-5">
              {/* overlay */}
              <div
                className={cn(
                  "absolute top-0 left-0 bottom-0 right-0 bg-gray-50/50   transition-[visibility] delay-0 invisible",
                  hoveredProduct &&
                    hoveredProduct !== product?.$id &&
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
                <div className="flex justify-between">
                  <Button
                    className="w-7 h-7 p-0 rounded-full invisible group-hover:visible transition-[visibility] delay-0"
                    onClick={() => {
                      dispatch(
                        addToCart({
                          product,
                          price: product?.sale_price,
                          quantity: 1,
                        })
                      );

                      dispatch(setShowCartSidebar({ show: true }));
                    }}
                  >
                    <ShoppingCart size={13} />
                  </Button>

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
              addToCart({ product, price: product?.sale_price, quantity: 1 })
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

export default ProductsContainer;
