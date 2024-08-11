import React, { Suspense } from "react";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { PencilLine, Trash2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DeleteBlogCategory from "@/components/blog/DeleteBlogCategory";
import appwriteBlogService from "@/appwrite/appwriteBlogService";
import { EditBlogCategoryDialog } from "@/components/blog/EditBlogCategoryDialog";
import { CreateNewCategoryDialog } from "@/components/blog/CreateNewCategoryDialog";
import { Button } from "@/components/ui/button";
import LoadingSpiner from "@/components/Shared/loading/LoadingSpiner";

// Metadata
export const metadata: Metadata = {
  title: "Blog Categories",
};

const page = () => {
  noStore();

  return (
    <Suspense
      fallback={<LoadingSpiner />}
      key={(Math.random() * 1000 + Math.random() * 100).toString()}
    >
      <AllCategories />
    </Suspense>
  );
};

export default page;

const AllCategories = async () => {
  const response = await appwriteBlogService.getAllBlogCategories();

  return (
    <div className="w-full max-w-5xl mx-auto ">
      <CreateNewCategoryDialog>
        <div className="mb-5">
          <Button>Create</Button>
        </div>
      </CreateNewCategoryDialog>
      {response.total === 0 ? (
        <div className="w-full  max-w-7xl mx-auto flex justify-center flex-col items-center gap-5 py-5">
          <h2 className="text-center">No category found</h2>
        </div>
      ) : (
        <ScrollArea className="w-full">
          <Table className="bg-white rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Blog Category</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {response?.documents?.map((category) => (
                <TableRow key={category?.$id}>
                  <TableCell className="font-medium">
                    <h3 className="text-lg text-center">{category?.name}</h3>
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <div className="flex gap-5">
                      <EditBlogCategoryDialog
                        name={category?.name}
                        id={category?.$id}
                      >
                        <PencilLine
                          size={20}
                          className="text-green-500 cursor-pointer"
                        />
                      </EditBlogCategoryDialog>

                      <DeleteBlogCategory categoryId={category?.$id}>
                        <Trash2
                          size={20}
                          className="text-red-500 cursor-pointer"
                        />
                      </DeleteBlogCategory>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};
