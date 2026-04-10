import { Metadata } from "next";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("@/components/Cart"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review your selected LOIS CHLOE beauty products before checkout. Free delivery on orders above a certain amount.",
  robots: { index: false, follow: false },
};

const CartPage = () => {
  return (
    <section>
      <Cart />
    </section>
  );
};

export default CartPage;
