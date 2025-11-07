import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Query for that admin
  const { data, error } = await supabase
    .from("admins")
    .select("password_hash")
    .eq("username", username)
    .single();

  if (error || !data)
    return Response.json({ success: false, message: "Invalid username" }, { status: 401 });

  // Verify password using Postgres' crypt function
  const { data: validCheck } = await supabase.rpc("check_admin_password", {
    username_input: username,
    password_input: password,
  });

  if (!validCheck)
    return Response.json({ success: false, message: "Invalid password" }, { status: 401 });

  // ✅ Auth successful
  return Response.json({ success: true });
}
