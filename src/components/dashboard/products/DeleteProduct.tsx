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
import appwriteProductService from "@/appwrite/appwriteProductService";
import { toast } from "sonner";

const DeleteProduct = ({
  children,
  productId,
}: {
  children: React.ReactNode;
  productId: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { deleteProduct } = appwriteProductService;

  const handleDelete = async () => {
    setIsSubmitting(true);

    try {
      const response = await deleteProduct({ productId });

      setIsSubmitting(false);
      toast.success("Product successfully deleted.");
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Product not delete.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm to delete product?</AlertDialogTitle>
          <AlertDialogDescription>
            Once product {productId} has been deleted, it cannot be restored.
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

export default DeleteProduct;
