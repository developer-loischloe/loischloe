"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { generateParams } from "@/lib/utils";

const formSchema = z.object({
  searchString: z.string(),
});

const SearchBar = ({
  basePath,
  searchString,
  extraSearchParams,
}: {
  basePath: string;
  searchString: string
  extraSearchParams: object;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchString: searchString || "",
    },
  });



  function onSubmit(values: z.infer<typeof formSchema>) {
    const link = `${basePath}?${generateParams({
      ...extraSearchParams,
      searchString: values.searchString,
    })}`;

    router.replace(link);
  }
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchString !== "" && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [inputRef]);

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex justify-center items-center"
          >
            <FormField
              control={form.control}
              name="searchString"
              render={({ field }) => (
                <FormItem className="w-full  max-w-[300px]">
                  <FormControl>
                    <Input
                      className="w-full "
                      placeholder="Search item..."
                      {...field}
                      ref={inputRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {/* {open ? (
        <div className="flex justify-center items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex justify-center items-center"
            >
              <FormField
                control={form.control}
                name="searchString"
                render={({ field }) => (
                  <FormItem className="w-full  max-w-[300px]">
                    <FormControl>
                      <Input
                        className="w-full "
                        placeholder="Search item..."
                        {...field}
                        ref={inputRef}
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
      )} */}
    </div>
  );
};

export default SearchBar;
