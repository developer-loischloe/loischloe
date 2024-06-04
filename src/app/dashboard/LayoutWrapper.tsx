"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardTopBar from "@/components/dashboard/TopBar";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  const pathname = usePathname();

  // Set background
  useEffect(() => {
    if (pathname.includes("/dashboard")) {
      document.body.style.background = "#f1f1f1";
    }
  }, []);

  return (
    <div>
      {/* Topbar */}
      <div className="h-[80px]  p-5 bg-white sticky top-0 flex gap-5 z-50">
        {/* Sidebar Sheet */}
        <Sheet modal={false} open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side={"left"} className="w-[300px]">
            <DashboardSidebar />
          </SheetContent>
        </Sheet>

        <div
          className={cn(
            "w-full transition-all duration-500",
            open && "xl:ml-[300px]"
          )}
        >
          <DashboardTopBar />
        </div>
      </div>

      {/* Main Content */}
      <main
        className={cn(
          " p-5 transition-all duration-500",
          open && "xl:ml-[300px]"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default LayoutWrapper;
