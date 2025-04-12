import { db } from "@/lib/db";
import { Article } from "@/lib/types";

export async function getAllArticles() {
  const articles = await db.article.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          slug: true,
          avatar: true,
        },
      },
    },
  });
  return articles;
}

export async function getArticleBySlug(params: string) {
  const articles = await db.article.findUnique({
    where: {
      slug: params,
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          slug: true,
          avatar: true,
        },
      },
    },
  });
  return articles;
}

export async function getArticleById(id: string) {
  const article = await db.article.findUnique({
    where: {
      id: id,
    },
  });
  return article;
}

export async function createArticle(article: CreateArticleInput) {
  const newArticle = await db.article.create({
    data: article,
  });
  return newArticle;
}

export async function updateArticle(article: Article) {
  const updatedArticle = await db.article.update({
    where: {
      id: article.id,
    },
    data: article,
  });
  return updatedArticle;
}

export async function deleteArticle(id: string) {
  const deletedArticle = await db.article.delete({
    where: {
      id: id,
    },
  });
  return deletedArticle;
}
type CreateArticleInput = {
  title: string;
  slug: string;
  content: string;
  image?: string;
  tags: string[];
  readTime: number;
  published: boolean;
  authorId: string;
  authorSlug: string;
};
