import { Metadata } from "next";
import React from "react";

// Metadata
export const metadata: Metadata = {
  title: "Blog",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
