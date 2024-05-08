"use client";
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
import { deleteOrderServerAction } from "@/lib/serverAction/dashboard/orderAction";
import { useRouter } from "next/navigation";

const DeleteOrder = ({
  children,
  orderId,
}: {
  children: React.ReactNode;
  orderId: string;
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await deleteOrderServerAction({ orderId });
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
          <Button onClick={handleDelete}>Delete</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteOrder;
