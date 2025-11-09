"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
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

  const lastFilteredRef = useRef<T[]>([]);

  // ✅ Filtering logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesQuery =
        !query ||
        fields.search.some((field) =>
          String(item[field] || "")
            .toLowerCase()
            .includes(query.toLowerCase())
        );

      const matchesYear =
        !filters.year ||
        String(item[fields.filters.year!] || "") === filters.year;

      const matchesCountry =
        !filters.country ||
        String(item[fields.filters.country!] || "") === filters.country;

      const matchesSector =
        !filters.sector ||
        String(item[fields.filters.sector!] || "") === filters.sector;
      const matchesTitle =
        !filters.title ||
        String(item[fields.filters.title!] || "") === filters.title;

      return matchesQuery && matchesYear && matchesCountry && matchesSector && matchesTitle;
    });
  }, [query, filters, data, fields]);

  // ✅ Avoid infinite updates
  useEffect(() => {
    const current = JSON.stringify(filteredData);
    const last = JSON.stringify(lastFilteredRef.current);
    if (current !== last) {
      lastFilteredRef.current = filteredData;
      onFiltered(filteredData);
    }
  }, [filteredData, onFiltered]);

  // 🟠 Placeholder year options (to be replaced later)
  const yearOptions = ["2025", "2024", "2023", "2022"];

  return (
    <div className="relative cursor-pointer font-sans w-full z-50 max-w-md mx-auto mb-10">
      {/* Search bar */}
      <div className="flex items-center w-[70%] mx-auto lg:w-full h-10 px-3 rounded-md border border-orange-600/40 bg-orange-950/10 backdrop-blur-sm">
        <Search className="w-4 h-4 text-orange-500 mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title..."
          className="flex-1 bg-transparent outline-none text-sm text-orange-100 placeholder:text-orange-500/60"
        />
        <SlidersHorizontal
          onClick={() => setShowFilters((p) => !p)}
          className="w-4 h-4 text-orange-500 cursor-pointer hover:text-orange-400 transition-colors"
        />
      </div>

      {/* Filter dropdown */}
      {showFilters && (
        <div className="absolute mt-2 w-full bg-black/90 border border-orange-600/30 rounded-lg p-4 space-y-3 text-sm z-50">
          {/* Year */}
          <div className="flex flex-col gap-2">
            <label className="text-orange-400">Year</label>
            <select
              value={filters.year}
              onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value }))}
              className="bg-black border border-orange-600/30 rounded p-2 text-white"
            >
              <option value="">All</option>
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div className="flex flex-col gap-2">
            <label className="text-orange-400">Country</label>
            <select
              value={filters.country}
              onChange={(e) => setFilters((f) => ({ ...f, country: e.target.value }))}
              className="bg-black border border-orange-600/30 rounded p-2 text-white"
            >
              <option value="">All</option>
              {countryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Sector */}
          <div className="flex flex-col gap-2">
            <label className="text-orange-400">Sector</label>
            <select
              value={filters.sector}
              onChange={(e) => setFilters((f) => ({ ...f, sector: e.target.value }))}
              className="bg-black border border-orange-600/30 rounded p-2 text-white"
            >
              <option value="">All</option>
              {sectorOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
