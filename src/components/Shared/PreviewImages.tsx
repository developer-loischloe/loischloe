import { getFileToUrl } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const PreviewImages = ({ images }: { images: File[] }) => {
  const [previewImageUrls, setPreviewImageUrls] = useState<any>(null);

  useEffect(() => {
    if (images) {
      const urlPromise = [];
      for (const img of images) {
        urlPromise.push(getFileToUrl(img));
      }

      Promise.all(urlPromise).then((res) => {
        setPreviewImageUrls(res);
      });
    }
  }, [images]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {previewImageUrls &&
        previewImageUrls.map((url: any) => (
          <img
            key={url}
            src={url}
            alt="preview"
            width={300}
            height={350}
            className="w-full max-w-3xl rounded-md"
          />
        ))}
    </div>
  );
};

export default PreviewImages;
