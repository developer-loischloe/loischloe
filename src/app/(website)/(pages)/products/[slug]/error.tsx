"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center gap-5 py-20 text-center px-4">
      <Ban size={44} className="text-red-500" />
      <h1 className="text-2xl font-medium">
        We couldn&apos;t load this product.
      </h1>
      <p className="text-sm text-brand_gray max-w-md">
        Something went wrong while fetching the product details. Please try
        again or browse our other products.
      </p>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Link href="/products">
          <Button variant="outline">Browse products</Button>
        </Link>
      </div>
    </div>
  );
}
