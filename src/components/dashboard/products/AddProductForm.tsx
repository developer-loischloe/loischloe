"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import config from "@/config";
import { useAuth } from "@/context/authContext";
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
import { toast } from "sonner";

// custom components
import InputList from "../../Shared/InputList";
import RichTextEditor from "../../Shared/RichTextEditor";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import PreviewImages from "@/components/Shared/PreviewImages";
import ImageUploader from "@/components/Shared/ImageUploader";

// constant for featured image
export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Product Schema
const FormSchema = z
  .object({
    name: z.string().min(1, {
      message: "Product name is required.",
    }),
    slug: z.string().min(1, {
      message: "Slug is required.",
    }),
    price: z.number().min(1, {
      message: "Price is required.",
    }),
    sale_price: z.number().min(1, {
      message: "Sale price is required.",
    }),
    brand: z.string(),
    short_description: z.string().min(1, {
      message: "Short description is required.",
    }),
    description: z.string().min(1, {
      message: "Description is required.",
    }),
    tags: z.array(z.string()),
    sku: z.string(),
    product_quantity: z.number().min(1, {
      message: "Product Quantity is required",
    }),
    featured: z.boolean().default(false),
    stock: z.enum(["in-stock", "out-of-stock"]),
    parent_category: z
      .string()
      .min(1, { message: "Parent Category is required." }),
    child_category: z
      .string()
      .min(1, { message: "Child Category is required." }),
    nested_child_category: z
      .string()
      .min(1, { message: "Nested Child Category is required." }),
    hot_product: z.boolean().default(false),
    Published: z.boolean().default(true),
    images: z
      .any()
      .refine((files) => files?.length >= 1, `Product image is required.`),
  })
  .superRefine((data) => {
    if (data.slug) {
      data.slug = slugify(data.slug.replace(/:/g, " "), { lower: true });
    }
  });

export default function AddProductForm({ categories }: { categories: any }) {
  const [childCategories, setChildCategories] = useState<null | any[]>(null);
  const [nestedChildCategories, setNestedChildCategories] = useState<
    null | any[]
  >(null);

  const router = useRouter();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      slug: "",
      price: 0,
      sale_price: 0,
      brand: "",
      short_description: "",
      description: "",
      tags: [],
      sku: "",
      product_quantity: 1,
      featured: false,
      stock: "in-stock",
      parent_category: "",
      child_category: "",
      nested_child_category: "",
      hot_product: false,
      images: null,
      Published: true,
    },
  });

  // =>> find and set childcategories
  useEffect(() => {
    if (form.watch().parent_category) {
      const selectedCategory = categories.find(
        (cat: any) => cat?.slug === form.watch().parent_category
      );
      if (selectedCategory?.childCategories.length > 0) {
        setChildCategories(selectedCategory?.childCategories);
      }
    }
  }, [form.watch().parent_category]);

  // =>> find and set nested childcategories
  useEffect(() => {
    if (form.watch().child_category) {
      const selectedCategory = childCategories?.find(
        (cat: any) => cat?.slug === form.watch().child_category
      );

      if (selectedCategory?.nestedChildCategories.length > 0) {
        setNestedChildCategories(selectedCategory?.nestedChildCategories);
      }
    }
  }, [form.watch().child_category]);

  const handleGenerateSlug = () => {
    const { name } = form.watch();
    if (name) {
      form.setValue("slug", slugify(name.replace(/:/g, " "), { lower: true }));
      form.clearErrors("slug");
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    // const uploadedimages = await uploadFiles(
    //   data.featuredImage,
    //   config.appwriteBucketId.blog
    // );

    // const blogData = {
    //   ...data,
    //   featuredImage: uploadedimages[0].url,
    //   authorId: user?.$id,
    // };

    // try {
    //   const response = await appwriteBlogService.createBlog(blogData);

    //   toast("Blog post successfully created.");
    //   router.push("/dashboard/blog");
    //   router.refresh();
    // } catch (error) {
    //   console.log(error);
    // }
  }

  const { isDirty, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Product name" {...field} />
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
                  <Input placeholder="Enter product slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch().name && (
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sale_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sale Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
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
          name="description"
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
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="product_quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"in-stock"}>In stock</SelectItem>
                    <SelectItem value={"out-of-stock"}>Out of stock</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parent_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat: any) => (
                      <SelectItem key={cat?.slug} value={cat?.slug}>
                        {cat?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch().parent_category && childCategories && (
          <FormField
            control={form.control}
            name="child_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child Category</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {childCategories.map((cat: any) => (
                        <SelectItem key={cat?.slug} value={cat?.slug}>
                          {cat?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {form.watch().child_category && nestedChildCategories && (
          <FormField
            control={form.control}
            name="nested_child_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nested Child Category</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {nestedChildCategories.map((cat: any) => (
                        <SelectItem key={cat?.slug} value={cat?.slug}>
                          {cat?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                {/* <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target?.files) {
                      field.onChange(e.target?.files);
                    }
                  }}
                /> */}

                <ImageUploader
                  handler={(imageIds: string[]) => {
                    console.log(imageIds);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch().images && <PreviewImages images={form.watch().images} />}

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="">Featured Product</FormLabel>
              <FormControl>
                <Switch
                  className="ml-10"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hot_product"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="">Hot Product</FormLabel>
              <FormControl>
                <Switch
                  className="ml-10"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Published"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="">Published</FormLabel>
              <FormControl>
                <Switch
                  className="ml-10"
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
