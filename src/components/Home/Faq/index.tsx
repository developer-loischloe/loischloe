import React from "react";
import Image from "next/image";

import { Accordion } from "@/components/ui/accordion";

import FaqCard from "./FaqCard";
import womenThinking from "@/assets/faq/women_thinking.png";

const faqConstant = [
  {
    id: 1,
    question: "What skin types are Lois Chloe products suitable for?",
    answer:
      "Our products are designed to be gentle and effective for all skin types, including sensitive skin.",
  },
  {
    id: 2,
    question: "Are Lois Chloe products tested on animals?",
    answer:
      "No, we are proud to say that our products are cruelty-free and not tested on animals.",
  },
  {
    id: 3,
    question: "How often should I apply Lois Chloe sunscreen?",
    answer:
      "We recommend applying sunscreen liberally and evenly to exposed skin areas every 3-5 hours, especially if you are out in the sun.",
  },
  {
    id: 4,
    question: "Can I wear Lois Chloe makeup every day?",
    answer:
      "Absolutely! Our makeup products are lightweight and suitable for daily wear.",
  },
  {
    id: 5,
    question: "Do Lois Chloe products contain any harmful chemicals?",
    answer:
      "No, our products are formulated without parabens, sulfates, and other harmful chemicals, prioritizing the health and safety of your skin.",
  },
  {
    id: 6,
    question: "Are Lois Chloe products suitable for acne-prone skin?",
    answer:
      "Yes, many of our products are non-comedogenic and formulated to be gentle on acne-prone skin, but we recommend consulting with a dermatologist for personalized advice.",
  },
];
const Faq = () => {
  return (
    <div className="bg-[#FFF4E7] ">
      <section className="xl:pb-0 mb-20">
        <div className="flex flex-col-reverse md:flex-row gap-10">
          <div className="flex-1">
            <Image
              src={womenThinking}
              alt="Women thinking"
              className="max-h-full"
            />
          </div>
          <div className="flex-1">
            <h5>#askanything</h5>
            <h4 className="heading-1">Frequently asked questions</h4>
            <div>
              <Accordion type="single" collapsible className="space-y-5">
                {faqConstant.map((faq) => (
                  <FaqCard faq={faq} key={faq.id} />
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
