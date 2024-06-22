"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

const ProductSearchForm = () => {
  const [searchTearm, setSearchTearm] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  // Debounce callback
  const debounced = useDebouncedCallback(async (keyword) => {
    if (keyword) {
      router.push(`/dashboard/products?keyword=${keyword}`);
    } else {
      if (pathname === "/dashboard/products") {
        router.push(`/dashboard/products`);
      }
    }
  }, 500);

  // =>>>>>> handle searchterm
  useEffect(() => {
    debounced(searchTearm);
  }, [searchTearm]);

  return (
    <div className="w-full">
      <label className="w-full relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <Search size={20} />
        </span>
        <input
          type="search"
          placeholder="Search for products..."
          name="search"
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-brand_secondary focus:ring-brand_secondary focus:ring-1 sm:text-sm"
          value={searchTearm}
          onChange={(e) => {
            setSearchTearm(e.target.value);
          }}
        />
      </label>
    </div>
  );
};

export default ProductSearchForm;
