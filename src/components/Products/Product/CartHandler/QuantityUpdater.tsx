import { addToCart } from "@/redux/features/cart/cartSlice";
import { Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";

const QuantityUpdater = ({
  quantity,
  product,
}: {
  quantity: number;
  product: any;
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-3 border max-w-max max-h-[50px] px-2 py-2 rounded-sm select-none">
      <Minus
        size={20}
        onClick={() => {
          const qty = quantity >= 2 ? quantity - 1 : quantity;
          dispatch(
            addToCart({ product, quantity: qty, price: product.sale_price })
          );
        }}
        className="cursor-pointer"
      />
      <span>{quantity}</span>
      <Plus
        size={20}
        onClick={() => {
          const qty = quantity + 1;
          dispatch(
            addToCart({ product, quantity: qty, price: product.sale_price })
          );
        }}
        className="cursor-pointer"
      />
    </div>
  );
};

export default QuantityUpdater;
