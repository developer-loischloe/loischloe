import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Copyright, Facebook, Youtube } from "lucide-react";

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-facebook hover:fill-brand_primary transition-all"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                  </svg>
                </Link>
                <Link href="https://www.youtube.com/@loischloe" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    fill="currentColor"
                    className="bi bi-youtube hover:fill-brand_primary transition-all"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.tiktok.com/@loischloe.bangladesh"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    fill="currentColor"
                    className="bi bi-tiktok hover:fill-brand_primary transition-all"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                  </svg>{" "}
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
