import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "*",  // or specify your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// router.get("/", async (req, res) => {
//   try {
//     const [countries, sectors, years] = await Promise.all([
//       supabase.from("interviews").select("description").not("description", "is", null),
//       supabase.from("interviews").select("sector").not("sector", "is", null),
//       supabase.from("interviews").select("year").not("year", "is", null),
//     ]);

//     res.json({
//       countries: [...new Set(countries.data.map((c) => c.description))],
//       sectors: [...new Set(sectors.data.map((s) => s.sector))],
//       years: [...new Set(years.data.map((y) => y.year))],
//     });
//   } catch (error) {
//     console.error("Filter API error:", error);
//     res.status(500).json({ error: "Failed to fetch filters" });
//   }
// });

// export default router;

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
  const { name, sector, image_url, description, country, year, link } = req.body;
  const { data, error } = await supabase
    .from("interviews")
    .insert([{ name, sector, image_url, description, country, year, link }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

app.get("/api/interviews", async (req, res) => {
  const { data, error } = await supabase.from("interviews").select("*").order("id", { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.post("/api/exclusiveInterviews", async (req, res) => {
  const { name, sector, image_url, description, country, year, link } = req.body;
  const { data, error } = await supabase
    .from("exclusive")
    .insert([{ name, sector, image_url, description, country, year, link }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

app.get("/api/exclusiveInterviews", async (req, res) => {
  const { data, error } = await supabase.from("exclusive").select("*").order("id", { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});


// ===================================================================
// 🟢 ARTICLES
// ===================================================================
app.post("/api/articles", async (req, res) => {
  const { name, sector, image_url, description, country, year, } = req.body;
  const { data, error } = await supabase
    .from("articles")
    .insert([{ name, sector, image_url, description, country, year, }]);

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
  const { image_url, title, price, discounted_price,  } = req.body;
  const { data, error } = await supabase
    .from("reports")
    .insert([{ image_url, title, price, discounted_price,  }]);

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
  const { name, sector, image_url, description, country, state, year } = req.body;
  const { data, error } = await supabase
    .from("events")
    .insert([{ name, sector, image_url, description, country, state, year }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

app.get("/api/events", async (req, res) => {
  const { data, error } = await supabase.from("events").select("*").order("id", { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.put("/api/:table/:id", async (req, res) => {
  const { table, id } = req.params;
  const updatedFields = req.body;

  // 🧹 Convert empty strings to null for numeric fields
  for (const key in updatedFields) {
    if (updatedFields[key] === "") updatedFields[key] = null;
  }

  console.log(`🟡 Updating ${table} with ID ${id}:`, updatedFields);

  const { data, error } = await supabase
    .from(table)
    .update(updatedFields)
    .eq("id", id)
    .select();

  if (error) {
    console.error("❌ Update error:", error.message);
    return res.status(400).json({ error: error.message });
  }

  res.json({ success: true, data });
});

// ===================================================================
// 🗑️ UNIVERSAL DELETE ROUTE
// ===================================================================
app.delete("/api/:table/:id", async (req, res) => {
  const { table, id } = req.params;
  console.log(`🔴 Deleting from ${table} where id = '${id}'`);

  // 👇 Try a quick existence check
  const { data: checkData, error: checkError } = await supabase
    .from(table)
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (checkError) {
    console.error("❌ Pre-check error:", checkError.message);
    return res.status(400).json({ error: checkError.message });
  }
  console.log("🔎 Found before delete:", checkData);

  const { data, error } = await supabase
    .from(table)
    .delete()
    // 👇 Explicit cast to UUID
    .eq("id", id.trim());

  if (error) {
    console.error("❌ Delete error:", error.message);
    return res.status(400).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    console.warn(`⚠️ No record found with id = ${id} in ${table}`);
    return res.json({ success: false, message: "No record found" });
  }

  console.log(`✅ Deleted 1 record from ${table}`);
  res.json({ success: true });
});





// ===================================================================
// 🚀 Start Server
// ===================================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
