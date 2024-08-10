"use server"

import { signIn } from "@/auth"

export const signin = async () =>{
    return await signIn("google")
}