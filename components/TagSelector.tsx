import type {Tag, TagSelectorProps} from "@/app/types/index"
import createSupabaseBrowserClient from "@/lib/supabaseBrowser"
import { useEffect, useMemo, useRef, useState } from "react"
import { IoClose } from "react-icons/io5"

export default function TagSelector({handleSelect, selectedTags}: TagSelectorProps) {
    const supabase = useMemo(() => createSupabaseBrowserClient(), [])
    
    const [tags, setTags] = useState<Tag[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [tagName, setTagName] = useState("")
    const [searchText, setSearchText] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const openRef = useRef(null)


    const [filterTags, setFilterTags] = useState<Tag[]>([])

    useEffect(() => {
        const loadTags = async () => {
            setIsLoading(true)
            const {data: {user}} = await supabase.auth.getUser()

            if (!user){
                setIsLoading(false)
                return
            }

            const {data, error} = await supabase
            .from("tags")
            .select("id, name")
            .eq("user_id", user.id)
            .order("name", {ascending: true})
            

            if (!error && data) {
                setTags(data)
            } else {
                console.log("Error loading tags", error.message)
            }

            setIsLoading(false)
        }
        loadTags()
    }, [tags, supabase])
    


    useEffect(() => {
        const checkedTags = tags.filter((t) => t?.name.toLowerCase().includes(searchText?.toLowerCase())) 
        setFilterTags(checkedTags ?? tags)

    }, [tags, searchText])


    useEffect(() => {
        const handleClose = (event: MouseEvent) => {
            if (openRef.current && !event.composedPath().includes(openRef.current)) {
                setIsOpen(false)
            }
        }
        addEventListener("click", handleClose)
        return() => {
            document.removeEventListener("click", handleClose)
        }
    }, [openRef.current])

    return (
        <div className="border rounded-lg py-2 px-2 w-1/3" ref={openRef}>
            <div>
                <input type="text"
                 placeholder="Search for a tag" 
                 className="border-gray-200 pb px-2 flex items-center" 
                 onChange={(e) => setSearchText(e.target.value)}
                 onClick={() => setIsOpen(true)}/>
            </div>
            {isOpen &&
                <div className="flex flex-col max-h-[50px] overflow-y-auto py-2">
                    {filterTags.map((t) => {
                        return (
                            <div onClick={() => handleSelect(t)} key={t.id} className="flex items-center hover:bg-gray-100 cursor-pointer">
                                <input type="checkbox" className="mr-2 cursor-pointer" checked={selectedTags.some((st) => st.id === t.id)}/>
                                <p className="text-sm">{t.name}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </div>

    )
}