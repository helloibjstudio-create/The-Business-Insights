import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Test connection to Supabase
app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase.from("interviews").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});


// ===================================================================
// 🟠 INTERVIEWS
// ===================================================================
app.post("/api/interviews", async (req, res) => {
  const { name, sector, image_url, description } = req.body;
  const { data, error } = await supabase
    .from("interviews")
    .insert([{ name, sector, image_url, description }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

app.get("/api/interviews", async (req, res) => {
  const { data, error } = await supabase.from("interviews").select("*").order("id", { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});


// ===================================================================
// 🟢 ARTICLES
// ===================================================================
app.post("/api/articles", async (req, res) => {
  const { name, sector, image_url, description } = req.body;
  const { data, error } = await supabase
    .from("articles")
    .insert([{ name, sector, image_url, description }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

app.get("/api/articles", async (req, res) => {
  const { data, error } = await supabase.from("articles").select("*").order("id", { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});


// ===================================================================
// 🔵 REPORTS
// ===================================================================
app.post("/api/reports", async (req, res) => {
  const { image_url, title, price } = req.body;
  const { data, error } = await supabase
    .from("reports")
    .insert([{ image_url, title, price }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

app.get("/api/reports", async (req, res) => {
  const { data, error } = await supabase.from("reports").select("*").order("id", { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});


// ===================================================================
// 🔴 EVENTS
// ===================================================================
app.post("/api/events", async (req, res) => {
  const { name, sector, image_url, description } = req.body;
  const { data, error } = await supabase
    .from("events")
    .insert([{ name, sector, image_url, description }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

app.get("/api/events", async (req, res) => {
  const { data, error } = await supabase.from("events").select("*").order("id", { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});


// ===================================================================
// 🚀 Start Server
// ===================================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
