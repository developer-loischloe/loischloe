import React from "react";
import SignOutButton from "./SignOutButton";

const DashboardTopBar = () => {
  return (
    <div className="p-5 flex justify-between">
      <div></div>
      <SignOutButton />
    </div>
  );
};

export default DashboardTopBar;
