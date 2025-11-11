"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

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
      <div className="flex items-center gap-2 border border-[#E8602E] rounded-full px-3 py-2 backdrop-blur-md bg-white/5 text-white text-sm sm:text-base">
        <SlidersHorizontal size={16} className="text-[#E8602E]" />
        <select
          value={selected}
          onChange={handleChange}
          className="bg-transparent outline-none text-white text-sm sm:text-base cursor-pointer"
        >
          <option value="">Sort by</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="title_asc">Name: A → Z</option>
          <option value="title_desc">Name: Z → A</option>
          <option value="discount_asc">Discount: Low → High</option>
          <option value="discount_desc">Discount: High → Low</option>
        </select>
      </div>
    </div>
  );
}
