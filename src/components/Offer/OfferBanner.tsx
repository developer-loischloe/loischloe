import Image from "next/image";
import React from "react";
import Main_banner_2 from "../../../public/home_slider/main_banner_2.jpg";

const OfferBanner = () => {
  return (
    <div>
      <Image src={Main_banner_2} alt="Offer" className="w-full max-h-[500px]" />
    </div>
  );
};

export default OfferBanner;
