import appwriteStorageService from "@/appwrite/appwriteStorageService";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Models, Query } from "appwrite";
import PreviewSingleFile from "./PreviewSingleFile";
import { databases } from "@/appwrite/appwriteConfig";
import config from "@/config";
import Loading from "@/app/dashboard/loading";
import { Button } from "@/components/ui/button";

interface Image {
  image_id: string;
  image_url: string;
  alt: string;
}

const SelectFromLibrary = ({
  handler,
}: {
  handler: (imageIds: string[]) => void;
}) => {
  const [images, setImages] = useState<null | any[]>(null);
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  console.log(selectedImages);

  const handleAddImage = () => {
    const ids = selectedImages.flatMap((img) => img.$id);
    handler(ids);
  };

  useEffect(() => {
    setLoading(true);

    databases
      .listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product_image,
        []
      )
      .then((response) => {
        console.log(response);
        setImages(response.documents);
        setTotal(response.total);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loadMoreImages = async () => {
    setLoadMoreLoading(true);

    const QueryArray = [];
    const resultPerPage = 25;

    if (resultPerPage) {
      QueryArray.push(Query.limit(Number(resultPerPage)));

      const skip = (Number(page) - 1) * Number(resultPerPage);
      if (skip) {
        QueryArray.push(Query.offset(skip));
      }
    }

    try {
      const response = await databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product_image,
        []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <ScrollArea className="h-[500px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
          {images?.map((image) => (
            <PreviewSingleFile
              key={image.$id}
              image={image}
              setSelectedImages={setSelectedImages}
            />
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Button variant={"outline"} onClick={loadMoreImages}>
            Load More
          </Button>
        </div>
      </ScrollArea>
      <div className="flex justify-end mt-5">
        <Button onClick={handleAddImage}>Add</Button>
      </div>
    </div>
  );
};

export default SelectFromLibrary;
