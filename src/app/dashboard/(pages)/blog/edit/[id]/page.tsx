import appwriteBlogService from "@/appwrite/appwriteBlogService";
import EditBlogForm from "@/components/blog/EditBlogForm";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);

  const post = await appwriteBlogService.getAllBlogById(id);

  console.log(post);
  return (
    <div>
      <EditBlogForm post={post} />
    </div>
  );
};

export default page;
