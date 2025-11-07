import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password)
    return Response.json({ error: "Missing fields" }, { status: 400 });

  const { data, error } = await supabase
    .from("admin_users")
    .select("password_hash")
    .eq("username", username)
    .single();

  if (error || !data)
    return Response.json({ error: "Invalid credentials" }, { status: 401 });

  const match = await bcrypt.compare(password, data.password_hash);
  if (!match)
    return Response.json({ error: "Invalid credentials" }, { status: 401 });

  // Create a simple session token
  const token = crypto.randomUUID();

  // (optional) you could store this token in localStorage or cookies
  return Response.json({ success: true, token });
}
