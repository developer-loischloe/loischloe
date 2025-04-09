"use client";

import { useEffect, useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import appwriteOrderService from "@/appwrite/appwriteOrderService";
import TopView from "./TopView";

// Define proper types for the data
interface OverviewData {
  popularProducts?: any; // Replace 'any' with proper type from your API
  [key: string]: any;
}

interface OverViewProps {
  fromDate: string;
  toDate: string;
}

const OverView = ({ fromDate, toDate }: OverViewProps) => {
  const [data, setData] = useState<OverviewData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Memoize the fetch function
  const fetchOverviewData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await appwriteOrderService.getDashboardOverviewData({
        fromDate,
        toDate,
      });
      setData(response);
      setError("");
    } catch (error: any) {
      console.error("Overview data fetch error:", error);
      setData({});
      setError(error.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchOverviewData();
  }, [fetchOverviewData]);

  // Memoize the loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="w-full h-[300px] lg:h-[500px]">
          <Skeleton className="w-full h-full bg-black/10" />
        </div>
      ))}
    </div>
  );

  // Early return for loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Early return for error state
  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  // Early return for empty data
  if (!data.popularProducts) {
    return null;
  }

  // Render main content
  return (
    <div className="space-y-5">
      <TopView response={data} />
    </div>
  );
};

export default OverView;
