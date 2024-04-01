"use client";
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext<{
  authStatus: boolean;
  setAuthStatus: (status: boolean) => void;
}>({
  authStatus: false,
  setAuthStatus: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState(false);

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const data = useContext(AuthContext);

  return data;
};
