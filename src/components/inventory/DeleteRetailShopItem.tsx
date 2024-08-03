"use client";
import { useState } from "react";
import { toast } from "sonner";
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

import appwriteInventoryService from "@/appwrite/appwriteInventoryService";

const DeleteRetailShopItem = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { deleteRetailShopItem } = appwriteInventoryService;

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);

      const response = await deleteRetailShopItem({ id });

      toast.success("Item Successfully deleted.");
      setIsSubmitting(false);
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Item not delete.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm to delete Item?</AlertDialogTitle>
          <AlertDialogDescription>
            Once Item {id} has been deleted, it cannot be restored. Confirm to
            delete?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} disabled={isSubmitting}>
            {isSubmitting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRetailShopItem;
