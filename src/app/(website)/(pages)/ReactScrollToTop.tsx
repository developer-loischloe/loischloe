"use client";

import React from "react";
import ScrollToTop from "react-scroll-to-top";
import { ArrowBigUp } from "lucide-react";
import { MotionDiv } from "@/framer-motion/motion";
import { sectionVariants } from "@/framer-motion/variants";

const ScrollToTopBtn = () => {
  return (
    <MotionDiv
      variants={sectionVariants({ from: "left" })}
      initial="hidden"
      animate="visible"
    >
      <ScrollToTop
        smooth
        className="left-5 md:left-10 !bottom-10  transition-all flex justify-center items-center"
        color="#fff"
        component={
          <ArrowBigUp width={28} height={28} className="text-brand_primary" />
        }
      />
    </MotionDiv>
  );
};

export default ScrollToTopBtn;
