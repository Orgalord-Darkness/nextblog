import { getBlogs } from "@/lib/prisma/blog"
import BlogSearch from "@/components/BlogSearch"

export default async function Home() {
    const blogs = await getBlogs()
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <main className="max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                    Blogs mis en avant
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                    Découvrez les derniers articles de nos blogueurs.
                </p>
                <BlogSearch blogs={blogs} />
            </main>
        </div>
    )
}
