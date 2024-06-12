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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import appwriteNewsletterService from "@/appwrite/appwriteNewsletterService";

const FormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
});

const NewsLetterForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isDirty, isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email } = data;

    const findSubscriberResponse =
      await appwriteNewsletterService.findSubscriber(email);

    if (findSubscriberResponse.total === 0) {
      const response = await appwriteNewsletterService.createNewSubscriber({
        email,
      });

      if (response) {
        toast("You are successfully subscribed to the newsletter.");
        form.reset();
      }
    } else {
      toast("You've already subscribed to our newsletter.");
      form.reset();
    }

    try {
    } catch (error: any) {
      console.log(error?.message);
      toast(error?.message || "Newsletter submission failed!");
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
          <div className=" !overflow-hidden flex justify-between">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full overflow-hidden  rounded-l-sm rounded-r-none">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@email.com"
                      className="w-full border-none rounded-l-sm rounded-r-none outline-none focus:outline-none focus:border-none text-black pl-3 py-3 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="bg-brand_primary px-3 rounded-r-sm rounded-l-none"
            type="submit"
            disabled={!isDirty || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default NewsLetterForm;
