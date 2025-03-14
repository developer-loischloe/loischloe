import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchSuggestion from "./SearchSuggestion";

const SearchBar = ({
  searchTearm,
  setSearchTerm,
}: {
  searchTearm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const searcParams = useSearchParams();
  const router = useRouter();

  const category = searcParams.get("category");

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
    <div className="flex-1 max-w-3xl">
      <Sheet>
        <SheetTrigger asChild>
          <div title="Search">
            <Search className="hover:text-brand_primary transition-all  cursor-pointer" />
          </div>
        </SheetTrigger>
        <SheetContent side={"right"}>
          <SheetHeader className="max-w-3xl mx-auto ">
            <SheetTitle className="text-center">
              Find Your Perfect Match
            </SheetTitle>

            <div className="flex-1 flex gap-3 items-center  bg-[#fff] border border-brand_primary px-3 py-3 rounded-md ">
              <Search color="#002D34CC" size={22} />
              <form onSubmit={handleSubmit} className="w-full">
                <input
                  type="search"
                  placeholder="Search for products"
                  className="text-sm border-none outline-none text-[#000] w-full"
                  value={searchTearm}
                  onChange={handleChange}
                />
              </form>
            </div>
          </SheetHeader>
          <SheetFooter>
            <div className="w-full mt-5">
              <SearchSuggestion searchTearm={searchTearm} />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchBar;
