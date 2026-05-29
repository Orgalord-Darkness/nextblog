import Link from "next/link"
import { logout } from "@/lib/auth"

const linkClass = "text-zinc-300 hover:text-white font-medium transition-colors"
const btnClass = "text-zinc-300 hover:text-white font-medium transition-colors cursor-pointer bg-transparent border-0 p-0"

export default function defaultNavbar() {
    return (
        <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-8">
                <span className="text-white font-bold text-lg mr-4">NextBlog</span>
                <Link href="/" className={linkClass}>Accueil</Link>
                <Link href="/login" className={linkClass}>Connexion</Link>
                <Link href="/register" className={linkClass}>Inscription</Link>
                <Link href="/about" className={linkClass}>À propos</Link>
                <Link href="/blog" className={linkClass}>Blog</Link>
            </div>
        </nav>
    )
}

export function userNavbar() {
    return (
        <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-8">
                <span className="text-white font-bold text-lg mr-4">NextBlog</span>
                <Link href="/" className={linkClass}>Accueil</Link>
                <Link href="/user/posts" className={linkClass}>Mes posts</Link>
                <Link href="/user/blog" className={linkClass}>Mon blog</Link>
                <Link href="/about" className={linkClass}>À propos</Link>
                <form action={logout} className="ml-auto">
                    <button type="submit" className={btnClass}>Déconnexion</button>
                </form>
            </div>
        </nav>
    )
}

export function adminNavbar() {
    return (
        <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-8">
                <span className="text-white font-bold text-lg mr-4">NextBlog</span>
                <Link href="/" className={linkClass}>Accueil</Link>
                <Link href="/admin/about" className={linkClass}>À propos</Link>
                <Link href="/admin/blog" className={linkClass}>Blogs</Link>
                <Link href="/admin/posts" className={linkClass}>Posts</Link>
                <form action={logout} className="ml-auto">
                    <button type="submit" className={btnClass}>Déconnexion</button>
                </form>
            </div>
        </nav>
    )
}
