import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

/* =====================================================
   ✅ FIXED & ROBUST CORS CONFIGURATION
===================================================== */

// Allow both production and local URLs
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://the-business-insights.vercel.app",
];

// Always run this first
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Use Express JSON parser
app.use(express.json());

/* =====================================================
   ✅ SUPABASE CONNECTION
===================================================== */
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Supabase setup


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
  const { name, sector, image_url, description, country, year, link, write_up } = req.body;
  const { data, error } = await supabase
    .from("interviews")
    .insert([{ name, sector, image_url, description, country, year, link, write_up }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

app.get("/api/interviews", async (req, res) => {
  const { data, error } = await supabase.from("interviews").select("*").order("id", { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.get("/api/interviews/:id", async (req, res) => {
  const { id } = req.params;
  console.log("🔍 Fetching interview:", id);

  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("❌ Fetch error:", error.message);
    return res.status(404).json({ error: "Interview not found" });
  }

  res.json(data);
});

app.post("/api/exclusiveInterviews", async (req, res) => {
  const { name, sector, image_url, description, country, write_up, year, link } = req.body;
  const { data, error } = await supabase
    .from("exclusiveInterviews")
    .insert([{ name, sector, image_url, write_up, description, country, year, link }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

app.get("/api/exclusiveInterviews", async (req, res) => {
  const { data, error } = await supabase.from("exclusiveInterviews").select("*").order("id", { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});


// ===================================================================
// 🟢 ARTICLES
// ===================================================================
app.post("/api/articles", async (req, res) => {
  const { name, sector, image_url, description, write_up, country, year, } = req.body;
  const { data, error } = await supabase
    .from("articles")
    .insert([{ name, sector, write_up, image_url, description, country, year, }]);

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
// 🔎 UNIVERSAL GET-BY-ID ROUTE
// ===================================================================
app.get("/api/:table/:id", async (req, res) => {
  const { table, id } = req.params;
  console.log(`🔍 Fetching from ${table} with ID ${id}`);

  try {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error(`❌ Fetch error from ${table}:`, error?.message || "Not found");
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(data);
  } catch (err) {
    console.error(`⚠️ Unexpected error in GET /api/${table}/${id}:`, err.message);
    res.status(500).json({ error: "Internal server error" });
  }
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
// 🧩 ADMIN LOGIN
// ===================================================================

app.post("/api/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminUsername || !adminPasswordHash) {
      return res.status(500).json({ error: "Server not configured properly" });
    }

    if (username !== adminUsername) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const match = await bcrypt.compare(password, adminPasswordHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Admin login error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});






// ===================================================================
// 🚀 Start Server
// ===================================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
