export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  followers: number;
  profession?: string;
  role: "user" | "admin" | "editor";
  bio?: string;
  bioMarkdown?: string;
  socials?: string[];
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  likes: number;
  views: number;
  tags: string[];
  readTime: number;
  published: boolean;
  commentsCount: number;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleWithAuthor = Article & {
  author: Pick<Author, "name" | "avatar">;
};

type Author = {
  name: string;
  avatar: string;
};
