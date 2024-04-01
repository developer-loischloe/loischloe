"use client";
import { RootState } from "@/redux/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const CartBtn = () => {
  const { cartList } = useSelector((state: RootState) => state.cart);

  return (
    <Link href={"/cart"}>
      <div className="relative">
        <ShoppingBag />
        <span className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-brand_primary w-5 h-5 md:w-6 md:h-6 rounded-full text-sm flex items-center justify-center">
          {cartList.length}
        </span>
      </div>
    </Link>
  );
};

export default CartBtn;
