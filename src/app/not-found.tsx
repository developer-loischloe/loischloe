import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <section>
      <div className="flex flex-col items-center gap-10">
        <h1>Page NotFound</h1>

        <div>
          <Link href="/">
            <Button>Back Home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
