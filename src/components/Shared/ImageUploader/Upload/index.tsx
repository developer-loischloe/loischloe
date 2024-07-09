import React, { useCallback, useState } from "react";
import { ID } from "appwrite";
import { Progress } from "@/components/ui/progress";
import { useDropzone } from "react-dropzone";
import { UploadConfig } from "../index";
import { databases, storage } from "@/appwrite/appwriteConfig";
import { toast } from "sonner";

export default function Upload({
  uploadConfig,
}: {
  uploadConfig: UploadConfig;
}) {
  const [totalFile, setTotalFile] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(0);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    setTotalFile(acceptedFiles.length);

    // loop through each file
    acceptedFiles.forEach((file) => {
      // upload image
      storage
        .createFile(uploadConfig.bucketId, ID.unique(), file)
        .then((response) => {
          // get fileURL
          const fileUrl = storage.getFileView(
            uploadConfig.bucketId,
            response.$id
          );

          // create document for image
          databases
            .createDocument(
              uploadConfig.databaseId,
              uploadConfig.collectionId,
              ID.unique(),
              {
                image_id: response.$id,
                image_url: fileUrl.href,
                alt: response.name.split(".")[0],
              }
            )
            .then((response) => {
              setUploadedFile((prev) => prev + 1);
            })
            .catch((error) => {
              console.log(error);
              toast.error("Upload failed!");
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Upload failed!");
        });
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="h-[300px]">
      {totalFile ? (
        <div className="h-full p-10 flex flex-col gap-2 items-center justify-center">
          <p>Upload progress</p>
          <Progress
            value={Math.floor((uploadedFile / totalFile) * 100)}
            className="max-w-[350px]"
          />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className=" h-full border border-dashed rounded-md p-5 flex items-center justify-center"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some images here, or click to select files</p>
        </div>
      )}
    </div>
  );
}
