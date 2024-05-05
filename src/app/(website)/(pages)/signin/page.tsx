import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/appwrite/serverSDK/appwrite";
import SignInForm from "@/components/auth/SignInForm";

export default async function SignIn() {
  const user = await getLoggedInUser();
  console.log(user);

  if (user && user.labels.includes("admin")) {
    redirect("/dashboard");
  }
  const loggedInAndNotAdmin = user && !user.labels.includes("admin");

  console.log(loggedInAndNotAdmin);

  return (
    <section>
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            {loggedInAndNotAdmin
              ? "Log In to your admin account to go to the dashboard"
              : "Enter your information to log in to your account"}
          </p>
        </div>

        <SignInForm />
      </div>
    </section>
  );
}
