"use client";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare } from "lucide-react";
import Image from "next/image";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ArticleWithAuthor } from "@/lib/types";
import Link from "next/link";

// TODO: Sanitize HTML content
// import DOMPurify from "dompurify";
// const safeHtml = DOMPurify.sanitize(userSubmittedHtml);

function ArticlePage() {
  const { articleslug } = useParams<{ articleslug: string }>();
  const [article, setArticle] = useState<ArticleWithAuthor>();
  const getArticle = async () => {
    try {
      const response = await api.get(`/articles?article=${articleslug}`);
      setArticle(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getArticle();
  }, []);

  if (!article) {
    return (
      <p className="text-center text-custom-text-light">Article not found.</p>
    );
  }
  return (
    <main className="mx-auto max-w-3xl py-10">
      <h1 className="text-4xl font-bold text-custom-text-primary">
        {article.title}
      </h1>
      <section className="mt-4 flex items-center gap-3 text-sm text-custom-text-light">
        <Avatar className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-sm">
          <Link href={`/@${article.authorSlug}`}>
            <AvatarImage
              src={article.author.avatar!}
              alt={article.author.name}
            />
            <AvatarFallback>
              {article.author.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Link>
        </Avatar>
        <span className="font-medium text-custom-text-primary">
          {article.author?.name}
        </span>
        <span className="flex items-center gap-1">
          {new Date(article.createdAt).toLocaleDateString()}
        </span>
      </section>
      <section className="mt-3 flex flex-wrap gap-3 text-sm text-custom-text-light sm:gap-4">
        <span className="flex items-center gap-1">
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
      {article.image && (
        <Image
          src={article.image}
          width={500}
          height={300}
          alt={article.title}
          className="mt-6 rounded-lg"
        />
      )}
      <article className="wrap mt-6 space-y-4 text-lg text-custom-text-light">
        <div
          className="rich-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
      <section className="mt-6 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </section>
    </main>
  );
}
export default ArticlePage;
