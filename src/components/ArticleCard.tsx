"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";

import { Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Article } from "@/lib/types";
const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Link href={`/articles/${article.slug}`}>
      <section className="flex max-w-3xl flex-col gap-6 py-6 md:flex-row">
        <div className="order-2 flex-1 md:order-1">
          <h3 className="text-xl font-bold transition-colors hover:text-green-700">
            {article.title}
          </h3>
          <p className="mt-2 text-custom-text-light">
            {article.content.slice(0, 140)}...
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4 text-sm text-custom-text-light">
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              {/* <span>{article.readTime} min read</span> */}
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{article.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{article.commentsCount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w order-1 flex md:order-2 md:max-w-48">
          <img
            src={article.image || "/placeholder.svg?height=200&width=300"}
            alt={article.title}
            className="w-full rounded-md object-contain"
          />
        </div>
      </section>
      <div className="max-w-3xl border-b-[0.01rem] border-zinc-300"></div>
    </Link>
  );
};
export default ArticleCard;
