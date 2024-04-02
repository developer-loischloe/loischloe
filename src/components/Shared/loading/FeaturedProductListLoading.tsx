import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProductListLoading = () => {
  return (
    <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
      {Array.from([1, 2, 3, 4]).map((i) => (
        <div className="space-y-5 shadow-sm  rounded-sm" key={i}>
          <Skeleton className="w-full h-[160px]" />
          <div className="space-y-2">
            <Skeleton className="w-full h-[40px]" />
            <Skeleton className="h-[20px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-[80px] h-[20px]" />
            <Skeleton className="w-[50px] h-[20px]" />
          </div>
          <Skeleton className="w-full h-[40px]" />
        </div>
      ))}
    </section>
  );
};

export default FeaturedProductListLoading;
