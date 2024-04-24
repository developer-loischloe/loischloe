"use client";
import Link from "next/link";

import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import CartList from "./CartList";
import {
  selectShowCartSidebar,
  setShowCartSidebar,
} from "@/redux/features/cart/cartSlice";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CartSummary from "@/components/Cart/CartSummary";

const CartBtn = () => {
  const showCartSidebar = useSelector(selectShowCartSidebar);
  const dispatch = useDispatch();

  const { cartList } = useSelector((state: RootState) => state.cart);

  return (
    <Sheet
      open={showCartSidebar}
      onOpenChange={(value: boolean) => {
        dispatch(setShowCartSidebar({ show: value }));
      }}
    >
      <SheetTrigger>
        <div className="relative">
          <ShoppingBag />
          <span className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-brand_primary w-5 h-5 md:w-6 md:h-6 rounded-full text-sm flex items-center justify-center">
            {cartList.length}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between w-full sm:min-w-[500px] z-[1000]">
        <SheetHeader>
          <div className="flex justify-start">
            <Link href={"/cart"}>
              <Button
                variant={"link"}
                onClick={() => dispatch(setShowCartSidebar({ show: false }))}
              >
                View Cart
              </Button>
            </Link>
          </div>
        </SheetHeader>

        {!cartList.length ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="space-y-2">
              <h5 className="notfound">Opps! Your cart is Empty.</h5>
              <div>
                <Link href={"/products"}>
                  <Button
                    onClick={() => {
                      dispatch(setShowCartSidebar({ show: false }));
                    }}
                  >
                    Add product to your cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto">
              <CartList />
            </div>

            <SheetFooter>
              <div className="w-full space-y-5">
                <div className="flex justify-center">
                  <CartSummary
                    showBtn
                    hideSideBar={() =>
                      dispatch(setShowCartSidebar({ show: false }))
                    }
                  />
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
