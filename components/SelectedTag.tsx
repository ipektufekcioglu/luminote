import { IoClose } from "react-icons/io5"
import type { SelectedTagProps } from "@/app/types/index"

export default function SelectedTag({handleSelect, tagName}: SelectedTagProps) {


    return (
        <span className="h-7 inline-flex items-center gap-2 border text-xs rounded-md px-2 py bg-gray-100 flex items-center gap-2" key={tagName}>{tagName} 
        <span onClick={handleSelect} className="cursor-pointer"><IoClose /></span></span>
    )
}