"use client";

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
import { validateEmail } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { databases } from "@/appwrite/appwriteConfig";
import config from "@/config";

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
});

export default function AddComment({ blog }: { blog: any }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });

  const { isDirty, isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const comments = [
        ...blog.comments,
        {
          ...(values.name && { name: values.name }),
          ...(values.email && { email: values.email }),
          ...(values.comment && { comment: values.comment }),
        },
      ];

      const response = await databases.updateDocument(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId.blog,
        blog.$id,
        {
          comments,
        }
      );

      if (response) {
        console.log(response);

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="mb-7">
        <h3 className="text-lg md:text-2xl font-semibold">Leave a comment</h3>
        <p>Your email address will not be published.</p>
      </div>

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
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your comment"
                    rows={5}
                    maxLength={500}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!isDirty || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
