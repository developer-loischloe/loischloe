"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/assets/Logo-Gold.png";
import SearchBar from "./SearchBar";
import UserBtn from "./UserBtn";
import useScrollHandler from "@/lib/hooks/useScrollHandler";
import { useAuth } from "@/context/authContext";
import useUtils from "@/lib/hooks/useUtils";
import { MegaMenu } from "./MegaMenu";
import MobileMenu from "./MobileMenu";

const CartBtn = dynamic(() => import("./Cart/CartBtn"), { ssr: false });

export default function Header() {
  const [searchTearm, setSearchTerm] = useState("");

  // Track scrollbar
  const { lastScrollY, scrolling } = useScrollHandler();

  // client fetch
  useUtils();
  const { user } = useAuth();
  const isLoggedIn = Boolean(user);
  const isAdmin = Boolean(user?.labels.includes("admin"));

  const showDashboardRoute = isLoggedIn && isAdmin;

  return (
    <>
      {/* Header Top */}
      <div
        className={cn(
          "w-full bg-brand_secondary text-[#fff] py-4 !z-50 relative",
          lastScrollY > 300 &&
            "sticky top-[-200px] transition-all duration-300 invisible",
          scrolling === "top" && "visible top-0"
        )}
      >
        <div className="max-w-7xl px-5 mx-auto flex-1 flex items-center justify-between gap-5">
          {/*Sidebar & Logo*/}
          <div className="flex items-center justify-center gap-5">
            <div className="lg:hidden">
              <MobileMenu showDashboardRoute={showDashboardRoute} />
            </div>

            <div>
              <Link href={"/"} className="">
                <Image
                  src={Logo}
                  alt="logo"
                  priority
                  className="min-w-[100px] max-w-[130px] md:max-w-[140px]"
                />
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <MegaMenu />
          </div>

          <div className="flex gap-5">
            <SearchBar
              searchTearm={searchTearm}
              setSearchTerm={setSearchTerm}
            />

            <div className="hidden lg:flex gap-5">
              {showDashboardRoute && (
                <Link href={"/dashboard"} className="" title="Dashboard">
                  <LayoutDashboard className="text-white hover:text-brand_primary transition-all" />
                </Link>
              )}
              <UserBtn />
            </div>
            <CartBtn />
          </div>
        </div>
      </div>
    </>
  );
}
