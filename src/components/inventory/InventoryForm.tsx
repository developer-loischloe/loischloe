"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import appwriteInventoryService from "@/appwrite/appwriteInventoryService";
import appwriteProductService from "@/appwrite/appwriteProductService";

const formSchema = z.object({
  product: z.string().min(1, {
    message: "Select a product.",
  }),
  product_id: z.string(),
  product_name: z.string(),
  total_quantity: z.number().default(0),
  store_sell: z.number().default(0),
  damage: z.number().default(0),
});

const InventoryForm = ({
  type,
  id,
  data,
  existingProduct,
  retailShopTotalQuantity,
}: {
  type: "create" | "update";
  id?: string;
  data?: any;
  existingProduct: string[];
  retailShopTotalQuantity: number;
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const { createNewInventory, updateInventory } = appwriteInventoryService;

  const router = useRouter();

  // Fetch all products
  useEffect(() => {
    appwriteProductService
      .getAllProductIdAndName()
      .then((response) => {
        setProducts(response.documents);
      })
      .catch((error) => {
        console.log(error);
        toast(error?.message || "Failed to fetch products.");
      });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: data?.product?.$id || "",
      product_id: data?.product?.$id || "",
      product_name: data?.product?.name || "",
      total_quantity: Number(data?.total_quantity) || 0,
      store_sell: Number(data?.store_sell) || 0,
      damage: Number(data?.damage) || 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const inventoryData = {
      ...values,
    };

    // Create new Inventory
    if (type === "create") {
      try {
        const response = await createNewInventory(inventoryData);

        if (response) {
          toast("Inventory item created successfully.");
          router.refresh();
        }
      } catch (error: any) {
        console.log(error);
        toast(error?.message || "Inventory item not created");
      }
    }

    // Update Inventory
    if (type === "update" && id) {
      try {
        const response = await updateInventory({ id, data: inventoryData });

        if (response) {
          toast("Inventory item updated successfully.");
          router.refresh();
        }
      } catch (error: any) {
        console.log(error);
        toast(error?.message || "Inventory item not update");
      }
    }
  }

  const { isSubmitting, isDirty } = form.formState;

  console.log({ retailShopTotalQuantity });

  return (
    <div className="px-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? products.find(
                              (product) => product.$id === field.value
                            )?.name
                          : "Select a product"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search product..." />
                      <CommandList>
                        <CommandEmpty>No product found.</CommandEmpty>
                        <CommandGroup>
                          {products.map((product) => (
                            <CommandItem
                              key={product.$id}
                              value={product.name}
                              className={cn(
                                existingProduct.includes(product.$id) &&
                                  "!text-red-500"
                              )}
                              onSelect={() => {
                                if (
                                  type === "create" &&
                                  !existingProduct.includes(product.$id)
                                ) {
                                  form.setValue("product", product.$id);
                                  form.setValue("product_id", product.$id);
                                  form.setValue("product_name", product.name);
                                }
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  product.$id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <span> {product?.name}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="total_quantity"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Total Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={
                      retailShopTotalQuantity +
                      form.watch("store_sell") +
                      form.watch("damage")
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      onChange(Number(value));
                    }}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="store_sell"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Store Sell</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={
                      form.watch("total_quantity") -
                      (retailShopTotalQuantity + form.watch("damage"))
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      onChange(Number(value));
                    }}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="damage"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Damage</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={
                      form.watch("total_quantity") -
                      (retailShopTotalQuantity + form.watch("store_sell"))
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      onChange(Number(value));
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

export default InventoryForm;
