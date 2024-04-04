import OfferBanner from "@/components/Offer/OfferBanner";
import appwriteProductService from "@/appwrite/appwriteProductService";
import React from "react";
import Marquee from "react-fast-marquee";
import ProductCard from "@/components/Products/ProductCard";

const page = () => {
  return (
    <>
      <OfferBanner />
      <div className="bg-brand_primary py-3">
        <Marquee>
          <div className="flex gap-20">
            <div>Order Now! To Get Delivery Before Eid!</div>
            <div>Order Now! To Get Delivery Before Eid!</div>
            <div>Order Now! To Get Delivery Before Eid!</div>
          </div>
        </Marquee>
      </div>
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
