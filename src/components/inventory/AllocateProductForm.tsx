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
  FormDescription,
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
  product_id: z.string(),
  store_id: z.string(),
  quantity_allocated: z.number(),
  product_name: z.string(),
});

const AllocateProductForm = ({ closeDialog }: { closeDialog: () => void }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);

  const [availableQuantity, setAvailableQuantity] = useState(0);

  // services
  const {
    createProductAllocation,
    getAllStore,
    getAvailableQuantityByProductId,
  } = appwriteInventoryService;

  const router = useRouter();

  // Fetch all Products
  useEffect(() => {
    appwriteProductService
      .getAllProductIdAndNameAndPrice()
      .then((response) => {
        setProducts(response?.documents);
      })
      .catch((error) => {
        console.log(error);
        toast(error?.message || "Failed to fetch products.");
      });
  }, []);

  // Fetch all Stores
  useEffect(() => {
    getAllStore({ page: 1, resultPerPage: 5000 })
      .then((response) => {
        setStores(response?.documents);
      })
      .catch((error) => {
        console.log(error);
        toast(error?.message || "Failed to fetch stores.");
      });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_id: "",
      store_id: "",
      quantity_allocated: 1,
      product_name: "",
    },
  });

  // Get available quantity for selected product
  const selectedProductId = form.watch("product_id");
  useEffect(() => {
    if (selectedProductId) {
      setAvailableQuantity(0);
      // fetch available quantity
      getAvailableQuantityByProductId(selectedProductId)
        .then((response) => {
          setAvailableQuantity(response);
        })
        .catch((error: any) => {
          console.log(error);
          toast.error(error?.message);
        });
    }
  }, [selectedProductId]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Allocate product
    try {
      const allocationData = {
        product_id: values.product_id,
        store_id: values.store_id,
        quantity_allocated: values.quantity_allocated,
        product_name: values.product_name,
      };

      const allocationResponse = await createProductAllocation(allocationData);

      toast.success("Product allocated successfully.");
      router.replace(`/dashboard/inventory?storeId=${values.store_id}`);
      router.refresh();
      closeDialog();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Product not allocated.");
    }
  }

  const { isSubmitting, isDirty } = form.formState;

  return (
    <div className="px-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="product_id"
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
                          ? products?.find(
                              (product) => product?.$id === field.value
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
                          {products?.map((product, index) => (
                            <CommandItem
                              key={product?.$id}
                              value={product?.name}
                              className={""}
                              onSelect={() => {
                                form.setValue("product_id", product?.$id);
                                form.setValue("product_name", product?.name);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  product?.$id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <span>
                                {index + 1} {" : "} {product?.name}
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
                <FormDescription>
                  Available Quantity: {availableQuantity}
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="store_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store</FormLabel>
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
                          ? stores?.find((store) => store?.$id === field.value)
                              ?.store_name
                          : "Select a store"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search store..." />
                      <CommandList>
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup>
                          {stores?.map((store, index) => (
                            <CommandItem
                              key={store?.$id}
                              value={store?.store_name}
                              className={""}
                              onSelect={() => {
                                form.setValue("store_id", store?.$id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  store?.$id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <span>{store?.store_name}</span>
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

          {availableQuantity > 0 && (
            <FormField
              control={form.control}
              name="quantity_allocated"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Total Quantity</FormLabel>
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
          )}

          <Button
            type="submit"
            disabled={availableQuantity === 0 || isSubmitting || !isDirty}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AllocateProductForm;
