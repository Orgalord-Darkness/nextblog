import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostById } from "@/lib/prisma/post"

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const post = await getPostById({ id: Number(id) })

    if (!post || !post.published) notFound()

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">{post.title}</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                    {new Date(post.created_at).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                </p>

                {post.imageId && post.images && (
                    <div className="mb-8 rounded-xl overflow-hidden">
                        <Image src={post.images.path} alt={post.title} width={800} height={400}
                            className="w-full object-cover max-h-96" />
                    </div>
                )}

                <div className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                </div>
            </div>
        </div>
    )
}
