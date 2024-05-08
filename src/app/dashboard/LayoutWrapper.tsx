"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardTopBar from "@/components/dashboard/TopBar";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

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
    <div>
      {/* Topbar */}
      <div className="h-[80px]  p-5 bg-white sticky top-0 flex gap-10 z-50">
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
          <DashboardTopBar user={user} />
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
