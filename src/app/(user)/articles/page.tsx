"use client";
import ArticleCard from "@/components/ArticleCard";
import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Article } from "@/lib/types";

function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const getArticles = async () => {
    const getArticles = await api.get("/articles");
    setArticles(getArticles.data);
  };
  useEffect(() => {
    getArticles();
  }, []);
  return (
    <main className="my-auto">
      <section className="flex flex-col gap-6 py-18">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article}></ArticleCard>
        ))}
      </section>
    </main>
  );
}
export default Articles;
