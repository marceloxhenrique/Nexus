import { db } from "@/lib/db";

export async function whoToFollow() {
  return await db.user.findMany({
    select: { id: true, slug: true, name: true, avatar: true },
  });
}
