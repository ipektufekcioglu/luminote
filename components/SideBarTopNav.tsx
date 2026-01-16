"use client";
import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { IoArchive } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function SideBarTopNav() {
  const path = usePathname();
  const isArchived = path.includes("archived");
  return (
    <>
      <Link href={"/notes"}>
        <div
          className={`flex items-center gap-1 px-2 cursor-pointer ${
            !isArchived ? "text-[#CE3E97]" : "text-neutral-700"
          }`}
        >
          <IoIosHome />
          <p>All Notes</p>
        </div>
      </Link>
      <Link href={"/notes/archived"}>
        <div
          className={`flex items-center gap-1 border-b border-dark-pink px-2 pb-4 cursor-pointer ${
            isArchived ? "text-[#CE3E97]" : "text-neutral-700"
          }`}
        >
          <IoArchive />
          <p>Archived Notes</p>
        </div>
      </Link>
    </>
  );
}
