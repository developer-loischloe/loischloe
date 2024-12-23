import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectDateRangePicker } from "@/components/inventory/SelectDateRangePicker";
import OverView from "@/components/dashboard/overView";
import RecentComment from "@/components/dashboard/overView/RecentComment";

// Metadata
export const metadata: Metadata = {
  title: "OverView",
};

// Utility FN
const getInitialFromDate = () => {
  const now = new Date();
  const fromDate = new Date(now);

  // Set the fromDate to the start of the current year (January 1st)
  fromDate.setMonth(0); // 0 = January
  fromDate.setDate(1); // Set to 1st day of the month
  fromDate.setHours(0, 0, 0, 0); // Midnight

  return fromDate.toISOString();
};

const getInitialToDate = () => {
  const now = new Date();
  const toDate = new Date(now);

  toDate.setHours(23, 59, 59, 999); // Set the time to the end of the current day

  return toDate.toISOString();
};

const OverViewPage = ({
  searchParams: { fromDate, toDate },
}: {
  searchParams: {
    fromDate: string;
    toDate: string;
  };
}) => {
  // Redirect
  if (!fromDate || !toDate) {
    redirect(
      `/dashboard?fromDate=${getInitialFromDate()}&toDate=${getInitialToDate()}`
    );
  }

  return (
    <div className="space-y-5">
      {/* Date Picker */}
      <div className="flex justify-end">
        <SelectDateRangePicker
          basePath="/dashboard"
          dateData={{ from: new Date(fromDate), to: new Date(toDate) }}
          extraSearchParams={{}}
        />
      </div>

      {/* Bottom */}
      <Suspense
        key={`${fromDate}-${toDate}-${Math.random() * 1000}`}
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((number) => (
              <div key={number} className="w-full h-[300px] lg:h-[500px]">
                <Skeleton className="w-full h-full bg-black/10" />
              </div>
            ))}
          </div>
        }
      >
        <OverView fromDate={fromDate} toDate={toDate} />
      </Suspense>

      {/*  Bottom */}
      <div className="">
        <RecentComment />
      </div>
    </div>
  );
};

export default OverViewPage;
