import { prisma } from "@/lib/db"

export async function getImageById({ id }: { id: number }) {
    return prisma.image.findUnique({ where: { id } })
}

export async function createImage({ path, size, format }: {
    path: string
    size: number
    format: string
}) {
    return prisma.image.create({ data: { path, size, format } })
}
