import { Article, User } from "@/lib/types";

export const article: Article = {
  id: "article-1",
  title: "8 Advanced JavaScript Features to Know",
  slug: "8-advanced-javascript-features",
  content: `JavaScript (JS) has come a long way since its inception as a simple scripting language. With the release of ECMAScript.React Server Components represent a paradigm shift in how we build React applications. This article dives deep into how they work and why they matter for performance.
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab quaerat quia repudiandae repellat dolores tempore explicabo esse, similique praesentium facilis ullam illo voluptates impedit vitae, nam minus veniam provident? Temporibus.
  Ut dignissimos nulla fugiat quis et tempore, beatae libero tenetur? Accusantium id ab sint quae. Est, neque ut aut autem reiciendis consequatur vero ea iusto dolores voluptates dolorum soluta itaque. `,
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
  authorSlug: "user-123",
};

export const article2: Article = {
  id: "article-2",
  title: "TypeScript: JavaScript With Syntax For Types.",
  slug: "typeScript:-javaScript-with-syntax",
  content: `JavaScript (JS) has come a long way since its inception as a simple scripting language. With the release of ECMAScript.React Server Components represent a paradigm shift in how we build React applications. This article dives deep into how they work and why they matter for performance.
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab quaerat quia repudiandae repellat dolores tempore explicabo esse, similique praesentium facilis ullam illo voluptates impedit vitae, nam minus veniam provident? Temporibus.
  Ut dignissimos nulla fugiat quis et tempore, beatae libero tenetur? Accusantium id ab sint quae. Est, neque ut aut autem reiciendis consequatur vero ea iusto dolores voluptates dolorum soluta itaque. `,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1200px-Typescript.svg.png",
  likes: 34,
  views: 1200,
  tags: ["JavaScript", "Programming"],
  readTime: 6,
  published: true,
  commentsCount: 5,
  authorId: "user-123",
  createdAt: new Date(2023, 10, 15),
  updatedAt: new Date(2023, 10, 15),
  authorSlug: "user-123",
};

export const articles = [article, article2];

export const user: User = {
  id: "user-123",
  name: "John Doe",
  slug: "johndoe",
  email: "johndoe@gmail.com",
  avatar: "https://avatar.iran.liara.run/public/47",
  followers: 0,
  occupation: "UX Designer",
  role: "user",
  bio: "Design leader, creative thinker, and user experience strategist.",
  bioMarkdown: "**Design leader**, creative thinker, and UX strategist.",
  socials: ["https://twitter.com/johndoe", "https://github.com/johndoe"],
  verified: true,
  createdAt: new Date(2023, 10, 15),
  updatedAt: new Date(2023, 10, 15),
};
