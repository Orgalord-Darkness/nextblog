import { prisma } from "@/lib/db"

export async function getBlogs() {
    return prisma.blog.findMany({
        where: {
            published: true,
            author: { role: "USER" },
        },
        include: { author: true, avatar: true },
        orderBy: { id: "desc" },
    })
}

export async function getAllBlogs() {
    return prisma.blog.findMany({
        include: { author: true, avatar: true },
    })
}

export async function getBlogById({ id }: { id: number }) {
    return prisma.blog.findUnique({
        where: { id },
        include: {
            author: {
                include: {
                    posts: {
                        where: { published: true },
                        orderBy: { created_at: "desc" },
                    },
                },
            },
            avatar: true,
        },
    })
}

export async function getBlogByUserId({ userId }: { userId: number }) {
    return prisma.blog.findUnique({
        where: { authorId: userId },
        include: { avatar: true },
    })
}

export async function updateBlog({ id, bio, published, avatarId }: {
    id: number
    bio?: string
    published?: boolean
    avatarId?: number
}) {
    return prisma.blog.update({
        where: { id },
        data: {
            ...(bio !== undefined && { bio }),
            ...(published !== undefined && { published }),
            ...(avatarId !== undefined && { avatarId }),
        },
    })
}

export async function createBlog({ authorId, bio }: { authorId: number; bio: string }) {
    return prisma.blog.create({
        data: { authorId, bio, published: true },
    })
}
