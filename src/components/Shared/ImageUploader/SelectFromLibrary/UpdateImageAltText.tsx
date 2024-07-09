import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { databases } from "@/appwrite/appwriteConfig";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadConfig } from "..";

const formSchema = z.object({
  alt: z.string(),
});

const UpdateImageAltText = ({
  image,
  uploadConfig,
}: {
  image: any;
  uploadConfig: UploadConfig;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alt: image?.alt || "",
    },
  });

  const { isSubmitting } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    databases
      .updateDocument(
        uploadConfig.databaseId,
        uploadConfig.collectionId,
        image.$id,
        {
          alt: values.alt,
        }
      )
      .then((response) => {
        if (response) {
          setOpen(false);
          toast.success("Alt text updated successfully.");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Alternative Text not updated");
      });
  }

  const handleSubmitWithoutPropagation = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)(e);
  };
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full h-full">
          <Image
            src={image?.image_url || ""}
            alt={image?.alt}
            width={120}
            height={120}
            className="w-full h-full"
          />
        </PopoverTrigger>
        <PopoverContent>
          <Form {...form}>
            <form
              onSubmit={handleSubmitWithoutPropagation}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="alt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternative Text</FormLabel>
                    <FormControl>
                      <Input placeholder="alt text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button disabled={isSubmitting} size={"sm"} type="submit">
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UpdateImageAltText;
