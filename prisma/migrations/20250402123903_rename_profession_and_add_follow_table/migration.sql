/*
  Warnings:

  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `profession` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" RENAME COLUMN "profession" TO "occupation";

-- CreateTable
CREATE TABLE "follow" (
    "id" TEXT NOT NULL,
    "followerSlug" TEXT NOT NULL,
    "followingSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "follow_followerSlug_followingSlug_key" ON "follow"("followerSlug", "followingSlug");

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerSlug_fkey" FOREIGN KEY ("followerSlug") REFERENCES "user"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followingSlug_fkey" FOREIGN KEY ("followingSlug") REFERENCES "user"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
