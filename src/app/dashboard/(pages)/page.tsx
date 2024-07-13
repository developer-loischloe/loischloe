import React from "react";
import RecentOrdersView from "@/components/dashboard/overView/RecentOrdersView";
import TopView from "@/components/dashboard/overView/TopView";

const OverView = () => {
  return (
    <div className="space-y-10">
      <TopView />
      {/* <RecentOrdersView /> */}
    </div>
  );
};

export default OverView;
