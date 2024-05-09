"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { generateParams } from "@/lib/utils";

const ResultPerPage = ({
  basePath,
  resultPerPage,
  extraSearchParams,
}: {
  basePath: string;
  resultPerPage: string;
  extraSearchParams: object;
}) => {
  const router = useRouter();

  const handleChange = (val: string) => {
    const link = `${basePath}?${generateParams({
      ...extraSearchParams,
      resultPerPage: val,
    })}`;

    router.replace(link);
  };

  return (
    <div className="max-w-max">
      <h5 className="text-sm text-brand_gray mb-2">Result per page</h5>
      <Select defaultValue={resultPerPage || "10"} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px] ">
          <SelectValue placeholder="Select" className="" />
        </SelectTrigger>
        <SelectContent className="">
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ResultPerPage;
