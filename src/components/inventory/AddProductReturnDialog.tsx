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
import AddProductReturnForm from "./AddProductReturnForm";

export function AddProductReturnDialog({
  children,
  heading,
  storeId,
  productId,
  productName,
  inventoryId,
  availableQuantity,
}: {
  children?: ReactNode;
  heading: string;
  storeId: string;
  productId: string;
  productName: string;
  inventoryId: string;
  availableQuantity: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          <div className="mx-auto max-w-max cursor-pointer">{children}</div>
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
          <AddProductReturnForm
            storeId={storeId}
            productId={productId}
            productName={productName}
            inventoryId={inventoryId}
            availableQuantity={availableQuantity}
          />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
