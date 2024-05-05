import dynamic from "next/dynamic";
const Cart = dynamic(() => import("@/components/Cart"), {
  ssr: false,
});

const page = () => {
  return (
    <section>
      <Cart />
    </section>
  );
};

export default page;
