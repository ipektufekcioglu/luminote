"use client"

import createSupabaseBrowserClient from "@/lib/supabaseBrowser"
import { useEffect, useState } from "react"
import type { SideBarClientProps, Tag } from "@/app/types/index"
import { FaTag } from "react-icons/fa6"

export default function SideBarClient({initialTagNames}: SideBarClientProps) {
    const [tags, setTags] = useState(initialTagNames)
    const supabase = createSupabaseBrowserClient()


    useEffect(() => {
        const channel = supabase
        .channel("tags_changes")
        .on("postgres_changes",
            {event: "*", schema: "public", table: "tags"},
            async (payload) => {
                if (payload.eventType === "INSERT") {
                    const newTag = payload.new as Tag
                    setTags(prev => [...prev, newTag])
                }
            }
        )
        .subscribe()
        
        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    return (
        <div className="flex flex-col gap-2">
            {tags.map((t) => <div className="flex gap-2 items-center"><FaTag /><p>{t.name}</p></div>)}
        </div>
    )

}