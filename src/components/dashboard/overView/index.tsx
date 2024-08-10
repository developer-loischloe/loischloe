"use client";
import { useEffect, useState } from "react";
import SelectYear from "./SelectYear";
import TopView from "./TopView";
import BestBuyingDistrict from "./BestBuyingDistrict";
import RecentComment from "./RecentComment";
import appwriteOrderService from "@/appwrite/appwriteOrderService";

const OverView = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  const changeYear = (year: number) => {
    setYear(year);
  };

  // State for API response handling
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch data for getOrderDetailsByYear
  useEffect(() => {
    setLoading(true);

    appwriteOrderService
      .getOrderDetailsByYear(year)
      .then((response) => {
        setError("");
        setResponse(response);
      })
      .catch((error: any) => {
        console.log(error);

        setError(error.message || "Something went wrong!");
        setResponse(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [year]);

  return (
    <div className="space-y-5">
      {/* Top */}
      <div>
        <SelectYear year={year} changeYear={changeYear} />
        <br />
        <TopView loading={loading} error={error} response={response} />
      </div>

      {/*  Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
        <BestBuyingDistrict
          loading={loading}
          error={error}
          response={response}
        />
        <RecentComment />
      </div>
    </div>
  );
};

export default OverView;
