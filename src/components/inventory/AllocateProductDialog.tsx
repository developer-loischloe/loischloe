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
import AllocateProductForm from "./AllocateProductForm";

export function AllocateProductDialog({
  children,
  heading,
}: {
  children?: ReactNode;
  heading: string;
}) {
  const [open, setOpen] = useState(false);

  // utility fn
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          <div className="max-w-max">{children}</div>
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
          <AllocateProductForm closeDialog={closeDialog} />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
