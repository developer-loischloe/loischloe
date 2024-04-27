import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SearchBar = ({
  setShowPopOver,
  searchTearm,
  setSearchTerm,
}: {
  setShowPopOver: React.Dispatch<React.SetStateAction<boolean>>;
  searchTearm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const searcParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const category = searcParams.get("category");

  const pathArr = pathname.slice(1).split("/");

  useEffect(() => {
    setShowPopOver(false);
  }, [pathname]);

  const handleChange = (e: { target: { value: any } }) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const urlSearchParams = new URLSearchParams();

    if (category) {
      urlSearchParams.set("category", category);
    }
    if (searchTearm) {
      urlSearchParams.set("keyword", searchTearm);
    }

    const query = urlSearchParams.toString();
    router.push(`/products?${query}`);
  };

  return (
    <div className="flex-1">
      <div className="flex-1 flex gap-2 items-center  bg-[#fff] px-3 py-7 sm:py-3 rounded-b sm:rounded-md ">
        <Search color="#002D34CC" />
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="search"
            placeholder="Search for products"
            className="text-sm border-none outline-none text-[#000] w-full"
            value={searchTearm}
            onChange={handleChange}
            onFocus={() => {
              setShowPopOver(
                !(pathArr[0] === "products" && pathArr.length === 1)
              );
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
