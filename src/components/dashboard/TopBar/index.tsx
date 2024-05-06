import React from "react";
import Account from "./Account";

const DashboardTopBar = ({ user }: { user: any }) => {
  return (
    <div className="w-full h-full flex items-center justify-between">
      <div>fgdg</div>
      <Account user={user} />
    </div>
  );
};

export default DashboardTopBar;
