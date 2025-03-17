import ArticleCard from "@/components/ArticleCard";
import React from "react";

const page = () => {
  return (
    <div className="my-auto">
      <section className="flex flex-col gap-6 py-18">
        <ArticleCard article={article}></ArticleCard>
        <ArticleCard article={article2}></ArticleCard>
        <ArticleCard article={article}></ArticleCard>
        <ArticleCard article={article2}></ArticleCard>
      </section>
    </div>
  );
};

export default page;

const article: Article = {
  title: "8 Advanced JavaScript Features to Know",
  content:
    "JavaScript (JS) has come a long way since its inception as a simple scripting language. With the release of ECMAScript...",
  createdAt: new Date(),
  updatedAt: new Date(),
  likes: 34,
  image:
    "https://www.squash.io/wp-content/uploads/2023/11/javascript-series.jpg",
};
const article2: Article = {
  title: "TypeScript: JavaScript With Syntax For Types.",
  content:
    "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
  createdAt: new Date(),
  updatedAt: new Date(),
  likes: 34,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1200px-Typescript.svg.png",
};

type Article = {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  image: string;
};
