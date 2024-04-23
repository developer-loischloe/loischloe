import React from "react";
import dynamic from "next/dynamic";
import OfferBanner from "@/components/Offer/OfferBanner";
import appwriteProductService from "@/appwrite/appwriteProductService";
import ProductCard from "@/components/Products/ProductCard";
import LoisChloeMarquee from "@/components/Shared/LoisChloeMarquee";
const OfferCountDown = dynamic(
  () => import("@/components/Shared/countDown/OfferCountDown"),
  { ssr: false }
);

const page = () => {
  return (
    <>
      <OfferBanner />
      {/* <LoisChloeMarquee />
      <OfferCountDown /> */}
      <section>
        <OfferProducts />
      </section>
    </>
  );
};

export default page;

const OfferProducts = async () => {
  const products = await appwriteProductService.getOfferProducts();

  return (
    <div className="w-full max-w-[700px] mx-auto">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2  gap-5">
        {products.documents?.map((product: any) => (
          <ProductCard product={product} key={product.$id} />
        ))}
      </div>
    </div>
  );
};
