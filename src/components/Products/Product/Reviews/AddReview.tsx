"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

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
import { validateEmail } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import { useState } from "react";
import { uploadFiles } from "@/lib/uploader";
import { databases } from "@/appwrite/appwriteConfig";
import config from "@/config";

// Declare it outside your component so it doesn't get re-created
const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#727272",
};

const imageSchema = z.object({
  id: string(),
  url: string(),
});

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z
    .string()
    .refine(
      (email) => !email.length || validateEmail(email),
      "Enter a valid Email address."
    ),

  comment: z
    .string()
    .min(1, {
      message: "Review is required",
    })
    .max(500, {
      message: "Review must be less than 500 characters",
    }),
  rating: z.number().min(1).max(5),
  images: z.array(imageSchema),
});

export function AddReview({ product }: { product: any }) {
  const [reviewImages, setReviewImages] = useState<FileList | null>(null);

  console.log(product);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
      rating: 1,
      images: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });

    if (reviewImages) {
      uploadFiles(reviewImages).then((uploadedimages) => {
        databases
          .updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId.product,
            product.$id,
            {
              reviews: [
                ...product.reviews,
                { ...values, images: uploadedimages },
              ],
            }
          )
          .then((response) => {
            if (response) {
              window.location.reload();
            }
          });
      });
    } else {
      databases
        .updateDocument(
          config.appwriteDatabaseId,
          config.appwriteCollectionId.product,
          product.$id,
          {
            reviews: [...product.reviews, { ...values }],
          }
        )
        .then((response) => {
          if (response) {
            window.location.reload();
          }
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col md:flex-row  justify-between gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email(optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your experience with this product"
                  rows={5}
                  maxLength={500}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your rating</FormLabel>
              <FormControl>
                <ReactRating
                  style={{ maxWidth: 100 }}
                  value={field.value}
                  onChange={(val: number) => {
                    console.log(val);
                    field.onChange(val);
                  }}
                  itemStyles={myStyles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => {
                    setReviewImages(e.target.files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
