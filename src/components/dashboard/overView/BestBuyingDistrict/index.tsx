import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const BestBuyingState = ({ bestBuyingStates }: { bestBuyingStates: any[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Top State for Product Purchases
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] lg:h-[500px]">
          {bestBuyingStates?.map((state: any) => (
            <div
              key={state[0]}
              className="flex justify-between text-sm gap-5  mb-5"
            >
              <div>
                <p>{state[0]}</p>
                <p className="text-brand_gray text-xs">
                  Total Sale: <span className="text-green-500">{state[1]}</span>
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BestBuyingState;
