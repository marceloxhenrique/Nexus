import { db } from "@/lib/db";

export async function addLike(articleId: string, userSlug: string) {
  const like = await db.articleLikes.create({
    data: {
      articleId,
      userSlug,
    },
  });
  return like;
}

export async function getLikes(articleId: string) {
  const likes = await db.articleLikes.findMany({
    where: {
      articleId,
    },
    include: {
      user: true,
    },
  });

  return likes;
}

export async function removeLike(articleId: string, userSlug: string) {
  const like = await db.articleLikes.delete({
    where: {
      articleId_userSlug: {
        articleId,
        userSlug,
      },
    },
  });
  return like;
}
