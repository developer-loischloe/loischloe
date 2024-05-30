import React from "react";
import appwriteBlogService from "@/appwrite/appwriteBlogService";
import Image from "next/image";
import { formatDate } from "date-fns";
import Link from "next/link";
import config from "@/config";
import { Eye, ThumbsUp } from "lucide-react";
import RelatedBlogPost from "@/components/blog/RelatedBlogPost";

import FroalaContentView from "./FroalaContentView";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await appwriteBlogService.getBlogBySlug(slug);
  console.log({ SinglePost: post });

  return {
    title: post?.metaTitle,
    description: post?.metaDescription,
    keywords: post?.metaKeywords,
  };
}

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await appwriteBlogService.getBlogBySlug(slug);

  const userPromise = await fetch(
    `${config.next_app_base_url}/api/user/${post?.authorId}`
  );
  const { user } = await userPromise.json();
  console.log(user);

  if (!post) {
    return <div>No Post found</div>;
  }

  return (
    <section className="space-y-10">
      <div className="w-full overflow-hidden">
        <Image
          src={post?.featuredImage}
          width={1920}
          height={1080}
          alt={post?.title}
          priority
          className="w-full h-auto max-h-[650px]   rounded-xl  object-cover"
        />
      </div>

      <div className="space-y-5">
        {/* Categories */}
        <ul className="flex gap-5">
          {post?.categories?.map((category: string, index: number) => (
            <Link href={`/blog/category/${category}`}>
              <li className="hover:text-brand_primary transition-all cursor-pointer hover:underline ">
                <span>{category}</span>
                {index + 1 < post?.categories?.length && (
                  <span className="text-gray-300 ml-5">|</span>
                )}
              </li>
            </Link>
          ))}
        </ul>

        {/* Title */}
        <h1 className="heading-1">{post?.title}</h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-5 justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={user.avatar || ""}
            alt="avatar"
            width={100}
            height={100}
            className="w-[40px] h-[40px] rounded-full"
          />

          <p>
            By <span className="text-brand_primary">{user.name}</span>
          </p>
        </div>
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
      </div>
      {/* <div
        dangerouslySetInnerHTML={{ __html: post?.content }}
        className="blog_description"
      ></div> */}

      <FroalaContentView content={post?.content} />
      {/* Tags */}
      <div>
        <p className="font-bold text-xl">Popular tags:</p>
        <ul className="flex gap-5">
          {post?.tags?.map((tag: string) => (
            <Link href={`/blog/tag/${tag}`}>
              <li className="hover:text-brand_primary transition-all cursor-pointer hover:underline">
                #{tag}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* views, like */}
      <div className="flex gap-10">
        <div className="flex items-center gap-2">
          <ThumbsUp size={18} />

          {post?.likes}
        </div>

        <div className="flex items-center gap-2">
          <Eye size={18} />
          {post?.views}
        </div>
      </div>

      {/* Related Blog Post */}
      <div>
        <RelatedBlogPost
          categories={post?.categories}
          currentBlogId={post?.$id}
        />
      </div>
    </section>
  );
};

export default page;
