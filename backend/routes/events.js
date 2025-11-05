import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * POST /api/interviews
 * Add a new interview
 */
router.post("/", async (req, res) => {
  const { name, sector, image_url, description, country, state, year, link } = req.body;

  const { data, error } = await supabase
    .from("events")
    .insert([{ name, sector, image_url, description, country, state, year, link }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

/**
 * GET /api/interviews
 * Fetch all interviews
 */
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("events")
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
    .from("events") // change to the right table name (e.g. "articles")
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

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});


export default router;
