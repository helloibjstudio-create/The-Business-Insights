"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { countries as countryOptions, sectors as sectorOptions } from "../data/options";

interface Report {
  id: number;
  title: string;
  image_url: string;
  price: string;
  discounted_price: string;
  link: string;
  country?: string;
  sector?: string;
  year?: string;
}

interface SortByProps {
  data: Report[];
  onFiltered: (filtered: Report[]) => void;
}

export default function SortBy({ data, onFiltered }: SortByProps) {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 2000 + 1 }, (_, i) =>
    (2000 + i).toString()
  );

  const sortOptions = ["Sort by", "Price: Low → High", "Price: High → Low", "Name: A → Z", "Name: Z → A"];

  const [selectedFilter, setSelectedFilter] = useState({
    country: "All",
    sector: "All",
    year: "All",
    sort: sortOptions[0],
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filters = [
    { label: selectedFilter.country, options: ["All", ...countryOptions], key: "country" },
    { label: selectedFilter.sector, options: ["All", ...sectorOptions], key: "sector" },
    { label: selectedFilter.year, options: ["All", ...yearOptions], key: "year" },
    { label: selectedFilter.sort, options: sortOptions, key: "sort" },
  ];

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let filtered = [...data];

    // Filter by title containing selected country/sector/year
    if (selectedFilter.country !== "All") {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(selectedFilter.country.toLowerCase())
      );
    }
    if (selectedFilter.sector !== "All") {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(selectedFilter.sector.toLowerCase())
      );
    }
    if (selectedFilter.year !== "All") {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(selectedFilter.year.toLowerCase())
      );
    }

    // Sort
    switch (selectedFilter.sort) {
      case "Price: Low → High":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "Price: High → Low":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "Name: A → Z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Name: Z → A":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    onFiltered(filtered);
  }, [selectedFilter, data, onFiltered]);

  return (
    <div ref={dropdownRef} className="w-[99%] mx-auto flex justify-center mt-4">
      <div className="flex w-full max-w-5xl border border-gray-300 rounded-md">
        {filters.map((filter, index) => (
          <div
            key={index}
            className="relative flex-1 border-r last:border-r-0 border-gray-300"
          >
            <button
              className="w-full flex items-center justify-between px-4 py-2 text-white text-[15px] hover:bg-gray-500 rounded-md"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {filter.label}
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute left-0 w-full max-h-60 overflow-y-auto overflow-x-hidden bg-black/50 backdrop-blur-2xl shadow-lg rounded-md mt-1 z-50"
                >
                  {filter.options.map(option => (
                    <motion.li
                      key={option}
                      onClick={() => {
                        setSelectedFilter(prev => ({ ...prev, [filter.key]: option }));
                        setOpenIndex(null);
                      }}
                      whileHover={{ backgroundColor: "#F5F5F5", x: 4 }}
                      className="cursor-pointer px-4 py-2 text-sm text-white hover:text-black"
                    >
                      {option}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
