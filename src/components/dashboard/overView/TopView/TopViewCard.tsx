"use client";

import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export default function TopViewCard({
  icon,
  cardTitle,
  cardValue,
  progress,
  chartData,
  chartConfig,
}: {
  icon: React.ReactNode;
  cardTitle: string;
  cardValue: string;
  progress: {
    value: string;
    increment: boolean;
  };
  chartData: any[];
  chartConfig: ChartConfig;
}) {
  return (
    <Card className="md:last:col-span-full lg:last:col-span-1">
      <CardHeader>
        <div
          className={cn(
            "flex justify-between",
            progress.increment ? "text-green-500" : "text-red-500"
          )}
        >
          <div>{icon}</div>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {progress.increment ? "+" : "-"}
              {progress.value}%
            </span>
            <span>
              {progress.increment ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
            </span>
          </div>
        </div>
        <div>
          <p className="text-xl">{cardValue}</p>
          <p className="text-sm">{cardTitle}</p>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
