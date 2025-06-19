"use client";
import ArticleCard from "@/components/ArticleCard";
import React from "react";
import { api } from "@/utils/api";
import { ArticleWithAuthor } from "@/lib/types";
import MostRead from "@/components/MostRead";
import WhoToFollow from "@/components/WhoToFollow";
import Loading from "./loading";
import { useQuery } from "@tanstack/react-query";

function Articles() {
  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async (): Promise<ArticleWithAuthor[]> => {
      const response = await api.get("/articles");
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
  });
  if (isLoading) return <Loading></Loading>;
  return (
    <main className="my-auto flex">
      <section className="flex-3 lg:mr-10">
        <h1 className="mt-18 font-secondary text-4xl font-bold tracking-tight text-custom-text-primary">
          Explore Articles
        </h1>
        <p className="max-w-2xl text-custom-text-light">
          Discover the latest insights, tutorials, and thoughts from our
          community of writers on a variety of topics.
        </p>
        <section className="flex flex-col gap-6 py-18">
          {data && data?.length > 0 ? (
            data?.map((article: ArticleWithAuthor) => (
              <ArticleCard key={article.id} article={article}></ArticleCard>
            ))
          ) : (
            <p className="text-custom-text-light">No articles yet</p>
          )}
        </section>
      </section>
      <div className="hidden max-w-3xl border-l-[0.01rem] border-neutral-400 lg:block dark:border-zinc-600"></div>
      <div className="hidden max-w-[26em] flex-1 lg:block">
        <div className="fixed">
          {data && data?.length > 0 ? (
            <MostRead articles={data?.slice(0, 3)}></MostRead>
          ) : (
            <div className="bg mt-18 hidden w-full max-w-[26em] pl-10 lg:block">
              <h2 className="font-secondary text-2xl font-bold text-custom-text-primary">
                Most Read
              </h2>
              <p className="text-custom-text-light">No articles yet</p>
            </div>
          )}
          <WhoToFollow></WhoToFollow>
        </div>
      </div>
    </main>
  );
}
export default Articles;
