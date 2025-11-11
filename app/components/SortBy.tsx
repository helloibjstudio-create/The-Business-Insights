"use client";

import { useState } from "react";
import { SlidersHorizontal, SortAscIcon, SortDesc } from "lucide-react";

interface SortByProps {
  onChange: (value: string) => void;
}

export default function SortBy({ onChange }: SortByProps) {
  const [selected, setSelected] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="flex items-center justify-end w-full sm:w-auto">
      <div className="flex items-center gap-2 border-[0.5px] border-[#E8602E] rounded-[5px] px-3 py-2 backdrop-blur-md bg-transparent font-sans text-white text-sm sm:text-base">
        <SortAscIcon size={16} className="text-[#E8602E]" />
        <select
          value={selected}
          onChange={handleChange}
          className="bg-transparent outline-none text-white text-sm sm:text-base cursor-pointer"
        >
          <option className="bg-black w-full outline-none  border-b-2 hover:bg-orange-500 text-[#E8602E]" value="">Sort by</option>
          <option className="bg-black w-full outline-none  border-b-2 hover:bg-orange-500 text-[#E8602E]" value="price_asc">Price: Low → High</option>
          <option className="bg-black w-full outline-none  border-b-2 hover:bg-orange-500 text-[#E8602E]" value="price_desc">Price: High → Low</option>
          <option className="bg-black w-full outline-none  border-b-2 hover:bg-orange-500 text-[#E8602E]" value="title_asc">Name: A → Z</option>
          <option className="bg-black w-full outline-none  border-b-2 hover:bg-orange-500 text-[#E8602E]" value="title_desc">Name: Z → A</option>
          <option className="bg-black w-full outline-none  border-b-2 hover:bg-orange-500 text-[#E8602E]" value="discount_asc">Discount: Low → High</option>
          <option className="bg-black w-full outline-none  border-b-2 hover:bg-orange-500 text-[#E8602E]" value="discount_desc">Discount: High → Low</option>
        </select>
      </div>
    </div>
  );
}
