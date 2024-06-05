import React, { Suspense } from "react";
import Link from "next/link";
import { Eye, PencilLine, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationComponent } from "@/components/Shared/Pagination/PaginationComponent";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import DeleteBlogPost from "@/components/blog/DeleteBlogPost";
import ResultPerPage from "@/components/dashboard/orders/ResultPerPage";
import { Button } from "@/components/ui/button";
import Loading from "../../loading";

import appwriteBlogService from "@/appwrite/appwriteBlogService";

const BlogPage = ({
  searchParams: { page = "1", resultPerPage = "10" },
}: {
  searchParams: { page: string; resultPerPage: string };
}) => {
  return (
    <div className="w-full  max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl mb-5 font-bold text-center">
        All Blog Post
      </h1>

      <br />

      {/* Top */}
      <div className="w-full flex justify-between items-center mb-5">
        <div>
          <Link href={`/dashboard/blog/add`}>
            <Button>New Blog</Button>
          </Link>
        </div>
        <ResultPerPage
          basePath={"/dashboard/blog"}
          resultPerPage={resultPerPage}
          extraSearchParams={{
            page,
          }}
        />
      </div>

      {/* Blog List */}
      <Suspense
        fallback={<Loading />}
        key={(Math.random() * 1000 + Math.random() * 100).toString()}
      >
        <BlogList page={page} resultPerPage={resultPerPage} />
      </Suspense>
    </div>
  );
};

export default BlogPage;

const BlogList = async ({
  page,
  resultPerPage,
}: {
  page: string;
  resultPerPage: string;
}) => {
  const posts = await appwriteBlogService.getAllBlog({ page, resultPerPage });

  if (posts.total === 0) {
    return (
      <div className="w-full  max-w-7xl mx-auto flex justify-center flex-col items-center gap-5 py-5">
        <h2 className="text-center">No Posts found</h2>
      </div>
    );
  }

  return (
    <div>
      <ScrollArea className="w-full">
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="">Blog post</TableHead>

              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.documents?.map((post) => (
              <TableRow key={post?.$id}>
                <TableCell className="font-medium">
                  <h3 className="font-bold text-lg mb-3 line-clamp-2">
                    {post?.title}
                  </h3>
                </TableCell>
                <TableCell className="flex justify-center">
                  <div className="flex flex-col md:flex-row gap-5">
                    <Link href={`/blog/${post?.slug}`}>
                      <Eye size={20} className="text-blue-500 cursor-pointer" />
                    </Link>

                    <Link href={`/dashboard/blog/edit/${post?.slug}`}>
                      <PencilLine
                        size={20}
                        className="text-green-500 cursor-pointer"
                      />
                    </Link>

                    <DeleteBlogPost blogId={post?.$id}>
                      <Trash2
                        size={20}
                        className="text-red-500 cursor-pointer"
                      />
                    </DeleteBlogPost>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <br />
      {/* Pagination */}
      <PaginationComponent
        currentPageNumber={Number(page)}
        resultPerPage={Number(resultPerPage)}
        totalItems={posts?.total}
        basePath={"/dashboard/blog"}
      />
    </div>
  );
};
