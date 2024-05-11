"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Models } from "appwrite";
import { appwriteAuthService } from "@/appwrite/appwriteAuthService";
import Loader from "@/components/Shared/loading/Loader";

export const AuthContext = createContext<{
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
  user: Models.User<Models.Preferences> | null;
  setUser: (user: null | any) => void;
}>({
  isLoading: false,
  setIsLoading: () => {},
  user: null,
  setUser: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  useEffect(() => {
    async function getUser() {
      try {
        setIsLoading(true);
        const user = await appwriteAuthService.getCurrentUser();

        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const data = useContext(AuthContext);

  return data;
};

export const AdminProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const auth = useAuth();
  const { isLoading, user } = auth;

  const isLoggedIn = Boolean(user);
  const isAdmin = Boolean(user?.labels.includes("admin"));

  // console.log({
  //   isLoading,
  //   user,
  //   isLoggedIn,
  //   isAdmin,
  // });

  useEffect(() => {
    if ((!isLoading && !isLoggedIn) || (!isLoading && !isAdmin)) {
      router.replace("/signin");
    }
  }, [isLoading, isLoggedIn, isAdmin]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!isLoading && isLoggedIn && isAdmin) {
    return <>{children}</>;
  }

  return null;
};
