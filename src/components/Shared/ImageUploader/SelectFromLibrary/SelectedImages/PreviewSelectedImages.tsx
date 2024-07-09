import { UploadConfig } from "../..";
import PreviewSingleSelectedImage from "./PreviewSingleSelectedImage";

const PreviewSelectedImages = ({
  selectedImages,
  handleRemove,
  uploadConfig,
}: {
  selectedImages: any[];
  handleRemove: (id: string) => void;
  uploadConfig: UploadConfig;
}) => {
  return (
    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
      {selectedImages.map((image) => (
        <PreviewSingleSelectedImage
          key={image.$id}
          image={image}
          handleRemove={handleRemove}
          uploadConfig={uploadConfig}
        />
      ))}
    </div>
  );
};

export default PreviewSelectedImages;
