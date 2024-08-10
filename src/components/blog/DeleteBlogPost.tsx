"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import appwriteBlogService from "@/appwrite/appwriteBlogService";
import { toast } from "sonner";

const DeleteBlogPost = ({
  children,
  blogId,
}: {
  children: React.ReactNode;
  blogId: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { deleteBlog } = appwriteBlogService;

  const handleDelete = async () => {
    setIsSubmitting(true);

    try {
      const response = await deleteBlog({ blogId });

      toast("Blog post Successfully deleted.");
      setIsSubmitting(false);
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Blog post not deleted.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm to delete blog post?</AlertDialogTitle>
          <AlertDialogDescription>
            Once blog post {blogId} has been deleted, it cannot be restored.
            Confirm to delete?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant={"destructive"} onClick={handleDelete}>
            {isSubmitting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBlogPost;
