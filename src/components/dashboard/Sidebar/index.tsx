import { Accordion } from "@/components/ui/accordion";
import { Diamond, LayoutDashboard } from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";

export interface DashboardItem {
  title: string;
  icon: React.ReactNode;
  link: string;
  child: {
    title: string;
    icon: React.ReactNode;
    link: string;
  }[];
}

const dashboardConstant: DashboardItem[] = [
  {
    title: "Dashboard",
    icon: (
      <LayoutDashboard size={18} className="hover:stroke-brand_secondary" />
    ),
    link: "/dashboard",
    child: [
      {
        title: "Dashboard",
        icon: <Diamond size={12} />,
        link: "/dashboard",
      },
      {
        title: "Dashboard",
        icon: <Diamond size={12} />,
        link: "/dashboard",
      },
    ],
  },
  {
    title: "Order",
    icon: (
      <LayoutDashboard size={18} className="hover:stroke-brand_secondary" />
    ),
    link: "/dashboard/order",
    child: [
      {
        title: "Order List",
        icon: <Diamond size={12} />,
        link: "/dashboard/order/order-list",
      },
      {
        title: "Order Details",
        icon: <Diamond size={12} />,
        link: "/dashboard/order/order-details",
      },
    ],
  },
];
const DashboardSidebar = () => {
  return (
    <div>
      <Accordion type="single" collapsible className="w-[200px] border-none">
        {dashboardConstant.map((item) => (
          <SidebarItem key={item.title} item={item} />
        ))}
      </Accordion>
    </div>
  );
};

export default DashboardSidebar;
