import { createPost } from "@/lib/actions/post"

export default function AddPostPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-2xl mx-auto px-6 py-12">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
                    Nouveau post
                </h1>
                <form action={createPost} className="flex flex-col gap-6" >
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Titre
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Titre du post"
                            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Contenu
                        </label>
                        <textarea
                            name="content"
                            rows={10}
                            placeholder="Écris ton article ici..."
                            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 resize-none"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Image (optionnel)
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="text-sm text-zinc-600 dark:text-zinc-400 file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-zinc-900 file:text-white file:cursor-pointer"
                        />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="published"
                            defaultChecked
                            className="w-4 h-4 accent-zinc-700"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                            Publier immédiatement
                        </span>
                    </label>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold rounded-lg hover:opacity-80 transition-opacity"
                    >
                        Publier
                    </button>
                </form>
            </div>
        </div>
    )
}
