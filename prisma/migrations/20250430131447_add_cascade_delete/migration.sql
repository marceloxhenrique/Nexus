/*
  Warnings:

  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "article" DROP CONSTRAINT "article_authorId_fkey";

-- DropForeignKey
ALTER TABLE "article" DROP CONSTRAINT "article_authorSlug_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_followerSlug_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_followingSlug_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "image";

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerSlug_fkey" FOREIGN KEY ("followerSlug") REFERENCES "user"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followingSlug_fkey" FOREIGN KEY ("followingSlug") REFERENCES "user"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_authorSlug_fkey" FOREIGN KEY ("authorSlug") REFERENCES "user"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
