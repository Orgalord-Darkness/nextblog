import Link from "next/link"
import Image from "next/image"
import { getBlogs } from "@/lib/prisma/blog"

export default async function BlogsPage() {
    const blogs = await getBlogs()
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Blogs</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-12">Tous les blogueurs de la plateforme.</p>

                {blogs.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-400">
                        Aucun blog publié pour l'instant.
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {blogs.map((blog) => (
                            <Link key={blog.id} href={`/blog/${blog.id}`}
                                className="flex items-center gap-6 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                                {blog.avatar && (
                                    <Image src={blog.avatar.path} alt={blog.author.name ?? ""} width={64} height={64}
                                        className="rounded-full object-cover w-16 h-16 shrink-0" />
                                )}
                                <div>
                                    <p className="font-semibold text-zinc-900 dark:text-white text-lg">{blog.author.name}</p>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 line-clamp-2">{blog.bio}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
