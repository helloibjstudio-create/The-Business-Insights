import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ Only use this on the server
);

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(`uploads/${fileName}`, file, { upsert: true });

  if (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { data: publicData } = supabase.storage.from("images").getPublicUrl(`uploads/${fileName}`);

  return NextResponse.json({ url: publicData?.publicUrl });
}
    