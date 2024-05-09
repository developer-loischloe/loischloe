import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FilePlus, LayoutDashboard, ShoppingCart } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import SidebarItem from "./SidebarItem";

import Logo from "@/assets/Logo-Gold.png";

export interface Section {
  sectionTitle: string;
  sectionItems: SectionItem[];
}

export interface SectionItem {
  title: string;
  icon: React.ReactNode;
  childItems: Item[];
}

export interface Item {
  title: string;
  link: string;
}

const constants: Section[] = [
  {
    sectionTitle: "Main Home",
    sectionItems: [
      {
        title: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        childItems: [
          {
            title: "Overview",
            link: "/dashboard",
          },
        ],
      },
    ],
  },
  {
    sectionTitle: "All Page",
    sectionItems: [
      {
        title: "Ecommerce",
        icon: <ShoppingCart size={20} />,
        childItems: [
          {
            title: "Product List",
            link: "/dashboard/products",
          },
          {
            title: "Add Product",
            link: "/dashboard/products/add",
          },
        ],
      },
      {
        title: "Order",
        icon: <FilePlus size={20} />,
        childItems: [
          {
            title: "Order List",
            link: "/dashboard/orders",
          },
        ],
      },
    ],
  },
];

const DashboardSidebar = () => {
  return (
    <div className="space-y-5">
      {/* Brand Logo */}
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

      {/* Sidebar menu items */}
      {constants.map((section) => (
        <div key={section.sectionTitle} className="space-y-2">
          <h5 className="pl-3 text-brand_gray font-semibold">
            {section.sectionTitle}
          </h5>
          <Accordion type="single" collapsible className="w-full border-none">
            {section.sectionItems.map((item) => (
              <SidebarItem key={item.title} item={item} />
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default DashboardSidebar;
