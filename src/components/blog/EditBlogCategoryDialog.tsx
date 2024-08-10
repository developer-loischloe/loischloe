"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import appwriteBlogService from "@/appwrite/appwriteBlogService";

export function EditBlogCategoryDialog({
  children,
  name,
  id,
}: {
  children: ReactNode;
  name: string;
  id: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [category, setCategory] = useState(name);
  const [error, setError] = useState<null | string>(null);

  const handleUpdate = async () => {
    if (!category) {
      return setError("Category is required.");
    }
    setIsSubmitting(true);

    try {
      const response = await appwriteBlogService.updateBlogCategory({
        id,
        name: category,
      });

      toast.success("Category updated successfully.");

      setOpen(false);
      setCategory("");
      setError(null);

      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right">
            Category
          </Label>
          <Input
            placeholder="Enter category name"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />

          <div>
            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
