"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BusinessHero, BusinessLogo } from "@/public";

export default function Login() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert("Invalid credentials");
      return;
    }

    router.replace("/adminDash");
  }


  useEffect(() => {
    if (localStorage.getItem("autoLoggedOut") === "true") {
      localStorage.removeItem("autoLoggedOut");
    }
  }, []);

  function InlineSpinner() {
    return (
      <span className="ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    );
  }


  return (
    <div className="relative h-screen w-screen flex items-center font-sans justify-center">
      {/* Background Image */}
      <Image
        src={BusinessHero} // Replace with your image path
        alt="Background"
        fill
        className="object-cover opacity-50"
        priority
      />

      {/* Frosted Glass Login Container */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-10 w-full max-w-md shadow-lg flex flex-col gap-6">
        <Image
          src={BusinessLogo}
          alt="Business Logo"
          width={230}
          height={230}
          priority
          className="relative m-auto"
        />
        <h2 className="text-2xl font-semibold text-white text-center">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            className="p-3 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="p-3 rounded-md bg-white/20 placeholder-white text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="py-3 bg-orange-600 text-white rounded-md font-semibold hover:bg-white/30 cursor-pointer transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                Logging in
                <InlineSpinner />
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
