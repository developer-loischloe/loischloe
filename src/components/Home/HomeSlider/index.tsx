"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { MotionDiv } from "@/framer-motion/motion";
import { zoomVariants } from "@/framer-motion/variants";
import { AnimatePresence } from "framer-motion";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
// import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "./styles.css";

// desktop(2000 X 757)
// import Main_banner_1 from "../../../../public/home_slider/2000x757_px/main_banner_1.png";
// import Main_banner_2 from "../../../../public/home_slider/2000x757_px/main_banner_2.png";
import All_In_One_Bundle from "../../../../public/home_slider/2000x757_px/All_In_One_Bundle.png";

// Mobile(1563 X 1458)
// import Mobile_banner_1 from "../../../../public/home_slider/1563x1458_px/mobile_banner_1.png";
// import Mobile_banner_2 from "../../../../public/home_slider/1563x1458_px/mobile_banner_2.png";
import All_In_One_Bundle_Mobile from "../../../../public/home_slider/1563x1458_px/All_In_One_Bundle_mobile.png";

const sliderConstant = [
  // {
  //   id: 1,
  //   banner: {
  //     main: Main_banner_1,
  //     mobile: Mobile_banner_1,
  //   },
  //   alt: "Banner",
  //   link: "/products",
  // },
  // {
  //   id: 2,
  //   banner: {
  //     main: Main_banner_2,
  //     mobile: Mobile_banner_2,
  //   },
  //   alt: "Banner",
  //   link: "/products",
  // },
  {
    id: 3,
    banner: {
      main: All_In_One_Bundle,
      mobile: All_In_One_Bundle_Mobile,
    },
    alt: "Banner",
    link: "/products/all-in-one-bundle",
  },
];

export default function App() {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        (1 - progress).toString()
      );
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <Swiper
      speed={1000}
      // modules={[Autoplay]}
      autoplay={{
        delay: 2000,
        pauseOnMouseEnter: true,
      }}
      // loop={true}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      className="homeSliderSwiper relative overflow-hidden"
    >
      <AnimatePresence>
        {[...sliderConstant, ...sliderConstant].map((slider, index) => (
          <SwiperSlide
            key={slider.id + index}
            className="overflow-hidden w-full h-full"
          >
            {({ isActive }) => {
              return (
                <MotionDiv
                  variants={zoomVariants}
                  initial={"scaleup"}
                  whileInView={isActive ? "scaledown" : ""}
                  exit={"scaleup"}
                >
                  <Link href={slider.link}>
                    <Image
                      src={slider.banner.main}
                      alt={slider.alt}
                      className="hidden md:flex w-full"
                      priority
                    />
                    <Image
                      src={slider.banner.mobile}
                      alt={slider.alt}
                      className="md:hidden w-full"
                      priority
                    />
                  </Link>
                </MotionDiv>
              );
            }}
          </SwiperSlide>
        ))}
      </AnimatePresence>

      {/* Auto Progress */}
      <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent} className="text-brand_secondary"></span>
      </div>
    </Swiper>
  );
}
