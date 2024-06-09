import React from "react";
import appwriteBlogService from "@/appwrite/appwriteBlogService";

import Offer from "@/components/Home/Offer";
import BlogCard from "@/components/blog/BlogCard";
import { PaginationComponent } from "@/components/Shared/Pagination/PaginationComponent";

const page = async ({
  searchParams: { page = "1", resultPerPage = "10" },
}: {
  searchParams: { page: string; resultPerPage: string };
}) => {
  const featuredPosts = await appwriteBlogService.getFeaturedBlog();
  const recentPosts = await appwriteBlogService.getRecentBlog({
    page,
    resultPerPage,
  });

  return (
    <>
      {/* Featured posts */}
      {featuredPosts.total > 0 && (
        <section className="space-y-10">
          <h1 className="heading-1 text-center">Featured Blogs</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {featuredPosts?.documents?.map((post, index) => (
              <BlogCard
                key={post.$id}
                post={post}
                featuredImagePriority={index < 3}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.total > 0 && (
        <>
          <section className="space-y-10">
            <h2 className="heading-1 text-center">Recent Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {recentPosts?.documents?.map((post) => (
                <BlogCard key={post.$id} post={post} />
              ))}
            </div>
          </section>

          <br />
          {/* Pagination */}
          <PaginationComponent
            currentPageNumber={Number(page)}
            resultPerPage={Number(resultPerPage)}
            totalItems={recentPosts.total}
            basePath={"/blog"}
          />
        </>
      )}

      <Offer />
    </>
  );
};

export default page;
