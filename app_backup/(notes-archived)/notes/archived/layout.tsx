import BottomNav from "@/components/BottomNav";
import SideBar from "@/components/SideBar";
import NotesList from "@/components/notes-list/NotesList";
import AllNotesHeader from "@/components/AllNotesHeader";
import type { NoteTagRow } from "@/app/types/index";
import { createClient } from "@/auth/server";
import NotesListClient from "@/components/notes-list/NotesListClient";
import SearchProvider from "@/contexts/SearchContext";
import TagFilterProvider from "@/contexts/TagFilterContext";
import { ReactNode } from "react";

export default async function ArchivedNotesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .eq("is_archived", true)
    .eq("is_deleted", false)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching notes:", error.message);
    throw new Error("Failed to fetch notes");
  }

  const initialTagsMap: Record<string, string[]> = {};

  for (const note of notes) {
    const { data: tagData, error: noteTagsError } = await supabase
      .from("note_tags")
      .select("tag_id, tags (name)")
      .eq("note_id", note.id);

    if (tagData && !noteTagsError) {
      const rows = tagData as unknown as NoteTagRow[];
      const tagNames = rows
        .map((row) => row.tags?.name)
        .filter((name): name is string => Boolean(name));

      initialTagsMap[note.id] = tagNames;
    } else {
      initialTagsMap[note.id] = [];
    }
  }

  return (
    <div className="static">
      <div className="flex">
        <TagFilterProvider>
          <SideBar />
          <SearchProvider>
            <div className="flex flex-col flex-1">
              <AllNotesHeader />
              <div className="flex flex-1">
                <NotesList>
                  <NotesListClient
                    initialNotes={notes}
                    initialTagsMap={initialTagsMap}
                  />
                </NotesList>
                {children}
              </div>
            </div>
          </SearchProvider>
        </TagFilterProvider>
      </div>
      <BottomNav />
    </div>
  );
}
