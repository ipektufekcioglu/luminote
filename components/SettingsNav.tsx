"use client";
import { IoSunnyOutline } from "react-icons/io5";
import { AiOutlineFontSize } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsNav() {
  const path = usePathname();
  console.log(path);
  return (
    <div className="w-full h-full flex flex-col items-center lg:w-72 text-secondary flex-shrink-0 px-8 py-4 lg:border-b-2 lg:border-r-2 bg-background border-border overflow-hiden">
      <Link
        href={"/settings/color-theme"}
        className="w-full max-w-md lg:max-w-xl border-b px-4 py-4"
      >
        <button className="flex items-center justify-between  w-full max-w-md lg:max-w-xl ">
          <div
            className={`flex items-center gap-2 ${path === "/settings/color-theme" ? "text-[#CE3E97]" : ""}`}
          >
            <IoSunnyOutline />
            Color Theme
          </div>
          <IoIosArrowForward />
        </button>
      </Link>
      <Link
        href={"/settings/font-theme"}
        className="w-full max-w-md lg:max-w-xl border-b px-4 py-4"
      >
        <button className="flex items-center justify-between  w-full max-w-md lg:max-w-xl ">
          <div
            className={`flex items-center gap-2 ${path === "/settings/font-theme" ? "text-[#CE3E97]" : ""}`}
          >
            <AiOutlineFontSize />
            Font Theme
          </div>
          <IoIosArrowForward />
        </button>
      </Link>
      <Link
        href={"/settings/change-password"}
        className="w-full max-w-md lg:max-w-xl border-b px-4 py-4"
      >
        <button className="flex items-center justify-between w-full max-w-md lg:max-w-2xl ">
          <div
            className={`flex items-center gap-2 ${path === "/settings/change-password" ? "text-[#CE3E97]" : ""}`}
          >
            <RiLockPasswordLine />
            Change Password
          </div>
          <IoIosArrowForward />
        </button>
      </Link>
      <button className="flex items-center justify-between w-full max-w-md lg:max-w-2xl border-b px-4 py-4">
        <div className="flex items-center gap-2">
          <TbLogout />
          Logout
        </div>
        <IoIosArrowForward />
      </button>
    </div>
  );
}
