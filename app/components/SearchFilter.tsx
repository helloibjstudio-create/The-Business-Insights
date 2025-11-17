"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { countries as countryOptions, sectors as sectorOptions } from "../data/options";

interface SearchAndFilterProps<T> {
  data: T[];
  onFiltered: (filtered: T[]) => void;
  fields: {
    search: (keyof T)[];
    filters: {
      year?: keyof T;
      country?: keyof T;
      sector?: keyof T;
      title?: keyof T;
    };
  };
}

export default function SearchAndFilter<T extends Record<string, any>>({
  data,
  onFiltered,
  fields,
}: SearchAndFilterProps<T>) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    year: "",
    country: "",
    sector: "",
    title: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const lastFilteredRef = useRef<T[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => (2000 + i).toString());

  // Filtering logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesQuery =
        !query ||
        fields.search.some((field) =>
          String(item[field] || "").toLowerCase().includes(query.toLowerCase())
        );
      const matchesYear = !filters.year || String(item[fields.filters.year!] || "") === filters.year;
      const matchesCountry = !filters.country || String(item[fields.filters.country!] || "") === filters.country;
      const matchesSector = !filters.sector || String(item[fields.filters.sector!] || "") === filters.sector;
      const matchesTitle = !filters.title || String(item[fields.filters.title!] || "") === filters.title;

      return matchesQuery && matchesYear && matchesCountry && matchesSector && matchesTitle;
    });
  }, [query, filters, data, fields]);

  useEffect(() => {
    const current = JSON.stringify(filteredData);
    const last = JSON.stringify(lastFilteredRef.current);
    if (current !== last) {
      lastFilteredRef.current = filteredData;
      onFiltered(filteredData);
    }
  }, [filteredData, onFiltered]);

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowFilters(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm ml-2 lg:ml-20 z-50 font-sans">
      {/* Search Bar */}
      <motion.div
        className="flex items-center w-[70%] lg:w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm text-white focus-within:shadow-orange-500/30 transition-all mb-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Search className="w-4 h-4 text-[#E8602E] mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title..."
          className="flex-1 bg-transparent outline-none text-sm text-orange-100 placeholder:text-orange-400/60"
        />
      </motion.div>

      {/* Filter Button */}
      <div
        className="flex items-center w-[70%] lg:w-full px-4 py-1.5 cursor-pointer rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm gap-2 text-orange-400/60"
        onClick={() => setShowFilters((p) => !p)}
      >
        <motion.div
          onClick={() => setShowFilters((p) => !p)}
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer flex items-center"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#E8602E]" />
        </motion.div>
        <p>filter</p>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute mt-3 bg-black/80 border border-white/10 rounded-2xl p-5 space-y-4 backdrop-blur-md shadow-xl w-[70%] lg:w-full"
          >
            {/* Dropdowns */}
            <FilterDropdown
              label="Year"
              value={filters.year}
              options={yearOptions}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              onSelect={(val) => setFilters((f) => ({ ...f, year: val }))}
            />
            <FilterDropdown
              label="Country"
              value={filters.country}
              options={countryOptions}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              onSelect={(val) => setFilters((f) => ({ ...f, country: val }))}
            />
            <FilterDropdown
              label="Sector"
              value={filters.sector}
              options={sectorOptions}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              onSelect={(val) => setFilters((f) => ({ ...f, sector: val }))}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ===============================
// Subcomponent: FilterDropdown
// ===============================
interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  openDropdown: string | null;
  setOpenDropdown: (key: string | null) => void;
  onSelect: (val: string) => void;
}

function FilterDropdown({
  label,
  value,
  options,
  openDropdown,
  setOpenDropdown,
  onSelect,
}: FilterDropdownProps) {
  const isOpen = openDropdown === label;

  return (
    <div className="relative w-full">
      {/* Button */}
      <button
        onClick={() => setOpenDropdown(isOpen ? null : label)}
        className="flex justify-between items-center w-full px-3 py-2 text-sm bg-white/5 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-all"
      >
        <span className="text-orange-400">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-300 text-xs truncate max-w-[120px]">{value || "All"}</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={14} className="text-[#E8602E]" />
          </motion.div>
        </div>
      </button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 w-full mt-2 bg-black/90 border border-white/10 rounded-lg shadow-lg backdrop-blur-md z-50 overflow-hidden max-h-48 overflow-y-auto"
          >
            <li
              onClick={() => onSelect("")}
              className="px-4 py-2 text-sm text-gray-300 hover:bg-orange-500/10 hover:text-[#E8602E] cursor-pointer"
            >
              All
            </li>
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => onSelect(opt)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-orange-500/10 hover:text-[#E8602E] ${
                  value === opt ? "text-[#E8602E] font-medium" : "text-gray-200"
                }`}
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
