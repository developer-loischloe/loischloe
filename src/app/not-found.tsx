import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="h-[calc(100vh-11rem)] md:h-[calc(100vh-9rem)] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Page Not Found</h1>

      <div className="error-container ">
        <span className="four mr-2">
          <span className="screen-reader-text">5</span>
        </span>

        <span className="zero mr-2">
          <span className="screen-reader-text ">0</span>
        </span>

        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </div>
      <Link href={"/"}>
        <Button
          className="bg-brand_secondary hover:bg-brand_primary hover:text-brand_secondary transition-all"
          size={"lg"}
        >
          Back To Home
        </Button>
      </Link>
    </section>
  );
};

export default NotFound;
