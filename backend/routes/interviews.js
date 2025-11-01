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
  const { name, sector, image_url, description } = req.body;

  const { data, error } = await supabase
    .from("interviews")
    .insert([{ name, sector, image_url, description }])
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
    .from("interviews")
    .select("*")
    .order("id", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
