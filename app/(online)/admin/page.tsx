import Link from "next/link"
import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import { getAllBlogs } from "@/lib/prisma/blog"
import { getPosts } from "@/lib/prisma/post"

export default async function AdminDashboard() {
    const session = await verifySession()
    if (!session || session.role !== "ADMIN") redirect("/login")

    const [blogs, posts] = await Promise.all([
        getAllBlogs(),
        getPosts(),
    ])

    const blockedBlogs = blogs.filter(b => !b.published).length
    const blockedPosts = posts.filter(p => !p.published).length

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Administration</h1>
                <div className="grid gap-4 sm:grid-cols-3">
                    <Link href="/admin/blog"
                        className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 transition-colors">
                        <p className="text-3xl font-bold text-zinc-900 dark:text-white">{blogs.length}</p>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Blogs</p>
                        {blockedBlogs > 0 && <p className="text-red-500 text-xs mt-1">{blockedBlogs} bloqué(s)</p>}
                    </Link>
                    <Link href="/admin/posts"
                        className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 transition-colors">
                        <p className="text-3xl font-bold text-zinc-900 dark:text-white">{posts.length}</p>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Posts</p>
                        {blockedPosts > 0 && <p className="text-red-500 text-xs mt-1">{blockedPosts} bloqué(s)</p>}
                    </Link>
                    <Link href="/admin/about"
                        className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 transition-colors">
                        <p className="text-zinc-900 dark:text-white font-semibold">À propos</p>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Éditer le contenu →</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
