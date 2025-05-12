"use client";
import ArticleCard from "@/components/ArticleCard";
import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { ArticleWithAuthor } from "@/lib/types";
import MostRead from "@/components/MostRead";
import WhoToFollow from "@/components/WhoToFollow";
import Loading from "./loading";

function Articles() {
  const [articles, setArticles] = useState<ArticleWithAuthor[] | null>(null);
  const getArticles = async () => {
    const response = await api.get("/articles");
    setArticles(response.data);
  };
  useEffect(() => {
    getArticles();
  }, []);
  if (!articles) return <Loading></Loading>;
  return (
    <main className="my-auto flex">
      <section className="mr-10">
        <h1 className="mt-18 font-secondary text-4xl font-bold tracking-tight text-custom-text-primary">
          Explore Articles
        </h1>
        <p className="max-w-2xl text-custom-text-light">
          Discover the latest insights, tutorials, and thoughts from our
          community of writers on a variety of topics.
        </p>
        <section className="flex flex-col gap-6 py-18">
          {articles.length > 0 &&
            articles.map((article) => (
              <ArticleCard key={article.id} article={article}></ArticleCard>
            ))}
        </section>
      </section>
      <div className="hidden max-w-3xl border-l-[0.01rem] border-neutral-400 xl:block dark:border-zinc-600"></div>
      <div className="max-w-[26em]">
        {articles && <MostRead articles={articles}></MostRead>}
        <WhoToFollow></WhoToFollow>
      </div>
    </main>
  );
}
export default Articles;
