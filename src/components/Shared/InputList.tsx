import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "../ui/input";

const InputList = ({
  placeHolder,
  strList,
  setStrList,
}: {
  placeHolder: string;
  strList: string[];
  setStrList: (values: string[]) => void;
}) => {
  const [currentStr, setCurrentStr] = useState<string>("");

  return (
    <div className="space-y-3">
      <Input
        placeholder={placeHolder}
        value={currentStr}
        onChange={(e: any) => {
          setCurrentStr(e.target.value);
        }}
      />

      <ul className="flex flex-wrap gap-2">
        {strList.map((val) => (
          <li
            key={val}
            className="bg-gray-200 px-3 py-1 rounded-full text-sm relative  overflow-hidden group transition-all"
          >
            <span>{val}</span>
            <span
              onClick={() => {
                setStrList(strList.filter((currVal) => currVal !== val));
              }}
              className="absolute top-0 bottom-0 left-0 right-0 bg-black/30 text-white flex justify-center items-center invisible group-hover:visible cursor-pointer"
            >
              <X size={18} />
            </span>
          </li>
        ))}

        <li className="px-3 py-1 rounded-full text-sm relative  overflow-hidden group transition-all">
          <span>{currentStr}</span>
          <span
            onClick={() => {
              if (!strList.find((str) => currentStr === str)) {
                setStrList([...strList, currentStr]);
                setCurrentStr("");
              }
            }}
            className="absolute top-0 bottom-0 left-0 right-0 bg-black/30 text-white flex justify-center items-center invisible group-hover:visible cursor-pointer"
          >
            <Plus size={18} />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default InputList;
