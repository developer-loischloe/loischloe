import React from "react";
import appwriteBlogService from "@/appwrite/appwriteBlogService";
import EditBlogForm from "@/components/blog/EditBlogForm";
import { unstable_noStore as noStore } from "next/cache";

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  noStore();

  const post = await appwriteBlogService.getBlogBySlug(slug);
  console.log({ SinglePost: post });

  if (!post) {
    return <div>No Post found</div>;
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

export const dynamic = "force-dynamic";
export const revalidate = 0;
