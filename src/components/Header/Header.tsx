"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AlignRight, Search } from "lucide-react";

import { MotionDiv } from "@/framer-motion/motion";
import { sectionVariants } from "@/framer-motion/variants";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import Logo from "@/assets/Logo-Gold.png";

import SearchBar from "./SearchBar";
import MenuList from "./MenuList";
import WishListBtn from "./WishListBtn";
import UserBtn from "./UserBtn";
const CartBtn = dynamic(() => import("./CartBtn"), { ssr: false });

export default function Header() {
  const [showSearchbar, setShowSearchbar] = useState(false);

  return (
    <div className="w-full bg-brand_secondary text-[#fff] px-5 py-4 overflow-hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-10 xl:gap-20">
        <div className="inline-flex items-center">
          <Link href={"/"} className="">
            <Image
              src={Logo}
              alt="logo"
              priority
              className="min-w-[100px] max-w-[160px]"
            />
          </Link>
        </div>

        {/* Desktop menu start */}
        <div className="flex-1 flex items-center justify-between gap-5">
          <div className="hidden lg:block">
            <MenuList />
          </div>

          <div className={cn("hidden sm:flex flex-1")}>
            <SearchBar />
          </div>
        </div>
        <div className="flex gap-5">
          {/* <div className="hidden md:block">
            <WishListBtn />
          </div> */}
          <div className="">
            <CartBtn />
          </div>

          {/* <div className="cursor-pointer hidden md:block">
            <UserBtn />
          </div> */}

          <div className="sm:hidden cursor-pointer">
            <Search
              onClick={() => setShowSearchbar((prev) => !prev)}
              className="hover:text-brand_primary transition-all"
            />
          </div>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <AlignRight className="hover:text-brand_primary transition-all" />
              </SheetTrigger>
              <SheetContent className="w-full !max-w-[300px] !pt-20">
                <SheetHeader></SheetHeader>
                <MenuList />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {/* Desktop menu end */}

        {/* Mobile menu start */}
        {/*Mobile menu top*/}
        {showSearchbar && (
          <MotionDiv
            variants={sectionVariants({ from: "top" })}
            initial="hidden"
            animate="visible"
            className={cn(
              "fixed top-0 left-0 right-0 bottom-0 flex flex-col z-50 "
            )}
          >
            <div>
              <SearchBar />
            </div>
            <div
              onClick={() => setShowSearchbar(false)}
              className="flex-1 h-full bg-[#00000062] !z-[10000]"
            />
          </MotionDiv>
        )}

        {/* Mobile bottom menu */}
        {/* <div className="fixed bottom-0 left-0 right-0 bg-brand_secondary flex justify-between py-2.5 px-20 md:hidden z-40">
          <WishListBtn />
          <CartBtn />
          <UserBtn />
        </div> */}
        {/* Mobile menu end */}
      </div>
    </div>
  );
}
