import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Copyright } from "lucide-react";

import NewsLetterForm from "../Shared/NewsLetterForm";

import facebook from "@/assets/social-media/facebook.png";
import tiktok from "@/assets/social-media/tik-tok.png";
import youtube from "@/assets/social-media/youtube.png";

import Logo from "@/assets/Logo-Gold.png";
// import SSLCommerzePaymentBanner from "@/assets/sslCommerze/sslcommerze-payment-method.webp";

const Footer = () => {
  const quicklinksConstant = [
    {
      text: "About Us",
      link: "/about-us",
    },
    {
      text: "Products",
      link: "/products",
    },
  ];

  return (
    <footer className="bg-brand_secondary pb-10 md:pb-0">
      <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 justify-between max-w-7xl mx-auto px-5 py-16">
        <div className="lg:col-span-2">
          <div className="mb-5">
            <Link href={"/"}>
              <Image
                src={Logo}
                alt="logo"
                priority
                className="min-w-[100px] max-w-[180px]"
              />
            </Link>
          </div>
          <div>
            <p>
              LOIS CHLOE, the cruelty-free luxury beauty brand. We presents a
              complete range of highly advanced beauty products with
              clinically-proven efficacy and safety: in two categories: makeup
              and skincare. We believe that the beauty is not luxurious
              imagination.
            </p>
          </div>
        </div>

        <div className="">
          <h6 className="text-xl mb-5">Quick Links</h6>

          <div className="space-y-2">
            {quicklinksConstant.map((quicklink) => (
              <Link
                key={quicklink.link}
                href={quicklink.link}
                className="flex hover:text-brand_primary transition-all"
              >
                <ChevronRight />
                <span>{quicklink.text}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-[350px] lg:col-span-2">
          <h6 className="text-xl mb-5">Our Newsletter</h6>
          <div className="space-y-5">
            <p>
              Subscribe to the monthly newsletter for all the latest updates.
            </p>

            <div>
              <NewsLetterForm />
            </div>

            <div className="flex gap-5 items-center">
              <span>Follow Us:</span>
              <div className="flex gap-5 items-center">
                <Link
                  href="https://www.facebook.com/Loischloe.asia"
                  target="_blank"
                >
                  <Image src={facebook} alt="facebook" className="w-[35px]" />
                </Link>
                <Link href="https://www.youtube.com/@loischloe" target="_blank">
                  <Image src={youtube} alt="youtube" className="w-[35px]" />
                </Link>
                <Link
                  href="https://www.tiktok.com/@loischloe.bangladesh"
                  target="_blank"
                >
                  <Image src={tiktok} alt="tiktok" className="w-[35px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="max-w-7xl mx-auto px-5 py-5">
        {/* <Image
          src={SSLCommerzePaymentBanner}
          alt="SSLCommerze Payment Banner"
        /> */}

        <div className="flex justify-center items-center text-white mt-5">
          <Copyright size={16} />
          <span className="ml-1 text-sm">
            Copyright {new Date().getFullYear()},{" "}
            <Link href={"/"} className="text-brand_primary hover:underline">
              LOISCHLOE.
            </Link>
            All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
