import ArticleCard from "@/components/ArticleCard";
import React from "react";
import { article, article2 } from "@/data/User";
const page = () => {
  return (
    <main className="my-auto">
      <section className="flex flex-col gap-6 py-18">
        <ArticleCard article={article}></ArticleCard>
        <ArticleCard article={article2}></ArticleCard>
        <ArticleCard article={article}></ArticleCard>
        <ArticleCard article={article2}></ArticleCard>
      </section>
    </main>
  );
};
export default page;
