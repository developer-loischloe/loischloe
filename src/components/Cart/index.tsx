"use client";
import React from "react";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import { useSelector } from "react-redux";
import { selectCartList } from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";

const YouMayAlsoLike = dynamic(
  () => import("@/components/Header/Cart/YouMayAlsoLike"),
  { ssr: false }
);

const Cart = () => {
  const cartList = useSelector(selectCartList);

  if (!cartList.length) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="space-y-2">
          <h5 className="notfound">Opps! Your cart is Empty.</h5>
          <div>
            <Link href={"/products"}>
              <Button>Add product to your cart</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center lg:flex-row lg:items-start gap-10">
        <CartList cartList={cartList} />
        <CartSummary title="Cart Summary" showBtn />
      </div>
      {/* Upselling: Complete Your Routine */}
      <div className="border-t pt-8">
        <h2 className="text-xl font-semibold text-brand_secondary mb-6">
          Complete Your Routine
        </h2>
        <YouMayAlsoLike />
      </div>
    </div>
  );
};

export default Cart;
