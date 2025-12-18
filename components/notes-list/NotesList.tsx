import NoteCard from "./NoteCard"
import Link from "next/link"

export default function NotesList({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full h-full lg:flex lg:flex-col lg:w-72 flex-shrink-0 px-4 py-4 lg:border-b-2 lg:border-r-2 border-dark-pink">
            <h1 className="text-2xl font-bold lg:hidden">All Notes</h1>
            <Link href={"/notes/new"}><button className="hidden text-white bg-fuchsia-600 cursor-pointer rounded-lg px-2 py-1 w-full lg:block">Create New Note</button></Link>
            {children}
        </div>
    )
}