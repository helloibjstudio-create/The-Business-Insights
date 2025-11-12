"use client";

import { useState } from "react";
import { Image as ImageIcon, UploadCloud } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

interface ImageUploaderProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default function ImageUploader({
  label = "Image URL or Upload",
  value,
  onChange,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(value || "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Upload failed:", uploadError);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    const publicUrl = publicData?.publicUrl;
    if (publicUrl) {
      console.log("✅ Uploaded image public URL:", publicUrl);
      setPreview(publicUrl);
      onChange(publicUrl);
    } else {
      console.error("❌ No public URL returned from Supabase");
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <div className="relative border border-gray-700 rounded-lg bg-black/40 p-3 hover:border-orange-500 transition">
        <div className="flex items-center gap-2">
          <ImageIcon size={16} className="text-orange-500" />
          <input
            type="text"
            placeholder="Paste image URL or upload below"
            value={value}
            onChange={(e) => {
              setPreview(e.target.value);
              onChange(e.target.value);
            }}
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-sm"
          />
        </div>

        {/* Upload Button */}
        <label className="mt-3 flex justify-center items-center gap-2 border border-dashed border-gray-600 rounded-md py-3 text-gray-400 hover:border-orange-500 hover:text-orange-400 cursor-pointer transition">
          <UploadCloud size={18} />
          <span className="text-sm">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Image Preview */}
        {preview && preview.trim() !== "" && (
          <div className="mt-3 relative rounded-md overflow-hidden border border-gray-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
