-- CreateTable
CREATE TABLE "pre_signed_url" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pre_signed_url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pre_signed_url_userId_createdAt_idx" ON "pre_signed_url"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "pre_signed_url" ADD CONSTRAINT "pre_signed_url_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
