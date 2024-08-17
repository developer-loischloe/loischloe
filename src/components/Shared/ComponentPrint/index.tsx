"use client";

import "./style.css";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import { cn } from "@/lib/utils";

const ComponentPrint = ({
  children,
  documentTitle,
  settings = {
    hidePrintAbleComponent: true,
  },
}: {
  children: React.ReactNode;
  documentTitle: string;
  settings?: {
    hidePrintAbleComponent: boolean;
  };
}) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: documentTitle,
    content: () => componentRef.current,
  });

  return (
    <div>
      <Button size={"sm"} variant={"outline"} onClick={handlePrint}>
        Print
      </Button>
      <div
        className={cn({
          "h-0 overflow-hidden": settings.hidePrintAbleComponent,
        })}
      >
        <div ref={componentRef} className="">
          {children}
        </div>
      </div>
      <br />
    </div>
  );
};

export default ComponentPrint;
