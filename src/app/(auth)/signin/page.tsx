"use client";

import Loader from "@/components/Shared/loading/Loader";
import SignInForm from "@/components/auth/SignInForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user && user.labels.includes("admin")) {
      router.replace("/dashboard");
    }
  }, [user]);

  const loggedInAndNotAdmin = user && !user.labels.includes("admin");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <div className="mx-auto max-w-lg space-y-6 shadow-2xl p-10 rounded-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            {loggedInAndNotAdmin
              ? "Log In to your admin account to go to the dashboard"
              : "Enter your information to log in to your account"}
          </p>
        </div>

        <SignInForm />

        <br />
        <div>
          <p className="text-center mb-2">New to LOISCHLOE?</p>
          <Link href={"/signup"}>
            <Button variant={"outline"} className="w-full">
              Sign-Up
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
