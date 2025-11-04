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
  const { title, image_url, price, discounted_price, link } = req.body;

  const { data, error } = await supabase
    .from("reports")
    .insert([{ title, image_url, price, discounted_price, link }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

console.log("Received body:", req.body);

/**
 * GET /api/interviews
 * Fetch all interviews
 */
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("id", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
