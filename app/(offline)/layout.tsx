import { verifySession } from "@/lib/auth"
import defaultNavbar, { userNavbar, adminNavbar } from "@/components/Navbar"

export default async function OfflineLayout({ children }: { children: React.ReactNode }) {
    const session = await verifySession()
    const navbar = session?.role === "ADMIN" ? adminNavbar() : session?.role === "USER" ? userNavbar() : defaultNavbar()
    return (
        <>
            {navbar}
            {children}
        </>
    )
}
