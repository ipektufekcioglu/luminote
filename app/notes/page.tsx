import type {Note, NoteTagRow} from "@/app/types/index"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/auth/server"
import AddNewButton from "@/public/add.png"
import NotesList from "@/components/notes-list/NotesList"
import NoteCard from "@/components/notes-list/NoteCard"

export default async function Notes() {
    return (
        <div className="static flex flex-col">
            <Link href={"notes/new"}><Image src={AddNewButton} height={48} width={48} alt="plus icon" className="fixed cursor-pointer right-8 bottom-24 lg:hidden"/></Link>
        </div>
    )
}

