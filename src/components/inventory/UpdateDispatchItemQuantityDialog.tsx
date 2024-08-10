"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import UpdateDispatchItemQuantityForm from "./UpdateDispatchItemQuantityForm";

export function UpdateDispatchItemQuantityDialog({
  children,
  heading,
  id,
  quantity,
  shop,
  availableQuantity,
}: {
  children?: ReactNode;
  heading: string;
  id: string;
  quantity: number;
  shop?: any;
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
          {shop && (
            <Link
              href={`/dashboard/retail/${shop?.$id}`}
              className="hover:underline text-blue-500 text-sm flex items-center gap-1"
            >
              <ArrowUpRight size={16} />
              <span>Visit Shop({shop?.shop_name})</span>
            </Link>
          )}
          <UpdateDispatchItemQuantityForm
            id={id}
            quantity={quantity}
            availableQuantity={availableQuantity}
          />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
