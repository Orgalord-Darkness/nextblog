import Link from "next/link"
import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import { getPostsByUser } from "@/lib/prisma/post"
import { getBlogByUserId } from "@/lib/prisma/blog"

export default async function UserDashboard() {
    const session = await verifySession()
    if (!session) redirect("/login")

    const [posts, blog] = await Promise.all([
        getPostsByUser({ id: Number(session.userId) }),
        getBlogByUserId({ userId: Number(session.userId) }),
    ])

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
                    Mon espace
                </h1>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Link href="/user/posts"
                        className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 transition-colors">
                        <p className="text-3xl font-bold text-zinc-900 dark:text-white">{posts.length}</p>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Post{posts.length > 1 ? "s" : ""}</p>
                    </Link>
                    <Link href="/user/blog"
                        className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 transition-colors">
                        <p className="text-zinc-900 dark:text-white font-semibold">{blog?.bio ?? "Aucune bio"}</p>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Modifier mon blog →</p>
                    </Link>
                </div>
                <div className="mt-8 flex gap-4">
                    <Link href="/user/post/add"
                        className="px-5 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold rounded-lg hover:opacity-80 transition-opacity text-sm">
                        + Nouveau post
                    </Link>
                </div>
            </div>
        </div>
    )
}
