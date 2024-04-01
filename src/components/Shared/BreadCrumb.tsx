import { ChevronsRight, Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const BreadCrumb = ({
  pageTitle,
  pathList,
}: {
  pageTitle?: string;
  pathList: string[];
}) => {
  return (
    <div className="px-5 py-5 md:p-7 bg-[#FFF4E7] flex flex-col justify-center items-center">
      {pageTitle && (
        <div>
          <span className="text-2xl">{pageTitle}</span>
        </div>
      )}

      <div className="!text-[14px] flex items-center gap-1">
        <Link href={"/"} className="flex items-center">
          <Home size={18} />
        </Link>
        {pathList.map((path) => (
          <div key={path} className="flex items-center">
            <ChevronsRight size={16} />
            {pathList[pathList?.length - 1] === path ? (
              <span className="mt-1 text-brand_gray line-clamp-1">
                {path?.toUpperCase()}
              </span>
            ) : (
              <Link
                href={`/${path}`}
                className="flex items-center gap-1 line-clamp-1"
              >
                <span className="mt-1">{path.toUpperCase()}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreadCrumb;
