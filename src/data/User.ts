export type UserProps = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  followers: number;
  profession: string;
  role: "user" | "admin" | "editor";
  bio: string;
  bioMarkdown?: string;
  articles: ArticleProps[];
  socials?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleProps = {
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

export const article: ArticleProps = {
  id: "article-1",
  title: "8 Advanced JavaScript Features to Know",
  slug: "8-advanced-javascript-features",
  content:
    "JavaScript (JS) has come a long way since its inception as a simple scripting language. With the release of ECMAScript",
  image:
    "https://www.squash.io/wp-content/uploads/2023/11/javascript-series.jpg",
  likes: 34,
  views: 1200,
  tags: ["JavaScript", "Programming"],
  readTime: 6,
  published: true,
  commentsCount: 5,
  authorId: "user-123",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const article2: ArticleProps = {
  id: "article-2",
  title: "TypeScript: JavaScript With Syntax For Types.",
  slug: "typeScript:-javaScript-with-syntax",
  content:
    "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale, and improving your ability to catch issues earlier.",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1200px-Typescript.svg.png",
  likes: 34,
  views: 1200,
  tags: ["JavaScript", "Programming"],
  readTime: 6,
  published: true,
  commentsCount: 5,
  authorId: "user-123",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const user: UserProps = {
  id: "user-123",
  name: "John Doe",
  email: "johndoe@gmail.com",
  avatar: "https://avatar.iran.liara.run/public/47",
  followers: 15,
  profession: "UX Designer",
  role: "user",
  bio: "Design leader, creative thinker, and user experience strategist.",
  bioMarkdown: "**Design leader**, creative thinker, and UX strategist.",
  articles: [article, article2, article, article2],
  socials: {
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    website: "https://johndoe.com",
  },
  verified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
