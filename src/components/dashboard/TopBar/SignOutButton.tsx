"use client";

import React from "react";
import config from "@/config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignOutButton = () => {
  const router = useRouter();

  async function signOut() {
    const response = await fetch(`${config.next_app_base_url}/api/signout`);
    const data = await response.json();
    console.log(data);

    if (data.success) {
      toast(data?.msg || "Signout complete");
      router.replace("/signin");
    } else {
      toast(data?.msg || "Signout failed");
    }
  }

  return (
    <Button onClick={signOut} variant={"outline"} type="submit">
      Sign out
    </Button>
  );
};

export default SignOutButton;
