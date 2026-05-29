"use client"
import { useActionState } from "react"
import Link from "next/link"
import { register } from "@/lib/actions/auth"

const initialState = { error: "" }

export default function RegisterPage() {
    const [state, formAction, pending] = useActionState(register, initialState)
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">Créer un compte</h1>
                <form action={formAction} className="flex flex-col gap-5 bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                        <input type="email" name="email" required
                            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Mot de passe</label>
                        <input type="password" name="password" required
                            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Pseudo</label>
                        <input type="text" name="name" required
                            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bio du blog</label>
                        <textarea name="bio" required rows={3}
                            placeholder="Décris ton blog en quelques mots..."
                            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 resize-none" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Avatar (optionnel)</label>
                        <input type="file" name="avatar" accept="image/jpeg,image/png,image/webp,image/gif"
                            className="text-sm text-zinc-600 dark:text-zinc-400 file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-white file:cursor-pointer" />
                    </div>
                    <button type="submit" disabled={pending}
                        className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50">
                        {pending ? "Création..." : "S'inscrire"}
                    </button>
                    <p className="text-center text-sm text-zinc-500">
                        Déjà un compte ?{" "}
                        <Link href="/login" className="text-zinc-900 dark:text-white font-medium hover:underline">Se connecter</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
