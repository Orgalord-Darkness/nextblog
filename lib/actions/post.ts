"use server"

import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { verifySession } from "@/lib/auth"
import { addPost, updatePost, deletePost, getPostById } from "@/lib/prisma/post"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

async function saveImage(file: File): Promise<number | undefined> {
    // 1. Vérifier que c'est bien une image
    if (!ALLOWED_TYPES.includes(file.type)) return undefined

    // 2. Générer un nom de fichier unique : timestamp + aléatoire + extension
    const ext = file.name.split(".").pop() ?? "jpg"
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    // 3. S'assurer que public/uploads/ existe (le créer si besoin)
    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadsDir, { recursive: true })

    // 4. Écrire le fichier sur le disque
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(path.join(uploadsDir, filename), buffer)

    // 5. Créer le record Image en BDD et retourner son id
    const image = await prisma.image.create({
        data: {
            path: `/uploads/${filename}`,
            size: Math.round(file.size / 1024),
            format: ext,
        },
    })

    return image.id
}

export async function createPost(formData: FormData) {
    const session = await verifySession()
    if (!session) redirect("/login")

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const published = formData.get("published") === "on"

    const file = formData.get("image") as File | null
    const imageId = file && file.size > 0 ? await saveImage(file) : undefined

    await addPost({
        title,
        content,
        published,
        authorId: Number(session.userId),
        imageId,
    })

    revalidatePath("/user/posts")
    redirect("/user/posts")
}

export async function editPost(formData: FormData) {
    const session = await verifySession()
    if (!session) redirect("/login")

    const id = Number(formData.get("id"))
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const published = formData.get("published") === "on"

    const post = await getPostById({ id })
    if (!post || post.authorId !== Number(session.userId)) redirect("/user/posts")

    // Nouvelle image seulement si l'utilisateur en a sélectionné une
    const file = formData.get("image") as File | null
    const imageId = file && file.size > 0 ? await saveImage(file) : undefined

    await updatePost({ id, title, content, published, imageId })

    revalidatePath("/user/posts")
    redirect("/user/posts")
}

export async function removePost(formData: FormData) {
    const session = await verifySession()
    if (!session) redirect("/login")

    const id = Number(formData.get("id"))

    const post = await getPostById({ id })
    if (!post || post.authorId !== Number(session.userId)) redirect("/user/posts")

    await deletePost({ id })
    revalidatePath("/user/posts")
}
