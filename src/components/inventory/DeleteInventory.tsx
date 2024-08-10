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

const DeleteInventory = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { deleteInventory } = appwriteInventoryService;

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);

      const response = await deleteInventory({ id });

      toast.success("Inventory item successfully deleted.");
      setIsSubmitting(false);
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Inventory item not delete.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm to delete Inventory Item?</AlertDialogTitle>
          <AlertDialogDescription>
            Once Inventory Item {id} has been deleted, it cannot be restored.
            Confirm to delete?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteInventory;
