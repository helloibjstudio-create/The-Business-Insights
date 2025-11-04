"use client";

import { BusinessHero } from "@/public";
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
   const [view, setView] = useState<"list" | "create">("list");
  const [category, setCategory] = useState("interviews");
  
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    image_url: "",
    description: "",
    title: "",
    price: "",
    year: "",
    link: "",
  });

  interface Interview {
  id: number;
  name: string;
  sector: string;
  image_url: string;
  description: string;
  year: string;
  link: string;
}

  const [interviews, setInterviews] = useState<Interview[]>([]);
  
    useEffect(() => {
      fetch("http://localhost:5000/api/interviews")
        .then((res) => res.json())
        .then((data) => setInterviews(data))
        .catch((err) => console.error("Error fetching interviews:", err));
        console.log("FormData being sent:", formData);
    }, []);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/${category}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.error) {
      alert("Error: " + data.error);
    } else {
      alert(`${category} uploaded successfully!`);
      setFormData({
        name: "",
        sector: "",
        image_url: "",
        description: "",
        title: "",
        price: "",
        year: "",
        link: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-transparent font-sans font-[500] text-white flex">
      <Image src={BusinessHero} alt="Background" fill className="absolute -z-10 opacity-20 object-cover" />
      {/* Sidebar */}
      <aside className="w-64 bg-transparent backdrop-blur-2xl rounded-r-[20px] p-6 space-y-4 border-r border-gray-700">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <ul className="space-y-3">
          {["interviews", "articles", "reports", "events"].map((item) => (
            <li
              key={item}
              onClick={() => setCategory(item)}
              className={`cursor-pointer p-2 rounded-md transition ${
                category === item ? "text-orange-500 " : "hover:text-gray-700"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <h2 className="text-3xl text-center font-semibold mb-8 capitalize">{category}</h2>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-black/60 border border-orange-500 text-white placeholder-gray-400 rounded-md px-10 py-2 focus:outline-none w-[200px]"
              />
              <Search className="absolute left-3 top-2.5 text-orange-500" size={18} />
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
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {interviews.map((item, index) => (
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
                        <p className="text-gray-300 text-sm mb-1">{item.description} • {item.year}</p>
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-gray-400 text-sm mb-3">{item.sector}</p>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1 bg-orange-500 px-3 py-1 rounded text-sm hover:bg-orange-600">
                            <Edit3 size={14} /> Edit
                          </button>
                          <button className="flex items-center gap-1 bg-transparent border border-orange-500 px-3 py-1 rounded text-sm hover:bg-orange-500/10">
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
          {(category === "interviews" || category === "articles" || category === "events") && (
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
                  name="description"
                  value={formData.description}
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

          {category === "reports" && (
            <>
              <div>
                <label className="block mb-2 text-sm">Image URL</label>
                <input
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#2b2b2b] border border-gray-700"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#2b2b2b] border border-gray-700"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Price</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#2b2b2b] border border-gray-700"
                />
              </div>
            </>
          )}

          <div className="flex justify-between">
            <button
            type="submit"
            className="bg-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Publish {category}
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