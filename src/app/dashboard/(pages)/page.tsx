import { Metadata } from "next";
import OverView from "@/components/dashboard/overView";

// Metadata
export const metadata: Metadata = {
  title: "OverView",
};

const OverViewPage = () => {
  return <OverView />;
};

export default OverViewPage;
