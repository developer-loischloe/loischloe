import appwriteBlogService from "@/appwrite/appwriteBlogService";
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
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export function CreateNewCategoryDialog({
  setAllCategories,
}: {
  setAllCategories: Dispatch<SetStateAction<string[]>>;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [error, setError] = useState<null | string>(null);

  const handleCreate = async () => {
    if (!category) {
      return setError("Category is required.");
    }

    try {
      const response = await appwriteBlogService.createBlogCategory(category);

      toast("Category created.");
      setAllCategories((prev) => [...prev, response.name]);

      setOpen(false);
      setCategory("");
      setError(null);

      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast(error?.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="text-xs hover:underline text-blue-500 cursor-pointer">
          Create new category
        </span>
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
            id="name"
            placeholder="Enter category name"
            className="col-span-3"
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
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
