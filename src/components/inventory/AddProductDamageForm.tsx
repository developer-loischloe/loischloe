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
  quantity_damaged: z.number(),
  damage_reason: z.string(),
});

const AddProductDamageForm = ({
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
  const { addStoreDamage } = appwriteInventoryService;

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity_damaged: 0,
      damage_reason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await addStoreDamage({
        store_id: storeId,
        product_id: productId,
        damage_reason: values.damage_reason,
        quantity_damaged: values.quantity_damaged,
        inventory: inventoryId,
      });

      if (response) {
        toast.success("Store damage added successfully.");
        router.refresh();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Store damage not added.");
    }
  }

  const { isSubmitting, isDirty } = form.formState;

  return (
    <div className="px-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="quantity_damaged"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Damage Quantity</FormLabel>
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

          <FormField
            control={form.control}
            name="damage_reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Damase Reason</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
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

export default AddProductDamageForm;
