"use client";
import React, { useEffect } from "react";
import { Eye } from "lucide-react";
import appwriteBlogService from "@/appwrite/appwriteBlogService";

const Views = ({ post }: { post: any }) => {
  const { updateBlog } = appwriteBlogService;

  useEffect(() => {
    updateBlog({
      id: post?.$id,
      blogData: {
        views: post?.views + 1,
      },
    }).then((response) => {
      //   console.log(response);
    });
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Eye size={18} />

      {post?.views}
    </div>
  );
};

export default Views;
