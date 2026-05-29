"use server"

import { verifySession } from "@/lib/auth"
import { saveAbout } from "@/lib/prisma/about"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateAbout(formData: FormData) {
    const session = await verifySession()
    if (!session || session.role !== "ADMIN") redirect("/login")

    const content = formData.get("content") as string
    await saveAbout({ content })

    revalidatePath("/about")
    redirect("/admin/about")
}
