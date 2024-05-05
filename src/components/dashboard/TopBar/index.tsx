import React from "react";
import SignOutButton from "./SignOutButton";
import Account from "./Account";

const DashboardTopBar = () => {
  return (
    <div className="w-full h-full flex items-center justify-between">
      <div>fgdg</div>
      <Account />
      <SignOutButton />
    </div>
  );
};

export default DashboardTopBar;
