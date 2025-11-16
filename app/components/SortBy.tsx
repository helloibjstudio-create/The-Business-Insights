"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, SlidersHorizontalIcon } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(sortOptions[0]);

  const handleSelect = (option: (typeof sortOptions)[0]) => {
    setSelected(option);
    setOpen(false);
    onChange(option.value);
  };

  return (
    <div className="relative font-sans z-50">
      {/* === Button === */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl 
          bg-white/5 border border-[#E8602E] backdrop-blur-md 
          hover:bg-white/10 transition-all duration-300 cursor-pointer text-white shadow-sm"
      >
        <SlidersHorizontalIcon
          size={18}
          className="text-[#E8602E] transition-transform duration-300 group-hover:rotate-90"
        />
        <span className="text-sm sm:text-base">{selected.label}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} className="text-[#E8602E]" />
        </motion.div>
      </motion.button>

      {/* === Dropdown === */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-52 bg-black/80 border border-white/10 rounded-xl 
              backdrop-blur-md shadow-lg overflow-hidden z-50"
          >
            {sortOptions.map((option, i) => (
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
                    selected.value === option.value
                      ? "text-[#E8602E] font-semibold"
                      : ""
                  }`}
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
