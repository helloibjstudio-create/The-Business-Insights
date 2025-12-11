"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontalIcon, ChevronDown } from "lucide-react";

interface SortByProps {
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: "", label: "Sort by" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "title_asc", label: "Name: A → Z" },
  { value: "title_desc", label: "Name: Z → A" },
  { value: "discount_asc", label: "Discount: Low → High" },
  { value: "discount_desc", label: "Discount: High → Low" },
];

export default function SortBy({ onChange }: SortByProps) {
  const [selected, setSelected] = useState(sortOptions[0]);

  const handleSelect = (option: (typeof sortOptions)[0]) => {
    setSelected(option);
    onChange(option.value);
  };

  return (
    <div className="relative font-sans z-50 w-52">
      {/* === Button / Header === */}
      <motion.div
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl 
          bg-white/5 border border-[#E8602E] backdrop-blur-md 
          text-white shadow-sm cursor-default select-none"
      >
        <SlidersHorizontalIcon
          size={18}
          className="text-[#E8602E]"
        />
        <span className="text-sm sm:text-base">{selected.label}</span>
        <ChevronDown size={16} className="text-[#E8602E]" />
      </motion.div>

      {/* === Dropdown - always visible === */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-2 w-full bg-black/80 border border-white/10 rounded-xl 
          backdrop-blur-md shadow-lg overflow-hidden z-50"
      >
        {sortOptions.map((option) => (
          <motion.li
            key={option.value}
            onClick={() => handleSelect(option)}
            whileHover={{
              backgroundColor: "rgba(232, 96, 46, 0.2)",
              x: 4,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`cursor-pointer px-4 py-2.5 text-sm text-gray-200 
              hover:text-[#E8602E] transition-colors duration-200 ${
                selected.value === option.value ? "text-[#E8602E] font-semibold" : ""
              }`}
          >
            {option.label}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
