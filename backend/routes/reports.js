import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * POST /api/reports
 * Add a new report
 */
router.post("/", async (req, res) => {
   console.log("🛰️ Received body:", req.body); 

  const { title, image_url, price, discounted_price, link, description } = req.body;

  const { data, error } = await supabase
    .from("reports")
    .insert([{ title, image_url, price, discounted_price, link, description }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
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
    .order("id", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});
/**
 * PUT /api/[table]/:id
 * Update an item
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  const { data, error } = await supabase
    .from("reports") // change to the right table name (e.g. "articles")
    .update(updatedFields)
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

/**
 * DELETE /api/[table]/:id
 * Delete an item
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("reports").delete().eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});


export default router;
