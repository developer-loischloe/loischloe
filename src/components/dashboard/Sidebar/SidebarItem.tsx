"use client";
import { DashboardItem } from ".";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ item }: { item: DashboardItem }) {
  const pathname = usePathname();
  const active = () => {
    return pathname.startsWith(item.link);
  };

  return (
    <AccordionItem value={`item-${item.title}`} className={cn("border-none")}>
      <AccordionTrigger
        className={cn(
          "group hover:no-underline px-5",
          active() && "bg-[#002d3421] text-brand_secondary rounded-md "
        )}
      >
        <div className="flex gap-2 items-center">
          <div>{item.icon}</div>
          <h5 className="group-hover:text-brand_secondary">{item.title}</h5>
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
