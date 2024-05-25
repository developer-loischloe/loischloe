import { storage } from "@/appwrite/appwriteConfig";
import { ID } from "appwrite";

interface File {
  id: string;
  url: string;
}

export const uploadFiles = (files: any, bucketId: string): Promise<File[]> => {
  let filePromises: any[] = [];

  return new Promise((resolve, reject) => {
    // Loop through files
    for (let i = 0; i < files.length; i++) {
      let file = files.item(i);

      const filePromise = storage.createFile(bucketId, ID.unique(), file);

      filePromises.push(filePromise);
    }

    Promise.all(filePromises).then((files) => {
      let uploadedFiles: File[] = [];

      try {
        files.map((file) => {
          const fileUrl = storage.getFileView(bucketId, file.$id);

          uploadedFiles.push({
            id: file.$id,
            url: fileUrl.href,
          });
        });

        resolve(uploadedFiles);
      } catch (error) {
        reject("Upload failed");
      }
    });
  });
};
