import FeatherImg from "@/public/feather.png"
import Image from "next/image"

export default function MobileHeader() {
    return (
        <header className="min-h-22 bg-[#fff0f0] flex items-center border-2 border-dark-pink justify-between px-4 lg:hidden">
            <div className="flex">
                <Image src={FeatherImg} alt="feather logo" className="w-8"/>
                <h1 className="font-pacifico text-2xl">LumiNote</h1>
            </div>
        </header>
    )
}