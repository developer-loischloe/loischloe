import React from "react";
import Image from "next/image";
import Main_banner_2 from "../../../public/home_slider/2000x757_px/W-Post-1.png";

const OfferBanner = () => {
  return (
    <div>
      <Image src={Main_banner_2} alt="Offer" className="w-full " />
    </div>
  );
};

export default OfferBanner;
