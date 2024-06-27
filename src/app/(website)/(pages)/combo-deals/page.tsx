import React from "react";
import dynamic from "next/dynamic";
import OfferBanner from "@/components/Offer/OfferBanner";
import appwriteProductService from "@/appwrite/appwriteProductService";
import ProductCard from "@/components/Products/ProductCard";
import LoisChloeMarquee from "@/components/Shared/LoisChloeMarquee";
import { Metadata } from "next";
const OfferCountDown = dynamic(
  () => import("@/components/Shared/countDown/OfferCountDown"),
  { ssr: false }
);
// Metadata
export const metadata: Metadata = {
  title: "Special Offer",
};

const page = () => {
  return (
    <>
      <OfferBanner />
      {/* <LoisChloeMarquee /> */}
      {/* <OfferCountDown /> */}
      <section>
        <OfferProducts />
      </section>
    </>
  );
};

export default page;

const OfferProducts = async () => {
  const products = await appwriteProductService.getOfferProducts();

  if (products.total === 0) {
    return (
      <div>
        <h1 className="text-center text-xl md:text-2xl font-semibold">
          At this moment, we do not have any ongoing deals.
        </h1>
      </div>
    );
  }

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
