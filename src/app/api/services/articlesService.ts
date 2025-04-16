import { db } from "@/lib/db";
import { User, Article } from "@prisma/client";

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
  const article: Article | null = await db.article.findUnique({
    where: {
      id: id,
    },
  });
  return article;
}

export async function createArticle(article: CreateArticleInput, user: User) {
  const newArticle = {
    title: article.title,
    slug: article.title.replace(/\s+/g, "-").toLowerCase(),
    content: article.content,
    image: article.image,
    tags: article.tags,
    readTime: article.readTime,
    published: article.published,
    authorId: user.id,
    authorSlug: user.slug,
  };

  console.log("Creating article:", newArticle);
  const output = await db.article.create({
    data: newArticle,
  });
  return output;
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
