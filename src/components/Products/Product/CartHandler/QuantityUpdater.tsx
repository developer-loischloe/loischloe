import { addToCart } from "@/redux/features/cart/cartSlice";
import { Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";

const QuantityUpdater = ({
  quantity,
  setQuantity,
  product,
}: {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  product: any;
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-3 border max-w-max max-h-[50px] px-2 py-2 rounded-sm select-none">
      <Minus
        size={20}
        onClick={() => {
          setQuantity((prev) => {
            const qty = prev >= 2 ? prev - 1 : prev;
            dispatch(
              addToCart({ product, quantity: qty, price: product.sale_price })
            );
            return qty;
          });
        }}
        className="cursor-pointer"
      />
      <span>{quantity}</span>
      <Plus
        size={20}
        onClick={() => {
          setQuantity((prev) => {
            const qty = prev + 1;
            dispatch(
              addToCart({ product, quantity: qty, price: product.sale_price })
            );
            return qty;
          });
        }}
        className="cursor-pointer"
      />
    </div>
  );
};

export default QuantityUpdater;
