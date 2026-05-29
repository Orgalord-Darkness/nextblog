import Link from "next/link"
import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import { getPostsByUser } from "@/lib/prisma/post"
import { removePost } from "@/lib/actions/post"

export default async function UserPostsPage() {
    const session = await verifySession()
    if (!session) redirect("/login")

    const posts = await getPostsByUser({ id: Number(session.userId) })

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        Mes posts
                    </h1>
                    <Link
                        href="/user/post/add"
                        className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold rounded-lg hover:opacity-80 transition-opacity"
                    >
                        + Nouveau post
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-400">
                        Aucun post pour l'instant.
                    </div>
                ) : (
                    <ul className="flex flex-col gap-4">
                        {posts.map((post) => (
                            <li
                                key={post.id}
                                className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-zinc-900 dark:text-white">
                                        {post.title}
                                    </span>
                                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                                        <span>{new Date(post.created_at).toLocaleDateString("fr-FR")}</span>
                                        <span className={`px-2 py-0.5 rounded-full font-medium ${post.published ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"}`}>
                                            {post.published ? "Publié" : "Brouillon"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={`/user/post/${post.id}`}
                                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                    >
                                        Modifier
                                    </Link>
                                    <form action={removePost}>
                                        <input type="hidden" name="id" value={post.id} />
                                        <button
                                            type="submit"
                                            className="text-sm text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            Supprimer
                                        </button>
                                    </form>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
