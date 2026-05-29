import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg(process.env.DATABASE_URL as string)
const prisma = new PrismaClient({ adapter })

async function main() {
    await prisma.post.deleteMany()
    await prisma.blog.deleteMany()
    await prisma.image.deleteMany()
    await prisma.user.deleteMany()
    await prisma.about.deleteMany()

    const adminPassword = await bcrypt.hash('admin1234', 10)
    const userPassword = await bcrypt.hash('user1234', 10)

    const admin = await prisma.user.create({
        data: { email: 'admin@nextblog.com', password: adminPassword, name: 'Admin', role: 'ADMIN' },
    })
    const user = await prisma.user.create({
        data: { email: 'user@nextblog.com', password: userPassword, name: 'Blogueur', role: 'USER' },
    })

    // Image avatar (sans blogId — FK sera mise à jour après)
    const avatar = await prisma.image.create({
        data: { path: '/uploads/avatar-admin.jpg', size: 128, format: 'jpg' },
    })

    const adminBlog = await prisma.blog.create({
        data: { bio: "Blog tech de l'équipe NextBlog.", authorId: admin.id, avatarId: avatar.id, published: true },
    })

    // Lier l'image au blog
    await prisma.image.update({ where: { id: avatar.id }, data: { blogId: adminBlog.id } })

    await prisma.blog.create({
        data: { bio: 'Mon premier blog sur la plateforme.', authorId: user.id, published: true },
    })

    const postImage = await prisma.image.create({
        data: { path: '/uploads/avatar-admin.jpg', size: 128, format: 'jpg' },
    })

    await prisma.post.create({
        data: {
            title: 'Bienvenue sur NextBlog',
            content: 'Premier article de présentation de la plateforme NextBlog.',
            published: true,
            authorId: admin.id,
            imageId: postImage.id,
        },
    })

    await prisma.about.create({
        data: { content: 'NextBlog est une plateforme de blogging simple et moderne.' },
    })

    console.log('Seed terminé')
    console.log('Admin : admin@nextblog.com / admin1234')
    console.log('User  : user@nextblog.com  / user1234')
}

main()
    .catch((e) => { console.error(e); process.exit(1) })
    .finally(async () => { await prisma.$disconnect() })
