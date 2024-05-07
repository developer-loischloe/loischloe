"use client";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardTopBar from "@/components/dashboard/TopBar";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const LayoutWrapper = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  const [open, setOpen] = React.useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/dashboard")) {
      document.body.style.background = "#f1f1f1";
    }
  }, []);

  return (
    <div className="flex-1">
      {/* Topbar */}
      <div className="h-[80px]  p-5 bg-white sticky top-0 flex gap-10 z-50">
        <Sheet modal={false} open={open} onOpenChange={setOpen}>
          <SheetTrigger className="">
            <Menu />
          </SheetTrigger>
          <SheetContent
            // onInteractOutside={() => {
            //   setOpen(true);
            //   console.log("int");
            // }}
            side={"left"}
            className="w-[300px]"
          >
            <DashboardSidebar />
          </SheetContent>
        </Sheet>
        <div
          className={cn(
            "w-full transition-all duration-500",
            open && "md:ml-[300px]"
          )}
        >
          <DashboardTopBar user={user} />
        </div>
      </div>

      {/* Main Content */}
      <main
        className={cn(
          " p-5 transition-all duration-500",
          open && "md:ml-[300px]"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default LayoutWrapper;
