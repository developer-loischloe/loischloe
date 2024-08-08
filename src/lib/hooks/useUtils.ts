import { fetchUtils } from "@/redux/features/cart/cartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useUtils = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-expect-error
    dispatch(fetchUtils());
  }, [dispatch]);
};

export default useUtils;
