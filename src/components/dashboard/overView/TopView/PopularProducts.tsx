import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";

const PopularProducts = ({ products }: { products: any[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Popular products</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] lg:h-[500px]">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex justify-between text-sm gap-5  mb-5"
            >
              <div>
                <p>{product.name}</p>
                <p className="text-brand_gray text-xs">
                  Sale: <span className="text-green-500">{product.count}</span>
                </p>
              </div>

              <p>{formatCurrency(product.price)}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PopularProducts;
