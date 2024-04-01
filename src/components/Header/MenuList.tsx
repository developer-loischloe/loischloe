import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    name: "About",
    href: "/about-us",
  },
  {
    name: "Products",
    href: "/products",
  },
  // {
  //   name: "Campaign",
  //   href: "/campaign",
  // },
  // {
  //   name: "Contact",
  //   href: "/contact",
  // },
];

const MenuList = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col lg:flex-row  items-center justify-center px-10 min-w-[200px] gap-5 lg:text-white">
      {menuItems.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className={cn(
              "flex-1 text-center text-sm font-semibold  hover:text-brand_primary",
              pathname === item.href && "text-brand_primary"
            )}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
