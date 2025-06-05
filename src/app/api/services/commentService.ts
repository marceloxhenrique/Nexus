import { db } from "@/lib/db";

export async function addComment(
  content: string,
  articleId: string,
  authorId: string,
) {
  const comment = await db.comment.create({
    data: {
      content,
      articleId,
      authorId,
    },
  });
  await db.article.update({
    where: {
      id: articleId,
    },
    data: {
      commentsCount: {
        increment: 1,
      },
    },
  });
  return comment;
}

export async function getCommentsByArticleId(articleId: string) {
  const comments = await db.comment.findMany({
    where: {
      articleId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          slug: true,
          avatar: true,
        },
      },
    },
  });
  return comments;
}

export async function deleteComment(commentId: string) {
  const comment = await db.comment.delete({
    where: {
      id: commentId,
    },
  });
  await db.article.update({
    where: {
      id: comment.articleId,
    },
    data: {
      commentsCount: {
        decrement: 1,
      },
    },
  });
  return comment;
}
