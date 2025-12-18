import Image from "next/image"
import SearchIcon from "@/public/search-icon.png"
import SettingIcon from "@/public/setting-icon.png"

export default function AllNotesHeader() {
    return (
        <div className="hidden flex justify-between items-center px-4 pr-4 py-4 border-y-2 border-r-2 border-dark-pink lg:flex">
            <h1 className="text-2xl font-bold">All Notes</h1>
            <div className="flex gap-4 items-center">
                <div className="relative">
                    <Image src={SearchIcon} alt="search icon" className="w-4 absolute top-3 left-1"/>
                    <input placeholder="Search by title, content, or tags…" className="border rounded-lg text-neutral-500 px-6 py-2 text-sm"/>
                </div>
                <Image src={SettingIcon} alt="setting icon" className="w-6 h-6"/>
            </div>
        </div>
    )
}