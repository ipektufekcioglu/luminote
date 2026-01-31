"use client";

import { IoMdSettings } from "react-icons/io";
import { useSearch } from "@/contexts/SearchContext";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function AllNotesHeader() {
  return (
    <div className="hidden flex justify-between bg-background items-center px-4 pr-4 py-4 border-y-2 border-r-2 border-border lg:flex">
      <h1 className="text-2xl font-bold">All Notes</h1>
      <div className="flex gap-4 items-center">
        <SearchBar />

        <Link href="/settings">
          <IoMdSettings className="w-6 h-6 text-secondary" />
        </Link>
      </div>
    </div>
  );
}
