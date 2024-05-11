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
import { toast } from "sonner";
import { appwriteAuthService } from "@/appwrite/appwriteAuthService";
import { useAuth } from "@/context/authContext";

const FormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { user } = useAuth();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email, password } = data;

    try {
      if (user) {
        await appwriteAuthService.logout();
      }

      const response = await appwriteAuthService.login({ email, password });

      if (response) {
        toast("You are successfully signed in.");
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      console.log(error?.message);
      toast(error?.message || "Signin failed!");
    }
  }

  const { isDirty, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          type="submit"
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
