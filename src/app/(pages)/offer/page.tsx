import React from "react";
import dynamic from "next/dynamic";

import OfferBanner from "@/components/Offer/OfferBanner";
import appwriteProductService from "@/appwrite/appwriteProductService";
import ProductCard from "@/components/Products/ProductCard";
import LoisChloeMarquee from "@/components/Shared/LoisChloeMarquee";
const CountDown = dynamic(() => import("@/components/Shared/countDown"), {
  ssr: false,
});

const page = () => {
  const timeInSideDhaka = new Date("4/7/2024 16:00:00");
  const timeOutSideDhaka = new Date("4/6/2024 16:00:00");

  timeInSideDhaka.setSeconds(timeInSideDhaka.getSeconds());
  timeOutSideDhaka.setSeconds(timeOutSideDhaka.getSeconds());

  return (
    <>
      <OfferBanner />
      <LoisChloeMarquee />
      <section>
        <h3 className="text-2xl md:text-4xl font-bold text-center mb-2 uppercase">
          Last minute delivery before Eid!
        </h3>
        <div className="flex flex-row justify-between items-center gap-1">
          <div>
            <h4 className="text-md md:text-2xl font-bold text-center">
              Inside Dhaka
            </h4>
            <CountDown expiryTimestamp={timeInSideDhaka} />
          </div>

          <div>
            <h4 className="text-md md:text-2xl  font-bold text-center">
              OutSide Dhaka
            </h4>
            <CountDown expiryTimestamp={timeOutSideDhaka} />
          </div>
        </div>
      </section>
      <section>
        <OfferProducts parent_category="offer" />
      </section>
    </>
  );
};

export default page;

const OfferProducts = async ({
  parent_category,
}: {
  parent_category: string;
}) => {
  const relatedProducts =
    await appwriteProductService.getRelatedProductsByCategory(parent_category);

  return (
    <div className="w-full max-w-[700px] mx-auto">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2  gap-5">
        {relatedProducts.documents?.map((product: any) => (
          <ProductCard product={product} key={product.$id} />
        ))}
      </div>
    </div>
  );
};
