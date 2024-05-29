import React from "react";
import appwriteBlogService from "@/appwrite/appwriteBlogService";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

const page = async () => {
  noStore();

  const posts = await appwriteBlogService.getAllBlog();

  console.log(posts);

  if (!posts) {
    return <div>No Posts found</div>;
  }

  return (
    <div className="w-full  max-w-7xl mx-auto">
      <h1 className="text-xl md:text-2xl mb-5 font-bold text-center">
        All Blog
      </h1>

      <div className="space-y-5">
        {posts?.documents?.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default page;

const PostCard = ({ post }: { post: any }) => {
  return (
    <div>
      <Link
        href={`/dashboard/blog/edit/${post?.slug}`}
        className="hover:underline hover:text-brand_primary transition-all"
      >
        <h4 className="font-bold text-lg">{post?.title}</h4>
      </Link>

      <div
        dangerouslySetInnerHTML={{ __html: post?.content }}
        className="line-clamp-5"
      ></div>
    </div>
  );
};
