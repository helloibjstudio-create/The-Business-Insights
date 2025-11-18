"use client";

import { BusinessHero } from "@/public";
import { Edit3, MenuIcon, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MultiSelect from "../components/MultiSelect";
import { countries, sectors } from "../data/options";
import cities from "cities-list";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import ImageUploader from "../components/ImageUploader";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SuccessPopup from "../components/SuccessPopup";
import ScrollBackButton from "../components/ScrollBackButton";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function AdminDashboard({
  Interviews: InterviewsProp,
  exclusiveInterviews: exclusiveInterviewsProp,
  Articles: ArticlesProp,
  Reports: ReportsProp,
  Events: EventsProp,
}: {
  session: { user: { email?: string } } | null;
  Interviews: any[];
  exclusiveInterviews: any[];
  Articles: any[];
  Reports: any[];
  Events: any[];
}) {
  const [activeTab, setActiveTab] = useState<
    "interviews" | "exclusiveInterviews" | "articles" | "reports" | "events"
  >("interviews");

  const [view, setView] = useState<"list" | "create">("list");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab, view]);

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
    write_up: "",
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
    write_up: string;
  }
  interface ExclusiveInterview {
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
    write_up: string;
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
    write_up: string;
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
    write_up: string;
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
    write_up: string;
  }

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [exclusiveInterviews, setExclusiveInterviews] = useState<
    ExclusiveInterview[]
  >([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [reports, setReports] = useState<Reports[]>([]);
  const [events, setEvents] = useState<Events[]>([]);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const getActiveData = () => {
    switch (activeTab) {
      case "articles":
        return articles;
      case "exclusiveInterviews":
        return exclusiveInterviews;
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
    const endpoints = [
      "interviews",
      "exclusiveInterviews",
      "articles",
      "reports",
      "events",
    ];

    endpoints.forEach((endpoint) => {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/${endpoint}`)
        .then((res) => res.json())
        .then((data) => {
          if (endpoint === "interviews") setInterviews(data);
          if (endpoint === "exclusiveInterviews") setExclusiveInterviews(data);
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

    const handleSaveDraft = async () => {
      try {
        const draftData = { ...formData, draft: true }; // flag it as draft

        const url = draftData.id
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}api/${activeTab}/${draftData.id}`
          : `${process.env.NEXT_PUBLIC_API_BASE_URL}api/${activeTab}`;

        const res = await fetch(url, {
          method: draftData.id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draftData),
        });

        const data = await res.json();

        if (data.error) {
          alert("Error saving draft: " + data.error);
        } else {
          alert(`${activeTab} saved as draft successfully!`);
          setFormData({
            id: data.id || null,
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
            write_up: "",
          });

          // Optionally refresh the list if you have a "Drafts" tab
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/${activeTab}`)
            .then((res) => res.json())
            .then((newData) => {
              if (activeTab === "interviews") setInterviews(newData);
              if (activeTab === "exclusiveInterviews")
                setExclusiveInterviews(newData);
              if (activeTab === "articles") setArticles(newData);
              if (activeTab === "reports") setReports(newData);
              if (activeTab === "events") setEvents(newData);
            });

          setView("list");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong while saving draft.");
      }
    };

    const data = await res.json();

    if (data.error) {
      alert("Error: " + data.error);
    } else {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3200);
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
        write_up: "",
      });

      fetch(`http://localhost:5000/api/${activeTab}`)
        .then((res) => res.json())
        .then((newData) => {
          if (activeTab === "interviews") setInterviews(newData);
          if (activeTab === "exclusiveInterviews")
            setExclusiveInterviews(newData);
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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}api/${activeTab}/${id}`,
      {
        method: "DELETE",
      }
    );

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
      write_up: item.write_up || "",
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [
    setActiveTab,
    setArticles,
    setEvents,
    setInterviews,
    setExclusiveInterviews,
    setReports,
  ]);
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert("Error logging out: " + error.message);
  } else {
    router.replace("/login");
  }
};

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
      } else {
        setSession(data.session);
      }
      setLoading(false);
    }
    checkSession();
  }, [router, supabase]);

useEffect(() => {
  if (!session) return;

  const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes

  let inactivityTimer: NodeJS.Timeout;

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      supabase.auth.signOut().then(() => {
        localStorage.setItem("autoLoggedOut", "true");
        router.replace("/login");
      });
    }, INACTIVITY_LIMIT);
  };

  // Detect user activity
  const activityEvents = [
    "mousemove",
    "keydown",
    "mousedown",
    "touchstart",
    "scroll",
  ];
  activityEvents.forEach(event =>
    window.addEventListener(event, resetInactivityTimer)
  );

  resetInactivityTimer();

  // Sync logout across all tabs
  const handleStorageLogout = (e: StorageEvent) => {
    if (e.key === "autoLoggedOut") {
      router.replace("/login");
    }
  };
  window.addEventListener("storage", handleStorageLogout);

  return () => {
    clearTimeout(inactivityTimer);
    activityEvents.forEach(event =>
      window.removeEventListener(event, resetInactivityTimer)
    );
    window.removeEventListener("storage", handleStorageLogout);
  };
}, [session]);

  const renderCard = (item: any, index: number) => {
    switch (activeTab) {
      case "interviews":
        return (
          <div
            key={index}
            className="bg-black/20 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
          >
            <div className="relative h-[340px]">
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
        );
      case "exclusiveInterviews":
        return (
          <div
            key={index}
            className="bg-black/25 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
          >
            <div className="relative h-[420px]">
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-400 text-sm">{item.description}</p>
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
        );
      case "articles":
        return (
          <div
            key={index}
            className="bg-black/20 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
          >
            <div className="relative h-[200px]">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-400 text-sm">{item.sector}</p>
              <p className="text-gray-400 text-sm">{item.year}</p>
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
        );
      case "reports":
        return (
          <div
            key={index}
            className="bg-black/25 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
          >
            <div className="relative h-[480px]">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-400 text-sm">Price: ${item.price}</p>
              <p className="text-gray-400 text-sm">
                Discount: ${item.discounted_price}
              </p>
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
        );
      case "events":
        return (
          <div
            key={index}
            className="bg-black/20 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
          >
            <div className="relative h-[200px]">
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-400 mb-4 text-sm">
                {item.state} • {item.year}
              </p>
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
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div  className=" bg-transparent w-full h-full font-sans font-[500] text-white flex">
        <Image
        
          src={BusinessHero}
          alt="Background"
          width={2000}
          height={2000}
          className="fixed -z-10 h-full opacity-20 object-cover"
        />
        {!sidebarOpen && (
      <MenuIcon
        onClick={() => setSidebarOpen(true)}
        className="sticky top-12 lg:top-10 left-5 lg:left-15  z-50 cursor-pointer text-orange-500 "
      />
    )}
        {/* Sidebar */}
        <aside  className={`fixed left-0 top-0 h-screen w-64 bg-white/3 backdrop-blur-2xl p-6 space-y-4 border-r border-gray-700 overflow-auto transform transition-transform duration-300 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <h1 className="text-2xl font-bold mt-5 md:mt-5 lg:mt-0 mb-6">Admin Dashboard</h1>
          
          <ul className="space-y-3">
            {[
              "interviews",
              "articles",
              "exclusiveInterviews",
              "reports",
              "events",
            ].map((tab) => (
              <li
                key={tab}
                onClick={() => {
                  setActiveTab(tab as any);
                  setSidebarOpen(false)
                  setView("list"); // reset to list view
                  setFormData({
                    id: null,
                    name: "",
                    sector: [],
                    image_url: "",
                    description: "",
                    title: "",
                    price: "",
                    year: "",
                    link: "",
                    discounted_price: "",
                    state: "",
                    country: [],
                    write_up: "",
                  });
                  setSidebarOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`cursor-pointer p-2 rounded-md transition w-fit ${
                  activeTab === tab ? "text-orange-500 " : "hover:text-gray-400"
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-gray-700  bottom-0 pt-4">
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center cursor-pointer gap-2 px-4 py-2 bg-orange-600 hover:bg-white text-white hover:text-orange-600 rounded-md font-semibold transition"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main onClick={ () => setSidebarOpen(false)} className="  p-10 overflow-auto z-40">
          <h2 className="text-3xl text-center font-semibold mb-8 capitalize">
            {activeTab}
          </h2>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <form
                onSubmit={handleSearch}
                className="hidden lg:flex border border-gray-500/40 rounded-xl px-3 py-2 items-center space-x-2 relative z-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#E25B2B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm text-gray-200 placeholder-gray-400 w-[120px]"
                />
              </form>
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
              className="bg-white/3 backdrop-blur-xl lg:w-[90vw] rounded-2xl p-6 border border-white/10 shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeData.map((item, index) => renderCard(item, index))}
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

                  <MultiSelect
                    label="Sector"
                    options={sectors}
                    value={formData.sector}
                    onChange={(selected) =>
                      setFormData({ ...formData, sector: selected })
                    }
                  />

                  <ImageUploader
                    label="Image"
                    value={formData.image_url}
                    onChange={(url) =>
                      setFormData({ ...formData, image_url: url })
                    }
                  />

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
                  <div>
                    <label className="block mb-2 text-sm">Write up</label>
                    <ReactQuill
                      value={formData.write_up}
                      onChange={(value) =>
                        setFormData({ ...formData, write_up: value })
                      }
                      modules={modules}
                      theme="snow"
                      placeholder="Write your interview content here..."
                      className="font-[100]"
                    />
                  </div>
                </>
              )}
              {activeTab === "exclusiveInterviews" && (
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
                    <label className="block mb-2 text-sm">description</label>
                    <input
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-transparent border border-gray-700"
                    />
                  </div>

                  <ImageUploader
                    label="Image"
                    value={formData.image_url}
                    onChange={(url) =>
                      setFormData({ ...formData, image_url: url })
                    }
                  />

                  <div>
                    <label className="block mb-2 text-sm">Write up</label>
                    <ReactQuill
                      value={formData.write_up}
                      onChange={(value) =>
                        setFormData({ ...formData, write_up: value })
                      }
                      modules={modules}
                      theme="snow"
                      placeholder="Write your interview content here..."
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

                  <ImageUploader
                    label="Image"
                    value={formData.image_url}
                    onChange={(url) =>
                      setFormData({ ...formData, image_url: url })
                    }
                  />

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
                  <div>
                    <label className="block mb-2 text-sm">Write up</label>
                    <ReactQuill
                      value={formData.write_up}
                      onChange={(value) =>
                        setFormData({ ...formData, write_up: value })
                      }
                      modules={modules}
                      theme="snow"
                      placeholder="Write your interview content here..."
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
                  <ImageUploader
                    label="Image"
                    value={formData.image_url}
                    onChange={(url) =>
                      setFormData({ ...formData, image_url: url })
                    }
                  />
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
                  <ImageUploader
                    label="Image"
                    value={formData.image_url}
                    onChange={(url) =>
                      setFormData({ ...formData, image_url: url })
                    }
                  />

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
                    <label className="block mb-2 text-sm">
                      Discounted Price
                    </label>
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

              <div className="flex justify-between gap-4">
                <button
                  type="submit"
                  className="bg-orange-600 text-white cursor-pointer px-6 py-2 rounded-full font-semibold hover:bg-orange-600/20 transition"
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

          <ScrollBackButton />

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute bottom-0 left-0 w-[1200px] h-[1200px] 
  bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_40%)] 
  blur-3xl pointer-events-none -z-90 fixed"
          />

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-0 fixed -right-200 w-[1200px] h-[1200px] 
  bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_50%)] 
  blur-3xl pointer-events-none -z-90"
          />
        </main>
        <SuccessPopup show={showPopup} />
      </div>
      )
    </>
  );
}
