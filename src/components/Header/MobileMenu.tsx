"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, LayoutDashboard, Menu } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavList } from "./MegaMenu";
import UserBtn from "./UserBtn";
import { ScrollArea } from "../ui/scroll-area";

export default function MobileMenu({
  showDashboardRoute,
}: {
  showDashboardRoute: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        asChild
        className="cursor-pointer hover:text-brand_primary transition-all"
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 pb-16">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b px-4 py-4">
            <div className="font-semibold">Menu</div>
          </div>
          <ScrollArea>
            <Accordion type="single" className="w-full">
              {NavList.map((item, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={index}
                  className="border-b"
                >
                  {item.child ? (
                    <>
                      <AccordionTrigger className="px-4 py-2">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="px-4 py-2">
                          {item.child.left_image && (
                            <Link
                              href={item.child.left_image.href}
                              className="block mb-4"
                              onClick={() => setOpen(false)}
                            >
                              <Image
                                src={
                                  item.child.left_image.path ||
                                  "/placeholder.svg"
                                }
                                alt={item.title}
                                width={300}
                                height={150}
                                className="rounded-md w-full h-auto object-cover"
                              />
                            </Link>
                          )}
                          <ul className="space-y-2">
                            {item.child.menu.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={subItem.href}
                                  className="block p-2 hover:bg-accent rounded-md transition-colors"
                                  onClick={() => setOpen(false)}
                                >
                                  <div className="font-medium">
                                    {subItem.title}
                                  </div>
                                  {subItem.description && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {subItem.description}
                                    </p>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-2 hover:bg-accent"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>

        {/* Header bottom*/}
        <div className="absolute bottom-0 left-0 right-0 bg-brand_secondary flex justify-between py-2.5 px-10 z-40">
          <Link href={"/"} className="" title="Dashboard">
            <Home className="text-white hover:text-brand_primary transition-all" />
          </Link>
          {showDashboardRoute && (
            <Link href={"/dashboard"} className="" title="Dashboard">
              <LayoutDashboard className="text-white hover:text-brand_primary transition-all" />
            </Link>
          )}
          <UserBtn />
        </div>
      </SheetContent>
    </Sheet>
  );
}
