import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getBlogById } from "@/lib/prisma/blog"

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const blog = await getBlogById({ id: Number(id) })

    if (!blog || !blog.published) notFound()

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="flex items-center gap-6 mb-12">
                    {blog.avatar && (
                        <Image src={blog.avatar.path} alt={blog.author.name ?? ""} width={80} height={80}
                            className="rounded-full object-cover w-20 h-20 shrink-0" />
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{blog.author.name}</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1">{blog.bio}</p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">Articles</h2>

                {blog.author.posts.length === 0 ? (
                    <p className="text-zinc-400">Aucun article publié.</p>
                ) : (
                    <ul className="flex flex-col gap-4">
                        {blog.author.posts.map((post) => (
                            <li key={post.id}>
                                <Link href={`/post/${post.id}`}
                                    className="flex flex-col gap-1 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 transition-colors">
                                    <span className="font-semibold text-zinc-900 dark:text-white">{post.title}</span>
                                    <span className="text-xs text-zinc-500">{new Date(post.created_at).toLocaleDateString("fr-FR")}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
