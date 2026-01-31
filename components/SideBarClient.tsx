"use client";

import createSupabaseBrowserClient from "@/lib/supabaseBrowser";
import { useEffect, useState } from "react";
import type { SideBarClientProps, Tag } from "@/app/types/index";
import { FaTag } from "react-icons/fa6";
import { useFilterTag } from "@/contexts/TagFilterContext";

export default function SideBarClient({ initialTagNames }: SideBarClientProps) {
  const [tags, setTags] = useState(initialTagNames);
  const supabase = createSupabaseBrowserClient();
  const { filterTag, setFilterTag } = useFilterTag();

  useEffect(() => {
    const channel = supabase
      .channel("tags_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tags" },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            const newTag = payload.new as Tag;
            setTags((prev) => [...prev, newTag]);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const handleClick = (tagName: string) => setFilterTag(tagName);

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => handleClick("Show All")}
        key={"showAll"}
        className="flex items-center cursor-pointer"
      >
        <p>Show All</p>
      </div>
      {tags.map((t) => (
        <div
          onClick={() => handleClick(t.name)}
          key={t.name}
          className={`flex gap-2 items-center cursor-pointer ${
            filterTag === t.name ? "text-[#CE3E97]" : "text-secondary"
          }`}
        >
          <FaTag />
          <p>{t.name}</p>
        </div>
      ))}
    </div>
  );
}
