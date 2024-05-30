import appwriteBlogService from "@/appwrite/appwriteBlogService";
import React from "react";
import BlogCard from "./BlogCard";

const RelatedBlogPost = async ({
  categories,
  currentBlogId,
}: {
  categories: string[];
  currentBlogId: string;
}) => {
  console.log(categories);

  const posts = await appwriteBlogService.getBlogByCategories(categories);
  console.log({ posts: posts.length });

  const filteredPosts = posts
    .filter((post) => post.$id !== currentBlogId)
    .slice(0, 6);
  console.log({ filteredPosts: filteredPosts.length });

  return (
    <section className="space-y-10">
      <h2 className="heading-1 text-center">Related post</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {filteredPosts?.map((post) => (
          <BlogCard post={post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogPost;
