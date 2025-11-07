import express from "express";
import bcrypt from "bcryptjs";

const router = express.Router();

// POST /api/admin
router.post("/", async (req, res) => {
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

export default router;
