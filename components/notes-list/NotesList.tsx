"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "../SearchBar";

export default function NotesList({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAllNotes = pathname.endsWith("notes");
  const isAllArchived = pathname.endsWith("archived");
  const isSearch = pathname.endsWith("search");

  return isAllNotes || isAllArchived || isSearch ? (
    <div className="w-full h-full lg:flex lg:flex-col lg:w-72 flex-shrink-0 px-4 py-4 lg:border-b-2 lg:border-r-2 border-dark-pink overflow-hidden">
      <h1 className="text-2xl font-bold lg:hidden">
        {isSearch ? "Search" : isAllArchived ? "Archived Notes" : "All Notes"}
      </h1>
      {isSearch ? (
        <div className="block mt-2 lg:hidden">
          <SearchBar />
        </div>
      ) : (
        <></>
      )}
      <Link href={"/notes/new"}>
        <button className="hidden text-white bg-[#CE3E97] cursor-pointer rounded-lg px-2 py-1 w-full lg:block">
          Create New Note
        </button>
      </Link>
      {children}
    </div>
  ) : (
    <div className="hidden w-full h-full lg:flex lg:flex-col lg:w-72 flex-shrink-0 px-4 py-4 lg:border-b-2 lg:border-r-2 border-dark-pink overflow-hidden">
      <h1 className="text-2xl font-bold lg:hidden">All Notes</h1>
      <Link href={"/notes/new"}>
        <button className="hidden text-white bg-[#CE3E97] cursor-pointer rounded-lg px-2 py-1 w-full lg:block">
          Create New Note
        </button>
      </Link>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">{children}</div>
    </div>
  );
}
