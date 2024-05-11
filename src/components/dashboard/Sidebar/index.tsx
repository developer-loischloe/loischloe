import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { FilePlus, LayoutDashboard, ShoppingCart } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
  const pathname = usePathname();
  let defaultActive = "";

  const findDefaultActiveItem = () => {
    constants.find((section) => {
      section.sectionItems.find((item) => {
        item.childItems.find((child) => {
          if (child.link === pathname) {
            defaultActive = item.title;
          }
        });
      });
    });
  };

  findDefaultActiveItem();

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

      <ScrollArea className="h-[calc(100vh-100px)]">
        {/* Sidebar menu items */}
        {constants.map((section) => (
          <div key={section.sectionTitle} className="space-y-2">
            <h5 className="pl-3 text-brand_gray font-semibold">
              {section.sectionTitle}
            </h5>
            <Accordion
              type="single"
              defaultValue={`item-${defaultActive}`}
              collapsible
              className="w-full border-none"
            >
              {section.sectionItems.map((item) => (
                <SidebarItem key={item.title} item={item} />
              ))}
            </Accordion>
          </div>
        ))}

        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default DashboardSidebar;
