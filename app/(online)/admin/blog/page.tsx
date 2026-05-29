import Image from "next/image"
import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import { getAllBlogs } from "@/lib/prisma/blog"
import { toggleBlogPublished } from "@/lib/actions/admin"

export default async function AdminBlogPage() {
    const session = await verifySession()
    if (!session || session.role !== "ADMIN") redirect("/login")

    const blogs = await getAllBlogs()

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Gestion des blogs</h1>
                <ul className="flex flex-col gap-4">
                    {blogs.map((blog) => (
                        <li key={blog.id} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-4">
                                {blog.avatar && (
                                    <Image src={blog.avatar.path} alt="" width={40} height={40} className="rounded-full w-10 h-10 object-cover" />
                                )}
                                <div>
                                    <p className="font-semibold text-zinc-900 dark:text-white">{blog.author.name}</p>
                                    <p className="text-xs text-zinc-500 line-clamp-1">{blog.bio}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${blog.published ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"}`}>
                                    {blog.published ? "Publié" : "Bloqué"}
                                </span>
                                <form action={toggleBlogPublished}>
                                    <input type="hidden" name="id" value={blog.id} />
                                    <button type="submit"
                                        className="text-sm px-3 py-1 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:opacity-80 transition-opacity">
                                        {blog.published ? "Bloquer" : "Publier"}
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
