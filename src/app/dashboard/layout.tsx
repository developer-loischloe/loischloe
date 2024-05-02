import DashboardSidebar from "@/components/dashboard/Sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="flex gap-5">
        <div className="p-5 border-l border-black">
          <DashboardSidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
};

export default layout;
