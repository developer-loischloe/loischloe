import React from "react";
import OfferCard from "./OfferCard";
import OfferBg1 from "@/assets/offer/offer-1-bg.jpeg";
import OfferBg2 from "@/assets/offer/offer-2-bg.jpeg";

const offerConstant = [
  {
    title: "New Products",
    btnLink: "/products?p_category=makeup&c_category=lips",
    bgImage: OfferBg1,
    btnClassName: "",
  },
  {
    title: "lipstick loischloe",
    btnLink: "/products?p_category=makeup&c_category=face",
    bgImage: OfferBg2,
    btnClassName: "",
  },
];
const Offer = () => {
  return (
    <section>
      <h2 className="text-center mb-5">Embrace Cruelty Free Chic Makeup</h2>
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {offerConstant.map((offer) => (
          <OfferCard key={offer.title} offer={offer} />
        ))}
      </div>
    </section>
  );
};

export default Offer;
