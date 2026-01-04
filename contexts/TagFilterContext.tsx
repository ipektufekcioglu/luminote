"use client"

import { useContext, createContext, useState, ReactNode } from "react";
import type {TagFilterContextType} from "@/app/types/index"

export const TagContext = createContext<TagFilterContextType | undefined>(undefined)

export default function TagFilterProvider({children}: {children: ReactNode}) {
    const [filterTag, setFilterTag] = useState("")

    return (
        <TagContext.Provider value={{filterTag, setFilterTag}}>
            {children}
        </TagContext.Provider>
    )
}

export function useFilterTag() {
    const context = useContext(TagContext)

    if (context === undefined) {
        throw new Error("TagContext should be used within TagContext Provider")
    }

    return context
}