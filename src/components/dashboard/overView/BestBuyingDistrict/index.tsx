import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const BestBuyingDistrict = ({
  loading,
  error,
  response,
}: {
  loading: boolean;
  error: string;
  response: any;
}) => {
  if (loading) {
    return (
      <div className="w-full min-h-[250px] h-full">
        <Skeleton className="w-full h-full bg-black/10" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Top District for Product Purchases
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] lg:h-[500px]">
            {response?.bestBuyingDistrict?.map((district: any) => (
              <div
                key={district[0]}
                className="flex justify-between text-sm gap-5  mb-5"
              >
                <div>
                  <p>{district[0]}</p>
                  <p className="text-brand_gray text-xs">
                    Total Sale:{" "}
                    <span className="text-green-500">{district[1]}</span>
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default BestBuyingDistrict;
