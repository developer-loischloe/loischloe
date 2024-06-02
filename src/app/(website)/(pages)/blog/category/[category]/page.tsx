import appwriteBlogService from "@/appwrite/appwriteBlogService";
import Offer from "@/components/Home/Offer";
import BlogCard from "@/components/blog/BlogCard";
import React from "react";

const page = async ({
  params: { category },
}: {
  params: { category: string };
}) => {
  console.log(category);

  const { getBlogByCategory } = appwriteBlogService;

  const posts = await getBlogByCategory(category);
  // console.log(posts);

  return (
    <>
      <div className="pt-5">
        <h1 className="heading-1 text-center">
          Result for category "{category}"
        </h1>
      </div>

      {posts.total === 0 && (
        <div className="py-5 h-[10rem]">
          <p className="text-center">No posts found!</p>
        </div>
      )}

      {/* Featured posts */}
      {posts.total > 0 && (
        <section className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {posts?.documents?.map((post, index) => (
              <BlogCard
                key={post.$id}
                post={post}
                featuredImagePriority={index < 3}
              />
            ))}
          </div>
        </section>
      )}

      <Offer />
    </>
  );
};

export default page;
