import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import { getAbout } from "@/lib/prisma/about"
import { updateAbout } from "@/lib/actions/about"

export default async function AdminAboutPage() {
    const session = await verifySession()
    if (!session || session.role !== "ADMIN") redirect("/login")

    const about = await getAbout()

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-2xl mx-auto px-6 py-12">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Éditer la page À propos</h1>
                <form action={updateAbout} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Contenu</label>
                        <textarea name="content" rows={14} defaultValue={about?.content ?? ""}
                            placeholder="Écris le contenu de la page À propos..."
                            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 resize-none" />
                    </div>
                    <button type="submit"
                        className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold rounded-lg hover:opacity-80 transition-opacity">
                        Enregistrer
                    </button>
                </form>
            </div>
        </div>
    )
}
