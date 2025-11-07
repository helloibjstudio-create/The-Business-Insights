import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { getSupabase } from "./supabaseClient.js";

dotenv.config();

const app = express();

// ==========================================================
// 🔧 Middleware
// ==========================================================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://the-business-insights.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// ==========================================================
// 🧩 Health Check
// ==========================================================
app.get("/", (req, res) => {
  res.send("✅ Backend is running 🚀");
});

// ==========================================================
// 🧠 Test Supabase Connection
// ==========================================================
app.get("/test-db", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("interviews").select("*").limit(1);
    if (error) throw error;
    res.json({ connected: true, rows: data.length });
  } catch (err) {
    console.error("❌ Supabase connection failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================================
// 🟠 INTERVIEWS
// ==========================================================
app.post("/api/interviews", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { name, sector, image_url, description, country, year, link, write_up } =
      req.body;

    const { data, error } = await supabase
      .from("interviews")
      .insert([{ name, sector, image_url, description, country, year, link, write_up }]);

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/interviews", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("interviews")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/interviews/:id", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { id } = req.params;
    const { data, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: "Interview not found" });
  }
});

// ==========================================================
// 🟢 ARTICLES
// ==========================================================
app.post("/api/articles", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { name, sector, image_url, description, write_up, country, year } =
      req.body;
    const { data, error } = await supabase
      .from("articles")
      .insert([{ name, sector, image_url, description, write_up, country, year }]);
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/articles", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("id", { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================================
// 🔵 REPORTS
// ==========================================================
app.post("/api/reports", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { image_url, title, price, discounted_price } = req.body;
    const { data, error } = await supabase
      .from("reports")
      .insert([{ image_url, title, price, discounted_price }]);
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/reports", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("id", { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================================
// 🔴 EVENTS
// ==========================================================
app.post("/api/events", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { name, sector, image_url, description, country, state, year } = req.body;
    const { data, error } = await supabase
      .from("events")
      .insert([{ name, sector, image_url, description, country, state, year }]);
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("id", { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================================
// 🔧 Universal Update / Delete Routes
// ==========================================================
app.put("/api/:table/:id", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { table, id } = req.params;
    const updated = { ...req.body };
    Object.keys(updated).forEach(
      (k) => updated[k] === "" && (updated[k] = null)
    );

    const { data, error } = await supabase
      .from(table)
      .update(updated)
      .eq("id", id)
      .select();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/:table/:id", async (req, res) => {
  try {
    const supabase = getSupabase();
    const { table, id } = req.params;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================================
// 🚀 Start Server
// ==========================================================
const PORT = process.env.PORT || 5000;
try {
  getSupabase(); // test initialization
  console.log("✅ Supabase connection ready");
} catch (err) {
  console.error("⚠️ Supabase not ready:", err.message);
}

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
