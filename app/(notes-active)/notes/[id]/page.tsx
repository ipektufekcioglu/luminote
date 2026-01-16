import NoteEditor from "@/components/NoteEditor"
import { createServerClient } from "@supabase/ssr"
import {cookies} from "next/headers" 
import type {NoteTagRow, Tag} from "@/app/types/index"

export default async function EditNotePage({params}: {params: {id: string}}) {
    const {id} = await params
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll().map(({name, value}) => ({name, value}))
                }
            }
        }
    )

    const {data: note, error} = await supabase
        .from("notes")
        .select("*")
        .eq("id", id)
        .single()
    
    if (error) {
        console.error("An error occured while fetching the note", error.message)
    }

    const {data: tags, error: tagError} = await supabase
    .from("note_tags")
    .select("tag_id, tags (name)")
    .eq("note_id", id)
    
    if (tagError) {
        console.error("An error occured while fetching the tags", tagError.message)
    }

    if (tags && !tagError) {
        const rows = tags as unknown as NoteTagRow[]
        const tagData = rows
        .map((row) => ({name:row.tags?.name, id:row.tag_id}))
        .filter((tag): tag is { name: string; id: string } => tag.name !== null && tag.id !== null)

        note.tags = tagData 
    }

    console.log("note tags", note.tags)

    return <NoteEditor initialNote={note} mode="edit" />
}