import { LayoutDashboard } from "lucide-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface DashboardItem {
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
        icon: <LayoutDashboard size={18} />,
        link: "/dashboard",
      },
      {
        title: "Dashboard",
        icon: <LayoutDashboard size={18} />,
        link: "/dashboard",
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

function SidebarItem({ item }: { item: DashboardItem }) {
  return (
    <AccordionItem value={`item-${item.title}`}>
      <AccordionTrigger className="group hover:no-underline">
        <div className="flex gap-2 items-center">
          <div>{item.icon}</div>
          <h5 className="group-hover:text-brand_primary">{item.title}</h5>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {item.child.map((childItem) => (
          <Link href={childItem.link}>
            <div className="pl-10 flex gap-2 items-center group">
              <div>{childItem.icon}</div>
              <h5 className="group-hover:text-brand_primary">
                {childItem.title}
              </h5>
            </div>
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
