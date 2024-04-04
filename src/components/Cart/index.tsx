"use client";
import React from "react";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import { useSelector } from "react-redux";
import { selectCartList } from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import { Button } from "../ui/button";

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
    <div className="flex flex-col items-center lg:flex-row lg:items-start gap-10">
      <CartList cartList={cartList} />
      <CartSummary title="Cart Summary" showBtn />
    </div>
  );
};

export default Cart;
