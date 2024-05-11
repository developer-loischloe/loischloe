"use client";

import Link from "next/link";
import Loader from "@/components/Shared/loading/Loader";
import SignUpForm from "@/components/auth/SignUpForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUp() {
  const router = useRouter();

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/signin");
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <div className="mx-auto max-w-lg space-y-6 shadow-2xl p-10 rounded-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Enter your information to create an account
          </p>
        </div>

        <SignUpForm />

        <br />
        <div>
          <p className="text-center mb-2">Already have an account?</p>
          <Link href={"/signin"}>
            <Button variant={"outline"} className="w-full">
              Sign-In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
