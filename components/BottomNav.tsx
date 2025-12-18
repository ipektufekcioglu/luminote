import Image from "next/image"
import HomeIcon from "@/public/home-icon.png"
import SearchIcon from "@/public/search-icon.png"
import ArchivedIcon from "@/public/archive-icon.png"
import NavTagIcon from "@/public/nav-tag-icon.png"
import SettingIcon from "@/public/setting-icon.png"

export default function BottomNav() {
    return (
        <div className="fixed bottom-0 inset-x-0 overflow-hidden grid grid-cols-5 absolute gap-4 bottom-0 px-2 py-2 bg-[#fff0f0] border-2 border-dark-pink w-full lg:hidden">
            <div className="flex flex-col justify-center  items-center">
                <Image src={HomeIcon} alt="home icon"/>
                <p className="text-neutral-600">Home</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <Image src={SearchIcon} alt="home icon"/>
                <p className="text-neutral-600">Search</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <Image src={ArchivedIcon} alt="home icon"/>
                <p className="text-neutral-600">Archived</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <Image src={NavTagIcon} alt="home icon" />
                <p className="text-neutral-600">Tags</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <Image src={SettingIcon} alt="home icon"/>
                <p className="text-neutral-600">Settings</p>
            </div>
        </div>
    )
}