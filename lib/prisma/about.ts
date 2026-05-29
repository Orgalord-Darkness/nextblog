import { prisma } from "@/lib/db"

export async function getAbout() {
    return prisma.about.findFirst()
}

export async function saveAbout({ content }: { content: string }) {
    const existing = await prisma.about.findFirst()
    if (existing) {
        return prisma.about.update({ where: { id: existing.id }, data: { content } })
    }
    return prisma.about.create({ data: { content } })
}
