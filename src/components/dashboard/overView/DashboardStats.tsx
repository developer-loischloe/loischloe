import React, { Suspense } from "react";
import TopView from "./TopView";
import LoadingSpiner from "@/components/Shared/loading/LoadingSpiner";

const DashboardStats = ({ year }: { year: string }) => {
  return (
    <div>
      <Suspense key={`search=${year}`} fallback={<LoadingSpiner />}>
        <TopView year={year} />
      </Suspense>
    </div>
  );
};

export default DashboardStats;
