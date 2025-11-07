import bcrypt from "bcryptjs";

const password = "business-insight"; // 👈 Replace this with your chosen admin password

const hashed = await bcrypt.hash(password, 10);

console.log("🔒 Hashed password:\n", hashed);