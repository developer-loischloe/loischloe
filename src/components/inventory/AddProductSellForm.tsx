"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import appwriteInventoryService from "@/appwrite/appwriteInventoryService";

const formSchema = z.object({
  quantity_sold: z.number(),
});

const AddProductSellForm = ({
  storeId,
  productId,
  inventoryId,
  availableQuantity,
}: {
  storeId: string;
  productId: string;
  inventoryId: string;
  availableQuantity: number;
}) => {
  const { addStoreSell } = appwriteInventoryService;

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity_sold: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await addStoreSell({
        store_id: storeId,
        product_id: productId,
        quantity_sold: values.quantity_sold,
        inventory: inventoryId,
      });

      if (response) {
        toast.success("Store sell added successfully.");
        router.refresh();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Store sell not added.");
    }
  }

  const { isSubmitting, isDirty } = form.formState;

  return (
    <div className="px-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="quantity_sold"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Sell Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={availableQuantity}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange(Number(val));
                    }}
                    {...field}
                  />
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
    </div>
  );
};

export default AddProductSellForm;
