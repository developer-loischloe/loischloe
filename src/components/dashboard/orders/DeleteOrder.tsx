"use client";
import { useRouter } from "next/navigation";
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
import appwriteOrderService from "@/appwrite/appwriteOrderService";
import { toast } from "sonner";

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

    try {
      const response = await deleteOrder({ orderId });

      setIsSubmitting(false);
      toast.success("Order successfully deleted.");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.success("Order not delete.");
    }
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
          <Button variant={"destructive"} onClick={handleDelete}>
            {isSubmitting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteOrder;
