// /api/admin.js
import bcrypt from "bcryptjs";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHash) {
    return res.status(500).json({ error: "Server not configured properly" });
  }

  if (username !== adminUsername) {
    return res.status(401).json({ error: "Invalid username" });
  }

  bcrypt.compare(password, adminPasswordHash).then((match) => {
    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json({ success: true });
  });
}
