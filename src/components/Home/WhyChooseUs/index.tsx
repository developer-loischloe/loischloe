import React from "react";
import Image from "next/image";

import CheckMark from "@/assets/whyChooseUs/why-choose-checkmark.svg";
import rightBg from "@/assets/whyChooseUs/rightBg.svg";
import Women from "@/assets/whyChooseUs/women.png";

const WhyChooseUs = () => {
  const whyChooseConstant = [
    {
      title: "Premium Quality",
      paragraph:
        "We're committed to using top-tier ingredients and cutting-edge technology for reliable results.",
    },
    {
      title: "Innovative Solutions",
      paragraph:
        "Our products feature advanced formulations, delivering superior performance for your beauty needs.",
    },
    {
      title: "On-the-Go Convenience",
      paragraph:
        "Designed for modern lifestyles, our offerings provide effortless beauty routines wherever you are.",
    },
    {
      title: "Skin-Friendly Assurance",
      paragraph:
        "Our formulas are 100% vegan, cruelty free and gentle, catering to all skin types and keeping your skin’s health as our top most priority.",
    },
    {
      title: "Expert Craftsmanship",
      paragraph:
        "With years of expertise in beauty, we understand and exceed consumer expectations.",
    },
    {
      title: "Confidence in Every Use",
      paragraph:
        "Trust Lois Chloe for products that enhance your natural beauty while protecting your skin.",
    },
  ];
  return (
    <div className="bg-brand_secondary relative">
      <section className="flex">
        <div className="flex-1 space-y-14 z-20">
          <h2 className="heading-1 text-white">Why Choose Us?</h2>
          {whyChooseConstant.map((constant) => (
            <div key={constant.title} className="flex items-center gap-5">
              <div>
                <Image src={CheckMark} alt="checkmark" />
              </div>
              <div className="flex-1">
                <h6 className="text-2xl text-white">{constant.title}</h6>
                <span className="text-white">{constant.paragraph} </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 hidden lg:block">
          <div className="absolute bottom-0 right-0 z-10">
            <Image src={Women} alt="Women used lipstick" />
          </div>
        </div>
      </section>
      {/* right bg */}
      <div className="absolute top-0 right-0 hidden lg:block">
        <Image src={rightBg} alt="image" className="w-full h-full" />
      </div>
    </div>
  );
};

export default WhyChooseUs;
