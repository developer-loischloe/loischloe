"use client";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { addToCart, resetCart } from "@/redux/features/cart/cartSlice";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const ProductsContainer = ({ products }: { products: any[] }) => {
  //   console.log(products);

  const dispatch = useDispatch();

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        {products?.map((product) => (
          <div key={product?.$id} className="flex gap-5 border-b pb-5">
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
                  className="w-8 h-8 p-0 rounded-full "
                  onClick={() => {
                    dispatch(
                      addToCart({
                        product,
                        price: product?.sale_price,
                        quantity: 1,
                      })
                    );
                  }}
                >
                  <ShoppingCart size={16} />
                </Button>

                <span className="text-brand_primary">
                  {formatCurrency(product?.sale_price)}
                </span>
              </div>
            </div>
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
        }}
      >
        ADD SET TO CART
      </Button>
    </div>
  );
};

export default ProductsContainer;
