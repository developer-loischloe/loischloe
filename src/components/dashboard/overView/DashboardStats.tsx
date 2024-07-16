"use client";

import { useState } from "react";
import TopView from "./TopView";
import SelectYear from "./SelectYear";

const DashboardStats = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  const changeYear = (year: number) => {
    setYear(year);
  };

  return (
    <div>
      <SelectYear year={year} changeYear={changeYear} />
      <br />
      <TopView year={year} />
    </div>
  );
};

export default DashboardStats;
