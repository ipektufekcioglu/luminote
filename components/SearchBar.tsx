"use client";

import { IoSearchOutline } from "react-icons/io5";
import { useSearch } from "@/contexts/SearchContext";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const { searchText, setSearchText } = useSearch();
  const pathname = usePathname();
  const [path, setPath] = useState(pathname);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  if (pathname !== path) {
    setSearchText("");
    setPath(pathname);
  }

  return (
    <div className="flex flex-col text-secondary">
      <div className="relative ">
        <IoSearchOutline className="w-4 absolute top-3 left-1" />

        <input
          onChange={handleChange}
          placeholder="Search by title, content, or tags…"
          className="border rounded-lg text-neutral-500 px-6 py-2 text-sm"
        />
      </div>
      {searchText ? (
        <p className="block text-sm text-secondary mt-2 lg:hidden">
          All notes matching "{searchText}" are displayed below.
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}
