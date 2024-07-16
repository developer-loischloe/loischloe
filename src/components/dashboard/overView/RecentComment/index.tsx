"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format as dateFormat } from "date-fns";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import Fancybox from "@/components/Shared/FancyBox";
import appwriteReviewService from "@/appwrite/appwriteReviewService";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import LoadingSpiner from "@/components/Shared/loading/LoadingSpiner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#727272",
};

const RecentComment = () => {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<any[]>([]);
  const [totalReview, setTotalReview] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // constant
  const RESULT_PER_PAGE = 12;
  const TOTAL_PAGE = Math.ceil(totalReview / RESULT_PER_PAGE);

  // Utility function
  const fetchReview = () => {
    setLoading(true);

    appwriteReviewService
      .getAllReview({
        page,
        resultPerPage: RESULT_PER_PAGE,
      })
      .then((response) => {
        setReviews(response.documents);
        setTotalReview(response.total);
        setError("");
      })
      .catch((error: any) => {
        console.log(error);

        setReviews([]);
        setTotalReview(0);
        setError(error.message || "Failed to fetch reviews.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReview();
  }, [page]);

  const handleDelete = async (id: string) => {
    try {
      await appwriteReviewService.deleteReview(id);
      toast.success("Review deleted successfully.");
      fetchReview();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Review not deleted.");
    }
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Recent Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-7">
        <ScrollArea className="h-[450px]">
          {loading && <LoadingSpiner />}
          {!loading && error && (
            <div>
              <p>{error}</p>
            </div>
          )}
          {reviews?.length > 0 &&
            reviews?.map((review: any) => (
              <div className="group flex gap-5 text-sm" key={review.$id}>
                <div className="w-[40px]">
                  <Image
                    src={review?.avatar}
                    alt={review?.name}
                    width={100}
                    height={100}
                    className="rounded-sm w-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex gap-2">
                    <address className="font-bold">{review?.name}</address>
                    {review?.$createdAt && (
                      <time className="text-brand_gray">
                        <span className="text-brand_primary"> {"-"}</span>{" "}
                        {dateFormat(review?.$createdAt, "dd-MM-yyyy")}
                      </time>
                    )}
                  </div>
                  <p className="text-brand_gray">{review.comment}</p>
                  <ReactRating
                    style={{ maxWidth: 80 }}
                    value={review?.rating || 0}
                    itemStyles={myStyles}
                    readOnly
                  />

                  <Fancybox
                    options={{
                      Carousel: {
                        infinite: false,
                      },
                    }}
                  >
                    <div className="mt-5 flex flex-wrap gap-8">
                      {review?.images?.map(
                        (image: { id: string; url: string }) => (
                          <div key={image?.id} className="mb-5">
                            <a
                              key={image?.id}
                              data-fancybox="gallery"
                              href={image?.url}
                            >
                              <Image
                                alt={"review"}
                                src={image?.url}
                                width={100}
                                height={100}
                                className="w-full h-full rounded  hover:scale-105 transition-all duration-300"
                              />
                            </a>
                          </div>
                        )
                      )}
                    </div>
                  </Fancybox>
                </div>

                <div className="px-5">
                  <Trash2
                    size={18}
                    className="text-red-500 invisible group-hover:visible cursor-pointer transition-all"
                    onClick={() => handleDelete(review.$id)}
                  />
                </div>
              </div>
            ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        {totalReview > 0 && (
          <Pagination className="bg-black/5 rounded-md">
            <PaginationContent className="gap-20">
              <PaginationItem>
                <PaginationPrevious
                  className={cn("cursor-pointer", {
                    invisible: page <= 1,
                  })}
                  onClick={() => {
                    if (page > 1) {
                      setPage((prev) => prev - 1);
                    }
                  }}
                />
              </PaginationItem>
              <div className="text-brand_primary">{page}</div>

              <PaginationItem>
                <PaginationNext
                  className={cn("cursor-pointer", {
                    invisible: page === TOTAL_PAGE,
                  })}
                  onClick={() => {
                    if (page < totalReview) {
                      setPage((prev) => prev + 1);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardFooter>
    </Card>
  );
};

export default RecentComment;
