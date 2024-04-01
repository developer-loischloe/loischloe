import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  const searcParams = useSearchParams();
  const router = useRouter();

  const category = searcParams.get("category");

  // Debounce callback
  const debounced = useDebouncedCallback((keyword) => {
    const urlSearchParams = new URLSearchParams();

    if (category) {
      urlSearchParams.set("category", category);
    }
    if (keyword) {
      urlSearchParams.set("keyword", keyword);
    }

    const query = urlSearchParams.toString();
    router.push(`/products?${query}`);
  }, 300);

  const handleChange = (e: { target: { value: any } }) => {
    const keyword = e.target.value;

    debounced(keyword);
  };

  return (
    <div className="flex-1 flex gap-2 items-center  bg-[#fff] px-3 py-7 sm:py-3 rounded-md">
      <Search color="#002D34CC" />
      <input
        type="search"
        placeholder="Search for products"
        className="text-sm border-none outline-none text-[#000] w-full"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
