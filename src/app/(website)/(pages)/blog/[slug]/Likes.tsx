"use client";
import appwriteBlogService from "@/appwrite/appwriteBlogService";
import { cn } from "@/lib/utils";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Likes = ({ post }: { post: any }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateBlog } = appwriteBlogService;

  const router = useRouter();

  const handleLike = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const response = await updateBlog({
      id: post?.$id,
      blogData: {
        likes: post?.likes + 1,
      },
    });

    router.refresh();
    console.log(response);

    setIsSubmitting(false);
  };
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp
        size={18}
        onClick={handleLike}
        className={cn(
          "hover:text-brand_primary cursor-pointer",
          isSubmitting && "cursor-not-allowed"
        )}
      />

      {post?.likes}
    </div>
  );
};

export default Likes;
