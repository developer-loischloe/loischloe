"use client";

import appwriteOrderService from "@/appwrite/appwriteOrderService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function UpdateOrderStatus({
  children,
  orderId,
  currentStatus,
}: {
  children: React.ReactNode;
  orderId: string;
  currentStatus: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Select a status and click update when you're done.
          </DialogDescription>
        </DialogHeader>

        <div>
          <OrderStatusUpdateForm
            orderId={orderId}
            currentStatus={currentStatus}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

const statusConstant = [
  "processing",
  "on-hold",
  "completed",
  "canceled",
  "refunded",
];

const formSchema = z.object({
  status: z.string().min(1, { message: "Select a status" }),
});

function OrderStatusUpdateForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: currentStatus || "",
    },
  });

  const { isDirty, isSubmitting } = form.formState;
  const { updateOrderStatus } = appwriteOrderService;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { status } = values;

    try {
      const response = await updateOrderStatus({ orderId, status });

      if (response.$id === orderId) {
        toast.success("Order status updated successfully.");
        router.refresh();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Order status not updated.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="status"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormControl>
                <Select defaultValue={currentStatus} onValueChange={onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusConstant.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
}
