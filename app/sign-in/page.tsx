"use client";

import Image from "next/image";
import FeatherImg from "@/public/feather.png";
import GoogleImg from "@/public/google.png";
import EyeImg from "@/public/show.png";
import Link from "next/link";
import { useActionState } from "react";
import loginAction from "@/app/sign-in/actions";

export default function Home() {
  const initialState = { success: false, message: "" };
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <div className="flex min-h-screen justify-center items-center px-4">
      <div className="flex flex-col border border-neutral-200 rounded-xl bg-white/80 p-12 md:min-w-lg">
        <div className="flex gap-2 items-center justify-center">
          <Image src={FeatherImg} alt="feather logo" className="w-8" />
          <h1 className="font-pacifico text-2xl">LumiNote</h1>
        </div>
        <h1 className="font-montserrat text-2xl font-medium text-center mt-8">
          Welcome to LumiNote
        </h1>
        <p className="font-albert text-sm text-center font-light">
          Please log in to continue
        </p>
        <form
          action={formAction}
          className="flex flex-col font-albert gap-2 my-6"
        >
          {state.message && (
            <p className="text-sm text-red-800">{state.message}</p>
          )}
          <label className="text-sm">Email Address</label>
          <input
            placeholder="email@example.com"
            name="email"
            type="email"
            className="w-full border border-neutral-200 rounded-lg px-2 py-2"
          />
          <div className="flex justify-between">
            <label className="text-sm">Password</label>
            <p className="text-xs text-neutral-600 underline">Forgot</p>
          </div>
          <div className="relative">
            <input
              placeholder="******"
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
          <button disabled={isPending} className="bg-fuchsia-500/75 text-white py-2 text-sm rounded-lg cursor-pointer">
            Login
          </button>
        </form>
        <p className="font-albert text-sm text-center font-light py-4 border-t border-neutral-200">
          Or log in with:
        </p>
        <button className="text-neutral-950 font-inter py-2 text-sm rounded-lg border border-neutral-200 flex justify-center items-center gap-2 font-medium cursor-pointer">
          <Image src={GoogleImg} alt="google logo" />
          Google
        </button>
        <p className="py-6 border-b border-neutral-200 font-albert text-sm text-center text-neutral-600">
          No account yet?
          <Link href="/sign-up" className="text-neutral-950">
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
