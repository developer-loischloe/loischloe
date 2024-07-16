"use client";

import { useState } from "react";
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
import appwriteReviewService from "@/appwrite/appwriteReviewService";
import { toast } from "sonner";

const DeleteReview = ({
  children,
  reviewId,
  fetchReview,
}: {
  children: React.ReactNode;
  reviewId: string;
  fetchReview: () => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Delete Review
  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await appwriteReviewService.deleteReview(reviewId);
      toast.success("Review deleted successfully.");
      fetchReview();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Review not deleted.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm to delete review?</AlertDialogTitle>
          <AlertDialogDescription>
            Once review {reviewId} has been deleted, it cannot be restored.
            Confirm to delete?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteReview;
