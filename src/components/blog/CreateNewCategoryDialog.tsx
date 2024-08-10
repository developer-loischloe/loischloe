"use client";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
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

export function CreateNewCategoryDialog({
  children,
  setAllCategories,
}: {
  children?: ReactNode;
  setAllCategories?: Dispatch<SetStateAction<string[]>>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [error, setError] = useState<null | string>(null);

  const handleCreate = async () => {
    if (!category) {
      return setError("Category is required.");
    }
    setIsSubmitting(true);

    try {
      const response = await appwriteBlogService.createBlogCategory(category);

      toast.success("Category created successfully.");
      if (setAllCategories) {
        setAllCategories((prev) => [...prev, response.name]);
      }

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
      <DialogTrigger asChild>
        {children ? (
          <div className="ml-auto max-w-max">{children}</div>
        ) : (
          <span className="text-xs hover:underline text-blue-500 cursor-pointer">
            Create new category
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new category</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right">
            Category
          </Label>
          <Input
            placeholder="Enter category name"
            value={category}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length > 0) {
                setError(null);
              }
              setCategory(value);
            }}
          />

          <div>
            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate} disabled={isSubmitting}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
