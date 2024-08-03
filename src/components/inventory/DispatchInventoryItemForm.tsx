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

const formSchema = z.object({
  shop: z.string().min(1, { message: "Select a shop." }),
  quantity: z.number().default(0),
});

const DispatchInventoryItemForm = ({
  id,
  existingShop,
  availableQuantity,
}: {
  id: string;
  existingShop: any[];
  availableQuantity: number;
}) => {
  const [shops, setShops] = useState<any[]>([]);
  const { addRetailShopItem } = appwriteInventoryService;

  const router = useRouter();

  // Fetch all shop
  useEffect(() => {
    appwriteInventoryService
      .getAllShopIdAndName()
      .then((response) => {
        setShops(
          response.documents.filter(
            (shop) => !existingShop.includes(shop?.shop_name)
          )
        );
      })
      .catch((error) => {
        console.log(error);
        toast(error?.message || "Failed to fetch shops.");
      });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shop: "",
      quantity: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = { inventory: id, ...values };

    // Create new Inventory
    try {
      const response = await addRetailShopItem(data);

      if (response) {
        toast("Item dispatch successfully.");
        router.refresh();
      }
    } catch (error: any) {
      console.log(error);
      toast(error?.message || "Item dispatch failed.");
    }
  }

  const { isSubmitting, isDirty } = form.formState;

  return (
    <div className="px-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="shop"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retail Shop</FormLabel>
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
                          ? shops.find((shop) => shop.$id === field.value)
                              ?.shop_name
                          : "Select a shop"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search shop..." />
                      <CommandList>
                        <CommandEmpty>No shop found.</CommandEmpty>
                        <CommandGroup>
                          {shops?.map((shop) => (
                            <CommandItem
                              key={shop.$id}
                              value={shop?.shop_name}
                              onSelect={() => {
                                form.setValue("shop", shop.$id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  shop.$id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <span> {shop?.shop_name}</span>
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
            name="quantity"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={availableQuantity}
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

export default DispatchInventoryItemForm;
