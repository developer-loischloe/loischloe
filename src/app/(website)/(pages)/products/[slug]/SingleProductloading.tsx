import { Skeleton } from "@/components/ui/skeleton";

const SingleProductloading = () => {
  return (
    <div>
      {/* breadcrumb */}
      <div className="">
        <Skeleton className="w-full h-[90px]" />
      </div>
      <section className="space-y-10 py-5 md:py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* slider */}
          <div className="flex-1 flex flex-col  gap-5">
            <div className="flex-1">
              <Skeleton className="w-full h-full min-h-[250px] max-h-[350px]"></Skeleton>
            </div>
            <div className=" flex  gap-3 overflow-x-hidden">
              {Array.from([1, 2, 3]).map((i) => (
                <Skeleton
                  key={i}
                  className="min-w-[100px] min-h-[100px]"
                ></Skeleton>
              ))}
            </div>
          </div>
          {/* handler */}
          <div className="flex-1 space-y-3">
            <Skeleton className="w-[140px] h-[20px]" />
            <Skeleton className="w-full min-w-[100px] min-h-[30px]" />
            <Skeleton className="w-[140px] h-[20px]" />
            <Skeleton className="w-full min-w-[100px] min-h-[140px]" />
            <Skeleton className="w-full min-w-[100px] min-h-[2px]" />
            <div className="flex gap-5">
              <Skeleton className="w-[140px] h-[20px]" />
              <Skeleton className="w-[140px] h-[20px]" />
            </div>
            <div className="flex gap-5">
              <Skeleton className="w-[160px] h-[40px]" />
              <Skeleton className="w-[120px] h-[40px]" />
              <Skeleton className="w-[120px] h-[40px]" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <Skeleton className="w-full h-[200px]" />
        </div>
      </section>
    </div>
  );
};

export default SingleProductloading;
