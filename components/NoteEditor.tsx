"use client"
import React, { useMemo, useState } from "react"

import Image from "next/image"
import BackArrow from "@/public/back-arrow.png"
import TagIcon from "@/public/tag-icon.png"
import ClockIcon from "@/public/clock-icon.png"
import TagSelector from "./TagSelector"
import AddTag from "./AddTag"
import SelectedTag from "./SelectedTag"
import type {NoteEditorProps, Tag} from "@/app/types/index"
import  createSupabaseBrowserClient from "@/lib/supabaseBrowser"
 
export default function NoteEditor({initialNote, mode}: NoteEditorProps) {
    const supabase = useMemo(() => createSupabaseBrowserClient(), [])

    const [title, setTitle] = useState(initialNote?.title || "")
    const [content, setContent] = useState(initialNote?.content || "")
    const [updatedAt, setUpdatedAt] = useState(initialNote?.updated_at || "")
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [newTag, setNewTag] = useState("")
    const [selectedTags, setSelectedTags] = useState<Tag[]>(initialNote?.tags ?? [])
    

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        setError("")


        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        console.log("session:", sessionData, sessionError);


        const {data: {user}} = await supabase.auth.getUser()
        console.log("hey:", user)
 
        if (mode === "create") {
            const {data: note, error: noteError} = await supabase
            .from("notes")
            .insert({title, content, user_id: user?.id})
            .select()
            .single()

            setTitle("")
            setContent("")
            setSaving(false)


            console.log("insert error:", noteError);
            console.log("insert data:", note);

            if (noteError) {
                setError(noteError.message)
                return
            }

            const rows = selectedTags.map((t) => ({
                note_id: note.id,
                tag_id: t.id
            }))

            const {error: noteTagsError} = await supabase
            .from("note_tags")
            .insert(rows)

            setSelectedTags([])

            if (noteTagsError) {
                console.log(noteTagsError.message)
                return
            }
        }

        if (mode === "edit") {
            const {data: updateData, error:updateError} = await supabase
            .from("notes")
            .update({title, content, updated_at: new Date().toISOString()})
            .eq("id", initialNote?.id)
            .select()
            .single()

            if (updateError) {
                console.log("Error updating the note", updateError.message)
                return
            }

            const {error: deleteTagsError} = await supabase
            .from("note_tags")
            .delete()
            .eq("note_id", initialNote?.id)

            if (deleteTagsError) {
                console.error("Error deleting tags", deleteTagsError.message)
            }


            if (selectedTags.length > 0) {              
                const updateRows = selectedTags.map((t) => ({
                    note_id: updateData.id,
                    tag_id: t.id
                }))

                const {data: noteTagsUpdate, error: noteTagsError} = await supabase
                .from("note_tags")
                .insert(updateRows)

                if (noteTagsError) {
                    console.error("Error inserting new tags", noteTagsError.message)
                }
            }
            setSaving(false)


            
        }

    }

    const handleTagFormData = (newTag:string) => {
        setNewTag(newTag)
    }

    const handleAddNew = async (newTag:string) => {
        const {data: {user}} = await supabase.auth.getUser()

        if (!user) {
            return 
        }

        const {data: tag, error} = await supabase
        .from("tags")
        .insert({name:newTag, user_id: user.id})
        .select("id, name")
        .single()

        if (error || !tag) {
            console.log("Error occured inserting new tag", error.message)
            return
        }

        console.log("insert error:", error);
        console.log("insert data:", tag);

        setSelectedTags(prev => [...prev, tag])
    }

    const handleSelect = (tag: Tag) => {
        if (selectedTags?.some((t) => t.id === tag.id)) {
            const removedList = selectedTags.filter((t) => t.id !== tag.id)
            setSelectedTags(removedList)
        } else {
            setSelectedTags(prev => [...prev, tag])
        }
    }

    return (
        <div className="py-4 px-4 flex-1 h-screen">
            <form onSubmit={handleSave} className="static backdrop-blur-sm">
                <div className="flex justify-between border-b border-neutral-200 pb-2 lg:hidden">
                    <button className="flex gap-2 text-sm items-center md:text-lg"><Image src={BackArrow} alt="back icon"/>Go Back</button>
                    <div className="flex gap-4">
                        <button className="text-sm items-center md:text-lg">Cancel</button>
                        <button className="text-sm items-center text-fuchsia-600 md:text-lg" type="submit" disabled={saving}>Save Note</button>
                    </div>
                </div>
                <textarea placeholder="Enter a title..." 
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="text-neutral-950 overflow-hidden font-bold text-3xl font-albert pt-2 px-2 h-12 md:text-4xl"
                />
                <div className="grid grid-cols-[2fr_3fr] gap-y-3 items-start border-b border-neutral-200 py-2">
                    <div className="flex gap-2 flex-wrap">
                        <label className="flex gap-2 text-sm items-center px-2 md:text-lg" htmlFor="tag"><Image src={TagIcon} alt="tag icon"/>Tags</label>
                        {selectedTags && selectedTags.map((t) => <SelectedTag key={t.id} tagName={t.name} handleSelect={() => handleSelect(t)}/>)}
                    </div>
                    <div className="flex gap-2 items-center">
                        <TagSelector handleSelect={handleSelect} selectedTags={selectedTags}/>
                        <p>or</p>
                        <AddTag onChange={handleTagFormData} handleAddNew={(newTag) => handleAddNew(newTag)}/>
                    </div>
                    <label className="flex gap-2 text-sm items-center px-2 w-full md:text-lg" htmlFor="tag"><Image src={ClockIcon} alt="tag icon"/>Last edited</label>
                    <p className="w-full text-sm text-neutral-400 md:text-lg">Not yet saved</p>
                </div>

                <div className="px-2 py-2">
                    <textarea placeholder="Start typing your note here…" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    defaultValue={"Start typing your note here…"} 
                    className="text-neutral-700 text-sm w-full h-110 md:text-xl"/>
                </div>
                <div className="hidden gap-4 lg:flex">
                        <button className="text-sm items-center bg-fuchsia-600 text-white rounded-lg px-2 md:text-lg cursor-pointer" type="submit" disabled={saving}>{mode === "create" ? "Save Note": "Update Note"}</button>
                        <button className="text-sm items-center md:text-lg bg-red-50/60 rounded-lg px-2 cursor-pointer">Cancel</button>
                </div>
            </form>
        </div>

    )
}

/*
                    <textarea placeholder="Add tags separated by commas (e.g. Work, Planning)" 
                              value={tags}
                              onChange={(e) => setTags(e.target.value)}
                              name="tag" 
                              id="tag" 
                              className="w-full text-sm whitespace-normal leading-none md:text-lg"
                    />
*/