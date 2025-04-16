import { Prisma } from "@prisma/client";

const articleWithAuthor = Prisma.validator<Prisma.ArticleDefaultArgs>()({
  include: {
    author: {
      select: {
        name: true,
        avatar: true,
      },
    },
  },
});
export type ArticleWithAuthor = Prisma.ArticleGetPayload<
  typeof articleWithAuthor
>;

const userWithArticles = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { articles: true },
});
export type UserWithArticles = Prisma.UserGetPayload<typeof userWithArticles>;
