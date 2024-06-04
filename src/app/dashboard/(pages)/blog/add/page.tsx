import React from "react";
import AddBlogForm from "@/components/blog/AddBlogForm";

const page = () => {
  return (
    <div className="w-full  max-w-7xl mx-auto">
      <h1 className="text-xl md:text-2xl mb-5 font-bold text-center">
        Add a new blog post
      </h1>

      <div className="">
        <AddBlogForm />
      </div>
    </div>
  );
};

export default page;
