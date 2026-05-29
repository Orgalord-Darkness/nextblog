import {prisma} from "@/lib/db"
import type {User} from "@/lib/type"
import bcrypt from "bcryptjs"
import {revalidatePath} from "next/cache"

export async function getUsers() {
    return prisma.user.findMany()
}

export async function getUserByEmail({email}:{email:string}) {
    return prisma.user.findUnique({
        where:{email:email}
    })
}

export async function addUser({user}:{user:User}) {
    const hash = await bcrypt.hash(user.password, 10)
    return prisma.user.create({
        data:{
            email:user.email,
            password:hash,
            name:user.name,
            role:user.role,
        }
    })
}

export async function updateUser({user}:{user:User}){
    const hash = await bcrypt.hash(user.password, 10)
    revalidatePath("/user/[slug]")
    return prisma.user.update({
        where:{id:user.id},
        data:{
            email:user.email,
            password:hash,
            name:user.name,
            role:user.role,
        }
    })
}

export function deleteUser({id}:{id:number}) {
    return prisma.user.delete({
        where:{id:id}
    })
}
