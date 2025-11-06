"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

// 🧩 Base type for searchable items
interface SearchItem {
  id: string;
  name: string;
  description?: string;
  image_url: string;
}

// 🧩 Type for grouped results
interface SearchResults {
  exclusiveInterviews: SearchItem[];
  interviews: SearchItem[];
  articles: SearchItem[];
  reports: SearchItem[];
  events: SearchItem[];
}

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("query")?.toLowerCase() || "";

  const [results, setResults] = useState<SearchResults>({
    exclusiveInterviews: [],
    interviews: [],
    articles: [],
    reports: [],
    events: [],
  });

  const [loading, setLoading] = useState(true);

  // 🧠 Highlight matched text in orange
  const highlightMatch = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<span class='text-orange-400'>$1</span>");
  };

  useEffect(() => {
    if (!query) return;

    async function fetchAll() {
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
          arr.filter((item) => item?.name?.toLowerCase().includes(query));

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
  }, [query]);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-semibold mb-10">
          Search results for:{" "}
          <span className="text-orange-400">{query}</span>
        </h1>

        {loading ? (
          <p className="text-gray-400">Searching...</p>
        ) : (
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
                        transition={{ duration: 0.5 }}
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

                        {/* 🟠 Highlighted name */}
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
                No results found for "{query}".
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
