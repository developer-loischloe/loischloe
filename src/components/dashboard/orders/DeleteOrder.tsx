"use client";
import appwriteOrderService from "@/appwrite/appwriteOrderService";
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
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteOrder = ({
  children,
  orderId,
}: {
  children: React.ReactNode;
  orderId: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { deleteOrder } = appwriteOrderService;

  const handleDelete = async () => {
    setIsSubmitting(true);

    const response = await deleteOrder({ orderId });
    setIsSubmitting(false);
    router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm to delete order?</AlertDialogTitle>
          <AlertDialogDescription>
            Once order {orderId} has been deleted, it cannot be restored.
            Confirm to delete?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete}>
            {isSubmitting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteOrder;
