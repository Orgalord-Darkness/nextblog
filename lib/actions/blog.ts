"use server"

import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { verifySession } from "@/lib/auth"
import { updateBlog, getBlogByUserId } from "@/lib/prisma/blog"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

export async function updateUserBlog(formData: FormData) {
    const session = await verifySession()
    if (!session) redirect("/login")

    const id = Number(formData.get("id"))
    const bio = formData.get("bio") as string

    const blog = await getBlogByUserId({ userId: Number(session.userId) })
    if (!blog || blog.id !== id) redirect("/user/blog")

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

    try {
        await updateBlog({ id, bio, avatarId })
    } catch (e) {
        console.error("[updateUserBlog] Prisma error:", e)
        throw e
    }
    revalidatePath(`/blog`)
    redirect("/user/blog")
}
