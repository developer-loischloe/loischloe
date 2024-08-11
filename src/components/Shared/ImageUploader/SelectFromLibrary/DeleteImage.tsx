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
import { toast } from "sonner";
import { UploadConfig } from "..";
import { databases, storage } from "@/appwrite/appwriteConfig";

const DeleteImage = ({
  children,
  image,
  uploadConfig,
  deletedImage,
}: {
  children: React.ReactNode;
  image: any;
  uploadConfig: UploadConfig;
  deletedImage: (id: string) => void;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);

    // delete document
    databases
      .deleteDocument(
        uploadConfig.databaseId,
        uploadConfig.collectionId,
        image?.$id
      )
      .then((response) => {
        // delete file from bucket
        storage
          .deleteFile(uploadConfig.bucketId, image?.image_id)
          .then((response) => {
            setIsSubmitting(false);
            setOpenDialog(false);
            deletedImage(image?.$id);
            toast.success("Image Successfully deleted.");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Image not deleted!");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Image not deleted!");
      });
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm to delete image?</AlertDialogTitle>
          <AlertDialogDescription>
            Once this image has been deleted, it cannot be restored. Confirm to
            delete?
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

export default DeleteImage;
