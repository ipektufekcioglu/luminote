import Image from "next/image";
import FeatherImg from "@/public/feather.png";
import LogOutButton from "./LogoutButton";
import Link from "next/link";
import { getUser } from "@/auth/server";

export default async function Header() {
  const user = await getUser();
  return (
    <header className="min-h-22 bg-chart-1 flex items-center border-2 border-border justify-between px-4">
      <div className="flex">
        <Image src={FeatherImg} alt="feather logo" className="w-8" />
        <h1 className="font-pacifico text-2xl text-char-2">LumiNote</h1>
      </div>
      <div className="flex gap-4 ">
        {user ? (
          <LogOutButton />
        ) : (
          <div className="flex gap-4 ">
            <button className="px-4 py-1 border-[#CE3E97] shadow-lg rounded-md text-[#CE3E97] font-albert font-semibold border cursor-pointer">
              <Link href={"/sign-in"}>Sign in</Link>
            </button>
            <button className="hidden bg-[#CE3E97] px-4 py-1 rounded-md shadow-lg text-white font-albert font-semibold border md:block cursor-pointer">
              <Link href={"/sign-up"}>Sign Up</Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
