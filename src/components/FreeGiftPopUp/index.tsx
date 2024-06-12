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
import { useAuth } from "@/context/authContext";
import { cn } from "@/lib/utils";

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
  const { user } = useAuth();

  const isLoggedIn = Boolean(user);
  const isAdmin = Boolean(user?.labels.includes("admin"));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animateVariants}
      className={cn(
        "fixed bottom-[25px] left-[20px] lg:left-[40px] z-[50]",
        isLoggedIn && isAdmin && "bottom-[45px]"
      )}
    >
      <Popover>
        <PopoverTrigger>
          <div className="relative flex gap-2 items-center bg-white py-2 px-3 shadow-lg rounded-md">
            <Gift size={40} className="text-brand_secondary" />
            <p className="text-base text-black font-semibold">Offers</p>
            <div className="absolute -top-1.5 -right-1.5 bg-[#F72119] w-6 h-6 rounded-full flex justify-center items-center">
              <span className="text-sm font-semibold text-white">1</span>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-[20px] mb-2 lg:ml-[40px] space-y-5 p-0">
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
                className="rounded-md w-[70px] h-[70px]"
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
