import { userNavbar, adminNavbar } from "@/components/Navbar"
import { verifySession } from "@/lib/auth"

export default async function OnlineLayout({ children }: { children: React.ReactNode }) {
    const session = await verifySession()
    return (
        <>
            {session?.role === "ADMIN" ? adminNavbar() : userNavbar()}
            {children}
        </>
    )
}
