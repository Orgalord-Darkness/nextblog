"use server"

import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { prisma } from "@/lib/db"
import { getUserByEmail } from "@/lib/prisma/user"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

export async function register(prevState: any, formData: FormData): Promise<{ error: string }> {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string
    const bio = formData.get("bio") as string

    if (!email || !password || !name || !bio) {
        return { error: "Tous les champs sont requis" }
    }

    const existing = await getUserByEmail({ email })
    if (existing) return { error: "Cet email est déjà utilisé" }

    // Sauvegarder l'avatar AVANT la transaction (file I/O impossible dans une TX)
    let avatarId: number | undefined
    const file = formData.get("avatar") as File | null
    if (file && file.size > 0 && ALLOWED_TYPES.includes(file.type)) {
        const ext = file.name.split(".").pop() ?? "jpg"
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const uploadsDir = path.join(process.cwd(), "public", "uploads")
        await mkdir(uploadsDir, { recursive: true })
        const buffer = Buffer.from(await file.arrayBuffer())
        await writeFile(path.join(uploadsDir, filename), buffer)
        const image = await prisma.image.create({
            data: { path: `/uploads/${filename}`, size: Math.round(file.size / 1024), format: ext },
        })
        avatarId = image.id
    }

    const hash = await bcrypt.hash(password, 10)

    // Transaction : User + Blog créés ensemble ou pas du tout
    await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: { email, password: hash, name, role: "USER" },
        })
        await tx.blog.create({
            data: {
                author: { connect: { id: user.id } },
                bio,
                published: true,
                ...(avatarId && { avatar: { connect: { id: avatarId } } }),
            },
        })
    })

    redirect("/login")
}
