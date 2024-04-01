import { formatCurrency, shippingCostProvider } from "@/lib/utils";
import { selectCartCost } from "@/redux/features/cart/cartSlice";
import { selectShippingInfo } from "@/redux/features/shipping/shippingSlice";
import React from "react";
import { useSelector } from "react-redux";

const ShippingCost = () => {
  const shippingInfo = useSelector(selectShippingInfo);
  const cartCost = useSelector(selectCartCost);

  return (
    <div>
      <div className="flex justify-between gap-20">
        <div>Shipping cost</div>
        <div className="text-sm">
          {cartCost.shipping_cost === shippingCostProvider.inside_dhaka ? (
            <div className="text-right">
              <span className="text-xs">Inside Dhaka: </span>
              <span> {formatCurrency(cartCost.shipping_cost)}</span>
            </div>
          ) : (
            <div className="text-right">
              <span className="text-xs">Outside Dhaka: </span>
              <span>{formatCurrency(cartCost.shipping_cost)}</span>
            </div>
          )}
        </div>
      </div>
      <div>
        {shippingInfo.district &&
          shippingInfo.upozila &&
          shippingInfo.address && (
            <span className="text-xs">
              Shipping to {shippingInfo.district}, {shippingInfo.upozila},
              {shippingInfo.address}
            </span>
          )}
      </div>
    </div>
  );
};

export default ShippingCost;
