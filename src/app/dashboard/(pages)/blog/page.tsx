import appwriteBlogService from "@/appwrite/appwriteBlogService";
import Link from "next/link";
import React from "react";

const page = async () => {
  const posts = await appwriteBlogService.getAllBlog();

  console.log(posts);

  return (
    <div>
      <h1>All Blog</h1>

      <div>
        {posts.documents.map((post) => (
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
        href={`/dashboard/blog/edit/${post?.$id}`}
        className="hover:underline hover:text-brand_primary transition-all"
      >
        <h4>{post?.title}</h4>
      </Link>
    </div>
  );
};
