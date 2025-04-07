"use client";
import ArticleCard from "@/components/ArticleCard";
import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { ArticleWithAuthor } from "@/lib/types";

function Articles() {
  const [articles, setArticles] = useState<ArticleWithAuthor[]>([]);
  const getArticles = async () => {
    const response = await api.get("/articles");
    setArticles(response.data);
  };
  useEffect(() => {
    getArticles();
  }, []);
  return (
    <main className="my-auto">
      <h1 className="mt-18 font-secondary text-4xl font-bold tracking-tight text-custom-text-primary">
        Explore Articles
      </h1>
      <p className="max-w-2xl text-custom-text-light">
        Discover the latest insights, tutorials, and thoughts from our community
        of writers on a variety of topics.
      </p>
      <section className="flex flex-col gap-6 py-18">
        {articles.length > 0 &&
          articles.map((article) => (
            <ArticleCard key={article.id} article={article}></ArticleCard>
          ))}
      </section>
    </main>
  );
}
export default Articles;
