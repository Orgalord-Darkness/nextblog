import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import { getBlogByUserId } from "@/lib/prisma/blog"
import { updateUserBlog } from "@/lib/actions/blog"

export default async function UserBlogPage() {
    const session = await verifySession()
    if (!session) redirect("/login")

    const blog = await getBlogByUserId({ userId: Number(session.userId) })
    if (!blog) redirect("/user/posts")

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-2xl mx-auto px-6 py-12">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Mon blog</h1>
                <form action={updateUserBlog} className="flex flex-col gap-6">
                    <input type="hidden" name="id" value={blog.id} />
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bio</label>
                        <textarea name="bio" rows={5} defaultValue={blog.bio}
                            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 resize-none" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Avatar {blog.avatarId ? "(remplacer)" : "(optionnel)"}
                        </label>
                        <input type="file" name="avatar" accept="image/jpeg,image/png,image/webp,image/gif"
                            className="text-sm text-zinc-600 dark:text-zinc-400 file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-zinc-900 file:text-white file:cursor-pointer" />
                    </div>
                    <button type="submit"
                        className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold rounded-lg hover:opacity-80 transition-opacity">
                        Enregistrer
                    </button>
                </form>
            </div>
        </div>
    )
}
