"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { appwriteAuthService } from "@/appwrite/appwriteAuthService";

const SignOutButton = () => {
  const { logout } = appwriteAuthService;

  async function signOut() {
    const response = await logout();
    console.log(response);

    if (response) {
      toast("Signout complete");
      window.location.reload();
    } else {
      toast("Signout failed");
    }
  }

  return (
    <Button onClick={signOut} variant={"outline"} size={"sm"} type="submit">
      Sign out
    </Button>
  );
};

export default SignOutButton;
