"use client";
import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ShopForm from "./ShopForm";

export function ShopDialog({
  children,
  heading,
  type,
  id,
  data,
}: {
  children?: ReactNode;
  heading: string;
  type: "create" | "update";
  id?: string;
  data?: any;
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
        <ShopForm type={type} id={id} data={data} />
      </DialogContent>
    </Dialog>
  );
}
