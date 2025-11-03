"use client";

import { useState } from "react";

export default function AdminDashboard() {
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
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1c1c1c] p-6 space-y-4 border-r border-gray-700">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <ul className="space-y-3">
          {["interviews", "articles", "reports", "events"].map((item) => (
            <li
              key={item}
              onClick={() => setCategory(item)}
              className={`cursor-pointer p-2 rounded-md transition ${
                category === item ? "bg-orange-500 text-black" : "hover:bg-gray-700"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <h2 className="text-3xl font-semibold mb-8 capitalize">{category}</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1c1c1c] p-8 rounded-xl shadow-md max-w-2xl space-y-6 border border-gray-800"
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
                  className="w-full p-2 rounded bg-[#2b2b2b] border border-gray-700"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Sector</label>
                <input
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#2b2b2b] border border-gray-700"
                />
              </div>

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
                <label className="block mb-2 text-sm">Country</label>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#2b2b2b] border border-gray-700"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">Year</label>
                <input
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#2b2b2b] border border-gray-700"
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

          <button
            type="submit"
            className="bg-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Upload {category}
          </button>
        </form>
      </main>
    </div>
  );
}
