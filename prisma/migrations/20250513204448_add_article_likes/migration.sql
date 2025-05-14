-- CreateTable
CREATE TABLE "article_likes" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "userSlug" TEXT NOT NULL,

    CONSTRAINT "article_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "article_likes_articleId_userSlug_key" ON "article_likes"("articleId", "userSlug");

-- AddForeignKey
ALTER TABLE "article_likes" ADD CONSTRAINT "article_likes_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_likes" ADD CONSTRAINT "article_likes_userSlug_fkey" FOREIGN KEY ("userSlug") REFERENCES "user"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
