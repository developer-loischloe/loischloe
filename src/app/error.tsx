"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Ban } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative">
      <Button
        onClick={() => router.back()}
        className="absolute top-10 left-10 flex items-center gap-5 bg-brand_secondary hover:bg-brand_primary hover:text-brand_secondary transition-all"
      >
        <ArrowLeft size={18} />
        <span>Go Back</span>
      </Button>
      <div className="flex flex-col justify-center items-center gap-10 w-full min-h-screen ">
        <div>
          <Ban size={50} className="text-red-500" />
        </div>
        <h1 className="text-red-500 text-2xl font-medium text-center">
          {error?.message}
        </h1>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
