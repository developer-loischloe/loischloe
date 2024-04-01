import React from "react";
import OfferCard from "./OfferCard";
import OfferBg1 from "@/assets/offer/offer-1-bg.png";
import OfferBg2 from "@/assets/offer/offer-2-bg.png";

const offerConstant = [
  {
    title: "New Products",
    textColor: "#fff",
    discount: 15,
    btnText: "Shop now",
    btnLink: "#",
    bgImage: OfferBg1,
    btnClassName: "",
  },
  {
    title: "lipstick loischloe",
    textColor: "#000",
    discount: 30,
    btnText: "Shop now",
    btnLink: "#",
    bgImage: OfferBg2,
    btnClassName: "",
  },
];
const Offer = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {offerConstant.map((offer) => (
          <OfferCard key={offer.title} offer={offer} />
        ))}
      </div>
    </section>
  );
};

export default Offer;
