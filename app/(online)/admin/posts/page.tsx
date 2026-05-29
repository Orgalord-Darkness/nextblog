import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import { getPosts } from "@/lib/prisma/post"
import { togglePostPublished } from "@/lib/actions/admin"

export default async function AdminPostsPage() {
    const session = await verifySession()
    if (!session || session.role !== "ADMIN") redirect("/login")

    const posts = await getPosts()

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Gestion des posts</h1>
                <ul className="flex flex-col gap-4">
                    {posts.map((post) => (
                        <li key={post.id} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-zinc-900 dark:text-white">{post.title}</span>
                                <span className="text-xs text-zinc-500">{new Date(post.created_at).toLocaleDateString("fr-FR")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.published ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"}`}>
                                    {post.published ? "Publié" : "Bloqué"}
                                </span>
                                <form action={togglePostPublished}>
                                    <input type="hidden" name="id" value={post.id} />
                                    <button type="submit"
                                        className="text-sm px-3 py-1 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:opacity-80 transition-opacity">
                                        {post.published ? "Bloquer" : "Publier"}
                                    </button>
                                </form>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
