"use client";

import { BusinessHero } from "@/public";
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MultiSelect from "../components/MultiSelect";
import { countries, sectors } from "../data/options";
import cities from "cities-list";

export default function AdminDashboard({
  Interviews,
  Articles,
  Reports,
  Events,
}: {
  Interviews: any[];
  Articles: any[];
  Reports: any[];
  Events: any[];
}) {
  const [activeTab, setActiveTab] = useState<
    "interviews" | "articles" | "reports" | "events"
  >("interviews");

  const [view, setView] = useState<"list" | "create">("list");

  const [formData, setFormData] = useState({
    id: null as string | null,
    name: "",
    sector: [] as string[],
    image_url: "",
    description: "",
    title: "",
    price: "",
    year: "",
    link: "",
    discounted_price: "",
    state: "",
    country: [] as string[],
  });

  interface Interview {
    id: string;
    name: string;
    sector: string;
    image_url: string;
    description: string;
    year: string;
    link: string;
    discounted_price: string;
    state: string;
    country: string;
  }
  interface Article {
    id: string;
    name: string;
    title: string;
    sector: string;
    image_url: string;
    description: string;
    year: string;
    link: string;
    discounted_price: string;
    state: string;
    country: string;
  }
  interface Reports {
    id: string;
    name: string;
    title: string;
    sector: string;
    image_url: string;
    description: string;
    year: string;
    link: string;
    discounted_price: string;
    state: string;
    country: string;
  }
  interface Events {
    id: string;
    name: string;
    title: string;
    sector: string;
    image_url: string;
    description: string;
    year: string;
    link: string;
    discounted_price: string;
    state: string;
    country: string;
  }

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [reports, setReports] = useState<Reports[]>([]);
  const [events, setEvents] = useState<Events[]>([]);

  const getActiveData = () => {
    switch (activeTab) {
      case "articles":
        return articles;
      case "reports":
        return reports;
      case "events":
        return events;
      default:
        return interviews;
    }
  };
  const activeData = getActiveData();

  useEffect(() => {
    const endpoints = ["interviews", "articles", "reports", "events"];

    endpoints.forEach((endpoint) => {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/${endpoint}`)
        .then((res) => res.json())
        .then((data) => {
          if (endpoint === "interviews") setInterviews(data);
          if (endpoint === "articles") setArticles(data);
          if (endpoint === "reports") setReports(data);
          if (endpoint === "events") setEvents(data);
        })
        .catch((err) => console.error(`Error fetching ${endpoint}:`, err));
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}api/${activeTab}/${formData.id}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}api/${activeTab}`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.error) {
      alert("Error: " + data.error);
    } else {
      alert(
        `${activeTab} ${formData.id ? "updated" : "uploaded"} successfully!`
      );
      setFormData({
        id: null as string | null,
        name: "",
        sector: [],
        image_url: "",
        description: "",
        state: "",
        title: "",
        price: "",
        year: "",
        link: "",
        discounted_price: "",
        country: [],
      });

      fetch(`http://localhost:5000/api/${activeTab}`)
        .then((res) => res.json())
        .then((newData) => {
          if (activeTab === "interviews") setInterviews(newData);
          if (activeTab === "articles") setArticles(newData);
          if (activeTab === "reports") setReports(newData);
          if (activeTab === "events") setEvents(newData);
        });

      setView("list");
    }
  };

  console.log(Object.keys(cities));

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    console.log("🗑️ Deleting ID:", id);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/${activeTab}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.error) {
      alert("Error deleting: " + data.error);
    } else {
      alert("Item deleted successfully!");
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/${activeTab}`)
        .then((res) => res.json())
        .then((newData) => {
          if (activeTab === "interviews") setInterviews(newData);
          if (activeTab === "articles") setArticles(newData);
          if (activeTab === "reports") setReports(newData);
          if (activeTab === "events") setEvents(newData);
        });
    }
  };

  // === EDIT ITEM ===
  const handleEdit = (item: any) => {
    setFormData({
      id: item.id,
      name: item.name || "",
      sector: Array.isArray(item.sector)
        ? item.sector
        : item.sector
        ? [item.sector]
        : [],
      image_url: item.image_url || "",
      description: item.description || "",
      title: item.title || "",
      price: item.price || "",
      year: item.year || "",
      link: item.link || "",
      discounted_price: item.discounted_price || "",
      state: item.state || "",
      country: Array.isArray(item.country)
        ? item.country
        : item.country
        ? [item.country]
        : [],
    });
    setView("create");
  };

  return (
    <div className="min-h-screen bg-transparent font-sans font-[500] text-white flex">
      <Image
        src={BusinessHero}
        alt="Background"
        fill
        className="absolute -z-10 opacity-20 object-cover"
      />
      {/* Sidebar */}
      <aside className="w-64 bg-transparent backdrop-blur-2xl rounded-r-[20px] p-6 space-y-4 border-r border-gray-700">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <ul className="space-y-3">
          {["interviews", "articles", "reports", "events"].map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`cursor-pointer p-2 rounded-md transition ${
                activeTab === tab ? "text-orange-500 " : "hover:text-gray-700"
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <h2 className="text-3xl text-center font-semibold mb-8 capitalize">
          {activeTab}
        </h2>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-black/60 border border-orange-500 text-white placeholder-gray-400 rounded-md px-10 py-2 focus:outline-none w-[200px]"
              />
              <Search
                className="absolute left-3 top-2.5 text-orange-500"
                size={18}
              />
            </div>
          </div>
          {view === "list" && (
            <button
              onClick={() => setView("create")}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-semibold transition"
            >
              <Plus size={18} /> Create
            </button>
          )}
        </div>

        {view === "list" ? (
          <motion.div
            key="list"
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeData.map((item, index) => (
                <div
                  key={index}
                  className="bg-black/50 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
                >
                  <div className="relative h-[240px]">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-gray-300 text-sm mb-1">
                      {item.description} • {item.year}
                    </p>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-400 text-sm mb-3">{item.sector}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-1 bg-orange-500 px-3 py-1 rounded text-sm hover:bg-orange-600"
                      >
                        <Edit3 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(String(item.id))}
                        className="flex items-center gap-1 bg-transparent border border-orange-500 px-3 py-1 rounded text-sm hover:bg-orange-500/10"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-transparent backdrop-blur-2xl m-auto p-8 rounded-xl shadow-md max-w-2xl space-y-6 border border-gray-800"
          >
            {/* Fields depending on category */}
            {activeTab === "interviews" && (
              <>
                <div>
                  <label className="block mb-2 text-sm">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Sector</label>
                  <input
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Image URL</label>
                  <input
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Country</label>
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Year</label>
                  <input
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>
              </>
            )}
            {activeTab === "articles" && (
              <>
                <div>
                  <label className="block mb-2 text-sm">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>

                <MultiSelect
                  label="Sector"
                  options={sectors}
                  value={formData.sector}
                  onChange={(selected) =>
                    setFormData({ ...formData, sector: selected })
                  }
                />

                <div>
                  <label className="block mb-2 text-sm">Image URL</label>
                  <input
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>

                <MultiSelect
                  label="Countries"
                  options={countries}
                  value={formData.country}
                  onChange={(selected) =>
                    setFormData({ ...formData, country: selected })
                  }
                />

                <div>
                  <label className="block mb-2 text-sm">Year</label>
                  <input
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>
              </>
            )}

            {activeTab === "events" && (
              <>
                {/* Event Name */}
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Event Name
                  </label>
                  <input
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="e.g., INDABA"
                    className="w-full p-2 rounded bg-transparent border border-gray-700 focus:border-orange-500 outline-none"
                  />
                </div>

                {/* Event Date */}
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Date
                  </label>
                  <input
                    name="year"
                    type="text"
                    value={formData.year || ""}
                    onChange={handleChange}
                    placeholder="e.g., 5–8 February 2024"
                    className="w-full p-2 rounded bg-transparent border border-gray-700 focus:border-orange-500 outline-none"
                  />
                </div>

                {/* City MultiSelect */}
                

                {/* Country MultiSelect */}
                <MultiSelect
                  label="Country"
                  options={countries} // your countries array
                  value={formData.country || []}
                  onChange={(selected) =>
                    setFormData({ ...formData, country: selected })
                  }
                />

                {/* Image URL */}
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Image URL
                  </label>
                  <input
                    name="image_url"
                    value={formData.image_url || ""}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full p-2 rounded bg-transparent border border-gray-700 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    State
                  </label>
                  <input
                    name="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                    placeholder="e.g New york"
                    className="w-full p-2 rounded bg-transparent border border-gray-700 focus:border-orange-500 outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Enter short event description..."
                    className="w-full p-2 rounded bg-transparent border border-gray-700 focus:border-orange-500 outline-none min-h-[100px]"
                  />
                </div>
              </>
            )}

            {activeTab === "reports" && (
              <>
                <div>
                  <label className="block mb-2 text-sm">Image URL</label>
                  <input
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Price</label>
                  <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Discounted Price</label>
                  <input
                    name="discounted_price"
                    type="number"
                    value={formData.discounted_price}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Write up</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-transparent border border-gray-700"
                  />
                </div>
              </>
            )}

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
              >
                Publish {activeTab}
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className="text-gray-300 hover:text-orange-400 underline cursor-pointer"
              >
                Back
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
