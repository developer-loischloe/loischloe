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
    <div className="flex items-center gap-2 border max-w-max max-h-[50px] px-1 py-1 rounded-sm select-none">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => {
          const qty = quantity >= 2 ? quantity - 1 : quantity;
          dispatch(addToCart({ product, quantity: qty, price: product.price }));
        }}
        className="cursor-pointer p-2 active:bg-gray-100 rounded transition-colors"
      >
        <Minus size={18} />
      </button>
      <span className="min-w-[20px] text-center">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => {
          const qty = quantity + 1;
          dispatch(addToCart({ product, quantity: qty, price: product.price }));
        }}
        className="cursor-pointer p-2 active:bg-gray-100 rounded transition-colors"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default QuantityUpdater;
