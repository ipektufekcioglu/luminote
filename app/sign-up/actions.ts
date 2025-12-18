"use server"

import type { SignUpState } from "../types"
import { createClient } from "@/auth/server"
import { redirect } from "next/navigation"

export default async function signUpAction(previousState:SignUpState, formData:FormData): Promise<SignUpState> {
    const {auth} = await createClient()

    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()

    if(!email || !password) {
        return {success:false, message:"Email and password are required"}
    }

    const {error} = await auth.signUp({
        email,
        password
    })

    if (error) {
        return {success: false, message: error.message ?? "An error occcured"}
    }

    redirect("/notes")
}