"use server"

import { verifySession } from "@/lib/auth"
import { getBlogById, updateBlog } from "@/lib/prisma/blog"
import { getPostById, updatePost } from "@/lib/prisma/post"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function toggleBlogPublished(formData: FormData) {
    const session = await verifySession()
    if (!session || session.role !== "ADMIN") redirect("/login")

    const id = Number(formData.get("id"))
    const blog = await getBlogById({ id })
    if (!blog) redirect("/admin/blog")

    await updateBlog({ id, published: !blog.published })

    revalidatePath("/blog")
    revalidatePath("/")
    revalidatePath("/admin/blog")
}

export async function togglePostPublished(formData: FormData) {
    const session = await verifySession()
    if (!session || session.role !== "ADMIN") redirect("/login")

    const id = Number(formData.get("id"))
    const post = await getPostById({ id })
    if (!post) redirect("/admin/posts")

    await updatePost({ id, title: post.title, content: post.content ?? "", published: !post.published })

    revalidatePath("/blog")
    revalidatePath("/admin/posts")
}
