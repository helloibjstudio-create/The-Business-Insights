"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Invalid credentials");
      return;
    }

    router.replace("/adminDash");
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 max-w-sm text-white mx-auto mt-20"
    >
      <input
        type="email"
        className="border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border p-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white py-2 rounded">
        Login
      </button>
    </form>
  );
}
