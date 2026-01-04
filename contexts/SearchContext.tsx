"use client"

import { useContext, createContext, useState, ReactNode, use } from "react";
import { SearchContextType } from "@/app/types/index"

export const SearchContext = createContext<SearchContextType | undefined>(undefined)

export default function SearchProvider({children}: {children: ReactNode}) {
    const [searchText, setSearchText] = useState("")

    return (
        <SearchContext.Provider value={{searchText, setSearchText}}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    const context = useContext(SearchContext)
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider")
    }
    return context
}