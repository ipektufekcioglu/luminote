import { useState } from "react"
import type { AddTagProps } from "@/app/types"

export default function AddTag({onChange, handleAddNew}: AddTagProps) {
    const [inputTag, setInputTag] = useState("")
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
        setInputTag(e.target.value)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleAddNew(inputTag)
        setInputTag("")
    }
    

    return (
        <div className="flex flex-col border px-2 min-w-32 justify-center rounded-md">
            <h1 className="border-b border-gray-300 px-2 py text-bold text-center">Add New Tag</h1>
            <div className="flex py-2">
                <label htmlFor="name" className="text-sm">Name:</label>
                <input type="text" name="name" value={inputTag} placeholder=" e.g. Work, Planning" className="text-sm" onChange={handleInputChange}/>
                <button className="text-sm bg-fuchsia-600 rounded-md text-white px-2 cursor-pointer" onClick={handleClick}>Add Tag</button>
            </div>
        </div>

    )
}