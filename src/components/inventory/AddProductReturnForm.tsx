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
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  quantity_return: z.number(),
  return_reason: z.string(),
  allocate_store_id: z.string(),
  allocate_store_name: z.string(),
});

const AddProductReturnForm = ({
  storeId,
  productId,
  productName,
  inventoryId,
  availableQuantity,
}: {
  storeId: string;
  productId: string;
  productName: string;
  inventoryId: string;
  availableQuantity: number;
}) => {
  const [stores, setStores] = useState<any[]>([]);

  const { addStoreReturn, createProductAllocation } = appwriteInventoryService;

  const router = useRouter();

  // Fetch all Stores
  useEffect(() => {
    appwriteInventoryService
      .getAllStore({ page: 1, resultPerPage: 5000 })
      .then((response) => {
        setStores(response?.documents.filter((store) => store.$id !== storeId));
      })
      .catch((error) => {
        console.log(error);
        toast(error?.message || "Failed to fetch stores.");
      });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity_return: 0,
      return_reason: "",
      allocate_store_id: "",
      allocate_store_name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const returnResponse = await addStoreReturn({
        store_id: storeId,
        product_id: productId,
        return_reason: values.return_reason,
        quantity_return: values.quantity_return,
        inventory: inventoryId,
        allocate_store_id: values.allocate_store_id,
        allocate_store_name: values.allocate_store_name,
      });

      // Create new product allocation
      if (returnResponse) {
        const createAllocationResponse = await createProductAllocation({
          product_id: productId,
          product_name: productName,
          quantity_allocated: values.quantity_return,
          store_id: values.allocate_store_id,
        });

        toast.success("product return successfully.");
        router.refresh();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Product return failed.");
    }
  }

  const { isSubmitting, isDirty } = form.formState;

  return (
    <div className="px-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="quantity_return"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Return Quantity</FormLabel>
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
            name="return_reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Return Reason</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="allocate_store_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allocation Store</FormLabel>
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
                                form.setValue("allocate_store_id", store?.$id);
                                form.setValue(
                                  "allocate_store_name",
                                  store?.store_name
                                );
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

          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProductReturnForm;
