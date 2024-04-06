import React from "react";
import OfferBanner from "@/components/Offer/OfferBanner";
import appwriteProductService from "@/appwrite/appwriteProductService";
import ProductCard from "@/components/Products/ProductCard";
import LoisChloeMarquee from "@/components/Shared/LoisChloeMarquee";
import OfferCountDown from "@/components/Shared/countDown/OfferCountDown";

const page = () => {
  return (
    <>
      <OfferBanner />
      <LoisChloeMarquee />
      <OfferCountDown />
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
