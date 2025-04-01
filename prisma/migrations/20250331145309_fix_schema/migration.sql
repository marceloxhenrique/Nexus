/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorSlug` to the `article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "article" ADD COLUMN     "authorSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_slug_key" ON "user"("slug");

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_authorSlug_fkey" FOREIGN KEY ("authorSlug") REFERENCES "user"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
