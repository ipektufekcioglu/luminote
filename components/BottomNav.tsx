"use client";

import { IoIosHome } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { IoArchive } from "react-icons/io5";
import { FaTag } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 inset-x-0 overflow-hidden min-h-22 grid grid-cols-5 absolute gap-4 bottom-0 px-2 py-2 bg-[#fff0f0] border-2 border-dark-pink w-full items-center lg:hidden">
      <Link href={"/notes"}>
        <div className="flex flex-col justify-center items-center">
          <IoIosHome
            className={`${
              pathname.endsWith("/notes")
                ? "text-[#CE3E97]"
                : "text-neutral-600"
            } w-6 h-6`}
          />
          <p
            className={`${
              pathname.endsWith("/notes")
                ? "text-[#CE3E97]"
                : "text-neutral-600"
            }`}
          >
            Home
          </p>
        </div>
      </Link>
      <Link href={"/notes/search"}>
        <div className="flex flex-col justify-center items-center">
          <IoSearchSharp
            className={`${
              pathname.endsWith("/search")
                ? "text-[#CE3E97]"
                : "text-neutral-600"
            } w-6 h-6`}
          />
          <p
            className={`${
              pathname.endsWith("/search")
                ? "text-[#CE3E97]"
                : "text-neutral-600"
            }`}
          >
            Search
          </p>
        </div>
      </Link>
      <Link href={"/notes/archived"}>
        <div className="flex flex-col justify-center items-center">
          <IoArchive
            className={`${
              pathname.endsWith("/archived")
                ? "text-[#CE3E97]"
                : "text-neutral-600"
            } w-6 h-6`}
          />
          <p
            className={`${
              pathname.endsWith("/archived")
                ? "text-[#CE3E97]"
                : "text-neutral-600"
            }`}
          >
            Archived
          </p>
        </div>
      </Link>
      <Link href={"/notes/tags"}>
        <div className="flex flex-col justify-center items-center">
          <FaTag
            className={`${
              pathname.endsWith("/tags") ? "text-[#CE3E97]" : "text-neutral-600"
            } w-6 h-6`}
          />
          <p
            className={`${
              pathname.endsWith("/tags") ? "text-[#CE3E97]" : "text-neutral-600"
            }`}
          >
            Tags
          </p>
        </div>
      </Link>
      <Link href={"/settings"}>
        <div className="flex flex-col justify-center items-center">
          <IoMdSettings
            className={`${
              pathname.endsWith("/settings")
                ? "text-[#CE3E97]"
                : "text-neutral-600"
            } w-6 h-6`}
          />
          <p
            className={`${
              pathname.endsWith("/settings")
                ? "text-[#CE3E97]"
                : "text-neutral-600"
            }`}
          >
            Settings
          </p>
        </div>
      </Link>
    </div>
  );
}
