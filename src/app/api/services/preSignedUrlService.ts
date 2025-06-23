import { db } from "@/lib/db";

export async function canGeneratePreSignedUrl(
  userId: string,
): Promise<boolean> {
  const dataLimit = new Date(new Date().getTime() - 1000 * 60 * 60 * 24); // 1 day
  const preSignedUrl = await db.preSignedUrl.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: dataLimit,
      },
    },
  });
  return preSignedUrl.length < 20;
}

export async function addPreSignedUrl(userId: string) {
  const preSignedUrl = await db.preSignedUrl.create({
    data: {
      userId: userId,
    },
  });
  return preSignedUrl;
}

export async function deleteExpiredPreSignedUrl() {
  const preSignedUrl = await db.preSignedUrl.deleteMany({
    where: {
      createdAt: {
        lt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
      },
    },
  });
  return preSignedUrl;
}
