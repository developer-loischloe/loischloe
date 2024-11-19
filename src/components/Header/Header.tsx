"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import { AlignJustify, LayoutDashboard, Search } from "lucide-react";
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
import UserBtn from "./UserBtn";
import useScrollHandler from "@/lib/hooks/useScrollHandler";
import SearchSuggestion from "./SearchSuggestion";
import { useAuth } from "@/context/authContext";
import useUtils from "@/lib/hooks/useUtils";
const CartBtn = dynamic(() => import("./Cart/CartBtn"), { ssr: false });

export default function Header() {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPopOver, setShowPopOver] = useState(false);

  const [searchTearm, setSearchTerm] = useState("");

  // Track scrollbar
  const { lastScrollY, scrolling } = useScrollHandler();

  useEffect(() => {
    if (scrolling && lastScrollY > 3000) {
      setShowPopOver(false);
      setShowSearchbar(false);
    }
  }, [scrolling]);

  useUtils();
  const { user } = useAuth();

  const isLoggedIn = Boolean(user);
  const isAdmin = Boolean(user?.labels.includes("admin"));

  return (
    <>
      {/* Header Top */}
      <div
        className={cn(
          "w-full bg-brand_secondary text-[#fff] px-5 py-4 overflow-hidden !z-50 ",
          lastScrollY > 300 &&
            "sticky top-[-200px] transition-all duration-300 invisible",
          scrolling === "top" && "visible top-0"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-10 xl:gap-20">
          {/* Desktop menu start */}
          <div className="hidden lg:block flex-1">
            <div className="flex-1 flex items-center justify-between gap-5">
              {/*Logo*/}
              <div className="inline-flex items-center">
                <Link href={"/"} className="">
                  <Image
                    src={Logo}
                    alt="logo"
                    priority
                    className="min-w-[100px] max-w-[140px]"
                  />
                </Link>
              </div>
              <MenuList />
              <SearchBar
                setShowPopOver={setShowPopOver}
                searchTearm={searchTearm}
                setSearchTerm={setSearchTerm}
              />

              {isLoggedIn && isAdmin && (
                <Link href={"/dashboard"} className="" title="Dashboard">
                  <LayoutDashboard color="white" />
                </Link>
              )}

              <UserBtn />
              <CartBtn />
            </div>
          </div>
          {/* Desktop menu end */}

          {/* ====>>>>>>>>>> */}

          {/* Mobile menu start */}
          <div className="flex-1 lg:hidden">
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-5">
                <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
                  <SheetTrigger>
                    <div title="Menu">
                      <AlignJustify className="hover:text-brand_primary transition-all" />
                    </div>
                  </SheetTrigger>
                  <SheetContent
                    side={"left"}
                    className="w-full h-full !max-w-[300px] !pt-20 z-[1000]"
                  >
                    <SheetHeader></SheetHeader>
                    <MenuList setShowSidebar={setShowSidebar} />
                  </SheetContent>
                </Sheet>

                {/*Logo for sm device*/}
                <div className="hidden sm:inline-flex items-center ">
                  <Link href={"/"} className="">
                    <Image
                      src={Logo}
                      alt="logo"
                      priority
                      className="min-w-[100px] max-w-[140px]"
                    />
                  </Link>
                </div>
              </div>

              <div className="flex-1 flex items-center">
                {/*Logo for xm device*/}
                <div className="inline-flex items-center sm:hidden">
                  <Link href={"/"} className="">
                    <Image
                      src={Logo}
                      alt="logo"
                      priority
                      className="min-w-[100px] max-w-[140px]"
                    />
                  </Link>
                </div>

                <div className="flex-1 hidden sm:block">
                  <SearchBar
                    setShowPopOver={setShowPopOver}
                    searchTearm={searchTearm}
                    setSearchTerm={setSearchTerm}
                  />
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div title="Search" className="sm:hidden">
                  <Search
                    onClick={() => {
                      setShowSearchbar((prev) => !prev);
                    }}
                    className="hover:text-brand_primary transition-all  cursor-pointer"
                  />
                </div>

                <div className="hidden md:flex gap-5 items-center">
                  {isLoggedIn && isAdmin && (
                    <Link href={"/dashboard"} className="" title="Dashboard">
                      <LayoutDashboard color="white" />
                    </Link>
                  )}
                </div>
                <div
                  className={cn(
                    isLoggedIn && isAdmin ? "hidden md:flex" : "flex"
                  )}
                >
                  <UserBtn />
                </div>
                <CartBtn />
              </div>
            </div>

            {showSearchbar && (
              <MotionDiv
                variants={sectionVariants({ from: "top" })}
                initial="hidden"
                animate="visible"
                className={cn(
                  "fixed top-0 left-0 right-0 bottom-0 flex flex-col !z-[10000] "
                )}
              >
                <div>
                  <SearchBar
                    setShowPopOver={setShowPopOver}
                    searchTearm={searchTearm}
                    setSearchTerm={setSearchTerm}
                  />
                </div>
                <div
                  onClick={() => {
                    setShowSearchbar(false);
                    setShowPopOver(false);
                  }}
                  className="flex-1 h-full bg-[#00000062] !z-[10000]"
                />
              </MotionDiv>
            )}
          </div>
          {/* Mobile menu end */}
        </div>

        {/*Search Suggestion start */}
        <div className="w-full flex justify-center">
          <div
            className={cn(
              "absolute top-[-900px]  bg-white w-[95vw] md:w-[750px] p-5 rounded-b-md transition-all duration-300 shadow-2xl !z-[10000]",
              showPopOver && "top-[82px] sm:top-[120px]"
            )}
          >
            <SearchSuggestion
              searchTearm={searchTearm}
              setShowPopOver={setShowPopOver}
            />
          </div>
        </div>
      </div>

      {/* Header bottom*/}
      {isLoggedIn && isAdmin && (
        <div className="fixed bottom-0 left-0 right-0 bg-brand_secondary flex justify-between py-2.5 px-20 md:hidden z-40">
          <Link href={"/dashboard"} className="" title="Dashboard">
            <LayoutDashboard color="white" />
          </Link>
          <UserBtn />
        </div>
      )}
    </>
  );
}
