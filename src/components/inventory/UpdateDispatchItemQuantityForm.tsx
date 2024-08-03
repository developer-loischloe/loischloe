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
  quantity: z.number().default(0),
});

const UpdateDispatchItemQuantityForm = ({
  id,
  quantity,
  availableQuantity,
}: {
  id: string;
  quantity: any;
  availableQuantity: number;
}) => {
  const { updateRetailShopItem } = appwriteInventoryService;

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: quantity,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Update Inventory
    try {
      const response = await updateRetailShopItem({ id, data: values });

      if (response) {
        toast("Quantity updated successfully.");
        router.refresh();
      }
    } catch (error: any) {
      console.log(error);
      toast(error?.message || "Quantity not update");
    }
  }

  const { isSubmitting, isDirty } = form.formState;

  return (
    <div className="px-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    max={quantity + availableQuantity}
                    onChange={(e) => {
                      const { value } = e.target;
                      if (Number(value) <= quantity + availableQuantity) {
                        onChange(Number(value));
                      }
                    }}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting || !isDirty}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateDispatchItemQuantityForm;
