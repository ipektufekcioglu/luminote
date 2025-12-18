"use server"

import { redirect } from "next/navigation"
import type { LoginState } from "@/app/types/index.ts"
import { createClient } from "@/auth/server"


export default async function loginAction(previousState: LoginState, formData: FormData): Promise<LoginState> {
    const {auth} = await createClient()

    const email = formData.get("email")?.toString() ?? ""
    const password = formData.get("password")?.toString() ?? ""

    if (!email || !password) {
        return {success: false, message: "Email and password are required"}
    }

    const {error} = await auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        console.error(error)
        return {success: false, message: error.message ?? "Credentials are wrong"}
    }
    
    redirect("/notes")
}

export async function logOutAction(): Promise<LoginState> {
    const {auth} = await createClient()
    
    const {error} = await auth.signOut()

    if (error) {
        console.error(error)
        return {success: false, message: error.message ?? "An error occured during logout"}
    }
    
    return {success: true}
}

