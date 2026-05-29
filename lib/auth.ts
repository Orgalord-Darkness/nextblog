"use server"

import { getUserByEmail } from "@/lib/prisma/user"
import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify, JWTPayload } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email");
    const emailString = email?.toString();
    if (!emailString) {
        return { error: "Email est requis" };
    }
    const user = await getUserByEmail({ email: emailString }); 
    if (!user) {
        return {error: "Identifiants incorrect"}
    }

    const password = formData.get("password");
    const passwordString = password?.toString();
    if (!passwordString) {
        return { error: "Mot de passe est requis" };
    }
    // compare provided password (plain) with stored hashed password
    const passwordVerify = await bcrypt.compare(passwordString, user.password)

    if (!passwordVerify) {
        return {error: "Identifiants invalides"}
    }
    const token = await new SignJWT({ userId: String(user.id), role: user.role })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret)

    const cookieStore = await cookies()
    cookieStore.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    })

    redirect(user.role === 'ADMIN' ? '/admin' : '/user')
}
export async function verifySession() {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value
    if (!token) { 
        return null 
    }
    try {
        const { payload } = await jwtVerify(token, secret)
        return payload as { userId: string; role: string }
    } catch {
        return null 
    }
}

export async function logout() {

    const cookieStore = await cookies()                                                                                                                                
    cookieStore.delete("session")
    redirect("/login")

}
