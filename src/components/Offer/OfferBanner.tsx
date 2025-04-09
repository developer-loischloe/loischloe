import React from "react";
import Image from "next/image";
import banner from "../../../public/home_slider/2000x757_px/eid_bundle.jpg";

const OfferBanner = () => {
  return (
    <div>
      <Image src={banner} alt="Offer" className="w-full" priority />
    </div>
  );
};

export default OfferBanner;
