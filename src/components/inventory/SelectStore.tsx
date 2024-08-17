"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import appwriteInventoryService from "@/appwrite/appwriteInventoryService";

const SelectStore = ({ storeId }: { storeId: string }) => {
  const [stores, setStores] = useState<any[]>([]);

  const router = useRouter();

  // Fetch all Stores
  useEffect(() => {
    appwriteInventoryService
      .getAllStore({ page: 1, resultPerPage: 5000 })
      .then((response) => {
        setStores(response?.documents);
      })
      .catch((error) => {
        console.log(error);
        toast(error?.message || "Failed to fetch stores.");
      });
  }, []);

  return (
    <div className="max-w-max">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !storeId && "text-muted-foreground"
            )}
          >
            {storeId
              ? stores?.find((store) => store?.$id === storeId)?.store_name
              : "Select a store"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search store..." />
            <CommandList>
              <CommandEmpty>No store found.</CommandEmpty>
              <CommandGroup>
                {stores?.map((store) => (
                  <CommandItem
                    key={store?.$id}
                    value={store?.store_name}
                    onSelect={() => {
                      router.push(`/dashboard/inventory?storeId=${store?.$id}`);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        store?.$id === storeId ? "opacity-100" : "opacity-0"
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
    </div>
  );
};

export default SelectStore;
