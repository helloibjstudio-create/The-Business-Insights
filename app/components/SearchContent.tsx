"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

interface SearchItem {
  id: string;
  name: string;
  description?: string;
  image_url: string;
}

interface SearchResults {
  exclusiveInterviews: SearchItem[];
  interviews: SearchItem[];
  articles: SearchItem[];
  reports: SearchItem[];
  events: SearchItem[];
}

export default function SearchContent() {
  const params = useSearchParams();
  const router = useRouter();

  const initialQuery = params.get("query")?.toLowerCase() || "";
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResults>({
    exclusiveInterviews: [],
    interviews: [],
    articles: [],
    reports: [],
    events: [],
  });
  const [loading, setLoading] = useState(false);

  // 🕒 Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      router.replace(`/search?query=${encodeURIComponent(query)}`);
    }, 600); // 0.6 second debounce
    return () => clearTimeout(handler);
  }, [query, router]);

  const highlightMatch = (text: string) => {
    if (!debouncedQuery) return text;
    const regex = new RegExp(`(${debouncedQuery})`, "gi");
    return text.replace(regex, "<span class='text-orange-400'>$1</span>");
  };

  useEffect(() => {
    if (!debouncedQuery) {
      setResults({
        exclusiveInterviews: [],
        interviews: [],
        articles: [],
        reports: [],
        events: [],
      });
      return;
    }

    async function fetchAll() {
      setLoading(true);
      try {
        const endpoints = [
          "exclusiveInterviews",
          "interviews",
          "articles",
          "reports",
          "events",
        ];

        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/${endpoint}`)
          )
        );

        const data = await Promise.all(responses.map((r) => r.json()));

        const filterByQuery = (arr: SearchItem[]) =>
          arr.filter((item) =>
            item?.name?.toLowerCase().includes(debouncedQuery)
          );

        setResults({
          exclusiveInterviews: filterByQuery(data[0]),
          interviews: filterByQuery(data[1]),
          articles: filterByQuery(data[2]),
          reports: filterByQuery(data[3]),
          events: filterByQuery(data[4]),
        });
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [debouncedQuery]);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-semibold mb-10">
          Search results for:{" "}
          <span className="text-orange-400">{debouncedQuery}</span>
        </h1>

        {/* 🔍 Search Input */}
        <div className="mb-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search..."
            className="w-full max-w-md p-3 rounded-md bg-white/10 text-white border border-white/20 focus:border-orange-400 outline-none"
          />
        </div>

        {loading ? (
          <p className="text-gray-400">Searching...</p>
        ) : debouncedQuery ? (
          <>
            {(
              Object.entries(results) as [keyof SearchResults, SearchItem[]][]
            ).map(([key, items]) =>
              items.length > 0 ? (
                <section key={key} className="mb-16">
                  <h2 className="text-2xl mb-6 capitalize text-orange-400">
                    {key.replace(/([A-Z])/g, " $1")}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition p-4"
                      >
                        <div className="relative aspect-[4/3] mb-4">
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <h3
                          className="text-xl font-semibold mb-2"
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(item.name),
                          }}
                        />
                        <p className="text-gray-300 text-sm mb-3">
                          {item.description
                            ? `${item.description.slice(0, 120)}...`
                            : ""}
                        </p>
                        <Link
                          href={`/${key}/${item.id}`}
                          className="text-orange-400 underline text-sm"
                        >
                          View Details
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </section>
              ) : null
            )}

            {Object.values(results).every((r) => r.length === 0) && (
              <p className="text-gray-400">
                No results found for "{debouncedQuery}".
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-400">Start typing to search...</p>
        )}
      </div>
    </main>
  );
}
