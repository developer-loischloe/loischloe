"use client";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/authContext";

import config from "@/config";
import { getFileToUrl } from "@/lib/utils";
import { uploadFiles } from "@/lib/uploader";
import appwriteBlogService from "@/appwrite/appwriteBlogService";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

// custom components
import InputList from "../Shared/InputList";
import SelectList from "../Shared/SelectList";
import RichTextEditor from "../Shared/RichTextEditor";
import { useRouter } from "next/navigation";
import { CreateNewCategoryDialog } from "./CreateNewCategoryDialog";

// constant for featured image
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z
  .object({
    title: z
      .string()
      .min(1, {
        message: "Title is required.",
      })
      .refine(
        (title) => title.trimStart().trimEnd().split(" ").length >= 3,
        "Title must be at least 3 words."
      ),
    slug: z.string().min(1, {
      message: "Slug is required.",
    }),
    datePublished: z.string().min(1, {
      message: "Published date is required.",
    }),
    content: z.string().min(1, {
      message: "Description is required.",
    }),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    featuredImage: z
      .any()
      .refine((files) => files?.length >= 1, `Featured image is required.`)
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
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
    canonicalUrl: z.string().optional(),
  })
  .superRefine((data) => {
    if (data.slug) {
      data.slug = slugify(data.slug.replace(/:/g, " "), { lower: true });
    }
  });

export default function AddBlogForm() {
  const [featuredImageUrl, setFeaturedImageUrl] = useState<any>(null);

  const router = useRouter();
  const { user } = useAuth();

  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    appwriteBlogService.getAllCategories().then((res) => {
      const categories = res.documents.map((document): string => document.name);
      console.log(categories);

      setAllCategories(categories);
    });
  }, []);

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
      canonicalUrl: "",
    },
  });

  // Generate Featured image url
  const { featuredImage } = form.watch();
  if (featuredImage[0]) {
    getFileToUrl(featuredImage[0]).then((res) => {
      setFeaturedImageUrl(res);
    });
  }

  const handleGenerateSlug = () => {
    const { title } = form.watch();
    if (title) {
      form.setValue("slug", slugify(title.replace(/:/g, " "), { lower: true }));
      form.clearErrors("slug");
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const uploadedimages = await uploadFiles(
      data.featuredImage,
      config.appwriteBucketId.blog
    );

    const blogData = {
      ...data,
      featuredImage: uploadedimages[0].url,
      authorId: user?.$id,
    };

    try {
      const response = await appwriteBlogService.createBlog(blogData);
      toast("Blog post successfully created.");
      router.push("/dashboard/blog");
    } catch (error) {
      console.log(error);
    }
  }

  const { isDirty, isSubmitting } = form.formState;

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

        <div>
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
          {form.watch().title && (
            <span
              onClick={handleGenerateSlug}
              className="text-sm text-blue-600 hover:underline cursor-pointer"
            >
              Generate slug
            </span>
          )}
        </div>

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
        <div>
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <SelectList
                    placeHolder="Select a fruit"
                    allItems={allCategories}
                    selectedItems={field.value}
                    setSelectedItems={(values) => {
                      field.onChange(values);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <CreateNewCategoryDialog setAllCategories={setAllCategories} />
          </div>
        </div>

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
                    if (e.target?.files) {
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

        <p className="font-bold text-lg">SEO</p>
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
        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
