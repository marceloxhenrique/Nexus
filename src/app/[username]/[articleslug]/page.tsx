"use client";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare } from "lucide-react";
import Image from "next/image";
import { api } from "@/utils/api";
import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ArticleWithAuthor } from "@/lib/types";
import Link from "next/link";
import Loading from "./loading";
import { toast } from "sonner";
import { UserContext } from "@/contexts/UserContext";
import { CommentsSection } from "@/components/CommentsSection";
import { Button } from "@/components/ui/button";

// TODO: Sanitize HTML content
// import DOMPurify from "dompurify";
// const safeHtml = DOMPurify.sanitize(userSubmittedHtml);

function ArticlePage() {
  const NEXT_PUBLIC_AWS_URL = process.env.NEXT_PUBLIC_AWS_URL;
  const { articleslug } = useParams<{ articleslug: string }>();
  const [article, setArticle] = useState<ArticleWithAuthor>();
  const commentSectionRef = useRef<{ focusInput: () => void }>(null);
  const user = useContext(UserContext)?.user;
  const router = useRouter();

  const addLike = async () => {
    if (!user) {
      router.push("/sign-up");
      return;
    }
    try {
      await api.post("/article-likes", {
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
      await api.delete(`/article-likes/${article?.id}`);
    } catch (error) {
      console.error("Error liking article", error);
    }
  };

  useEffect(() => {
    if (articleslug) {
      const getArticle = async () => {
        try {
          const response = await api.get(`/articles?article=${articleslug}`);
          setArticle(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      getArticle();
    }
  }, [articleslug]);

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
          <Link href={`/@${article.authorSlug}`} className="flex size-full">
            <AvatarImage
              src={NEXT_PUBLIC_AWS_URL + article.author.avatar!}
              alt={"Author avatar"}
            />
            <AvatarFallback className="flex w-full items-center justify-center">
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
              {article.likes}
            </button>
          ) : (
            <button
              onClick={addLike}
              className="flex cursor-pointer items-center gap-1"
            >
              <Heart className={`h-4 w-4 hover:text-red-500`} />
              {article.likes}
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
      <div className="my-16 w-full max-w-3xl border-b-[0.01rem] border-neutral-400"></div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-custom-text-light">
        {article.articleLikes.find((like) => like.userSlug === user?.slug) ? (
          <Button
            onClick={removeLike}
            variant="outline"
            className="flex items-center gap-2 border-neutral-400"
          >
            <Heart className="mr-2 h-4 w-4 fill-red-500 text-red-500 hover:fill-red-400 hover:text-red-400" />
            Like ({article.likes})
          </Button>
        ) : (
          <Button
            onClick={addLike}
            variant="outline"
            className="group flex items-center gap-2 border-neutral-400"
          >
            <Heart className="mr-2 h-4 w-4 group-hover:text-red-500" />
            Like ({article.likes})
          </Button>
        )}

        <Button
          onClick={() => commentSectionRef.current?.focusInput()}
          variant="outline"
          className="flex items-center gap-2 border-neutral-400"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Comment ({article.commentsCount})
        </Button>
      </div>
      <CommentsSection
        articleId={article?.id}
        ref={commentSectionRef}
      ></CommentsSection>
    </main>
  );
}
export default ArticlePage;
