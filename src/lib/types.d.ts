import { Prisma } from "@prisma/client";

const articleWithAuthor = Prisma.validator<Prisma.ArticleDefaultArgs>()({
  include: {
    author: {
      select: {
        name: true,
        avatar: true,
      },
    },
    articleLikes: true,
  },
});
export type ArticleWithAuthor = Prisma.ArticleGetPayload<
  typeof articleWithAuthor
>;

const userWithArticles = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { articles: true },
});
export type UserWithArticles = Prisma.UserGetPayload<typeof userWithArticles>;

const followerWithUser = Prisma.validator<Prisma.FollowDefaultArgs>()({
  include: {
    follower: true,
  },
});

export type FollowerWithUser = Prisma.FollowGetPayload<typeof followerWithUser>;

const followingWithUser = Prisma.validator<Prisma.FollowDefaultArgs>()({
  include: {
    following: true,
  },
});
export type FollowingWithUser = Prisma.FollowGetPayload<
  typeof followingWithUser
>;
