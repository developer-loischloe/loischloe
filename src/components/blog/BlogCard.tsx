import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({
  post,
  featuredImagePriority = false,
}: {
  post: any;
  featuredImagePriority?: boolean;
}) => {
  return (
    <Link href={`/blog/${post?.slug}`}>
      <div className="space-y-3 rounded-xl overflow-hidden shadow-lg group">
        <Image
          src={post?.featuredImage}
          width={500}
          height={500}
          alt={post?.title}
          priority={featuredImagePriority}
          className="w-full h-[300px]  sm:h-[350px]  md:h-[300px] rounded-xl group-hover:scale-110 transition-all duration-500"
        />
        <div className="space-y-2 p-2 h-[110px]">
          <div className="flex items-center gap-2 text-brand_gray">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="red"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1.5V3.75"
                stroke="#727272"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 1.5V3.75"
                stroke="#727272"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.625 6.81738H15.375"
                stroke="#727272"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.75 6.375V12.75C15.75 15 14.625 16.5 12 16.5H6C3.375 16.5 2.25 15 2.25 12.75V6.375C2.25 4.125 3.375 2.625 6 2.625H12C14.625 2.625 15.75 4.125 15.75 6.375Z"
                stroke="#727272"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.7713 10.2754H11.778"
                stroke="#727272"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.7713 12.5254H11.778"
                stroke="#727272"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.99686 10.2754H9.00359"
                stroke="#727272"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.99686 12.5254H9.00359"
                stroke="#727272"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.22049 10.2754H6.22723"
                stroke="#727272"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.22049 12.5254H6.22723"
                stroke="#727272"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <time className="">
              {formatDate(post?.datePublished, "dd MMMM yyyy")}
            </time>
          </div>
          <h3 className="line-clamp-2 text-lg font-semibold group-hover:underline group-hover:text-brand_primary transition-all">
            {post?.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
