import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import { ChartConfig } from "@/components/ui/chart";
import TopViewCard from "./TopViewCard";
import PopularProducts from "./PopularProducts";
import WelcomeCard from "./WelcomeCard";
import appwriteOrderService from "@/appwrite/appwriteOrderService";

const TopView = async ({ year }: { year: string }) => {
  const response = await appwriteOrderService.getOrderDetailsByYear(year);

  const { order, sale, popularProducts } = response;

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
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 ">
      <WelcomeCard />

      {/* Order Stats */}
      <TopViewCard
        icon={<ShoppingCart size={18} className="text-green-500" />}
        cardTitle="Total Orders"
        cardValue={String(order.total_order)}
        progress={{
          value: order.progress.value,
          increment: order.progress.increment,
        }}
        chartData={order.chartData}
        chartConfig={orderChartConfig}
        areaDataKey="order"
      />

      {/* Sale Stats */}
      <TopViewCard
        icon={<Image src={"/taka.svg"} alt="taka" width={20} height={20} />}
        cardTitle="Total Sales"
        cardValue={formatMoney(sale.total_sale)}
        progress={{
          value: sale.progress.value,
          increment: sale.progress.increment,
        }}
        chartData={sale.chartData}
        chartConfig={saleChartConfig}
        areaDataKey="sale"
      />
      <PopularProducts products={popularProducts} />
    </div>
  );
};

export default TopView;
