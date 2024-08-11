import { useState } from "react";
import { Plus } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// custom components
import Upload from "./Upload";
import SelectFromLibrary from "./SelectFromLibrary";
import PreviewSelectedImages from "./SelectFromLibrary/SelectedImages/PreviewSelectedImages";

export interface UploadConfig {
  databaseId: string;
  collectionId: string;
  bucketId: string;
}

const ImageUploader = ({
  handler,
  defaultImages,
  uploadConfig,
}: {
  handler: (imageIds: string[]) => void;
  defaultImages: any[];
  uploadConfig: UploadConfig;
}) => {
  const [currentTab, setCurrentTab] = useState("upload");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImages, setSelectedImages] = useState<any[]>(
    defaultImages || []
  );

  const handleAddImage = () => {
    const ids = selectedImages.flatMap((img) => img.$id);
    handler(ids);
    setOpenDialog(false);
  };

  const handleRemove = (id: string) => {
    const filteredImages = selectedImages.filter((img) => img.$id !== id);
    setSelectedImages(filteredImages);
    const ids = filteredImages.flatMap((img) => img.$id);
    handler(ids);
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger>
          <div className="flex justify-center items-center gap-5 border rounded-md border-dashed p-5">
            <Plus size={18} />
            <p className="text-sm text-blue-500">Add Images</p>
          </div>
        </DialogTrigger>
        <DialogContent className="!max-w-[900px]">
          <Tabs value={currentTab} className="">
            <TabsList className="mx-auto w-full mt-3 mb-2">
              <TabsTrigger
                value="upload"
                onClick={() => setCurrentTab("upload")}
              >
                Upload
              </TabsTrigger>
              <TabsTrigger
                value="library"
                onClick={() => setCurrentTab("library")}
              >
                Select From Library
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <Upload
                uploadConfig={uploadConfig}
                setCurrentTab={setCurrentTab}
              />
            </TabsContent>
            <TabsContent value="library">
              <SelectFromLibrary
                handler={handleAddImage}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                uploadConfig={uploadConfig}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {!openDialog && selectedImages.length > 0 && (
        <PreviewSelectedImages
          selectedImages={selectedImages}
          handleRemove={handleRemove}
          uploadConfig={uploadConfig}
        />
      )}
    </div>
  );
};

export default ImageUploader;
