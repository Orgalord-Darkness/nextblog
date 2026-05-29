"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

type Blog = {
    id: number
    bio: string
    avatar: { path: string } | null
    author: { name: string | null }
}

export default function BlogSearch({ blogs }: { blogs: Blog[] }) {
    const [query, setQuery] = useState("")

    const filtered = query.trim()
        ? blogs.filter(b =>
            b.author.name?.toLowerCase().includes(query.toLowerCase()) ||
            b.bio.toLowerCase().includes(query.toLowerCase())
          )
        : blogs

    return (
        <div className="flex flex-col gap-6">
            <input
                type="search"
                placeholder="Rechercher un blog ou un blogueur..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />

            {filtered.length === 0 ? (
                <div className="text-center py-16 text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl">
                    Aucun résultat pour « {query} »
                </div>
            ) : (
                <div className="grid gap-4">
                    {filtered.map((blog) => (
                        <Link key={blog.id} href={`/blog/${blog.id}`}
                            className="flex items-center gap-5 p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                            {blog.avatar ? (
                                <div className="relative w-14 h-14 shrink-0">
                                    <Image
                                        src={blog.avatar.path}
                                        alt={blog.author.name ?? ""}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-zinc-200 dark:bg-zinc-700 shrink-0 flex items-center justify-center text-zinc-500 font-bold text-lg">
                                    {blog.author.name?.[0]?.toUpperCase() ?? "?"}
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-zinc-900 dark:text-white">{blog.author.name}</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">{blog.bio}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
