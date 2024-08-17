"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn, generateParams } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

export const SelectDateRangePicker = ({
  basePath,
  dateData,
  extraSearchParams,
}: {
  basePath: string;
  dateData: DateRange | undefined;
  extraSearchParams: object;
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: dateData?.from,
    to: dateData?.to,
  });

  const router = useRouter();

  const handleDateSelect = (date: DateRange | undefined) => {
    setDate(date);

    // generate path
    if (date?.from && date.to) {
      const path = generateParams({
        ...extraSearchParams,
        fromDate: date?.from.toISOString(),
        toDate: date?.to.toISOString(),
      });

      router.replace(`${basePath}?${path}`);
    }
  };

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
