"use client";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { format as dateFormat } from "date-fns";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import Fancybox from "@/components/Shared/FancyBox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ThumbsUp, SortAsc, Star as StarIcon } from "lucide-react";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#727272",
};

type SortOption = "newest" | "highest" | "lowest" | "helpful";

const RatingBreakdown = ({ reviews }: { reviews: any[] }) => {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const total = reviews.length;
  const avg = total ? reviews.reduce((a, r) => a + r.rating, 0) / total : 0;

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-5 bg-[#fdf8f3] rounded-lg border border-brand_primary/20 mb-8">
      {/* Average Score */}
      <div className="flex flex-col items-center justify-center min-w-[100px]">
        <span className="text-5xl font-bold text-brand_secondary">
          {avg.toFixed(1)}
        </span>
        <ReactRating
          style={{ maxWidth: 90 }}
          value={avg}
          itemStyles={myStyles}
          readOnly
        />
        <span className="text-sm text-brand_gray mt-1">
          {total} {total === 1 ? "review" : "reviews"}
        </span>
      </div>

      {/* Bar Chart */}
      <div className="flex-1 space-y-2">
        {counts.map(({ star, count }) => {
          const pct = total ? (count / total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm w-3 text-right text-brand_gray">
                {star}
              </span>
              <StarIcon
                className="w-3 h-3 flex-shrink-0"
                style={{ fill: "#ffb700", stroke: "#ffb700" }}
              />
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand_primary rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-sm text-brand_gray w-4">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReviewsList = ({ product }: { product: any }) => {
  const [sort, setSort] = useState<SortOption>("newest");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  const sortedReviews = useMemo(() => {
    if (!product?.reviews?.length) return [];
    const reviews = [...product.reviews];
    switch (sort) {
      case "highest":
        return reviews.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return reviews.sort((a, b) => a.rating - b.rating);
      case "helpful":
        return reviews.sort(
          (a, b) => (b.helpful_votes || 0) - (a.helpful_votes || 0)
        );
      default:
        return reviews.sort(
          (a, b) =>
            new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
        );
    }
  }, [product?.reviews, sort]);

  if (!product?.reviews?.length) {
    return (
      <div className="py-6">
        <h5 className="uppercase text-brand_gray font-semibold">
          BE THE FIRST TO REVIEW &ldquo;{product?.name}&rdquo;
        </h5>
      </div>
    );
  }

  return (
    <div>
      {/* Rating Breakdown */}
      <RatingBreakdown reviews={product.reviews} />

      {/* Sort Controls */}
      <div className="flex items-center gap-3 mb-6">
        <SortAsc size={16} className="text-brand_gray" />
        <span className="text-sm text-brand_gray">Sort by:</span>
        <div className="flex gap-2 flex-wrap">
          {(
            [
              { key: "newest", label: "Most Recent" },
              { key: "highest", label: "Highest Rated" },
              { key: "lowest", label: "Lowest Rated" },
              { key: "helpful", label: "Most Helpful" },
            ] as { key: SortOption; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSort(key)}
              className={`text-xs px-3 py-1 rounded-full border transition-all ${
                sort === key
                  ? "bg-brand_secondary text-white border-brand_secondary"
                  : "border-gray-300 text-brand_gray hover:border-brand_primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-7">
        {sortedReviews.map((review: any) => (
          <div
            className="flex gap-5 p-4 rounded-lg border border-gray-100 hover:border-brand_primary/30 transition-all"
            key={review.$id}
          >
            <div className="w-[50px] flex-shrink-0">
              <Image
                src={review?.avatar || "/placeholder.svg"}
                alt={review?.name}
                width={50}
                height={50}
                className="rounded-full w-[50px] h-[50px] object-cover border-2 border-brand_primary/30"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <address className="font-bold not-italic">
                  {review?.name}
                </address>
                {/* Verified Purchase Badge */}
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs flex items-center gap-1 px-2">
                  <CheckCircle2 size={10} />
                  Verified Purchase
                </Badge>
                {review?.$createdAt && (
                  <time className="text-brand_gray text-sm">
                    {dateFormat(review?.$createdAt, "dd MMM yyyy")}
                  </time>
                )}
              </div>

              <ReactRating
                style={{ maxWidth: 80 }}
                value={review?.rating || 0}
                itemStyles={myStyles}
                readOnly
              />

              <p className="text-brand_gray mt-2 text-sm leading-relaxed">
                {review.comment}
              </p>

              {/* Review Images */}
              <Fancybox
                options={{ Carousel: { infinite: false } }}
              >
                <div className="mt-4 flex flex-wrap gap-3">
                  {review?.images?.map(
                    (image: { id: string; url: string }) => (
                      <a
                        key={image?.id}
                        data-fancybox="gallery"
                        href={image?.url}
                      >
                        <Image
                          alt="review"
                          src={image?.url}
                          width={80}
                          height={80}
                          className="w-[80px] h-[80px] rounded-md object-cover border hover:scale-105 transition-all duration-300 cursor-zoom-in"
                        />
                      </a>
                    )
                  )}
                </div>
              </Fancybox>

              {/* Helpful Votes */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() =>
                    setHelpfulVotes((prev) => ({
                      ...prev,
                      [review.$id]: !prev[review.$id],
                    }))
                  }
                  className={`flex items-center gap-1.5 text-xs transition-all ${
                    helpfulVotes[review.$id]
                      ? "text-brand_secondary font-semibold"
                      : "text-brand_gray hover:text-brand_secondary"
                  }`}
                >
                  <ThumbsUp size={13} />
                  {helpfulVotes[review.$id] ? "Helpful!" : "Helpful?"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
