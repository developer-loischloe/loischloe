"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { validateURL } from "@/lib/utils";
import { toast } from "sonner";
import appwriteInventoryService from "@/appwrite/appwriteInventoryService";

const formSchema = z.object({
  shop_name: z.string().min(2, {
    message: "Shop name must be at least 2 characters.",
  }),
  website: z
    .string()
    .min(1, {
      message: "Website address is required.",
    })
    .refine((url) => validateURL(url), "Enter a valid web address"),
});

const ShopForm = ({
  type,
  id,
  data,
  dialogClose,
}: {
  type: "create" | "update";
  id?: string;
  data?: any;
  dialogClose: () => void;
}) => {
  const { createRetailShop, updateRetailShop, isRetailShopExist } =
    appwriteInventoryService;

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shop_name: data?.shop_name || "",
      website: data?.website || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "create") {
      const exist = await isRetailShopExist(values.website);

      // Check shop already exist or not
      if (!exist) {
        try {
          const response = await createRetailShop(values);

          if (response) {
            toast.success("Shop created successfully.");
            router.refresh();
            dialogClose();
          }
        } catch (error: any) {
          console.log(error);
          toast.error(error?.message || "Shop not created");
        }
      } else {
        toast.warning("Shop already exist.");
      }
    }

    if (type === "update" && id) {
      try {
        const response = await updateRetailShop({ id: id, data: values });

        if (response) {
          toast.success("Shop updated successfully.");
          router.refresh();
          dialogClose();
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error?.message || "Shop not updated");
      }
    }
  }

  const { isSubmitting, isDirty } = form.formState;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="shop_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter shop name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="Enter web address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ShopForm;
