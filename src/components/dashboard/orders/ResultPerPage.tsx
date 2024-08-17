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
import { Label } from "@/components/ui/label";

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
      <Label className="text-sm text-brand_gray">Result per page</Label>
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
