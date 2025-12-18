import Image from "next/image"
import FeatherImg from "@/public/feather.png"
import DarkModeToggle from "@/components/DarkModeToggle"
import LogOutButton from "./LogoutButton"
import Link from "next/link"
import { getUser } from "@/auth/server"

export default async function Header() {
    const user = await getUser()
    return (
        <header className="min-h-22 bg-[#fff0f0] flex items-center border-2 border-dark-pink justify-between px-4">
            <div className="flex">
                <Image src={FeatherImg} alt="feather logo" className="w-8"/>
                <h1 className="font-pacifico text-2xl">LumiNote</h1>
            </div>
            <div className="flex gap-4 ">
                {user ? <LogOutButton />
                : 
                <div className="flex gap-4 ">
                    <button className="bg-dark-pink px-4 py-1 rounded-md text-fuchsia-400 font-albert font-semibold border cursor-pointer"><Link href={"/sign-in"}>Login</Link></button> 
                    <button className="hidden bg-dark-pink px-4 py-1 rounded-md text-fuchsia-400 font-albert font-semibold border md:block cursor-pointer"><Link href={"/sign-up"}>Sign Up</Link></button> 
                </div>
                }
                <DarkModeToggle />
            </div>
        </header>
    )

}