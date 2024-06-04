import React from "react";
import Account from "./Account";
import { Search } from "lucide-react";

const DashboardTopBar = () => {
  return (
    <div className="w-full h-full flex gap-5 items-center justify-between">
      <div className="w-full flex justify-center">
        <form
          action=""
          className="flex items-center gap-2 border rounded-xl overflow-hidden p-2 w-full max-w-[550px]"
        >
          <Search size={16} />
          <input
            type="text"
            placeholder="Search for products"
            className="border-none outline-none w-full placeholder:text-sm"
          />
        </form>
      </div>
      <Account />
    </div>
  );
};

export default DashboardTopBar;
