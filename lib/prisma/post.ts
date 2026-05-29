import {prisma} from "@/lib/db"
import type {Post} from "@/lib/type"
import type {User} from "@/lib/type"


export async function getPosts() {
    return prisma.post.findMany()
}

export async function getPostsByUser({id}:{id:number}) {
    return prisma.post.findMany({
        where:{authorId:id}
    })
}

export async function getPostById({id}:{id:number}) {
    return prisma.post.findUnique({
        where:{id},
        include: { images: true }
    })
}

export async function addPost({ title, content, published, authorId, imageId }: {
    title: string
    content: string
    published: boolean
    authorId: number
    imageId?: number
}) {
    return prisma.post.create({
        data: { title, content, published, authorId, imageId }
    })
}

export async function updatePost({ id, title, content, published, imageId }: {
    id: number
    title: string
    content: string
    published: boolean
    imageId?: number
}) {
    return prisma.post.update({
        where: { id },
        data: { title, content, published, ...(imageId && { imageId }) }
    })
}

export function deletePost({id}:{id:number}) {
    return prisma.post.delete({
        where:{id:id}
    })
}