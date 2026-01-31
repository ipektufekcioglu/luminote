"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { IoArchive } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import TagSelector from "./TagSelector";
import AddTag from "./AddTag";
import SelectedTag from "./SelectedTag";
import type { NoteEditorProps, Tag } from "@/app/types/index";
import createSupabaseBrowserClient from "@/lib/supabaseBrowser";

export default function NoteEditor({ initialNote, mode }: NoteEditorProps) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const router = useRouter();

  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");
  const [updatedAt, setUpdatedAt] = useState(initialNote?.updated_at || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    initialNote?.tags ?? [],
  );

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    console.log("session:", sessionData, sessionError);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (mode === "create") {
      const { data: note, error: noteError } = await supabase
        .from("notes")
        .insert({ title, content, user_id: user?.id })
        .select()
        .single();

      setTitle("");
      setContent("");
      setSaving(false);

      console.log("insert error:", noteError);
      console.log("insert data:", note);

      if (noteError) {
        setError(noteError.message);
        return;
      }

      const rows = selectedTags.map((t) => ({
        note_id: note.id,
        tag_id: t.id,
      }));

      const { error: noteTagsError } = await supabase
        .from("note_tags")
        .insert(rows);

      setSelectedTags([]);

      if (noteTagsError) {
        console.log(noteTagsError.message);
        return;
      }
    }

    if (mode === "edit") {
      const { data: updateData, error: updateError } = await supabase
        .from("notes")
        .update({ title, content, updated_at: new Date().toISOString() })
        .eq("id", initialNote?.id)
        .select()
        .single();

      if (updateError) {
        console.log("Error updating the note", updateError.message);
        return;
      }

      const { error: deleteTagsError } = await supabase
        .from("note_tags")
        .delete()
        .eq("note_id", initialNote?.id);

      if (deleteTagsError) {
        console.error("Error deleting tags", deleteTagsError.message);
      }

      if (selectedTags.length > 0) {
        const updateRows = selectedTags.map((t) => ({
          note_id: updateData.id,
          tag_id: t.id,
        }));

        const { data: noteTagsUpdate, error: noteTagsError } = await supabase
          .from("note_tags")
          .insert(updateRows);

        if (noteTagsError) {
          console.error("Error inserting new tags", noteTagsError.message);
        }
      }
      setSaving(false);
    }
  };

  const handleTagFormData = (newTag: string) => {
    setNewTag(newTag);
  };

  const handleAddNew = async (newTag: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { data: tag, error } = await supabase
      .from("tags")
      .insert({ name: newTag, user_id: user.id })
      .select("id, name")
      .single();

    if (error || !tag) {
      console.log("Error occured inserting new tag", error.message);
      return;
    }

    console.log("insert error:", error);
    console.log("insert data:", tag);

    setSelectedTags((prev) => [...prev, tag]);
  };

  const handleSelect = (tag: Tag) => {
    if (selectedTags?.some((t) => t.id === tag.id)) {
      const removedList = selectedTags.filter((t) => t.id !== tag.id);
      setSelectedTags(removedList);
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("id", initialNote?.id);

    router.push("/notes");
  };

  const handleArchive = async () => {
    const { data, error } = await supabase
      .from("notes")
      .update({ is_archived: true })
      .eq("id", initialNote?.id);
  };

  return (
    <div className="py-4 px-4 flex-1 overflow-hidden flex flex-col max-h-screen bg-background">
      <form onSubmit={handleSave} className="static backdrop-blur-sm">
        <div className="flex justify-between items-center border-b border-neutral-200 pb-4 px-2 text-neutral-600 lg:hidden">
          <Link href="/notes">
            <button className="flex gap-2 text-sm items-center cursor-pointer md:text-lg">
              <IoIosArrowBack />
              Go Back
            </button>
          </Link>
          <div className="flex items-center gap-4">
            <FaRegTrashAlt />
            <IoArchive />
            <button className="text-sm items-center md:text-lg">Cancel</button>
            <button
              className="text-sm items-center text-[#CE3E97] md:text-lg"
              type="submit"
              disabled={saving}
            >
              Save Note
            </button>
          </div>
        </div>
        <div className="mt-2 flex justify-between mb-4 items-center lg:mt-2">
          <div className="flex justify-between items-center w-full ">
            <textarea
              placeholder="Enter a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="truncate overflow-hidden text-primary font-bold text-3xl font-albert pt-2 px-2 h-12 md:text-4xl w-full max-w-full"
            />
            <div className="flex gap-2 px-2 shrink-0 whitespace-nowrap sm:justify-end">
              <div className="flex gap-1 text-sm text-accent-foreground items-center w-full  md:text-lg">
                <FaRegClock />
                <span className="hidden xs:inline">Last edited:</span>
              </div>
              <p className="w-full text-sm text-accent-foreground  md:text-lg">
                {updatedAt
                  ? new Date(updatedAt).toLocaleDateString()
                  : "Not yet saved"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border border-neutral-200 rounded-md px-4 py-4">
          <div className="flex gap-2 flex-wrap">
            <label
              className="flex gap-2 text-sm items-center px-2 md:text-lg"
              htmlFor="tag"
            >
              <FaTag />
              Tags
            </label>
          </div>
          <div
            className={`grid gap-2 ${
              mode === "create"
                ? "[grid-template-columns:1fr_auto]"
                : "[grid-template-columns:3fr_1fr_auto]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2 max-w-[300px] lg:max-w-[450px]">
                  {selectedTags.length > 0 ? (
                    selectedTags.map((t) => (
                      <SelectedTag
                        key={t.id}
                        tagName={t.name}
                        handleSelect={() => handleSelect(t)}
                      />
                    ))
                  ) : (
                    <p className="text-neutral-600">No tags selected</p>
                  )}
                </div>
                <AddTag
                  onChange={handleTagFormData}
                  handleAddNew={(newTag) => handleAddNew(newTag)}
                />
              </div>
              <TagSelector
                handleSelect={handleSelect}
                selectedTags={selectedTags}
              />
            </div>
            {mode === "edit" && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleArchive}
                  className="hidden border h-10 rounded-md px-2 cursor-pointer lg:flex lg:items-center lg:justify-center lg:gap-2"
                >
                  <IoArchive />
                  Archive Note
                </button>
                <button
                  className="hidden border h-10 rounded-md text-red-700 px-2 cursor-pointer lg:flex lg:items-center lg:justify-center lg:gap-2"
                  onClick={handleDelete}
                >
                  <FaRegTrashAlt />
                  Delete Note
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-2 py-2 flex-1 flex flex-col min-h-0">
          <textarea
            placeholder="Start typing your note here…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            defaultValue={"Start typing your note here…"}
            className="text-neutral-700 text-sm w-full h-110 md:text-xl"
          />
        </div>
        <div className="hidden gap-4 lg:flex">
          <button
            className="flex items-center justify-center gap-2 text-sm items-center bg-[#CE3E97] text-white rounded-lg px-2 py-1 md:text-lg cursor-pointer"
            type="submit"
            disabled={saving}
          >
            {saving ? <AiOutlineLoading3Quarters className="spinner" /> : <></>}
            {mode === "create" ? "Save Note" : "Update Note"}
          </button>
          <button className="text-sm items-center md:text-lg bg-red-100/80 rounded-lg px-2 py-1 cursor-pointer">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
