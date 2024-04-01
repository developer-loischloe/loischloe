import { updateCartCost } from "@/redux/features/cart/cartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { shippingCostProvider } from "../utils";

const useShippingCost = (district: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (district === "Dhaka") {
      dispatch(
        updateCartCost({ shipping_cost: shippingCostProvider.inside_dhaka })
      );
    } else {
      dispatch(
        updateCartCost({ shipping_cost: shippingCostProvider.outside_dhaka })
      );
    }
  }, [district]);
};

export default useShippingCost;
