"use client";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Profile() {
  const [profilePage, setProfilePage] = useState("articles");
  const handleProfilePage = (page: string) => {
    setProfilePage(page === "articles" ? "articles" : "bio");
  };
  return (
    <section className="flex grow flex-col md:flex-row-reverse">
      <div className="items-left flex flex-row gap-4 px-2 py-8 md:flex-1 md:flex-col md:p-8">
        <div className="h-14 min-w-14 rounded-full bg-gray-400 md:size-24"></div>
        <div className="flex flex-col gap-1">
          <h2 className="flex flex-wrap text-2xl text-custom-text-primary md:text-base">
            {user.name}
          </h2>
          <p className="text-sm text-custom-text-light">
            {user.followers} Followers
          </p>
          <p className="hidden text-custom-text-light md:block">{user.role}</p>
        </div>
      </div>
      <div className="md:border-r-[0.01rem] md:border-neutral-300"></div>

      <div className="flex flex-col gap-8 py-10 md:flex-2">
        <h1 className="hidden flex-wrap text-4xl text-custom-text-primary md:flex">
          {user.name}
        </h1>
        <div className="flex flex-row gap-4">
          <Button
            onClick={() => {
              handleProfilePage("articles");
            }}
            variant={"link"}
            className={`px-0 ${profilePage === "articles" ? "underline" : ""}`}
          >
            Articles
          </Button>
          <Button
            onClick={() => {
              handleProfilePage("bio");
            }}
            variant={"link"}
            className={`px-0 ${profilePage === "bio" ? "underline" : ""}`}
          >
            Bio
          </Button>
        </div>
        {profilePage === "articles" ? (
          <section className="flex flex-col gap-4 md:mr-6">
            {user.articles.map((article, index) => (
              <ArticleCard key={index} article={article}></ArticleCard>
            ))}
          </section>
        ) : (
          <section className="flex flex-col gap-4">
            <p className="pr-24 text-lg text-custom-text-light">{user.bio}</p>
          </section>
        )}
      </div>
    </section>
  );
}

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

type User = {
  name: string;
  followers: number;
  role: string;
  bio: string;
  articles: Article[];
};
const user: User = {
  name: "John Doe",
  followers: 15,
  role: "Designer Leader",
  bio: "Design leader, creative thinker, and user experience strategist. Head of Design at XYZ. I write about UX, product design, and innovation.",
  articles: [article, article2, article, article2],
};
