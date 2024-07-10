import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Query } from "appwrite";

import { Button } from "@/components/ui/button";
import PreviewSingleFile from "./PreviewSingleFile";
import Loading from "@/app/dashboard/loading";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import { UploadConfig } from "../index";
import { databases } from "@/appwrite/appwriteConfig";

const SelectFromLibrary = ({
  handler,
  selectedImages,
  setSelectedImages,
  uploadConfig,
}: {
  handler: () => void;
  selectedImages: any[];
  setSelectedImages: Dispatch<SetStateAction<any[]>>;
  uploadConfig: UploadConfig;
}) => {
  const [images, setImages] = useState<null | any[]>(null);
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    // handle loading
    if (!images?.length) {
      setLoading(true);
    } else {
      setLoadMoreLoading(true);
    }

    const QueryArray = [];
    const resultPerPage = 12;

    // Pagination
    if (resultPerPage) {
      QueryArray.push(Query.limit(Number(resultPerPage)));

      const skip = (Number(page) - 1) * Number(resultPerPage);
      if (skip) {
        QueryArray.push(Query.offset(skip));
      }
    }

    // sorting
    QueryArray.push(Query.orderDesc("$createdAt"));

    try {
      const response = await databases.listDocuments(
        uploadConfig.databaseId,
        uploadConfig.collectionId,
        QueryArray
      );

      if (images) {
        setImages([...images, ...response.documents]);
      } else {
        setImages(response.documents);
      }

      setTotal(response.total);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching images!");
    } finally {
      setLoading(false);
      setLoadMoreLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const loadMoreImages = () => {
    setPage((prev) => prev + 1);
  };

  const deletedImage = (id: string) => {
    const filteredImages = images?.filter((img) => img?.$id !== id);
    if (filteredImages) {
      setImages(filteredImages);
      setTotal((prev) => prev - 1);
    }
  };

  if (loading)
    return (
      <div className="min-h-[300px]">
        <Loading />
      </div>
    );

  if (!loading && !images?.length) {
    return (
      <div className="min-h-[300px] flex justify-center items-center">
        <p>No image found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-[300px]">
      <ScrollArea className="h-[500px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
          {images?.map((image) => (
            <PreviewSingleFile
              key={image.$id}
              image={image}
              setSelectedImages={setSelectedImages}
              uploadConfig={uploadConfig}
              deletedImage={deletedImage}
            />
          ))}
        </div>

        {images?.length && images.length < total && (
          <div className="flex justify-center mt-5">
            {loadMoreLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <Button
                disabled={loadMoreLoading}
                variant={"outline"}
                onClick={loadMoreImages}
              >
                Load More
              </Button>
            )}
          </div>
        )}
      </ScrollArea>

      <div className="flex justify-end mt-5">
        <Button disabled={!selectedImages.length} onClick={handler}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default SelectFromLibrary;
