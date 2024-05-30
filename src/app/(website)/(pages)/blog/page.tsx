import React from "react";
import appwriteBlogService from "@/appwrite/appwriteBlogService";
import Image from "next/image";
import { formatDate } from "date-fns";
import Link from "next/link";
import Offer from "@/components/Home/Offer";
import BlogCard from "@/components/blog/BlogCard";

const page = async () => {
  const posts = await appwriteBlogService.getAllBlog();

  console.log(posts);

  return (
    <>
      <section className="space-y-10">
        <h1 className="heading-1 text-center">Most popular posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {posts?.documents?.map((post, index) => (
            <BlogCard post={post} featuredImagePriority={index < 3} />
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <h2 className="heading-1 text-center"> Recent & updated posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {posts?.documents?.map((post) => (
            <BlogCard post={post} />
          ))}
        </div>
      </section>

      <Offer />
    </>
  );
};

export default page;
