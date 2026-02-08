"use client";

import Image from "next/image";
import FeatherImg from "@/public/feather.png";
import { useState } from "react";
import createSupabaseBrowserClient from "@/lib/supabaseBrowser";
import { toast } from "sonner";

export default function Home() {
  const [email, setEmail] = useState("");
  const supabase = createSupabaseBrowserClient();

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("You must fill in the email field");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      },
    );

    if (resetError) {
      toast.error("Something went wrong");
    } else {
      toast.success("Check your email for password reset");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center px-4">
      <div className="flex flex-col border border-neutral-200 rounded-xl bg-white/80 p-12 md:min-w-lg">
        <div className="flex gap-2 items-center justify-center">
          <Image src={FeatherImg} alt="feather logo" className="w-8" />
          <h1 className="font-pacifico text-2xl">LumiNote</h1>
        </div>
        <h1 className="font-montserrat text-2xl font-medium text-center mt-8">
          Forgotten your password?
        </h1>
        <p className="font-albert text-sm text-center font-light">
          Enter your email below, and we’ll send you a link to reset it.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col font-albert gap-2 my-6"
        >
          <label className="text-sm">Email Address</label>
          <input
            onChange={(e) => handleChange(e)}
            placeholder="email@example.com"
            name="email"
            type="email"
            className="w-full border border-neutral-200 rounded-lg px-2 py-2"
          />
          <button className="bg-fuchsia-500/75 text-white py-2 text-sm rounded-lg cursor-pointer">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
