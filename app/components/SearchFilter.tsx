"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

interface SearchAndFilterProps<T> {
  data: T[];
  onFiltered: (filtered: T[]) => void;
  fields: {
    search: (keyof T)[];
    filters: {
      year?: keyof T;
      country?: keyof T;
      sector?: keyof T;
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
  });
  const [showFilters, setShowFilters] = useState(false);

  // 🔍 Search + Filter logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesQuery =
        query === "" ||
        fields.search.some((field) =>
          String(item[field]).toLowerCase().includes(query.toLowerCase())
        );

      const matchesYear =
        !filters.year || String(item[fields.filters.year!]) === filters.year;
      const matchesCountry =
        !filters.country ||
        String(item[fields.filters.country!]) === filters.country;
      const matchesSector =
        !filters.sector ||
        String(item[fields.filters.sector!]) === filters.sector;

      return matchesQuery && matchesYear && matchesCountry && matchesSector;
    });
  }, [query, filters, data, fields]);

  // Update parent whenever filters change
  useMemo(() => {
    onFiltered(filteredData);
  }, [filteredData, onFiltered]);

  // Extract dynamic options
  const years = Array.from(
    new Set(data.map((d) => d[fields.filters.year!]).filter(Boolean))
  );
  const countries = Array.from(
    new Set(data.map((d) => d[fields.filters.country!]).filter(Boolean))
  );
  const sectors = Array.from(
    new Set(data.map((d) => d[fields.filters.sector!]).filter(Boolean))
  );

  return (
    <div className="relative z-90 cursor-pointer w-full max-w-md mx-auto mb-10">
      {/* Search input */}
      <div className="flex z-90 items-center w-full h-10 px-3 rounded-md border border-orange-600/40 bg-orange-950/10 backdrop-blur-sm">
        <Search className="w-4 h-4 text-orange-500 mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, description, sector or year..."
          className="flex-1 bg-transparent outline-none text-sm text-orange-100 placeholder:text-orange-500/60"
        />
        <SlidersHorizontal
          onClick={() => setShowFilters((p) => !p)}
          className="w-4 h-4 text-orange-500 cursor-pointer hover:text-orange-400 transition-colors"
        />
      </div>

      {/* Filter dropdown */}
      {showFilters && (
        <div className="absolute mt-2 w-full bg-black/90 border border-orange-600/30 rounded-lg p-4 space-y-3 text-sm">
          <div className="flex flex-col gap-2">
            <label className="text-orange-400">Year</label>
            <select
              value={filters.year}
              onChange={(e) =>
                setFilters((f) => ({ ...f, year: e.target.value }))
              }
              className="bg-black border border-orange-600/30 rounded p-2 text-white"
            >
              <option value="">All</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-orange-400">Country</label>
            <select
              value={filters.country}
              onChange={(e) =>
                setFilters((f) => ({ ...f, country: e.target.value }))
              }
              className="bg-black border border-orange-600/30 rounded p-2 text-white"
            >
              <option value="">All</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-orange-400">Sector</label>
            <select
              value={filters.sector}
              onChange={(e) =>
                setFilters((f) => ({ ...f, sector: e.target.value }))
              }
              className="bg-black border border-orange-600/30 rounded p-2 text-white"
            >
              <option value="">All</option>
              {sectors.map((s) => (
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
