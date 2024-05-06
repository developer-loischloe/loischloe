"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Item, SectionItem } from ".";
import { Diamond } from "lucide-react";

export default function SidebarItem({ item }: { item: SectionItem }) {
  const pathname = usePathname();

  const parentActive = () => {
    return item.childItems.find((item) => pathname === item.link);
  };

  return (
    <AccordionItem
      value={`item-${item.title}`}
      className={cn("border-none w-full")}
    >
      <Link href={item.childItems[0].link}>
        <AccordionTrigger
          className={cn(
            "group rounded-xl",
            "hover:no-underline px-3",
            parentActive() && "bg-[#002d3421]"
          )}
        >
          <div
            className={cn(
              "flex gap-2 items-center group-hover:text-brand_primary",
              parentActive() && "text-brand_primary"
            )}
          >
            <div>{item.icon}</div>
            <h5>{item.title}</h5>
          </div>
        </AccordionTrigger>
      </Link>
      <AccordionContent>
        {item?.childItems?.map((childItem) => (
          <ChildItem childItem={childItem} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

const ChildItem = ({ childItem }: { childItem: Item }) => {
  const pathname = usePathname();

  const active = () => {
    return pathname === childItem.link;
  };

  return (
    <Link href={childItem.link} className="group">
      <div
        className={cn(
          "pl-10 flex gap-2 items-center text-brand_gray group-hover:text-brand_primary text-base font-normal",
          active() && "text-brand_primary"
        )}
      >
        <Diamond size={12} />
        <span>{childItem.title}</span>
      </div>
    </Link>
  );
};
