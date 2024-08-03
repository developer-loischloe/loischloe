"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  query: z.string(),
});

const SearchBar = ({ product }: { product: string }) => {
  const [open, setOpen] = useState(product !== "");

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: product || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.query) {
      router.push(`/dashboard/inventory?product=${values.query}`);
    } else {
      router.push(`/dashboard/inventory`);
    }
  }

  return (
    <div className="w-full">
      {open ? (
        <div className="w-full flex justify-center items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex justify-center items-center"
            >
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem className="w-full  max-w-[300px]">
                    <FormControl>
                      <Input
                        className="w-full "
                        placeholder="Search item..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <button onClick={() => setOpen(!open)}>
            <Search className="hover:text-green-500 hover:scale-110 transition-all" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
