"use client"

import createSupabaseBrowserClient from "@/lib/supabaseBrowser"
import NoteCard from "./NoteCard"
import type { Note, NotesListClientProps } from "@/app/types"
import { useState, useEffect } from "react"

export default function NotesListClient({initialNotes, initialTagsMap}: NotesListClientProps) {
    const [notes, setNotes] = useState(initialNotes)
    const [tagsMap, setTagsMap] = useState(initialTagsMap)
    const supabase = createSupabaseBrowserClient()

    useEffect(() => {
        const channel = supabase
            .channel("notes-changes")
            .on("postgres_changes",
                {event: "*", schema: "public", table: "notes"},
                async (payload) => {
                    if (payload.eventType === "INSERT") {
                        const newNote = payload.new as Note
                        setNotes(prev => [newNote, ...prev])

                        const {data: tagData} = await supabase
                        .from("note_tags")
                        .select("tag_id, tags (name)")
                        .eq("note_id", newNote.id)

                        if (tagData) {
                            const tagNames = tagData.map((row: any) => row.tags?.name).filter(Boolean)
                            setTagsMap(prev => ({...prev, [newNote.id]: tagNames}))
                        }
                    } else if (payload.eventType === "UPDATE") {
                        const updatedNote = payload.new as Note
                        setNotes(prev => {
                            const filtered = prev.filter(note => note.id !== updatedNote.id)
                            return [updatedNote, ...filtered]
                        })

                        const {data: tagData} = await supabase
                        .from("note_tags")
                        .select("tag_id, tags (name)")
                        .eq("note_id", updatedNote.id)

                        if (tagData) {
                            const tagNames = tagData.map((row: any) => row.tags?.name).filter(Boolean)
                            setTagsMap(prev => ({...prev, [updatedNote.id]: tagNames}))
                        }
                    }
                }
            ).subscribe()

            const noteTagsChannel = supabase
            .channel("note-tags-channel")
            .on("postgres_changes",
                {event: "*", schema: "public", table:"note_tags"},
                async (payload) => {
                    let noteId: string 
                    if (payload.eventType === "DELETE") {
                        noteId = payload.old.note_id
                    } else {
                        noteId = payload.new.note_id
                    }

                    const {data: tagData} = await supabase
                    .from("note_tags")
                    .select("tag_id, tags (name)")
                    .eq("note_id", noteId)

                    const tagNames = tagData?.map((row:any )=> row.tags.name).filter(Boolean) || []
                    setTagsMap((prev) => ({...prev, [noteId]: tagNames}))

                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }


    }, [supabase])

    return (
        <>
            {notes.length > 0 ? notes.map(note => (
                <NoteCard key={note.id} note={note} tagNames={tagsMap[note.id] || []} />
            )) : <div><h1 className="border-2 bg-[#fff0f0]/25 border-dark-pink rounded-lg px-2 py-1 mt-4">You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</h1></div>}
        </>
    )
}