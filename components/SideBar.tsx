import Image from "next/image";
import FeatherImg from "@/public/feather.png";
import { createClient } from "@/auth/server";
import SideBarClient from "./SideBarClient";
import type { Tag } from "@/app/types/index";
import SideBarTopNav from "./SideBarTopNav";

export default async function SideBar() {
  const supabase = await createClient();

  const { data: tags } = await supabase
    .from("tags")
    .select("*")
    .order("name", { ascending: true });

  const initialTagNames = tags as Tag[];

  return (
    <div className="hidden flex flex-col gap-4 bg-[#fff0f0] w-1/5 border-2 border-dark-pink h-screen px-6 py-4 lg:flex">
      <div className="flex px-2 py-2">
        <Image src={FeatherImg} alt="feather logo" className="w-8" />
        <h1 className="font-pacifico text-2xl">LumiNote</h1>
      </div>
      <SideBarTopNav />
      <div className="px-2">
        <p className="text-neutral-500 mb-2">Tags</p>
        <SideBarClient initialTagNames={initialTagNames} />
      </div>
    </div>
  );
}
