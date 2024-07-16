"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import { ChartConfig } from "@/components/ui/chart";
import TopViewCard from "./TopViewCard";
import PopularProducts from "./PopularProducts";
import WelcomeCard from "./WelcomeCard";
import appwriteOrderService from "@/appwrite/appwriteOrderService";
import LoadingSpiner from "@/components/Shared/loading/LoadingSpiner";

const TopView = ({ year }: { year: number }) => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const orderChartConfig = {
    order: {
      label: "Order",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const saleChartConfig = {
    sale: {
      label: "Sale",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  if (loading) {
    return <LoadingSpiner />;
  }

  if (error) {
    return (
      <div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 ">
      <WelcomeCard />

      {/* Order Stats */}
      <TopViewCard
        icon={<ShoppingCart size={18} className="text-green-500" />}
        cardTitle="Total Orders"
        cardValue={String(response.order.total_order)}
        progress={{
          value: response.order.progress.value,
          increment: response.order.progress.increment,
        }}
        chartData={response.order.chartData}
        chartConfig={orderChartConfig}
        areaDataKey="order"
      />

      {/* Sale Stats */}
      <TopViewCard
        icon={<Image src={"/taka.svg"} alt="taka" width={20} height={20} />}
        cardTitle="Total Sales"
        cardValue={formatMoney(response.sale.total_sale)}
        progress={{
          value: response.sale.progress.value,
          increment: response.sale.progress.increment,
        }}
        chartData={response.sale.chartData}
        chartConfig={saleChartConfig}
        areaDataKey="sale"
      />
      <PopularProducts products={response.popularProducts} />
    </div>
  );
};

export default TopView;
