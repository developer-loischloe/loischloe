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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { validateURL } from "@/lib/utils";
import { toast } from "sonner";
import appwriteInventoryService from "@/appwrite/appwriteInventoryService";

const formSchema = z.object({
  store_name: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
  store_type: z
    .string()
    .refine(
      (val) => ["main", "retail"].includes(val),
      "Store type must be Main or Retail"
    ),
  web_address: z
    .string()
    .min(1, {
      message: "Website address is required.",
    })
    .refine((url) => validateURL(url), "Enter a valid web address"),
});

const StoreForm = ({
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
  const { createStore, updateStore, isStoreExist } = appwriteInventoryService;

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      store_name: data?.store_name || "",
      store_type: data?.store_type || "",
      web_address: data?.web_address || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "create") {
      const exist = await isStoreExist(values.web_address);

      // Check shop already exist or not
      if (!exist) {
        try {
          const response = await createStore(values);

          if (response) {
            toast.success("Store created successfully.");
            router.refresh();
            dialogClose();
          }
        } catch (error: any) {
          console.log(error);
          toast.error(error?.message || "Store not created");
        }
      } else {
        toast.warning("Store already exist.");
      }
    }

    if (type === "update" && id) {
      try {
        const response = await updateStore({ id: id, data: values });

        if (response) {
          toast.success("Store updated successfully.");
          router.refresh();
          dialogClose();
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error?.message || "Store not updated.");
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
            name="store_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter store name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="store_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select store" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="web_address"
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

export default StoreForm;
