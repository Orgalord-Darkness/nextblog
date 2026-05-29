-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_avatarId_fkey";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "avatarId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
