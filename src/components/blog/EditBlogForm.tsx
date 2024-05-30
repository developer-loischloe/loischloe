"use client";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import config from "@/config";
import { uploadFiles } from "@/lib/uploader";
import { getFileToUrl } from "@/lib/utils";
import { useAuth } from "@/context/authContext";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// custom components
import InputList from "../Shared/InputList";
import SelectList from "../Shared/SelectList";
import RichTextEditor from "../Shared/RichTextEditor";
import { useRouter } from "next/navigation";

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
      .refine(
        (files) => !files || files?.length >= 1,
        `Featured image is required.`
      )
      .refine(
        (files) => !files || files?.[0]?.size <= MAX_FILE_SIZE,
        `Max image size is 5MB.`
      )
      .refine(
        (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
    metaTitle: z.string().min(1, {
      message: "Meta Title is required.",
    }),
    metaDescription: z.string().min(1, {
      message: "Meta Description is required.",
    }),
    metaKeywords: z.array(z.string()),
  })
  .superRefine((data) => {
    if (data.slug) {
      data.slug = slugify(data.slug.replace(/:/g, " "), { lower: true });
    }
  });

const dateFormat = (originalDateStr: string) => {
  // Parse the date string into a Date object
  const dateObj = new Date(originalDateStr);

  // Get the components of the date
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  const hours = String(dateObj.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");

  // Format the date into the desired string format
  const formattedDateStr = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDateStr;
};

export default function EditBlogForm({ post }: { post?: any }) {
  console.log(post);

  const [featuredImageUrl, setFeaturedImageUrl] = useState<any>(
    post?.featuredImage || null
  );

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    appwriteBlogService.getAllCategories().then((res) => {
      setAllCategories(res.documents[0].categories);
    });
  }, []);

  const { user } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      datePublished: dateFormat(post?.datePublished) || "",
      content: post?.content || "",
      tags: post?.tags || [],
      categories: post?.categories || [],
      featuredImage: "",
      metaTitle: post?.metaTitle || "",
      metaDescription: post?.metaDescription || "",
      metaKeywords: post?.metaKeywords || [],
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
    let featuredImage = "";

    if (data.featuredImage) {
      const uploadedimages = await uploadFiles(
        data.featuredImage,
        config.appwriteBucketId.blog
      );
      featuredImage = uploadedimages[0].url;
    } else {
      featuredImage = post?.featurdeImage;
    }

    const blogData = {
      ...data,
      featuredImage: featuredImage,
      authorId: user?.$id,
    };

    try {
      const response = await appwriteBlogService.updateBlog({
        id: post?.$id,
        blogData,
      });

      toast("Blog post successfully updated.");

      setTimeout(() => {
        router.refresh();
        router.push("/dashboard/blog");
      }, 5000);
    } catch (error: any) {
      console.log(error);
      toast(error?.message);
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
