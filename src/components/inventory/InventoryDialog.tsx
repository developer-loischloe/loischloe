"use client";
import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import InventoryForm from "./InventoryForm";

export function InventoryDialog({
  children,
  heading,
  type,
  existingProduct,
  id,
  data,
  retailShopTotalQuantity,
}: {
  children?: ReactNode;
  heading: string;
  type: "create" | "update";
  existingProduct: string[];
  id?: string;
  data?: any;
  retailShopTotalQuantity: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          <div className="ml-auto max-w-max">{children}</div>
        ) : (
          <span className="text-xs hover:underline text-blue-500 cursor-pointer">
            {heading}
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <InventoryForm
            type={type}
            id={id}
            data={data}
            existingProduct={existingProduct}
            retailShopTotalQuantity={retailShopTotalQuantity}
          />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
