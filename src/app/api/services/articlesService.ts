import { db } from "@/lib/db";
import { deleteFileFromS3 } from "@/utils/s3Service";
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
      articleLikes: {
        select: {
          userSlug: true,
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

export async function createArticle(
  article: CreateArticleInput,
  user: User,
  imageUrl?: string,
) {
  const newArticle: CreateArticleInput = {
    title: article.title,
    slug: article.title.replace(/\s+/g, "-").toLowerCase(),
    content: article.content,
    tags: article.tags,
    published: article.published,
    authorId: user.id,
    authorSlug: user.slug,
    readTime: Math.ceil(article.content.trim().split(/\s+/).length / 200),
  };
  if (imageUrl) {
    newArticle.image = imageUrl;
  }
  const output = await db.article.create({
    data: newArticle,
  });
  return output;
}

export async function updateArticle(article: Article, imageUrl?: string) {
  const newArticle: UpdateArticleInput = {
    title: article.title,
    slug: article.title.replace(/\s+/g, "-").toLowerCase(),
    content: article.content,
    tags: article.tags,
    published: article.published,
    readTime: Math.ceil(article.content.trim().split(/\s+/).length / 200),
  };

  if (imageUrl) {
    newArticle.image = imageUrl;
  }
  const updatedArticle = await db.article.update({
    where: {
      id: article.id,
    },
    data: newArticle,
  });
  return updatedArticle;
}

export async function deleteArticle(article: Article) {
  const deletedArticle = await db.article.delete({
    where: {
      id: article.id,
    },
  });
  if (article.image) {
    await deleteFileFromS3(article.image);
  }
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
type UpdateArticleInput = {
  title: string;
  slug: string;
  content: string;
  image?: string;
  tags: string[];
  readTime: number;
  published: boolean;
};
