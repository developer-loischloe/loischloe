import React from "react";
import Account from "./Account";
import ProductSearchForm from "../products/ProductSearchForm";

const DashboardTopBar = () => {
  return (
    <div className="w-full h-full flex gap-5 items-center justify-between">
      <div className="w-full max-w-[550px] mx-auto">
        <ProductSearchForm />
      </div>
      <Account />
    </div>
  );
};

export default DashboardTopBar;
