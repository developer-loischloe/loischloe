import appwriteStorageService from "@/appwrite/appwriteStorageService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Models } from "appwrite";
import Image from "next/image";
import { useEffect, useState } from "react";
import SelectFromLibrary from "./SelectFromLibrary";
import Upload from "./Upload";

const ImageUploader = ({
  handler,
}: {
  handler: (imageIds: string[]) => void;
}) => {
  return (
    <div className="">
      <Dialog>
        <DialogTrigger>Add images</DialogTrigger>
        <DialogContent className="!max-w-[700px]">
          <Tabs defaultValue="upload" className="">
            <TabsList className="mx-auto w-full mt-3 mb-2">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="library">Select From Library</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <Upload />
            </TabsContent>
            <TabsContent value="library">
              <SelectFromLibrary handler={handler} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUploader;
