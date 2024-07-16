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
  areaDataKey,
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
  areaDataKey: string;
}) {
  return (
    <Card>
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
              left: 10,
              right: 10,
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
              cursor={true}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Area
              dataKey={areaDataKey}
              type="natural"
              fill={`var(--color-${areaDataKey})`}
              fillOpacity={0.4}
              stroke={`var(--color-${areaDataKey})`}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
