import Link from "next/link";
import { usePathname } from "next/navigation";
import { Diamond } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { Item, SectionItem } from "./index";

export default function SidebarItem({ item }: { item: SectionItem }) {
  return (
    <AccordionItem
      value={`item-${item.title}`}
      className={cn("border-none w-full space-y-2")}
    >
      <AccordionTrigger
        className={cn(
          "group rounded-xl",
          "hover:no-underline px-3 py-3",
          "data-[state=open]:bg-[#002d3421]"
        )}
      >
        <div
          className={cn(
            "flex gap-2 items-center group-hover:text-brand_primary",
            "group-data-[state=open]:text-brand_primary"
          )}
        >
          <div>{item.icon}</div>
          <h5>{item.title}</h5>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-1">
        {item?.childItems?.map((childItem) => (
          <ChildItem key={childItem.title} childItem={childItem} />
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
    <div>
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
    </div>
  );
};
