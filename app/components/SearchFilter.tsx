"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastFilteredRef = useRef<T[]>([]);

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

  return (
    <div ref={wrapperRef} className="relative w-full max-w-full md:max-w-[300px] lg:max-w-[200px] ml-2 lg:ml-20 font-sans">
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

      {/* Filter Panel - always visible */}
      <div className="bg-black/80 border border-white/10 rounded-2xl p-5 space-y-4 backdrop-blur-md shadow-xl w-[70%] lg:w-full">
      <p className="text-[#E8602E] bg-transparent">Filter</p>
        {/* Year */}
        <FilterItem label="Year" value={filters.year} options={yearOptions} onSelect={(val) => setFilters((f) => ({ ...f, year: val }))} />
        {/* Country */}
        <FilterItem label="Country" value={filters.country} options={countryOptions} onSelect={(val) => setFilters((f) => ({ ...f, country: val }))} />
        {/* Sector */}
        <FilterItem label="Sector" value={filters.sector} options={sectorOptions} onSelect={(val) => setFilters((f) => ({ ...f, sector: val }))} />
      </div>
    </div>
  );
}

// Subcomponent for each filter
interface FilterItemProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (val: string) => void;
}

function FilterItem({ label, value, options, onSelect }: FilterItemProps) {
  return (
    <div className="flex flex-col w-full">
      <span className="text-orange-400 text-sm mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full overflow-y-hidden hide-scrollbar px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
      >
        <option className="bg-black text-white overflow-y-hidden hide-scrollbar rounded-2xl" value="">All</option>
        {options.map((opt) => (
          <option className="bg-black text-white overflow-y-hidden hide-scrollbar rouded-2xl" key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
