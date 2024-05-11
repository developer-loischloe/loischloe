import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryListLoading = () => {
  return (
    <div className="hidden md:block min-w-[220px] min-h-[300px]">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default CategoryListLoading;
