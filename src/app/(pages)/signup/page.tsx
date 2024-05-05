import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/appwrite/serverSDK/appwrite";
import SignUpForm from "@/components/auth/SignUpForm";

export default async function SignUp() {
  const user = await getLoggedInUser();

  if (user && user.labels.includes("admin")) redirect("/dashboard");

  return (
    <section>
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Enter your information to create an account
          </p>
        </div>

        <SignUpForm />
      </div>
    </section>
  );
}
