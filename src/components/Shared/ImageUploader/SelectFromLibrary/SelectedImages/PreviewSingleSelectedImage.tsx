import { X } from "lucide-react";
import { UploadConfig } from "../..";
import UpdateImageAltText from "../UpdateImageAltText";

const PreviewSingleSelectedImage = ({
  image,
  handleRemove,
  uploadConfig,
}: {
  image: any;
  handleRemove: (id: string) => void;
  uploadConfig: UploadConfig;
}) => {
  return (
    <div className="relative group border rounded-md  overflow-hidden">
      <X
        className="absolute right-2 top-2 invisible group-hover:visible cursor-pointer"
        onClick={() => handleRemove(image.$id)}
      />

      <UpdateImageAltText image={image} uploadConfig={uploadConfig} />
    </div>
  );
};

export default PreviewSingleSelectedImage;
