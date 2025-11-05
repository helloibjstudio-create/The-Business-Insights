import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// 🟢 Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/**
 * POST /api/reports
 * Add a new report
 */
router.post("/", async (req, res) => {
  console.log("🛰️ Received body:", req.body);

  const { title, image_url, price, discounted_price, link, description } =
    req.body;

  // Basic validation
  if (!title || !image_url) {
    return res.status(400).json({ error: "Title and image_url are required." });
  }

  const { data, error } = await supabase
    .from("reports")
    .insert([{ title, image_url, price, discounted_price, link, description }])
    .select();

  if (error) {
    console.error("❌ Supabase insert error:", error.message);
    return res.status(400).json({ error: error.message });
  }

  console.log("✅ Inserted data:", data);
  res.json({ success: true, data });
});

/**
 * GET /api/reports
 * Fetch all reports
 */
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false }); // ⬅️ better ordering field

  if (error) {
    console.error("❌ Supabase fetch error:", error.message);
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

/**
 * PUT /api/reports/:id
 * Update an item
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  const { data, error } = await supabase
    .from("reports")
    .update(updatedFields)
    .eq("id", id)
    .select();

  if (error) {
    console.error("❌ Supabase update error:", error.message);
    return res.status(400).json({ error: error.message });
  }

  res.json({ success: true, data });
});

/**
 * DELETE /api/reports/:id
 * Delete an item
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("reports").delete().eq("id", id);

  if (error) {
    console.error("❌ Supabase delete error:", error.message);
    return res.status(400).json({ error: error.message });
  }

  res.json({ success: true });
});

export default router;
