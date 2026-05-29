import { getAbout } from "@/lib/prisma/about"

export default async function AboutPage() {
    const about = await getAbout()
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">À propos</h1>
                {about ? (
                    <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                        {about.content}
                    </div>
                ) : (
                    <p className="text-zinc-400">Aucun contenu pour l'instant.</p>
                )}
            </div>
        </div>
    )
}
