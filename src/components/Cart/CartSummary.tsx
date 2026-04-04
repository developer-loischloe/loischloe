"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartCost,
  selectAppliedCoupon,
  selectCouponLoading,
  validateCoupon,
  removeCoupon,
} from "@/redux/features/cart/cartSlice";
import type { AppDispatch } from "@/redux/store";
import ShippingCost from "./ShippingCost";

const CartSummary = ({
  title,
  showBtn,
  hideSideBar,
}: {
  title?: string;
  showBtn?: boolean;
  hideSideBar?: () => void;
}) => {
  const cartCost = useSelector(selectCartCost);
  const appliedCouponCode = useSelector(selectAppliedCoupon);
  const couponLoading = useSelector(selectCouponLoading);
  const dispatch = useDispatch<AppDispatch>();
  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = () => {
    if (couponInput.trim()) {
      dispatch(validateCoupon(couponInput));
      setCouponInput("");
    }
  };

  return (
    <div className="space-y-5 w-full  max-w-[350px]">
      <div className="border p-3 rounded-sm">
        {title && <h5 className="text-2xl mb-5">{title}</h5>}
        <div>
          <div className="flex justify-between gap-20">
            <span>Product price</span>
            <span className="text-sm">
              {formatCurrency(cartCost.product_price)}
            </span>
          </div>

          <div>
            <ShippingCost />
          </div>
          <hr className="my-5" />

          <div>
            {cartCost.discount > 0 && (
              <>
                <div className="flex justify-between gap-20">
                  <span>Discount</span>
                  <span className="text-red-500">
                    - {formatCurrency(cartCost.discount)}
                  </span>
                </div>
                <hr className="my-5" />
              </>
            )}

            {cartCost.coupon_discount > 0 && appliedCouponCode && (
              <>
                <div className="flex justify-between gap-20 items-center">
                  <span className="flex items-center gap-1">
                    Coupon
                    <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                      {appliedCouponCode}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-green-600">
                      - {formatCurrency(cartCost.coupon_discount)}
                    </span>
                    <button
                      onClick={() => dispatch(removeCoupon())}
                      className="text-xs text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </span>
                </div>
                <hr className="my-5" />
              </>
            )}

            <div className="flex justify-between gap-20 font-bold text-brand_secondary">
              <span>Total</span>
              <span>{formatCurrency(cartCost.total_cost)}</span>
            </div>
          </div>
        </div>

        {/* Coupon Code Input */}
        {!appliedCouponCode && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-[#636e72] mb-2">Have a coupon code?</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                placeholder="Enter code"
                className="flex-1 border rounded px-3 py-1.5 text-sm outline-none focus:border-brand_secondary"
              />
              <Button
                size="sm"
                onClick={handleApplyCoupon}
                className="px-4"
                disabled={couponLoading}
              >
                {couponLoading ? "..." : "Apply"}
              </Button>
            </div>
          </div>
        )}
      </div>
      {showBtn && (
        <div>
          <Link href={"/checkout"}>
            <Button
              className="w-full"
              onClick={() => {
                hideSideBar && hideSideBar();
              }}
            >
              PROCEED TO CHECKOUT
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
