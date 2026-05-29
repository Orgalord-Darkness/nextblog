"use client"
import { useActionState } from "react"
import Link from "next/link"
import { login } from "@/lib/auth"

const initialState = { error: "", success: "" }

export default function Login() {
    const [state, formAction, pending] = useActionState(login, initialState)
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">Connexion</h1>
                <form action={formAction} className="flex flex-col gap-5 bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    {state?.error && (
                        <p className="text-red-500 text-sm bg-red-50 dark:bg-red-950 px-3 py-2 rounded-lg">{state.error}</p>
                    )}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="ton@email.com"
                            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={pending}
                        className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
                    >
                        {pending ? "Connexion..." : "Se connecter"}
                    </button>
                    <p className="text-center text-sm text-zinc-500">
                        Pas encore de compte ?{" "}
                        <Link href="/register" className="text-zinc-900 dark:text-white font-medium hover:underline">
                            S'inscrire
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
