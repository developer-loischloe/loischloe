import React from "react";
import Image from "next/image";

const CommentList = ({ blog }: { blog: any }) => {
  return (
    <div>
      {!blog?.comments.length ? (
        <h5 className="uppercase text-lg md:text-2xl font-bold text-brand_primary">
          BE THE FIRST TO COMMENT "{blog?.title}"
        </h5>
      ) : (
        <h5 className="text-lg md:text-2xl mb-7 font-bold text-brand_primary">
          {blog?.comments.length} Comments
        </h5>
      )}

      <div className="space-y-7">
        {blog?.comments?.map((comment: any) => (
          <div className="flex gap-5" key={comment.$id}>
            <div className="w-[40px]">
              <Image
                src={
                  "https://cloud.appwrite.io/v1/storage/buckets/65feab130c0a4167d13d/files/660d0c9eb800e9966414/view?project=65ed75e73895ca457661&mode=admin"
                }
                alt={"avatar"}
                width={100}
                height={100}
                className="rounded-full w-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex gap-2">
                <address className="font-bold">{comment?.name}</address>
              </div>
              <p className="text-brand_gray">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
