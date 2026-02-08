"use client";

import Image from "next/image";
import FeatherImg from "@/public/feather.png";
import EyeImg from "@/public/show.png";
import InfoImg from "@/public/info.png";
import createSupabaseBrowserClient from "@/lib/supabaseBrowser";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isValidSession, setIsValidSession] = useState(false);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          setIsValidSession(true);
        }
      },
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsValidSession(true);
      } else {
        toast.error("Invalid or expired reset link. Please request a new one.");
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async () => {
    if (!newPass || !confirmPass) {
      toast.error("You must fill in all fields");
    }

    if (newPass !== confirmPass) {
      toast.error("Your password should match the confirmation");
    }

    if (newPass.length < 6) {
      toast.error("Your password should be at least 6 characters");
    }

    try {
      const { data, error: updateError } = await supabase.auth.updateUser({
        password: newPass,
      });

      if (updateError) {
        toast.error("An error occured");
      } else {
        toast.success("Password successfuly updated");
        setTimeout(async () => {
          await supabase.auth.signOut();
          router.push("/sign-in");
        }, 2000);
      }
    } catch (error) {
      console.error("An error occured", error.message);
    }
  };

  const handleNewChange = (e) => {
    e.preventDefault();
    setNewPass(e.target.value);
  };

  const handleConfirmChange = (e) => {
    e.preventDefault();
    setConfirmPass(e.target.value);
  };

  return (
    <div className="flex min-h-screen justify-center items-center px-4">
      <div className="flex flex-col border border-neutral-200 rounded-xl bg-white/80 p-12 md:min-w-lg">
        <div className="flex gap-2 items-center justify-center">
          <Image src={FeatherImg} alt="feather logo" className="w-8" />
          <h1 className="font-pacifico text-2xl">LumiNote</h1>
        </div>
        <h1 className="font-montserrat text-2xl font-medium text-center mt-8">
          Reset Your Password
        </h1>
        <p className="font-albert text-sm text-center font-light">
          Choose a new password to secure your account.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col font-albert gap-2 my-6"
        >
          <label className="text-sm">New Password</label>
          <div className="relative">
            <input
              placeholder="******"
              onChange={(e) => handleNewChange(e)}
              name="password"
              type="password"
              className="w-full border border-neutral-200 rounded-lg px-2 py-2"
            />
            <Image
              src={EyeImg}
              alt="eye symbol"
              className="w-4 absolute right-3 top-3"
            />
          </div>
          <div className="flex gap-2 mb-2">
            <Image src={InfoImg} alt="info icon" className="w-4" />
            <p className="text-xs text-neutral-600">At least 8 characters</p>
          </div>
          <label className="text-sm">Confirm New Password</label>
          <div className="relative">
            <input
              placeholder="******"
              onChange={(e) => handleConfirmChange(e)}
              name="password"
              type="password"
              className="w-full border border-neutral-200 rounded-lg px-2 py-2"
            />
            <Image
              src={EyeImg}
              alt="eye symbol"
              className="w-4 absolute right-3 top-3"
            />
          </div>
          <button className="bg-fuchsia-500/75 text-white py-2 text-sm rounded-lg cursor-pointer">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
