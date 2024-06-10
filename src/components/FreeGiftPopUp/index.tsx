"use client";

import { Gift } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import giftImage from "@/assets/gift/Mascara.webp";

const animateVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 6,
    },
  },
};

const FreeGiftPopUp = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animateVariants}
      className="fixed bottom-[45px] left-[20px] md:left-[40px] z-[100000]"
    >
      <Popover>
        <PopoverTrigger>
          <div className="flex gap-2 items-center bg-white py-3 px-4 shadow-lg rounded-xl">
            <Gift size={40} />
            <p className="text-lg font-semibold">Offers</p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-[20px] md:ml-[40px] space-y-5 p-0">
          <div className="shadow-md p-3">
            <p className="font-semibold text-2xl">Offers For You</p>
            <p className="text-brand_gray">
              Claim these exclusive offers today
            </p>
          </div>
          <div className="m-3  ">
            <div className="flex gap-3 p-3  mb-3 border rounded-md overflow-hidden">
              <Image
                src={giftImage}
                alt="Mascara"
                width={70}
                height={70}
                className="rounded-md"
              />
              <p className="">
                Get a Free Gift with Purchases of 2500 tk or More!
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </motion.div>
  );
};

export default FreeGiftPopUp;
