import { storage } from "@/appwrite/appwriteConfig";
import { ID } from "appwrite";

export const uploadFiles = (files: any, bucketId: string) => {
  let filePromises: any[] = [];

  return new Promise((resolve, reject) => {
    // Loop through files
    for (let i = 0; i < files.length; i++) {
      let file = files.item(i);

      const filePromise = storage.createFile(bucketId, ID.unique(), file);

      filePromises.push(filePromise);
    }

    Promise.all(filePromises).then((files) => {
      let uploadedFiles: { id: string; url: string }[] = [];

      files.map((file) => {
        const fileUrl = storage.getFileView(bucketId, file.$id);

        uploadedFiles.push({
          id: file.$id,
          url: fileUrl.href,
        });
      });

      resolve(uploadedFiles);
    });
  });
};
