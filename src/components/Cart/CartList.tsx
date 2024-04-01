"use client";
import CartItem from "./CartItem";

const CartList = ({
  cartList,
}: {
  cartList: { product: any; quantity: number }[];
}) => {
  return (
    <>
      <div className="flex-1 space-y-5">
        {cartList.map((item) => (
          <CartItem key={item.product.$id} {...item} />
        ))}
      </div>
    </>
  );
};

export default CartList;
