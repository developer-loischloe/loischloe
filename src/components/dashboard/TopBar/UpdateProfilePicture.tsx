import { appwriteAuthService } from "@/appwrite/appwriteAuthService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import config from "@/config";
import { useAuth } from "@/context/authContext";
import { uploadFiles } from "@/lib/uploader";
import { getFileToUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// constant for profile picture
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  avatar: z
    .any()
    .refine(
      (files) => !files || files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export default function UpdateProfilePicture() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<any>(user?.prefs?.avatar);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user?.name || "",
      avatar: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // profile picture update
    if (data.avatar) {
      // Upload avatar
      const uploadedimages = await uploadFiles(
        data.avatar,
        config.appwriteBucketId.avatar
      );

      const preferenceData = { avatar: uploadedimages[0].url };

      try {
        const response = await appwriteAuthService.addUserPreferences(
          preferenceData
        );
      } catch (error) {
        console.log(error);
      }
    }

    // Update user info
    try {
      const response = await appwriteAuthService.updateUser(data.name);
      toast("Profile successfully updated.");
      setUser(response);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  // Generate Featured image url
  const { avatar } = form.watch();
  if (avatar[0]) {
    getFileToUrl(avatar[0]).then((res) => {
      setAvatarUrl(res);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update your profile</DialogTitle>
        </DialogHeader>

        {avatarUrl && (
          <div className="flex flex-col items-center  justify-center gap-5">
            <Image
              src={avatarUrl}
              alt="avatar"
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-full"
            />
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
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
              name="avatar"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Profile picture</FormLabel>
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

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
