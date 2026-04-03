import React from "react";
import { Metadata } from "next";

// Metadata
export const metadata: Metadata = {
  title: "Makeup Combo Deals & Bundle Offers",
  description:
    "Shop LOIS CHLOE makeup combo deals and bundle offers in Bangladesh. Save up to 43% on curated beauty sets — cruelty-free, vegan, and clinically proven.",
  alternates: {
    canonical: "/combo-deals",
  },
};

const page = () => {
  return (
    <section className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-xl md:text-2xl font-semibold text-[#2D3436]">
          At this moment, we do not have any ongoing deals.
        </h1>
        <p className="text-[#636e72] mt-3">
          Stay tuned — exciting offers are coming soon!
        </p>
      </div>
    </section>
  );
};

export default page;
