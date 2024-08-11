"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import appwriteUtilsService from "@/appwrite/appwriteUtilsService";

const FreeGiftToogler = ({ defaultValue }: { defaultValue: boolean }) => {
  const handleChecked = async (val: boolean) => {
    try {
      const response = await appwriteUtilsService.updatefreeGiftEnable({
        enable: val,
      });

      if (response.free_gift_enable) {
        toast.success("Free gift enabled successfully.");
      } else {
        toast.success("Free gift disabled successfully.");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  };
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="free-gift">Free Gift</Label>
      <Switch
        id="free-gift"
        defaultChecked={defaultValue}
        onCheckedChange={handleChecked}
      />
    </div>
  );
};

export default FreeGiftToogler;
