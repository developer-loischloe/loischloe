import React from "react";
import appwriteBlogService from "@/appwrite/appwriteBlogService";
import EditBlogForm from "@/components/blog/EditBlogForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await appwriteBlogService.getBlogBySlug(slug);

  if (!post) {
    return (
      <div className="w-full  max-w-7xl mx-auto flex justify-center flex-col items-center gap-5 py-5">
        <h2 className="text-center">No Posts found</h2>
        <Link href={"/dashboard/blog/add"}>
          <Button>Add new post</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full  max-w-7xl mx-auto">
      <h1 className="text-xl md:text-2xl mb-5 font-bold text-center">
        Edit blog post
      </h1>

      <div className="">
        <EditBlogForm post={post} />
      </div>
    </div>
  );
};

export default page;
