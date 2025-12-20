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
  console.log("Received body:", req.body);
  const { name, sector, image_url, description, country, year, link } = req.body;

  const { data, error } = await supabase
    .from("exclusiveInterviews")
    .insert([{ name, sector, image_url, description, year, country, link }])
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
    .from("exclusiveInterviews")
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
    .from("exclusiveInterviews") // change to the right table name (e.g. "articles")
    .update(updatedFields)
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

router.patch("/:id/hide", async (req, res) => {
  const { id } = req.params;
  const { hidden } = req.body; // boolean: true to hide, false to unhide

  const { data, error } = await supabase
    .from("exclusiveInterviews")
    .update({ hidden })
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

  const { error } = await supabase.from("exclusiveInterviews").delete().eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});


export default router;
