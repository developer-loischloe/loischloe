import {
  selectCartList,
  updateCartCost,
} from "@/redux/features/cart/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateProductPrice } from "../utils";

const useProductPrice = () => {
  const cartList = useSelector(selectCartList);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cartList.length) {
      const product_price = calculateProductPrice(cartList);

      dispatch(updateCartCost({ product_price }));
    }
  }, [cartList]);
};

export default useProductPrice;
