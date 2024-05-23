"use client";
import { useEffect, useState } from "react";
import { getFileToUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import InputList from "../Shared/InputList";
import SelectList from "../Shared/SelectList";
import RichTextEditor from "../Shared/RichTextEditor";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  slug: z.string().min(1, {
    message: "Slug is required.",
  }),
  datePublished: z.string().min(1, {
    message: "Published date is required.",
  }),
  content: z.string().min(100, {
    message: "Content must be at least 100 characters.",
  }),
  tags: z.array(z.string()),
  categories: z.array(z.string()),
  featuredImage: z
    .any()
    .refine((files) => files?.[0]?.size === 0, `Featured image is required.`)
    .refine(
      (files) => files?.[0]?.size > MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  metaTitle: z.string().min(1, {
    message: "Meta Title is required.",
  }),
  metaDescription: z.string().min(1, {
    message: "Meta Description is required.",
  }),
  metaKeywords: z.array(z.string()),
});

export default function AddBlogForm() {
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<any>("");

  useEffect(() => {
    featuredImage &&
      getFileToUrl(featuredImage).then((res) => {
        setFeaturedImageUrl(res);
      });
  }, [featuredImage]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      slug: "",
      datePublished: "",
      content: "",
      tags: [],
      categories: [],
      featuredImage: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: [],
    },
  });

  console.log(form.watch());

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(`<pre>${JSON.stringify(data)}</pre>`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="datePublished"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Published Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <RichTextEditor
                  model={field.value}
                  onModelChange={(content) => {
                    field.onChange(content);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <InputList
                  placeHolder="Enter tag"
                  strList={field.value}
                  setStrList={(values) => {
                    field.onChange(values);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <SelectList
                  placeHolder="Select a fruit"
                  allItems={["skin", "hair"]}
                  selectedItems={field.value}
                  setSelectedItems={(values) => {
                    console.log(values);

                    field.onChange(values);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featuredImage"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Featured Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    console.log(e.target.files);
                    if (e.target?.files) {
                      setFeaturedImage(e.target.files[0]);
                      field.onChange(e.target?.files);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {featuredImageUrl && (
          <img
            src={featuredImageUrl}
            alt="featured"
            width={300}
            height={350}
            className="w-full max-w-3xl"
          />
        )}

        <h5 className="font-bold text-lg">SEO</h5>
        <FormField
          control={form.control}
          name="metaTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter meta title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter meta Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metaKeywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Keywords</FormLabel>
              <FormControl>
                <InputList
                  placeHolder="Enter keyword"
                  strList={field.value}
                  setStrList={(values) => {
                    field.onChange(values);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
