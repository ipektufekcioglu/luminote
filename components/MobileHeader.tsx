"use client";
import FeatherImg from "@/public/feather.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function MobileHeader() {
  const path = usePathname();
  return path === "/" ? (
    <></>
  ) : (
    <header className="min-h-22 bg-chart-1 flex items-center border-2 border-border justify-between px-4 lg:hidden">
      <div className="flex">
        <Image src={FeatherImg} alt="feather logo" className="w-8" />
        <h1 className="font-pacifico text-2xl text-chart-2">LumiNote</h1>
      </div>
    </header>
  );
}
