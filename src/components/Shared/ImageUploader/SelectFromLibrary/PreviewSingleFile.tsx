import { Dispatch, SetStateAction } from "react";
import { Trash2 } from "lucide-react";

import DeleteImage from "./DeleteImage";
import UpdateImageAltText from "./UpdateImageAltText";
import { UploadConfig } from "..";

const PreviewSingleFile = ({
  image,
  setSelectedImages,
  uploadConfig,
  deletedImage,
}: {
  image: any;
  setSelectedImages: Dispatch<SetStateAction<any[]>>;
  uploadConfig: UploadConfig;
  deletedImage: (id: string) => void;
}) => {
  return (
    <div className="aspect-square mx-auto relative w-full h-full  border rounded-md  overflow-hidden">
      <input
        type="checkbox"
        className="absolute top-2 right-2 z-50"
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedImages((prev) => [...prev, image]);
          } else {
            setSelectedImages((prev) =>
              prev.filter((img) => img.$id !== image.$id)
            );
          }
        }}
      />
      <DeleteImage
        image={image}
        uploadConfig={uploadConfig}
        deletedImage={deletedImage}
      >
        <Trash2
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer z-50"
          size={18}
        />
      </DeleteImage>
      <UpdateImageAltText image={image} uploadConfig={uploadConfig} />
    </div>
  );
};

export default PreviewSingleFile;
