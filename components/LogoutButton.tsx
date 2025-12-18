"use client"

import { useState } from "react";
import { logOutAction } from "@/app/sign-in/actions";
import { toast } from "sonner";
import { redirect } from "next/navigation"


export default function LogOutButton() {
    const [loading, setLoading] = useState(false)

    const handleLogOut = async ()  => {
        const { success, message } = await logOutAction()

        if (success) {
            toast("Successfully Logged Out")
            redirect("/")
        }
    }

    return (
        <button onClick={handleLogOut} className="bg-dark-pink px-4 py-1 rounded-md text-fuchsia-400 font-albert font-semibold border cursor-pointer">
            {loading ? <div className="border-2 border-white border-t-fuchsia-400 w-4 h-4 rounded-full animate-spin"></div> : "Log Out"}
        </button>
    )
}