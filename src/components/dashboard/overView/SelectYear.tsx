"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// utility function
const getPreviousYears = () => {
  const years = [];

  const currentYear = new Date().getFullYear();

  for (let year = 2023; year <= currentYear; year++) {
    years.unshift(year.toString());
  }

  return years;
};

const SelectYear = ({
  year,
  changeYear,
}: {
  year: number;
  changeYear: (year: number) => void;
}) => {
  const handleChange = (year: string) => {
    changeYear(Number(year));
  };

  return (
    <div className="flex justify-end">
      <Select onValueChange={handleChange} defaultValue={String(year)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          {getPreviousYears().map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectYear;
