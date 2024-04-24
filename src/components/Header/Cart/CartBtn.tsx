"use client";
import React, { useState } from "react";
import Link from "next/link";

import { ShoppingBag } from "lucide-react";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartList from "./CartList";
import { selectCartCost } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import CartSummary from "@/components/Cart/CartSummary";

const CartBtn = () => {
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  const { cartList } = useSelector((state: RootState) => state.cart);
  const cartCost = useSelector(selectCartCost);

  return (
    <Sheet open={showCartSidebar} onOpenChange={setShowCartSidebar}>
      <SheetTrigger>
        <div className="relative">
          <ShoppingBag />
          <span className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-brand_primary w-5 h-5 md:w-6 md:h-6 rounded-full text-sm flex items-center justify-center">
            {cartList.length}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between md:min-w-[500px] z-[1000]">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>

        {!cartList.length ? (
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
        ) : (
          <>
            <div className="overflow-y-auto ">
              <CartList />
            </div>

            <SheetFooter>
              <div className="w-full space-y-5">
                <div className="flex justify-center">
                  <CartSummary
                    showBtn
                    hideSideBar={() => setShowCartSidebar(false)}
                  />
                </div>

                <div className="flex justify-between">
                  <div></div>
                  <div>
                    <Link href={"/cart"}>
                      <Button
                        variant={"link"}
                        onClick={() => setShowCartSidebar(false)}
                      >
                        View Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartBtn;
