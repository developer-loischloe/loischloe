import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { databases } from "@/appwrite/appwriteConfig";
import config from "@/config";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

const formSchema = z.object({
  alt: z.string(),
});

const PreviewSingleFile = ({
  image,
  setSelectedImages,
}: {
  image: any;
  setSelectedImages: Dispatch<SetStateAction<any[]>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alt: image?.alt || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    databases
      .updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId.product_image,
        image.$id,
        {
          alt: values.alt,
        }
      )
      .then((response) => {
        toast.success("Alt text updated successfully.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Alternative Text not updated");
      });
  }

  return (
    <div className="mx-auto relative">
      <input
        type="checkbox"
        className="absolute top-2 right-2"
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

      <Popover>
        <PopoverTrigger>
          <div className="">
            <Image
              src={image?.image_url || ""}
              alt={image?.alt}
              width={120}
              height={120}
              className="w-full border rounded-md cursor-pointer"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="alt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternative Text</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update</Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PreviewSingleFile;
