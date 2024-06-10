"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const whatsappVariants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 3,
    },
  },
};

const Whatsapp = () => {
  const message = "Hello,";
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={whatsappVariants}
      className="fixed bottom-[45px] right-[20px] md:right-[40px] z-[100000]"
    >
      <a href={`https://wa.me/8801840100578?text=${message}`} target="_blank">
        <Image
          src="/whatsapp.svg"
          alt="whatsapp"
          width={100}
          height={100}
          className="w-[45px] h-[45px] sm:w-[50px] md:h-[50px] hover:scale-110 transition-all duration-300"
        />
      </a>
    </motion.div>
  );
};

export default Whatsapp;
