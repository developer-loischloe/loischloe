import { storage } from "@/appwrite/appwriteConfig";
import { ID } from "appwrite";

export const uploadFiles = (files: any) => {
  let uploadedFiles: { id: string; url: string }[] = [];

  return new Promise((resolve, reject) => {
    // Loop through files
    for (let i = 0; i < files.length; i++) {
      let file = files.item(i);

      storage
        .createFile("660cec200cdb937df8a6", ID.unique(), file)
        .then((res) => {
          const fileUrl = storage.getFilePreview(
            "660cec200cdb937df8a6",
            res.$id
          );

          uploadedFiles.push({
            id: res.$id,
            url: fileUrl.href,
          });
          console.log(fileUrl);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          resolve(uploadedFiles);
        });
    }
  });
};
