import React from "react";
import BlogCard from "./BlogCard";
import appwriteBlogService from "@/appwrite/appwriteBlogService";

const RelatedBlogPost = async ({
  categories,
  currentBlogId,
}: {
  categories: string[];
  currentBlogId: string;
}) => {
  const posts = await appwriteBlogService.getBlogByCategories(categories);

  const filteredPosts = posts.documents
    .filter((post) => post.$id !== currentBlogId)
    .slice(0, 6);

  if (filteredPosts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center">
        Related post
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {filteredPosts?.map((post) => (
          <BlogCard key={post?.$id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogPost;
