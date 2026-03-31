import { Metadata } from "next";
import React from "react";

// Metadata
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore the LOIS CHLOE beauty blog — tips, tutorials, and insights on cruelty-free makeup, skincare routines, and the latest beauty trends in Bangladesh.",
  alternates: {
    canonical: "/blog",
  },
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
