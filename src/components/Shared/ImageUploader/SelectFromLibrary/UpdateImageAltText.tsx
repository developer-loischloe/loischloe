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
  alt: z.string().min(1, { message: "Alt text is required." }),
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await databases.updateDocument(
        uploadConfig.databaseId,
        uploadConfig.collectionId,
        image.$id,
        {
          alt: values.alt,
        }
      );

      if (response) {
        setOpen(false);
        toast.success("Alternative text updated successfully.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Alternative Text not updated.");
    }
  }

  const handleSubmitWithoutPropagation = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full h-full">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <Image
            src={image?.image_url || ""}
            alt={image?.alt}
            fill
            sizes="(max-width: 500px) 300px"
            className="w-full h-full"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form onSubmit={handleSubmitWithoutPropagation} className="space-y-8">
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
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default UpdateImageAltText;
