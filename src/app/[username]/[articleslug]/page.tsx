"use client";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare } from "lucide-react";
import Image from "next/image";
import { api } from "@/utils/api";
import { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ArticleWithAuthor } from "@/lib/types";
import Link from "next/link";
import Loading from "./loading";
import { toast } from "sonner";
import { UserContext } from "@/contexts/UserContext";
import { CommentsSection } from "@/components/CommentsSection";

// TODO: Sanitize HTML content
// import DOMPurify from "dompurify";
// const safeHtml = DOMPurify.sanitize(userSubmittedHtml);

function ArticlePage() {
  const NEXT_PUBLIC_AWS_URL = process.env.NEXT_PUBLIC_AWS_URL;
  const { articleslug } = useParams<{ articleslug: string }>();
  const [article, setArticle] = useState<ArticleWithAuthor>();
  const user = useContext(UserContext)?.user;
  const router = useRouter();
  const getArticle = async () => {
    try {
      const response = await api.get(`/articles?article=${articleslug}`);
      setArticle(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const addLike = async () => {
    if (!user) {
      router.push("/sign-up");
      return;
    }
    try {
      const response = await api.post("/article-likes", {
        articleId: article?.id,
      });
      toast.success("Article liked");
    } catch (error) {
      console.error("Error liking article", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const removeLike = async () => {
    try {
      const response = await api.delete(`/article-likes/${article?.id}`);
    } catch (error) {
      console.error("Error liking article", error);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  if (!article) {
    return <Loading></Loading>;
  }
  return (
    <main className="mx-auto max-w-3xl py-20">
      <h1 className="text-4xl font-bold text-custom-text-primary">
        {article.title}
      </h1>
      <section className="flex items-center gap-3 py-8 text-sm text-custom-text-light">
        <Avatar className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-[0.01rem] border-neutral-800 bg-zinc-200 text-sm hover:opacity-80 dark:border-white">
          <Link href={`/@${article.authorSlug}`}>
            <AvatarImage
              src={NEXT_PUBLIC_AWS_URL + article.author.avatar!}
              alt={article.author.name}
            />
            <AvatarFallback>
              {article.author.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Link>
        </Avatar>
        <Link
          href={`/@${article.authorSlug}`}
          className="font-medium text-custom-text-primary hover:underline"
        >
          {article.author?.name}
        </Link>
        <span className="flex items-center gap-1">
          {new Date(article.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </section>
      <section className="mb-8 flex flex-wrap gap-3 text-sm text-custom-text-light sm:gap-4">
        <span className="flex items-center gap-1">
          {article.readTime} min read
        </span>
        <span className="flex items-center gap-1">
          {article.articleLikes.find((like) => like.userSlug === user?.slug) ? (
            <button
              onClick={removeLike}
              className="flex cursor-pointer items-center gap-1"
            >
              <Heart
                className={`h-4 w-4 fill-red-500 text-red-500 hover:fill-red-400 hover:text-red-400`}
              />
              {article.articleLikes.length}
            </button>
          ) : (
            <button
              onClick={addLike}
              className="flex cursor-pointer items-center gap-1"
            >
              <Heart className={`h-4 w-4 hover:text-red-500`} />
              {article.articleLikes.length}
            </button>
          )}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          {article.commentsCount}
        </span>
      </section>
      <div className="mb-8 w-full max-w-3xl border-b-[0.01rem] border-neutral-400"></div>
      {article.image && (
        <Image
          src={NEXT_PUBLIC_AWS_URL + article.image}
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
      <section className="mt-12 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="rounded-full px-4 py-2 text-xs"
          >
            {tag}
          </Badge>
        ))}
      </section>
      <CommentsSection articleId={article?.id}></CommentsSection>
    </main>
  );
}
export default ArticlePage;
