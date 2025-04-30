import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { ArticleWithAuthor } from "@/lib/types";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
const ArticleCard = ({ article }: { article: ArticleWithAuthor }) => {
  const NEXT_PUBLIC_AWS_URL = process.env.NEXT_PUBLIC_AWS_URL;
  return (
    <Link
      href={`/${"@" + article.authorSlug}/${article.slug}`}
      className="block max-w-3xl"
    >
      <section className="flex max-w-3xl flex-col gap-6 py-6 md:flex-row">
        <div className="order-2 flex-1 md:order-1">
          <div className="mb-3 flex items-center gap-3">
            <Avatar className="flex h-8 w-8 items-center justify-center bg-zinc-200 text-sm">
              <AvatarImage
                src={NEXT_PUBLIC_AWS_URL + article.author.avatar!}
                alt={article.author.name}
              />
              <AvatarFallback>
                {article.author.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-custom-text-primary">
                {article.author.name || "Anonymous"}
              </span>
              <span className="text-custom-text-light">•</span>
              <span className="text-custom-text-light">
                {new Date(article.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-custom-text-primary">
            {article.title}
          </h3>
          <p
            className="mt-2 line-clamp-2 text-custom-text-light"
            dangerouslySetInnerHTML={{
              __html: article.content.slice(0, 137) + "...",
            }}
          ></p>
          <div className="mt-3 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <section className="mt-4 flex flex-wrap items-center gap-4 text-sm text-custom-text-light">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {article.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {article.commentsCount}
            </span>
          </section>
        </div>
        <div className="order-1 md:order-2 md:w-1/3">
          {article.image && (
            <Image
              src={NEXT_PUBLIC_AWS_URL + article.image}
              alt={article.title}
              className="h-40 w-full rounded-md object-cover"
              width={400}
              height={300}
            />
          )}
        </div>
      </section>
      <div className="max-w-3xl border-b-[0.01rem] border-zinc-300 dark:border-zinc-600"></div>
    </Link>
  );
};
export default ArticleCard;
