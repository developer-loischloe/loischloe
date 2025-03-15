"use client";
import React from "react";
import Link from "next/link";
import { NavList } from "../Header/MegaMenu";

const HomePageHorizontalMobileNav = () => {
  return (
    <div className="sm:hidden">
      <nav className="py-3">
        <div className="max-w-7xl px-5 mx-auto overflow-x-auto whitespace-nowrap flex space-x-10 pb-2">
          {NavList.map((item) => (
            <Link
              href={item.href}
              className="text-gray-500 font-semibold hover:underline"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default HomePageHorizontalMobileNav;
