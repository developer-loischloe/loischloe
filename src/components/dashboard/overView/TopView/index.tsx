import React from "react";
import TopViewtopViewCard from "./TopViewCard";
import { DollarSign, ShoppingCart } from "lucide-react";
import WelcomeCard from "./WelcomeCard";
import { ChartConfig } from "@/components/ui/chart";

const TopView = () => {
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig = {
    order: {
      label: "Order",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      <WelcomeCard />
      <TopViewtopViewCard
        icon={<ShoppingCart size={18} className="text-green-500" />}
        cardTitle="Total Orders"
        cardValue="248k"
        progress={{
          value: "24",
          increment: true,
        }}
        chartData={chartData}
        chartConfig={chartConfig}
      />
      <TopViewtopViewCard
        icon={<DollarSign size={18} className="text-green-500" />}
        cardTitle="Total Sales"
        cardValue="$48.6k"
        progress={{
          value: "24",
          increment: false,
        }}
        chartData={chartData}
        chartConfig={chartConfig}
      />
    </div>
  );
};

export default TopView;
