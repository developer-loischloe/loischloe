import React from "react";
import { Banknote, ShoppingCart } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import { ChartConfig } from "@/components/ui/chart";
import TopViewCard from "./TopViewCard";
import PopularProducts from "./PopularProducts";
import BestBuyingDistrict from "../BestBuyingDistrict";
import Image from "next/image";

const TopView = ({ response }: { response: any }) => {
  // Chart Config
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">
      {/* Order Stats */}
      <TopViewCard
        icon={<ShoppingCart size={18} className="text-green-500" />}
        cardTitle="Total Orders"
        cardValue={String(response.order.total_order)}
        chartData={response.order.chartData}
        chartConfig={orderChartConfig}
        areaDataKey="order"
      />

      {/* Sale Stats */}
      <TopViewCard
        icon={<Image src={"/taka.svg"} alt="taka" width={20} height={20} />}
        cardTitle="Total Sales"
        cardValue={formatMoney(response.sale.total_sale)}
        chartData={response.sale.chartData}
        chartConfig={saleChartConfig}
        areaDataKey="sale"
      />
      <PopularProducts products={response.popularProducts} />
      <BestBuyingDistrict bestBuyingStates={response.bestBuyingStates} />
    </div>
  );
};

export default TopView;
