import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SelectList = ({
  placeHolder,
  allItems,
  selectedItems,
  setSelectedItems,
}: {
  placeHolder: string;
  allItems: string[];
  selectedItems: string[];
  setSelectedItems: (values: string[]) => void;
}) => {
  return (
    <div className="space-y-3">
      <Select
        onValueChange={(value) => {
          if (!selectedItems.find((currStr) => currStr === value)) {
            setSelectedItems([...selectedItems, value]);
          }
        }}
      >
        <SelectTrigger className="">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select</SelectLabel>
            {allItems?.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <ul className="flex flex-wrap gap-2">
        {selectedItems.map((val) => (
          <li
            key={val}
            className="bg-gray-200 px-3 py-1 rounded-full text-sm relative  overflow-hidden group transition-all"
          >
            <span>{val}</span>
            <span
              onClick={() => {
                setSelectedItems(
                  selectedItems.filter((currVal) => currVal !== val)
                );
              }}
              className="absolute top-0 bottom-0 left-0 right-0 bg-black/30 text-white flex justify-center items-center invisible group-hover:visible cursor-pointer"
            >
              <X size={18} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectList;
